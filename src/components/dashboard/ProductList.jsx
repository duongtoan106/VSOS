import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Button, message, Modal, Form, Input, InputNumber, Select } from "antd";
import { useNavigate } from "react-router-dom";
// import api from "../../config/axios";
import noImage from "../../assets/img/noImage.jpg";

import { app } from "../../../firebaseConfig";
import {
  createProduct,
  deleteProductStatus,
  fetchProductDetails,
  fetchProducts,
  updateProductStatus,
  // updateProductStatus,
} from "../../constant/api";

const storage = getStorage(app); // Initialize Firebase storage
const { Option } = Select;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [form] = Form.useForm();
  const navigate = useNavigate();
  // const [imagePreview, setImagePreview] = useState(noImage);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null); // Define error state
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false); // true: View, false: Create
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        console.log("Dữ liệu sản phẩm nhận được:", data);
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        setError("Không thể tải sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleOpenModal = () => {
    form.resetFields();
    setImagePreview(noImage);
    setImageFile(null); // Reset image file
    setIsModalVisible(true);
  };
  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.3)", // Nền mờ trong suốt
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "600px", // Giới hạn chiều rộng
    maxHeight: "80vh", // Giới hạn chiều cao
    overflowY: "auto", // Cuộn khi nội dung quá dài
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  };

  const handleCloseModal = () => setIsModalVisible(false);
  const handleUpdateProduct = async (values) => {
    setIsLoading(true);
    try {
      if (
        !values.productName ||
        !values.productDescription ||
        !values.productPrice ||
        !values.productQuantity
      ) {
        message.error("⚠️ Thiếu thông tin sản phẩm. Vui lòng kiểm tra lại.");
        setIsLoading(false);
        return;
      }

      let imageUrl = selectedProduct.image || noImage; // Use existing image if no new one
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          message.error("⚠️ Lỗi tải ảnh lên.");
          setIsLoading(false);
          return;
        }
      }

      const updatedProductData = {
        id: selectedProduct.id,
        image: imageUrl,
        name: values.productName,
        quantity: Number(values.productQuantity), // Chuyển quantity thành số
        description: values.productDescription,
        price: Number(values.productPrice), // Chuyển price thành số
        createdBy: selectedProduct.createdBy || "string",
        status: "TRUE",
        pending: "TRUE",
      };

      console.log("Form values:", values);
      console.log("Updated product data being sent:", updatedProductData);

      await updateProductStatus(updatedProductData);
      message.success("🎉 Sản phẩm đã được cập nhật thành công!");
      setIsModalVisible(false);

      // Refresh product list
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("🔥 Lỗi khi cập nhật sản phẩm:", error);
      message.error("⚠️ Cập nhật sản phẩm thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    console.log("📸 handleImageChange called!");
    const file = e.target.files[0];

    if (file) {
      console.log("🖼️ File selected:", file.name);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      console.error("🚫 No file selected!");
    }
  };

  const uploadImage = async (file) => {
    if (!file) {
      console.error("🚫 No file provided!");
      return null;
    }

    try {
      console.log("⏳ Uploading file:", file.name);
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);

      console.log("✅ Upload successful, fetching URL...");
      const url = await getDownloadURL(snapshot.ref);
      console.log("🌐 Image URL:", url);

      return url;
    } catch (error) {
      console.error("🔥 Upload failed:", error);
      message.error(`Upload failed: ${error.message}`);
      throw new Error("Lỗi khi tải ảnh lên. Vui lòng thử lại.");
    }
  };

  const [isLoading, setIsLoading] = useState(false); // State để theo dõi trạng thái loading

  const handleFormSubmit = async (values) => {
    setIsLoading(true); // Bắt đầu loading
    try {
      console.log("📥 Dữ liệu form:", values);

      if (
        !values.productName ||
        !values.productDescription ||
        !values.productPrice ||
        !values.productQuantity
      ) {
        message.error("⚠️ Thiếu thông tin sản phẩm. Vui lòng kiểm tra lại.");
        setIsLoading(false);
        return;
      }

      let imageUrl = noImage; // Mặc định ảnh nếu không có
      if (imageFile) {
        console.log("📸 Uploading image...");
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          message.error("⚠️ Lỗi tải ảnh lên.");
          setIsLoading(false);
          return;
        }
      }

      const productData = {
        image: imageUrl,
        name: values.productName,
        quantity: values.productQuantity,
        description: values.productDescription,
        price: values.productPrice.toString(),
        createdBy: localStorage.getItem("username") || "Admin",
        status: "TRUE",
        pending: "TRUE",
      };

      console.log("📤 Payload being sent:", productData);

      await createProduct(values, imageFile, fetchProducts, handleCloseModal);

      message.success("🎉 Sản phẩm đã được tạo thành công!");
    } catch (error) {
      console.error("🔥 Lỗi khi tạo sản phẩm:", error.response?.data || error);
      message.error("⚠️ Tạo sản phẩm thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false); // Dừng loading sau khi hoàn tất
    }
  };

  const handleRemoveProduct = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn ẩn sản phẩm này không?",
      content: "Sản phẩm sẽ không còn hiển thị với người dùng.",
      okText: "Đồng ý",
      cancelText: "Hủy",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await deleteProductStatus(id);
          message.success("Sản phẩm đã được cập nhật trạng thái!");
          const updatedProducts = await fetchProducts();
          setProducts(updatedProducts);
        } catch (error) {
          message.error("Không thể cập nhật trạng thái sản phẩm!");
        }
      },
    });
  };

  // const handleRemoveProduct = async (productId) => {
  //   try {
  //     await api.post(`/api/products/updateProductActiveStatus/${productId}`, {
  //       isActive: "inactive",
  //     });
  //     message.success("Product removed successfully!");
  //     fetchProducts();
  //   } catch (error) {
  //     console.error("Failed to remove product:", error);
  //     message.error("Failed to remove product. Please try again.");
  //   }
  // };
  const handleViewProduct = async (productId) => {
    try {
      console.log("🔍 Fetching details for product ID:", productId);
      const data = await fetchProductDetails(productId); // Gọi API lấy dữ liệu sản phẩm
      console.log("✅ Product details:", data);

      setSelectedProduct(data); // Cập nhật state sản phẩm
      form.setFieldsValue({
        productName: data.name,
        productDescription: data.description,
        productPrice: data.price,
        productQuantity: data.quantity || data.productQuantity,
      });

      setImagePreview(data.image || noImage); // Nếu có ảnh thì hiển thị
      setIsViewMode(true); // Chuyển sang chế độ View
      setIsModalVisible(true); // Mở modal
    } catch (error) {
      console.error("❌ Lỗi khi tải thông tin sản phẩm:", error);
      message.error("Không thể tải thông tin sản phẩm.");
    }
  };
  const handleOpenCreateModal = () => {
    form.resetFields(); // Xóa dữ liệu cũ
    setSelectedProduct(null);
    setImagePreview(null);
    setIsViewMode(false); // Chế độ Create
    setIsModalVisible(true);
  };

  if (loading) return <CircularProgress style={{ margin: "20px auto" }} />;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{
          marginBottom: 16,
          backgroundColor: "rgb(180,0,0)",
          borderColor: "rgb(180,0,0)",
        }}
      >
        Create New Product
      </Button>

      <TableContainer component={Paper}>
        <Table aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ fontWeight: "bold", color: "rgb(180,0,0)" }}
                align="center"
              >
                PRODUCT ID
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", color: "rgb(180,0,0)" }}
                align="left"
              >
                PRODUCT NAME
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", color: "rgb(180,0,0)" }}
                align="left"
              >
                DESCRIPTION
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", color: "rgb(180,0,0)" }}
                align="center"
              >
                PRICE
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", color: "rgb(180,0,0)" }}
                align="center"
              >
                STATUS
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", color: "rgb(180,0,0)" }}
                align="center"
              >
                USERNAME
              </TableCell>
              <TableCell
                style={{ fontWeight: "bold", color: "rgb(180,0,0)" }}
                align="center"
              >
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id || product.productId}>
                {" "}
                {/* Đảm bảo key đúng */}
                <TableCell align="center">
                  {product.id || product.productId}
                </TableCell>
                <TableCell align="left">
                  {product.name || product.productName}
                </TableCell>
                <TableCell align="left">
                  {product.description || product.productDescription}
                </TableCell>
                <TableCell align="center">
                  {product.price || product.productPrice}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {product.status === "TRUE" && product.pending === "TRUE" ? (
                    <span style={{ color: "orange" }}>🕒 Chờ duyệt</span>
                  ) : product.status === "TRUE" &&
                    product.pending === "FALSE" ? (
                    <span style={{ color: "green" }}>🟢 Đang bán</span>
                  ) : product.status === "FALSE" &&
                    product.pending === "TRUE" ? (
                    <span style={{ color: "red" }}>⏳ Chờ ẩn</span>
                  ) : (
                    <span style={{ color: "gray" }}>🚫 Đã ẩn</span>
                  )}
                </TableCell>
                <TableCell align="center">
                  {product.createdBy || "Unknown"}{" "}
                  {/* Kiểm tra User tránh lỗi */}
                </TableCell>
                <TableCell align="center">
                  <Button
                    style={{ color: "rgb(180,0,0)" }}
                    onClick={() =>
                      handleViewProduct(product.id || product.productId)
                    }
                  >
                    View
                  </Button>

                  {localStorage.getItem("role") === "MANAGER" && (
                    <Button
                      style={{ color: "red", marginLeft: "8px" }}
                      onClick={() =>
                        handleRemoveProduct(product.id || product.productId)
                      }
                    >
                      Remove
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        title="Create New Product"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={1000}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: "1" }}>
            <Form
              form={form}
              onFinish={isViewMode ? handleUpdateProduct : handleFormSubmit}
              layout="vertical"
            >
              {/* <Form.Item
                name="categoryId"
                label="Category"
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
                <Select
                  placeholder="Select a category"
                  style={{ width: "100%" }}
                >
                  {categories.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item> */}
              <Form.Item
                name="productName"
                label="Tên sản phẩm"
                rules={[{ required: true, message: "Hãy nhập tên sản phẩm" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="productQuantity"
                label="Số lượng"
                rules={[
                  { required: true, message: "Hãy nhập số lượng sản phẩm" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="productDescription"
                label="Description"
                rules={[
                  { required: true, message: "Please enter description" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="productPrice"
                label="Giá sản phẩm"
                rules={[
                  { required: true, message: "Hãy nhập giá sản phẩm" },
                  {
                    validator: (_, value) => {
                      if (value < 1) {
                        return Promise.reject(
                          new Error("Giá sản phẩm phải lớn hơn 1!")
                        );
                      }
                      // if (value > 9999) {
                      //   return Promise.reject(
                      //     new Error("Product price can't exceed 9999!")
                      //   );
                      // }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              {isViewMode ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  style={{
                    marginTop: "16px",
                    backgroundColor: "rgb(180,0,0)",
                    borderColor: "rgb(180,0,0)",
                  }}
                >
                  Cập nhật sản phẩm
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  style={{
                    marginTop: "16px",
                    backgroundColor: "rgb(180,0,0)",
                    borderColor: "rgb(180,0,0)",
                  }}
                >
                  Tạo sản phẩm
                </Button>
              )}
            </Form>
          </div>
          <div style={{ flex: "1", textAlign: "center" }}>
            <img
              src={imagePreview}
              alt="Product Preview"
              style={{
                width: "100%",
                maxWidth: "300px",
                maxHeight: "300px",
                objectFit: "contain",
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: "16px" }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
