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
import { fetchProducts } from "../../constant/api";

const SalePromotionModal = ({ visible, onClose, onCreate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Fetch danh sách sản phẩm từ API
  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  // Gửi dữ liệu lên API
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxChange = (checkedValues) => {
    setSelectedProducts(checkedValues);
  };
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const selectedProducts = products.filter((product) =>
        values.products.includes(product.id)
      );

      const response = await fetch("/api/sale-promotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          startAt: values.startAt.toISOString(),
          endAt: values.endAt.toISOString(),
          products: selectedProducts, // Gửi nguyên vẹn thông tin sản phẩm
        }),
      });

      if (response.ok) {
        message.success("Sale promotion created successfully!");
        form.resetFields();
        onCreate();
      } else {
        message.error("Failed to create sale promotion.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      message.error("Validation failed or request error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Create Sale Promotion"
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Promotion Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="discountPercentage"
          label="Discount Percentage"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} max={100} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="startAt"
          label="Start Date"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} showTime />
        </Form.Item>

        <Form.Item name="endAt" label="End Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} showTime />
        </Form.Item>

        <Form.Item
          name="products"
          label="Select Products"
          rules={[{ required: true }]}
        >
          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              border: "1px solid #ddd",
              padding: "8px",
            }}
          >
            <Checkbox.Group
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              onChange={handleCheckboxChange}
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
            Create Promotion
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SalePromotionModal;
