import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function WelcomePanel() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (inView) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        textAlign: "left",
        color: "white",
        paddingRight: "0",
        overflow: "hidden", // Chặn tràn màn hình
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw", // Sửa width thành 100%
          height: "100%",
          backgroundImage: `url('https://cuuhogiaothong567.com/wp-content/uploads/2022/07/cuu-ho-118.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.6)",
        }}
      ></div>

      {/* Lớp phủ màu xanh tối bên phải */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "70%",
          height: "100%",
          background:
            "linear-gradient(to left, rgba(0, 0, 139, 0.9), rgba(0, 0, 139, 0.5), rgba(0, 0, 139, 0))",
        }}
      ></div>

      {/* Nội dung chữ */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          width: "50%",
          padding: "20px",
        }}
        initial={{ opacity: 0, x: 100 }}
        animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <h2
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#FFD700",
            textShadow: "3px 3px 5px rgba(0,0,0,0.8)",
            marginBottom: "20px",
          }}
        >
          🚗 CỨU HỘ GIAO THÔNG KHẨN CẤP 24/24 🚗
        </h2>
        <p
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
            marginBottom: "30px",
          }}
        >
          Luôn đồng hành cùng bạn mọi lúc mọi nơi
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            fontSize: "2vw",
            fontWeight: "bold",
            lineHeight: "1.6",
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}
        >
          <li>✅ An toàn - Uy tín - Nhanh chóng - Tiện lợi</li>
          <li>✅ Giá thành hợp lý, minh bạch</li>
          <li>✅ Luôn hoạt động 24/7</li>
        </ul>

        <motion.button
          style={{
            marginTop: "40px",
            padding: "20px 50px",
            backgroundColor: "#ff0000",
            color: "white",
            fontSize: "2vw",
            fontWeight: "bold",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.5)",
            cursor: "pointer",
            transition: "0.3s",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          📞 LIÊN HỆ NGAY
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
