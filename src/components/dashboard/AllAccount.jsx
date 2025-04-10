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
import { fetchCustomers } from "../../constant/api";

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

  // Handle deleting a customer account
  //   const handleDeleteCustomer = async (id) => {
  //     const confirmDelete = window.confirm(
  //       "Are you sure you want to delete this customer?"
  //     );
  //     if (!confirmDelete) return;

  //     try {
  //       await api.delete(`/api/user/delete/${id}`, {
  //         headers: { accept: "application/json" },
  //       });
  //       setCustomers(customers.filter((customer) => customer.userId !== id));
  //       message.success("Customer deleted successfully!");
  //     } catch (error) {
  //       console.error("Error deleting customer:", error);
  //       message.error("Failed to delete customer. Please try again.");
  //     }
  //   };

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
            {customers.map((customer) => (
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
                <TableCell style={{ width: "20%" }} align="left">
                  {customer.role}
                </TableCell>
                <TableCell style={{ width: "10%" }} align="center">
                  <Button
                    style={{ color: "rgb(180,0,0)", marginRight: "8px" }}
                    onClick={() => handleViewClick(customer.id)}
                  >
                    Chi tiết
                  </Button>
                  {/* <DeleteUser
                    customerId={customer.userId}
                    onDelete={handleDeleteCustomer}
                  /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
