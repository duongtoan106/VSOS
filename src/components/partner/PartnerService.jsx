import React from "react";
import { Button, Card, Typography, Space } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

const benefits = [
  "Tăng thu nhập bền vững",
  "Tiếp cận lượng khách hàng ổn định 24/7",
  "Không mất phí quảng cáo",
  "Nâng tầm thương hiệu sửa xe của bạn",
  "Đồng hành cùng nền tảng VSOS uy tín",
];

export default function PartnerService() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e0f2ff, white)",
        padding: "48px 24px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title level={1} style={{ color: "#1e3a8a" }}>
            Trở thành đối tác sửa xe cùng VSOS
          </Title>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Paragraph
            style={{ fontSize: "16px", color: "#4b5563", marginBottom: 16 }}
          >
            Bạn có muốn trở thành đối tác của <strong>VSOS</strong>, tăng thu
            nhập, tăng khách hàng, đồng hành cùng chúng tôi để có lượng khách
            24/7?
          </Paragraph>
          <Paragraph
            style={{
              fontSize: "16px",
              color: "#1e40af",
              fontWeight: 500,
              marginBottom: 40,
            }}
          >
            Tính năng đang phát triển - hãy đăng ký sớm cùng chúng tôi để có thể
            trở thành đối tác đáng tin cậy và tăng thu nhập ổn định nhé!
          </Paragraph>
        </motion.div>

        <motion.div
          className="benefits"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Space
            direction="vertical"
            size="large"
            style={{ display: "flex", marginBottom: 40 }}
          >
            {benefits.map((benefit, index) => (
              <Card key={index} bordered={true} style={{ textAlign: "left" }}>
                <CheckCircleOutlined
                  style={{ color: "green", marginRight: 12 }}
                />
                <span style={{ fontWeight: 500 }}>{benefit}</span>
              </Card>
            ))}
          </Space>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button type="primary" size="large" shape="round">
            Đăng ký trở thành đối tác ngay
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
