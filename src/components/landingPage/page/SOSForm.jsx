import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultPosition = [21.0285, 105.8542]; // Hà Nội (hoặc vị trí mặc định bạn muốn)

export default function SOSForm() {
  const [position, setPosition] = useState(defaultPosition);
  const [address, setAddress] = useState(""); // Lưu địa chỉ

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);

        // Gọi API để lấy địa chỉ từ tọa độ
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        )
          .then((res) => res.json())
          .then((data) => {
            setAddress(data.display_name || "Không tìm thấy địa chỉ");
          })
          .catch(() => setAddress("Lỗi khi lấy địa chỉ"));
      },
    });

    return (
      <Marker
        position={position}
        icon={L.icon({
          iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "black" }}>
        LIÊN HỆ VỚI CHÚNG TÔI
      </h2>
      <div
        style={{
          display: "flex",
          width: "80%",
          height: "80%",
          backgroundColor: "#ddd",
          padding: "20px",
          borderRadius: "10px",
          gap: "20px",
        }}
      >
        {/* Form Input */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <input type="text" placeholder="Họ tên" style={inputStyle} />
          <input type="text" placeholder="Số điện thoại" style={inputStyle} />
          <input
            type="text"
            placeholder="Địa chỉ"
            value={address}
            readOnly
            style={inputStyle}
          />
          <input type="email" placeholder="Email" style={inputStyle} />
          <textarea
            placeholder="Lời nhắn"
            style={{ ...inputStyle, height: "80px" }}
          />
          <button style={buttonStyle}>GỬI ĐI</button>
        </div>

        {/* Bản đồ */}
        <div
          style={{
            flex: 1,
            height: "300px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <MapContainer
            center={position}
            zoom={13}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  backgroundColor: "red",
  color: "white",
  padding: "10px",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "20%",
};
