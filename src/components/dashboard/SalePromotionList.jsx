import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { fetchSalePromotions, createSalePromotion } from "../../constant/api";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const SalePromotionList = () => {
  const [salePromotions, setSalePromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    discountPercentage: "",
    discountAmount: "",
    createdAt: new Date().toISOString(),
    endAt: "",
    status: true,
    pending: true,
  });

  useEffect(() => {
    getSalePromotions();
  }, []);

  const getSalePromotions = async () => {
    try {
      setLoading(true);
      const data = await fetchSalePromotions();
      setSalePromotions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createSalePromotion(formData);
      alert("Sale Promotion Created Successfully!");
      setOpen(false);
      getSalePromotions(); // Refresh danh sách sau khi tạo
      setFormData({
        discountPercentage: "",
        discountAmount: "",
        createdAt: new Date().toISOString(),
        endAt: "",
        status: true,
        pending: true,
      });
    } catch (error) {
      alert("Failed to create sale promotion");
    }
  };

  if (loading) return <p>Loading promotions...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ marginBottom: "10px" }}
      >
        Create Sale Promotion
      </Button>

      <TableContainer component={Paper}>
        <Table aria-label="sale promotion table">
          <TableHead>
            <TableRow>
              {[
                "ID",
                "Discount %",
                "Discount Amount",
                "Created At",
                "End At",
                "Status",
                "Pending",
                "Action",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  style={{ fontWeight: "bold", color: "rgb(180,0,0)" }}
                  align="center"
                >
                  {header.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {salePromotions.map((promotion) => (
              <TableRow key={promotion.id}>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {promotion.id}
                </TableCell>
                <TableCell align="center">
                  {promotion.discountPercentage}%
                </TableCell>
                <TableCell align="center">
                  ${promotion.discountAmount}
                </TableCell>
                <TableCell align="center">
                  {new Date(promotion.createdAt).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  {new Date(promotion.endAt).toLocaleString()}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {promotion.status ? (
                    <span style={{ color: "green" }}>🟢 Active</span>
                  ) : (
                    <span style={{ color: "gray" }}>🚫 Inactive</span>
                  )}
                </TableCell>
                <TableCell align="center">
                  {promotion.pending ? (
                    <span style={{ color: "orange" }}>🕒 Pending</span>
                  ) : (
                    "No"
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    style={{ color: "rgb(180,0,0)" }}
                    onClick={() =>
                      alert(`View details of promotion ID: ${promotion.id}`)
                    }
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Create Sale Promotion */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Sale Promotion</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Discount Percentage"
            name="discountPercentage"
            type="number"
            fullWidth
            value={formData.discountPercentage}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Discount Amount"
            name="discountAmount"
            type="number"
            fullWidth
            value={formData.discountAmount}
            onChange={handleChange}
          />
          <TextField
            label="End At"
            name="endAt"
            type="datetime-local"
            fullWidth
            value={formData.endAt}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SalePromotionList;
