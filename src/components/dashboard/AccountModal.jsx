import React, { useState, useEffect } from "react";
import { Modal, Spin, Alert } from "antd";

export default function AccountModal({ id, open, onClose }) {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Khi modal mở và có ID, gọi API
  useEffect(() => {
    console.log("Modal open:", open, "ID received:", id);
    if (open && id) {
      fetchAccountDetails(id);
    }
  }, [open, id]);

  const fetchAccountDetails = async (id) => {
    if (!id) {
      console.error("Error: ID is undefined!");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("Fetching account details for ID:", id);

      const token = localStorage.getItem("token");

      const response = await fetch(`${id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      setAccount(data);
    } catch (error) {
      console.error("Error fetching account details:", error);
      setError("Failed to fetch account details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<span style={titleStyle}>Account Information</span>}
      open={open}
      onCancel={onClose}
      footer={[
        <button
          key="close"
          onClick={onClose}
          style={{
            backgroundColor: "rgb(180, 0, 0)",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Close
        </button>,
      ]}
    >
      {loading ? (
        <Spin />
      ) : error ? (
        <Alert message={error} type="error" />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InfoRow label="ID" value={account?.id} />
          <InfoRow label="Username" value={account?.username} />
          <InfoRow label="Email" value={account?.email} />
          <InfoRow label="User Type" value={account?.role} />
          {/* <InfoRow
            label="Status"
            value={
              account?.status ? (
                <span style={{ color: "green" }}>Active</span>
              ) : (
                <span style={{ color: "red" }}>{account?.userStatus}</span>
              )
            }
          /> */}
          <InfoRow label="Phone" value={account?.phone} />
          <InfoRow label="Address" value={account?.userAddress} />
        </div>
      )}
    </Modal>
  );
}

// Component để hiển thị từng dòng thông tin
const InfoRow = ({ label, value }) => (
  <div style={infoRowStyle}>
    <span style={labelStyle}>
      <strong>{label}:</strong>
    </span>
    <span style={valueStyle}>{value || "N/A"}</span>
  </div>
);

// Styles
const titleStyle = {
  fontSize: "24px",
  color: "rgb(0, 102, 204)",
  fontWeight: "bold",
  textAlign: "center",
};

const infoRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #ddd",
  padding: "8px 0",
};

const labelStyle = { color: "rgb(180, 0, 0)", fontWeight: "bold" };
const valueStyle = { color: "#333" };
