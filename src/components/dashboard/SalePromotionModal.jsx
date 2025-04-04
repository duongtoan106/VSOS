import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Checkbox,
  DatePicker,
  InputNumber,
  message,
} from "antd";
import { createSalePromotion, fetchProducts } from "../../constant/api";

const SalePromotionModal = ({ visible, onClose, onCreate }) => {
  const [products, setProducts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Lỗi khi lấy sản phẩm:", error);
        message.error("Không thể tải danh sách sản phẩm.");
      });
  }, []);

  // import { createSalePromotion } from './api'; // Import hàm createSalePromotion từ api.js

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (selectedProductIds.length === 0) {
        message.error("Vui lòng chọn ít nhất một sản phẩm!");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Bạn chưa đăng nhập hoặc token không hợp lệ.");
        setLoading(false);
        return;
      }

      const createdBy = localStorage.getItem("userName") || "Unknown";

      const selectedProductsData = selectedProductIds
        .map((productId) => {
          const product = products.find((p) => p.id === productId);
          return product
            ? {
                id: product.id,
                image: product.image || "string",
                name: product.name || "string",
                description: product.description || "string",
                price: parseFloat(product.price) || 0,
                createdBy,
                quantity: product.quantity || 0,
                status: true,
                pending: true,
              }
            : null;
        })
        .filter(Boolean);

      // Xử lý giá trị giảm giá
      const discountPercentage = values.discountPercentage || 0;
      const discountAmount = values.discountAmount || 0;

      if (discountPercentage > 0) {
        values.discountAmount = 0;
      } else if (discountAmount > 0) {
        values.discountPercentage = 0;
      }

      const payload = {
        id: 0,
        name: values.name,
        discountPercentage: values.discountPercentage,
        discountAmount: values.discountAmount,
        createdAt: values.startAt
          ? values.startAt.toISOString()
          : new Date().toISOString(),
        endAt: values.endAt
          ? values.endAt.toISOString()
          : new Date().toISOString(),
        status: true,
        pending: true,
        products: selectedProductsData,
      };

      console.log("Gửi payload:", JSON.stringify(payload, null, 2));
      console.log("Role từ localStorage:", localStorage.getItem("role"));

      // Sử dụng hàm createSalePromotion đã import từ api.js
      const response = await createSalePromotion(payload);

      if (response) {
        message.success("Tạo khuyến mãi thành công!");
        form.resetFields();
        setSelectedProductIds([]);
        onCreate();
        onClose();
      }
    } catch (error) {
      console.error("Lỗi khi gửi:", error);
      message.error("Xác thực thất bại hoặc lỗi yêu cầu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Tạo Khuyến Mãi Bán Hàng"
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Tên khuyến mãi"
          rules={[{ required: true, message: "Vui lòng nhập tên khuyến mãi" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="discountPercentage" label="Phần trăm giảm giá">
          <InputNumber min={0} max={100} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="discountAmount" label="Số tiền giảm giá">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="startAt"
          label="Ngày bắt đầu"
          rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
        >
          <DatePicker style={{ width: "100%" }} showTime />
        </Form.Item>

        <Form.Item
          name="endAt"
          label="Ngày kết thúc"
          rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
        >
          <DatePicker style={{ width: "100%" }} showTime />
        </Form.Item>

        <Form.Item label="Chọn sản phẩm">
          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              border: "1px solid #ddd",
              padding: "8px",
            }}
          >
            <Checkbox.Group
              value={selectedProductIds}
              onChange={(checkedValues) => setSelectedProductIds(checkedValues)}
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              {products.map((product) => (
                <Checkbox key={product.id} value={product.id}>
                  {product.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo Khuyến Mãi
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SalePromotionModal;
