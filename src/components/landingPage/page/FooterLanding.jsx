import React from "react";

export default function FooterLanding() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Cột 1: Thông tin liên hệ */}
        <div style={styles.leftColumn}>
          <h3 style={styles.title}>VSOS - CỨU HỘ KHẨN CẤP</h3>
          <div style={styles.whiteLine}></div> {/* Dòng trắng */}
          <p style={styles.item}>
            📞 <strong>Hotline:</strong> 0327 730 336
          </p>
          <p style={styles.item}>
            ✉️ <strong>Email:</strong> VSOSCompany@gmail.com
          </p>
          {/* <p style={styles.item}>🌍 www.VSOScompany24/24.com.vn</p> */}
          <div style={styles.socialIcons}>
            <a
              href="https://www.facebook.com/profile.php?id=61571697193047"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.icon}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                style={{ width: "30px", height: "30px" }}
              />
            </a>
            <a
              href="https://www.tiktok.com/@vsos_2025?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.icon}
            >
              <img
                src="https://pngimg.com/d/tiktok_PNG2.png"
                alt="TikTok"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
            </a>
          </div>
        </div>

        {/* Dòng kẻ giữa */}
        <div style={styles.divider}></div>

        {/* Cột 2 + 3: Chính sách & Liên kết */}
        <div style={styles.rightColumn}>
          <div style={styles.policyColumn}>
            <h3 style={styles.title}>CHÍNH SÁCH</h3>
            <div style={styles.whiteLine}></div> {/* Dòng trắng */}
            <ul style={styles.list}>
              <li>Cung cấp dịch vụ chất lượng</li>
              <li>Chính sách bảo mật thông tin</li>
              <li>An toàn và tiện lợi</li>
              <li>Hỗ trợ 24/7</li>
              <li>Cộng đồng hỗ trợ tình nguyện</li>
              <li>Chăm sóc khách hàng</li>
            </ul>
          </div>

          <div style={styles.linkColumn}>
            <h3 style={styles.title}>LIÊN KẾT</h3>
            <div style={styles.whiteLine}></div> {/* Dòng trắng */}
            <ul style={styles.list}>
              <li>
                <a
                  href="/"
                  style={{
                    textDecoration: "none", // Không có gạch chân
                    color: "inherit", // Giữ nguyên màu chữ mặc định
                    userSelect: "none", // Không cho phép bôi đen chữ
                  }}
                >
                  Trang chủ
                </a>
              </li>

              <li>
                <a
                  href="/landingPage"
                  style={{
                    textDecoration: "none", // Không có gạch chân
                    color: "inherit", // Giữ nguyên màu chữ mặc định
                    userSelect: "none", // Không cho phép bôi đen chữ
                  }}
                >
                  Giới thiệu
                </a>
              </li>
              <li>Dịch vụ</li>
              <li>Định vị GPS và cứu trợ</li>
              <li>Hình thức thanh toán</li>
              <li>Hỗ trợ khách hàng</li>
              <li>Mua bán linh kiện xe</li>
              <li>Đối tác liên kết</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

// CSS inline styles
const styles = {
  footer: {
    backgroundColor: "rgb(180, 0, 0)",
    color: "white",
    padding: "0px 20px",
    textAlign: "left",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  leftColumn: {
    width: "40%",
    padding: "0 20px",
  },
  divider: {
    width: "1px",
    backgroundColor: "white",
    height: "100%",
    alignSelf: "stretch",
  },
  rightColumn: {
    display: "flex",
    justifyContent: "space-between",
    width: "55%",
  },
  policyColumn: {
    width: "50%",
  },
  linkColumn: {
    width: "50%",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "10px",
    textTransform: "uppercase",
  },
  whiteLine: {
    width: "100%",
    height: "2px",
    backgroundColor: "white",
    margin: "10px 0",
  },
  item: {
    fontSize: "0.95rem",
    marginBottom: "5px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    fontSize: "0.9rem",
    lineHeight: "1.5",
  },
  socialIcons: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  icon: {
    fontSize: "1.5rem",
    color: "white",
    textDecoration: "none",
  },
};
