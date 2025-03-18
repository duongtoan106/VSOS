import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Modal, List } from "antd";
import { Box, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import SalePromotionModal from "./SalePromotionModal"; // Import modal

const API_URL = "https://quick-tish-fpt123-e6533ba7.koyeb.app";

const SalePromotionList = () => {
  const [promotions, setPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false); // Thêm state này

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/sale-promotion`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch promotions");
      }

      const data = await response.json();
      setPromotions(data);
      setFilteredPromotions(data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  const handleFilter = () => {
    const filtered = promotions.filter((promo) => {
      const promoStart = dayjs(promo.createdAt);
      const promoEnd = dayjs(promo.endAt);

      const isAfterStart = startDate ? promoStart.isAfter(startDate) : true;
      const isBeforeEnd = endDate ? promoEnd.isBefore(endDate) : true;

      return isAfterStart && isBeforeEnd;
    });

    setFilteredPromotions(filtered);
  };

  const handleViewProducts = (products) => {
    setSelectedProducts(products);
    setIsModalOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ padding: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#1890ff",
            marginBottom: 3,
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}
        >
          Sale Promotion List
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={setEndDate}
            />
            <Button type="primary" onClick={handleFilter}>
              Apply Filter
            </Button>
          </Box>
          <Button type="primary" onClick={() => setIsSaleModalOpen(true)}>
            Create Promotion
          </Button>
        </Box>

        <Table
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Discount %",
              dataIndex: "discountPercentage",
              key: "discountPercentage",
              render: (text) => <Tag color="green">{text}%</Tag>,
            },
            {
              title: "Discount Amount",
              dataIndex: "discountAmount",
              key: "discountAmount",
              render: (text) => <Tag color="blue">{text} VND</Tag>,
            },
            {
              title: "Start Date",
              dataIndex: "createdAt",
              key: "createdAt",
              render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
              title: "End Date",
              dataIndex: "endAt",
              key: "endAt",
              render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (status) =>
                status ? (
                  <Tag color="green">Active</Tag>
                ) : (
                  <Tag color="red">Expired</Tag>
                ),
            },
            {
              title: "Products",
              dataIndex: "products",
              key: "products",
              render: (products) => (
                <Button
                  type="primary"
                  onClick={() => handleViewProducts(products)}
                  disabled={products.length === 0}
                >
                  View Products
                </Button>
              ),
            },
          ]}
          dataSource={filteredPromotions}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />

        {/* Modal xem sản phẩm */}
        <Modal
          title="Product List"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          {selectedProducts.length > 0 ? (
            <List
              bordered
              dataSource={selectedProducts}
              renderItem={(item) => <List.Item>{item.name}</List.Item>}
            />
          ) : (
            <p>No products available</p>
          )}
        </Modal>

        {/* Gọi SalePromotionModal */}
        {isSaleModalOpen && (
          <SalePromotionModal
            visible={isSaleModalOpen}
            onClose={() => setIsSaleModalOpen(false)}
            onCreate={() => {
              fetchPromotions(); // Refresh danh sách sau khi tạo
              setIsSaleModalOpen(false);
            }}
          />
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default SalePromotionList;
