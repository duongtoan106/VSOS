const API_URL = "https://quick-tish-fpt123-e6533ba7.koyeb.app";
import { uploadImage } from "../../firebaseConfig";
import noImage from "../assets/img/noImage.jpg";
import { message } from "antd";

const token = localStorage.getItem("token");

// ========================== AUTHENTICATION ==========================
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
    const response = await fetch(`${API_URL}/api/register`, {
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

// export const fetchCustomers = async () => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     console.warn("No authentication token found.");
//     return null; // Hoặc có thể trả về một giá trị mặc định
//   }

//   try {
//     const response = await fetch(`${API_URL}/api/account`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(
//         `HTTP error! Status: ${response.status} - ${
//           errorData.message || "Unknown error"
//         }`
//       );
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching customers:", error.message);
//     return null; // Hoặc throw error để xử lý ở nơi gọi hàm
//   }
// };

// ========================== ACCOUNT MANAGEMENT ==========================

export const fetchCustomers = async () => {
  try {
    const response = await fetch(`${API_URL}/api/account`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }

    return (await response.json()) || [];
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
};

export const fetchAccountDetails = async (id) => {
  if (!id) {
    console.error("Error: ID is undefined!");
    throw new Error("ID is required");
  }

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/id?id=${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching account details:", error);
    throw error;
  }
};

// ========================== PRODUCT MANAGEMENT ==========================
export const fetchProducts = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const response = await fetch(`${API_URL}/api/product/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    throw new Error("Failed to fetch product data");
  }
};

export const fetchProductDetails = async (id) => {
  if (!id) {
    console.error("Error: ID is undefined!");
    throw new Error("ID is required");
  }

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/product/${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
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
      id: 0,
      image: imageUrl,
      name: values.productName.trim(),
      description: values.productDescription.trim(),
      price: String(values.productPrice).trim(),
      createdBy: localStorage.getItem("userName") || "Admin",
      status: "TRUE",
      pending: "TRUE",
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
        Authorization: `Bearer ${token}`,
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
    fetchProducts();
    handleCloseModal();
  } catch (error) {
    console.error("🔥 Lỗi khi tạo sản phẩm:", error);
    message.error(error.message || "Tạo sản phẩm thất bại. Vui lòng thử lại.");
  }
};

export const approveProduct = async (id) => {
  console.log("Gọi API duyệt sản phẩm với ID:", id);

  try {
    const response = await fetch(
      `${API_URL}/api/product/changeStatus/${id}?action=approve`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Response nhận được:", response);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        `Lỗi API: ${response.status} - ${data?.message || "Không xác định"}`
      );
    }

    console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("Lỗi khi duyệt sản phẩm:", error);
    alert(`Có lỗi xảy ra: ${error.message}`);
    throw error;
  }
};

export const rejectProduct = async (id) => {
  console.log("Gọi API duyệt sản phẩm với ID:", id);

  try {
    const response = await fetch(
      `${API_URL}/api/product/changeStatus/${id}?action=reject`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Response nhận được:", response);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        `Lỗi API: ${response.status} - ${data?.message || "Không xác định"}`
      );
    }

    console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("Lỗi khi duyệt sản phẩm:", error);
    alert(`Có lỗi xảy ra: ${error.message}`);
    throw error;
  }
};

// ========================== PROMOTION MANAGEMENT ==========================
export const fetchSalePromotions = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found.");
    }

    const response = await fetch(`${API_URL}/api/sale-promotion`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching sale promotions:", error);
    throw error;
  }
};

export const createSalePromotion = async (promotionData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_URL}/api/sale-promotion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(promotionData),
    });

    if (!response.ok) {
      throw new Error("Failed to create sale promotion");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating sale promotion:", error);
    throw error;
  }
};

// ========================== ORDER MANAGEMENT ==========================
export const fetchOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const fetchOrderDetails = async (id) => {
  if (!id) {
    console.error("Error: ID is undefined!");
    throw new Error("ID is required");
  }

  try {
    const response = await fetch(`${API_URL}/api/orders/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const updateOrder = async (id, orderData) => {
  try {
    const response = await fetch(`${API_URL}/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to update order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/orders/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete order");
    }

    return { success: true, message: "Order deleted successfully" };
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export const processOrderTransaction = async (transactionData) => {
  try {
    const response = await fetch(`${API_URL}/api/orders/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      throw new Error("Failed to process order transaction");
    }

    return await response.json();
  } catch (error) {
    console.error("Error processing order transaction:", error);
    throw error;
  }
};
