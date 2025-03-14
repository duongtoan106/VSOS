import React, { useRef } from "react";
import { motion, useInView } from "framer-motion"; // Import useInView
import logo from "../../../assets/logo-khongchu-color-01-01.svg"; // Import logo

export default function WelcomeVSOS() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 }); // Kích hoạt khi 30% phần tử xuất hiện

  return (
    <div
      ref={ref} // Gán ref để theo dõi phần tử này
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Logo + Slogan với hiệu ứng xuất hiện từ trái qua */}
      {/* Slogan */}
      <motion.a href="/">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "20px",
            left: "30px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {/* Logo */}
          <motion.img
            src={logo}
            alt="VSOS Logo"
            style={{
              width: "150px",
              height: "auto",
            }}
            whileHover={{ scale: 1.1 }} // Hiệu ứng phóng to nhẹ khi hover
          />

          <motion.div
            style={{
              fontSize: "1.5vw",
              fontWeight: "bold",
              color: "rgb(180,0,0)",
            }}
            whileHover={{ scale: 1.05 }} // Phóng to nhẹ khi hover
          >
            Đồng hành mọi nơi, không lo chơi vơi
          </motion.div>
        </motion.div>
      </motion.a>

      {/* Nội dung chính giữa với hiệu ứng xuất hiện từ dưới lên */}
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        style={{
          fontSize: "3.5vw",
          fontWeight: "bold",
          color: "rgb(180,0,0)",
        }}
      >
        Chào mừng bạn đến với{" "}
        <motion.span
          style={{ color: "rgb(180,0,0)" }}
          whileHover={{ scale: 1.1 }} // Hiệu ứng phóng to nhẹ khi hover
        >
          VSOS
        </motion.span>
      </motion.h1>
      <motion.a
        href="/"
        style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          fontSize: "1.2vw",
          fontWeight: "bold",
          color: "rgb(180,0,0)",
          textDecoration: "none",
          padding: "10px 20px",
          border: "2px solid rgb(180,0,0)",
          borderRadius: "8px",
          transition: "0.3s",
        }}
        whileHover={{
          scale: 1.1,
          backgroundColor: "rgb(180,0,0)",
          color: "white",
        }}
      >
        Đến với trang chủ VSOS
      </motion.a>
    </div>
  );
}
