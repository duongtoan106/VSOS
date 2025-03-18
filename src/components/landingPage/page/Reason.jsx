import { motion } from "framer-motion";

export default function Reason() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "black" }}>
        LÝ DO NÊN SỬ DỤNG DỊCH VỤ VSOS
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // Luôn hiển thị 3 thẻ mỗi hàng
          gap: "40px", // Khoảng cách giữa các thẻ
          maxWidth: "1200px", // Giới hạn độ rộng để trông cân đối
          justifyContent: "center", // Căn giữa nội dung
        }}
      >
        {[
          { title: "24/7", desc: "Hỗ trợ câu hỏi khách cấp mọi lúc" },
          {
            title: "UY TÍN - ĐÚNG GIỜ",
            desc: "Đảm bảo luôn đúng giờ và chuẩn theo yêu cầu khách hàng",
          },
          {
            title: "GIÁ MINH BẠCH",
            desc: "Giá cả luôn được minh bạch, rõ ràng",
          },
          {
            title: "ĐỊNH VỊ CHÍNH XÁC",
            desc: "Giúp tìm vị trí của người cần hỗ trợ nhanh nhất",
          },
          {
            title: "TIẾT KIỆM THỜI GIAN & CÔNG SỨC",
            desc: "Thay vì đi kiếm đơn hàng chưa ổn định, giờ chỉ cần ổn định và đều đặn",
          },
          {
            title: "TIỆN ÍCH & LINH HOẠT",
            desc: "Có thể sử dụng mọi lúc, mọi nơi",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(173, 216, 230, 0.8)",
            }} // Hover hiệu ứng sáng hơn
            style={{
              padding: "30px",
              textAlign: "center",
              background: "rgba(173, 216, 230, 0.5)",
              borderRadius: "12px",
              boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              minHeight: "150px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                marginBottom: "10px",
                fontSize: "1.5rem",
                color: "rgb(180, 0, 0)",
              }}
            >
              {item.title}
            </h3>
            <p style={{ fontSize: "1.2rem", color: "#333" }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
