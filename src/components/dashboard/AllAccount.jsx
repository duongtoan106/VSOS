import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button, message, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import AccountModal from "./AccountModal";
import { deleteCustomerById, fetchCustomers } from "../../constant/api";

// // import api from "../../config/axios";
// import DeleteUser from "./DeleteUser";
// import AccountModal from "./AccountModal";

export default function AllAccount() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  // const [isRequestAccountModalVisible, setIsRequestAccountModalVisible] =
  //   useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const totalPages = Math.ceil(customers.length / customersPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fetch customer data from API

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
        console.log(data);
      } catch (error) {
        message.error("Failed to fetch accounts. Please try again.");
      }
    };

    getCustomers();
  }, []);

  // Handle viewing a customer account
  const handleViewClick = (id) => {
    console.log("Selected userId:", id); // Kiểm tra ID có đúng không
    setSelectedCustomerId(id);
    setIsViewModalVisible(true);
  };

  const handleViewModalClose = () => {
    setIsViewModalVisible(false);
    setSelectedCustomerId(null);
  };

  const handleDeleteCustomer = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa người dùng này?"
    );
    if (!confirmDelete) return;

    try {
      await deleteCustomerById(id); // Gọi API xóa

      // ✅ Cập nhật lại danh sách ngay trong state
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.id !== id)
      );

      message.success("Xóa người dùng thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      message.error("Xóa người dùng thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div>
      {/* Table to display all accounts */}
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  width: "5%",
                  fontWeight: "bold",
                  color: "rgb(180,0,0)",
                }}
                align="center"
              >
                ID
              </TableCell>
              <TableCell
                style={{
                  width: "20%",
                  fontWeight: "bold",
                  color: "rgb(180,0,0)",
                }}
                align="left"
              >
                Tên Người dùng
              </TableCell>
              <TableCell
                style={{
                  width: "20%",
                  fontWeight: "bold",
                  color: "rgb(180,0,0)",
                }}
                align="left"
              >
                Số điện thoại{" "}
              </TableCell>
              <TableCell
                style={{
                  width: "25%",
                  fontWeight: "bold",
                  color: "rgb(180,0,0)",
                }}
                align="left"
              >
                Email
              </TableCell>
              <TableCell
                style={{
                  width: "20%",
                  fontWeight: "bold",
                  color: "rgb(180,0,0)",
                }}
                align="left"
              >
                Vai trò
              </TableCell>
              <TableCell
                style={{
                  width: "10%",
                  fontWeight: "bold",
                  color: "rgb(180,0,0)",
                }}
                align="center"
              >
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentCustomers.map((customer) => (
              <TableRow key={customer.userId}>
                <TableCell style={{ width: "5%" }} align="center">
                  {customer.id}
                </TableCell>
                <TableCell style={{ width: "20%" }} align="left">
                  {customer.username}
                </TableCell>
                <TableCell style={{ width: "20%" }} align="left">
                  {customer.phone}
                </TableCell>
                <TableCell style={{ width: "25%" }} align="left">
                  {customer.email}
                </TableCell>
                <TableCell style={{ width: "10%" }} align="left">
                  {customer.role}
                </TableCell>
                <TableCell style={{ width: "20%" }} align="center">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <Button
                      style={{ color: "rgb(180,0,0)" }}
                      onClick={() => handleViewClick(customer.id)}
                    >
                      Chi tiết
                    </Button>
                    <Button
                      style={{ color: "rgb(255,0,0)" }}
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            type={currentPage === index + 1 ? "primary" : "default"}
            style={{ margin: "0 4px" }}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      {/* View Account Modal */}
      {selectedCustomerId && (
        <AccountModal
          id={selectedCustomerId}
          open={isViewModalVisible} // Đổi `visible` thành `open`
          onClose={handleViewModalClose}
        />
      )}
    </div>
  );
}
