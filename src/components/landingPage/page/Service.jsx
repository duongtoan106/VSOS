import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import xemay from "../../../assets/img/xemay.jpg";
import oto from "../../../assets/img/dienbinh.jpg";
import caukeo from "../../../assets/img/caukeo.jpg";
import xetai from "../../../assets/img/xetai.jpg";

const services = [
  {
    title: "Cứu hộ xe máy",
    description:
      "Dịch vụ cứu hộ xe máy khẩn cấp của chúng tôi xử lý nhanh các sự cố như hư hỏng, hết xăng hay tai nạn, giúp bạn tiếp tục hành trình an toàn với sự hỗ trợ kịp thời từ đội ngũ chuyên nghiệp.",
    image: xemay,
  },
  {
    title: "Cứu hộ xe ô tô",
    description:
      "Dịch vụ cứu hộ ô tô khẩn cấp của chúng tôi giúp bạn xử lý nhanh chóng sự cố trên đường, từ hỏng xe đến tai nạn, đảm bảo bạn tiếp tục hành trình an toàn.",
    image: oto,
  },
  {
    title: "Cẩu - kéo xe",
    description:
      "Dịch vụ cẩu kéo xe của chúng tôi giúp di chuyển xe gặp sự cố đến nơi an toàn, nhanh chóng và hiệu quả.",
    image: caukeo,
  },
  {
    title: "Cứu hộ xe tải",
    description:
      "Dịch vụ cứu hộ xe tải khẩn cấp của chúng tôi hỗ trợ xử lý sự cố nhanh chóng, giúp xe tải tiếp tục hành trình an toàn.",
    image: xetai,
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

const RescueServices = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>HỖ TRỢ KHẨN CẤP 24/7</h2>
      <Slider {...settings}>
        {services.map((service, index) => (
          <div key={index} style={styles.slideItem}>
            <div style={styles.card}>
              <img
                src={service.image}
                alt={service.title}
                style={styles.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/no-image.png";
                }}
              />
              <div style={styles.textContainer}>
                <h3 style={styles.title}>{service.title}</h3>
                <p style={styles.description}>{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const styles = {
  container: {
    padding: "50px",
    textAlign: "center",
    background: "linear-gradient(to top, rgb(180,0,0), #ffcccc)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: { fontSize: "2rem", marginBottom: "20px", color: "white" },
  slideItem: { padding: "15px" },
  card: {
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
    overflow: "hidden",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    padding: "15px",
    margin: "15px",
    height: "400px", // Chiều cao cố định cho card
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
  },
  textContainer: { padding: "15px", flex: 1 },
  title: { color: "rgb(180,0,0)", fontSize: "1.3rem", fontWeight: "bold" },
  description: {
    fontSize: "0.95rem",
    color: "#555",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3, // Giới hạn tối đa 3 dòng
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "4.5em", // Điều chỉnh chiều cao theo số dòng
  },
};

export default RescueServices;
