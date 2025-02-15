import React from "react";

const Banner = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        backgroundImage: "url('/path/to/image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "60%",
          transform: "translate(-50%, -50%)",
          color: "white",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#FFD700" }}>
          CỨU HỘ GIAO THÔNG KHẨN CẤP 24/24
        </h2>
        <p style={{ fontSize: "16px", fontWeight: "bold" }}>
          Luôn đồng hành cùng bạn mọi lúc mọi nơi
        </p>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            ✅{" "}
            <span style={{ marginLeft: "8px" }}>
              An toàn - Uy tín - Nhanh chóng - Tiện lợi
            </span>
          </li>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            ✅{" "}
            <span style={{ marginLeft: "8px" }}>
              Giá thành hợp lý, minh bạch
            </span>
          </li>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            ✅ <span style={{ marginLeft: "8px" }}>Luôn hoạt động 24/7</span>
          </li>
        </ul>

        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          LIÊN HỆ NGAY
        </button>
      </div>
    </div>
  );
};

export default Banner;
