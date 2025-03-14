const API_URL = "https://quick-tish-fpt123-e6533ba7.koyeb.app";

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/account/login`, {
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

    const response = await fetch(`${API_URL}/api/product`, {
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
