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
      const errorData = await response.json();
      throw new Error(errorData.message || "Sai tài khoản hoặc mật khẩu!");
    }

    const data = await response.json();
    console.log("Dữ liệu API trả về:", data);
    return data;
  } catch (error) {
    message.error(error.message);
    throw error;
  }
};

export const register = async ({
  username,
  phone,
  email,
  password,
  address,
}) => {
  const requestData = {
    role: "USER",
    username,
    password,
    email,
    phone,
    address,
  };

  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Đăng ký thất bại, vui lòng thử lại!");
    }

    message.success(data.message || "Đăng ký thành công!");
    return { success: true, message: data.message || "Đăng ký thành công!" };
  } catch (error) {
    message.error(error.message || "Có lỗi xảy ra, vui lòng thử lại.");
    return { success: false, message: error.message || "Có lỗi xảy ra." };
  }
};

// ========================== ACCOUNT MANAGEMENT ==========================

export const fetchCustomers = async () => {
  if (!token) {
    console.error("No token found.");
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/api/account`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch customers");
    }

    return (await response.json()) || [];
  } catch (error) {
    console.error("Error fetching customers:", error);
    message.error("Không thể tải thông tin khách hàng. Vui lòng thử lại!");
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

    if (!token) {
      console.error("Error: Token is missing!");
      throw new Error("Token is required");
    }

    const response = await fetch(`${API_URL}/api/id?id=${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Please login again.");
      } else if (response.status === 404) {
        throw new Error("Account not found.");
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    return response.json(); // return directly without await
  } catch (error) {
    console.error("Error fetching account details:", error);
    throw error; // rethrow the error for higher-level handling
  }
};

// ========================== PRODUCT MANAGEMENT ==========================
export const fetchProducts = async () => {
  try {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   throw new Error("No token found. Please log in.");
    // }

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
      !values.productPrice ||
      !values.productQuantity
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
      quantity: values.productQuantity,
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

export const deleteProductStatus = async (id) => {
  console.log(`🗑️ Gọi API xoá sản phẩm ID: ${id}`);

  try {
    const response = await fetch(`${API_URL}/api/product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json().catch(() => null);
    console.log("📩 Response nhận được:", response);
    console.log("📌 Data nhận được:", data);

    if (!response.ok) {
      throw new Error(
        `❌ Lỗi API: ${response.status} - ${data?.message || "Không xác định"}`
      );
    }

    console.log(`✅ Sản phẩm ID ${id} đã bị xoá thành công!`);
    return true;
  } catch (error) {
    console.error("⚠️ Lỗi khi xoá sản phẩm:", error);
    alert(`🚨 Có lỗi xảy ra: ${error.message}`);
    throw error;
  }
};
import axios from "axios";

export const updateProductStatus = async (productData) => {
  try {
    // Log dữ liệu sản phẩm trước khi gửi đi
    console.log("Sending product data:", productData);

    const response = await axios.put(
      `${API_URL}/api/product/${productData.id}`,
      {
        id: productData.id,
        image: productData.image,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        createdBy: productData.createdBy || "string",
        quantity: productData.quantity, // quantity là số
        status: "TRUE",
        pending: "TRUE",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Log trạng thái phản hồi
    console.log("API Response Status:", response.status);

    // Log dữ liệu phản hồi từ API
    console.log("API Response Data:", response.data);

    // Kiểm tra xem API có trả về dữ liệu mới với quantity đã cập nhật không
    if (response.data) {
      console.log("Updated product quantity:", response.data.quantity);
    }

    return response.data;
  } catch (error) {
    console.error("Error during product update:", error);
    throw new Error("Cập nhật sản phẩm thất bại");
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
export const deleteSalePromotion = async (promotionId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/sale-promotion/${promotionId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // If the response has content, parse it as JSON; otherwise, return true for successful deletion.
  if (!response.ok) {
    throw new Error("Failed to delete promotion");
  }

  // Check if the response body contains JSON data
  try {
    const data = await response.json(); // This will fail if there's no JSON in the response
    return data; // You can return the response data if needed
  } catch (error) {
    return true; // If no data in response, just return true for successful deletion
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
      // Kiểm tra lỗi từ API và thông báo lỗi chi tiết
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create sale promotion");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating sale promotion:", error.message);
    // Hiển thị thông báo lỗi cho người dùng
    throw new Error(error.message || "An unexpected error occurred");
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
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  // Check if content-type is JSON
  const contentType = res.headers.get("content-type");

  if (res.ok) {
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      // Trường hợp trả về text/plain chứa URL VNPAY
      const text = await res.text();
      return { url: text }; // Trả về object có key `url` để xử lý như trước
    }
  } else {
    throw new Error("Error creating order");
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

// ========================== CART MANAGEMENT ==========================

export const addToCart = async (product, customerId, token) => {
  try {
    // Chuyển đổi giá thành số
    const priceValue = parseFloat(product.price);
    if (isNaN(priceValue)) throw new Error("Giá sản phẩm không hợp lệ!");

    // Chuyển đổi ID thành số
    const productId = parseInt(product.id);
    if (isNaN(productId)) throw new Error("ID sản phẩm không hợp lệ!");

    const payload = {
      id: 0,
      quantity: 1,
      price: priceValue,
      productId: productId,
      product: {
        id: productId,
        image: product.image || "",
        name: product.name || "",
        description: product.description || "",
        price: priceValue,
        createdBy: "",
        quantity: 0,
        status: "TRUE",
        pending: "TRUE",
      },
    };

    console.log("Payload gửi đi:", JSON.stringify(payload, null, 2));

    const response = await fetch(
      `${API_URL}/api/cart/add?customerId=${customerId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    // 🛠 Kiểm tra nếu phản hồi rỗng hoặc không phải JSON hợp lệ
    const textResponse = await response.text();
    console.log("Phản hồi API:", textResponse);

    if (!response.ok) {
      throw new Error(`API Error ${response.status}: ${textResponse}`);
    }

    // 🛠 Chỉ parse JSON nếu phản hồi không rỗng
    const data = textResponse ? JSON.parse(textResponse) : {};
    console.log("Sản phẩm đã được thêm vào giỏ hàng:", data);

    return data;
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error.message);
    throw error;
  }
};

export const getCartItems = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token) {
    console.error("Token is missing!");
    return [];
  }

  if (!userId) {
    console.error("User ID is missing!");
    return [];
  }

  try {
    const response = await fetch(
      `${API_URL}/api/cart/items?customerId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
};

export const removeFromCart = async (productId, customerId, token) => {
  try {
    if (!productId || !customerId || !token) {
      throw new Error("Thiếu thông tin để xoá sản phẩm khỏi giỏ hàng!");
    }

    const response = await fetch(
      `${API_URL}/api/cart/remove/${productId}?customerId=${customerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const textResponse = await response.text();
    console.log("Phản hồi khi xoá:", textResponse);

    if (!response.ok) {
      throw new Error(`API Error ${response.status}: ${textResponse}`);
    }

    const data = textResponse ? JSON.parse(textResponse) : {};
    console.log("Sản phẩm đã được xoá khỏi giỏ hàng:", data);

    return data;
  } catch (error) {
    console.error("Lỗi khi xoá sản phẩm khỏi giỏ hàng:", error.message);
    throw error;
  }
};
