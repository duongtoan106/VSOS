import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useForm } from "react-hook-form";
import L from "leaflet";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const UserSOSForm = () => {
  const [position, setPosition] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [sentSignal, setSentSignal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("image", data.image[0]);
    formData.append("lat", position[0]);
    formData.append("lng", position[1]);

    // Gửi đến API ở đây nếu cần
    setSentSignal(true);
    setShowForm(false);
    reset();
  };

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <Box sx={{ padding: 4 }}>
      {/* Banner Quảng Cáo */}
      <Paper
        elevation={3}
        sx={{ padding: 4, marginBottom: 4, backgroundColor: "#fef4f4" }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom color="error">
          🚨 Hệ Thống Cứu Hộ Khẩn Cấp VSOS
        </Typography>
        <Typography variant="body1">
          Gửi tín hiệu cầu cứu chỉ với một cú nhấp chuột! Hệ thống định vị vị
          trí tự động, gửi mô tả tình trạng phương tiện, kèm ảnh và tiếp cận cứu
          hộ gần nhất trong bán kính 5km.
        </Typography>
      </Paper>

      {/* Bản đồ */}
      {position && (
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "400px", borderRadius: "12px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={customIcon} />
          {sentSignal && (
            <Circle
              center={position}
              radius={5000}
              pathOptions={{ color: "red" }}
            />
          )}
        </MapContainer>
      )}

      {/* Nút cầu cứu */}
      <Box mt={4}>
        <Button
          variant="contained"
          color="error"
          onClick={() => setShowForm(true)}
        >
          Gửi Tín Hiệu Cầu Cứu
        </Button>
      </Box>

      {/* Form Sự Cố */}
      {showForm && (
        <Card sx={{ mt: 4, p: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Thông Tin Sự Cố
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mô tả tình hình"
                    multiline
                    rows={4}
                    {...register("description", { required: true })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<PhotoCamera />}
                  >
                    Tải Ảnh
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      {...register("image", { required: true })}
                    />
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Xác Nhận Gửi
                  </Button>
                  <Button onClick={() => setShowForm(false)} sx={{ ml: 2 }}>
                    Huỷ
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default UserSOSForm;
