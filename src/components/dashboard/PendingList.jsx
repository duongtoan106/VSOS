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
  approveProduct,
  rejectProduct,
  createProduct,
  fetchProductDetails,
  fetchProducts,
} from "../../constant/api";

const storage = getStorage(app); // Initialize Firebase storage
const { Option } = Select;

export default function PendingList() {
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

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await fetchProducts();
  //       console.log("Dữ liệu sản phẩm nhận được:", data);
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Lỗi khi tải sản phẩm:", error);
  //       setError("Không thể tải sản phẩm");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getProducts();
  // }, []);
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        console.log("Dữ liệu sản phẩm nhận được:", data);

        // Lọc sản phẩm có pending = "TRUE"
        const pendingProducts = data.filter(
          (product) => product.pending === "TRUE"
        );

        setProducts(pendingProducts);
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
  const handleApproveRejectProduct = async (productId, action) => {
    try {
      console.log(`🔄 Sending ${action} request for product ID:`, productId);

      // Gọi API tương ứng dựa vào action
      if (action === "approve") {
        await approveProduct(productId);
      } else if (action === "reject") {
        await rejectProduct(productId);
      }

      message.success(`🎉 Product has been ${action}d successfully!`);

      // Cập nhật lại danh sách sản phẩm sau khi API thành công
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);

      // Đóng modal nếu đang mở
      setIsModalVisible(false);
    } catch (error) {
      console.error(`❌ Failed to ${action} product:`, error);
      message.error(`⚠️ Failed to ${action} product. Please try again.`);
    }
  };

  const handleCloseModal = () => setIsModalVisible(false);

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
        !values.productPrice
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
      {/* <Button
        type="primary"
        onClick={handleOpenModal}
        style={{
          marginBottom: 16,
          backgroundColor: "rgb(180,0,0)",
          borderColor: "rgb(180,0,0)",
        }}
      >
        Create New Product
      </Button> */}

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

                  {localStorage.getItem("usertype") === "Manager" && (
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
            <Form form={form} onFinish={handleFormSubmit} layout="vertical">
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
                label="Product Name"
                rules={[
                  { required: true, message: "Please enter product name" },
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
                label="Price"
                rules={[
                  { required: true, message: "Please enter price" },
                  {
                    validator: (_, value) => {
                      if (value < 1) {
                        return Promise.reject(
                          new Error("Product Price can't be less than 1!")
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
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  marginTop: "16px",
                  backgroundColor: "rgb(180,0,0)",
                  borderColor: "rgb(180,0,0)",
                }}
              >
                Submit
              </Button>
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
        {/* <button onClick={handleApprove}>Duyệt sản phẩm</button> */}
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{
            marginTop: "16px",
            backgroundColor: "rgb(0, 130, 11)",
            borderColor: "rgb(0, 20, 2)",
          }}
          onClick={() => {
            if (!selectedProduct?.id) {
              console.error("❌ Không có ID sản phẩm để duyệt!");
              alert("Không thể duyệt vì thiếu ID sản phẩm.");
              return;
            }
            console.log("Nút Duyệt SP đã được bấm với ID:", selectedProduct.id);
            handleApproveRejectProduct(selectedProduct.id);
          }}
        >
          Duyệt SP
        </Button>
        <Button
          type="primary"
          loading={loading}
          style={{
            marginTop: "16px",
            marginLeft: "10px",
            backgroundColor: "rgb(180, 0, 0)",
            borderColor: "rgb(180, 0, 0)",
          }}
          onClick={() => {
            if (!selectedProduct?.id) {
              console.error("❌ Không có ID sản phẩm để từ chối!");
              alert("Không thể từ chối vì thiếu ID sản phẩm.");
              return;
            }
            console.log(
              "Nút Từ chối SP đã được bấm với ID:",
              selectedProduct.id
            );
            handleApproveRejectProduct(selectedProduct.id, "reject");
          }}
        >
          Từ chối SP
        </Button>
      </Modal>
    </div>
  );
}
