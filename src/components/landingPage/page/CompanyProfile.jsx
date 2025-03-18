import { motion } from "framer-motion";

export default function CompanyProfile() {
  return (
    <motion.div style={styles.container}>
      {/* Văn bản trượt từ trái vào */}
      <motion.div
        style={styles.textContainer}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.2 }} // Kích hoạt lại khi lướt tới
      >
        <h1 style={styles.title}>Công ty VSOS</h1>
        <h2 style={styles.description}>
          Công ty VSOS cung cấp dịch vụ cứu hộ giao thông khẩn cấp 24/7, giúp
          người tham gia giao thông giải quyết nhanh chóng các sự cố như hỏng
          xe, tai nạn, hay các tình huống khẩn cấp khác trên đường. Với đội ngũ
          nhân viên chuyên nghiệp, trang thiết bị hiện đại và khả năng phản ứng
          nhanh chóng, VSOS cam kết mang đến sự an toàn và hỗ trợ kịp thời cho
          khách hàng, giảm thiểu tối đa sự gián đoạn trong hành trình của bạn.
        </h2>
      </motion.div>

      {/* Ảnh trượt từ phải vào */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.2 }} // Kích hoạt lại khi lướt tới
      >
        <img
          src="https://thegioiauto.com.vn/wp-content/uploads/2022/03/cong-ty-the-gioi-auto.jpg"
          alt="Công ty VSOS"
          style={styles.image}
        />
      </motion.div>
    </motion.div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "40px",
    maxWidth: "100%",
    margin: "auto",
    minHeight: "50vh",
  },
  textContainer: {
    flex: 1,
    paddingRight: "20px",
  },
  title: {
    fontSize: "3rem",
    color: "rgb(180,0,0)",
    marginBottom: "10px",
  },
  description: {
    fontSize: "1.2rem",
    lineHeight: "1.5",
    color: "#333",
  },
  image: {
    width: "80%",
    height: "auto",
    borderRadius: "20%", // Bo góc 20%
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)", // Hiệu ứng đổ bóng
  },
};
