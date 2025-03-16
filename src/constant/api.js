const API_URL = "https://quick-tish-fpt123-e6533ba7.koyeb.app";
import { uploadImage } from "../../firebaseConfig";
import noImage from "../assets/img/noImage.jpg";

import { message } from "antd";
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(
        `Login failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Login success:", data);
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

export const register = async ({ username, phone, email, password }) => {
  const requestData = {
    role: "USER",
    username,
    password,
    email,
    phone,
  };

  try {
    const response = await fetch(`${API_URL}/api/account/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Đăng ký thất bại, vui lòng thử lại!");
    }

    return { success: true, message: "Đăng ký thành công!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
// src/api.js

export const fetchCustomers = async () => {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage

    if (!token) {
      throw new Error("No authentication token found.");
    }

    const response = await fetch(`${API_URL}/api/account`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`, // Thêm Bearer Token
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json(); // Trả về dữ liệu JSON
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error; // Ném lỗi để xử lý bên ngoài
  }
};
export const fetchAccountDetails = async (id) => {
  if (!id) {
    throw new Error("Error: ID is undefined!");
  }

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found.");
    }

    const response = await fetch(`${API_URL}/api/account/${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json(); // Trả về dữ liệu
  } catch (error) {
    console.error("Error fetching account details:", error);
    throw error;
  }
};
export const fetchProducts = async () => {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/api/product/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Thêm token vào headers
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data; // Trả về dữ liệu sản phẩm
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    throw new Error("Failed to fetch product data");
  }
};
export const createProduct = async (
  values,
  imageFile,
  fetchProducts,
  handleCloseModal
) => {
  let imageUrl = noImage;

  try {
    // Kiểm tra dữ liệu đầu vào
    if (
      !values ||
      !values.productName ||
      !values.productDescription ||
      !values.productPrice
    ) {
      throw new Error("⚠️ Thiếu thông tin sản phẩm. Vui lòng kiểm tra lại.");
    }

    // Upload ảnh nếu có
    if (imageFile) {
      console.log("📸 File ảnh trước khi upload:", imageFile);
      console.log("📤 Đang gọi uploadImage...");
      imageUrl = await uploadImage(imageFile);
      console.log("✅ Ảnh đã upload, URL:", imageUrl);
    }

    // Chuẩn bị payload gửi lên API
    const payload = {
      id: 0, // ID do server tự tạo
      image: imageUrl, // URL ảnh từ Firebase Storage hoặc giá trị mặc định
      name: values.productName.trim(),
      description: values.productDescription.trim(),
      price: String(values.productPrice).trim(), // Đảm bảo là chuỗi, nếu API yêu cầu số: Number(values.productPrice)
      createdBy: localStorage.getItem("userName") || "Admin", // Lấy username hoặc mặc định "Admin"
      status: "TRUE", // Mặc định TRUE
      pending: "TRUE", // Mặc định TRUE
    };

    console.log("📡 Payload sent to API:", JSON.stringify(payload, null, 2));

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("⚠️ Không tìm thấy token. Vui lòng đăng nhập lại.");
    }

    const response = await fetch(`${API_URL}/api/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Thêm token vào headers
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`🚨 API Error ${response.status}: ${errorText}`);
    }

    const responseData = await response.json();
    console.log("✅ API Response:", responseData);

    message.success("🎉 Tạo sản phẩm thành công!");
    fetchProducts(); // Cập nhật danh sách sản phẩm
    handleCloseModal(); // Đóng modal sau khi tạo xong
  } catch (error) {
    console.error("🔥 Lỗi khi tạo sản phẩm:", error);
    message.error(error.message || "Tạo sản phẩm thất bại. Vui lòng thử lại.");
  }
};
