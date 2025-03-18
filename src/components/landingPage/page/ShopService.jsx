import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Fuchs from "../../../assets/img/nhotFUCHS.webp";
import liquiNhot from "../../../assets/img/liquiNhot.webp";
import nhongSenDiaDID from "../../../assets/img/NhongSenDia.jpg";
import duongSenLiqui from "../../../assets/img/duongSenLiqui.webp";

const services = [
  {
    title: "Dầu nhớt Fuchs",
    description:
      "Dầu nhớt Fuchs chính hãng giúp bảo vệ động cơ, giảm ma sát và tăng hiệu suất vận hành tối ưu.",
    image: Fuchs,
    price: "250,000 VND",
  },
  {
    title: "Dầu nhớt Liqui Moly",
    description:
      "Dầu nhớt Liqui Moly nhập khẩu từ Đức, cung cấp khả năng bôi trơn vượt trội, bảo vệ động cơ bền bỉ.",
    image: liquiNhot,
    price: "280,000 VND",
  },
  {
    title: "Nhông sên đĩa DID",
    description:
      "Nhông sên đĩa DID cao cấp, độ bền cao, giúp truyền động mượt mà và gia tăng tuổi thọ xe.",
    image: nhongSenDiaDID,
    price: "350,000 VND",
  },
  {
    title: "Dưỡng sên Liqui Moly",
    description:
      "Dưỡng sên Liqui Moly giúp bảo vệ, chống mài mòn và bôi trơn sên xe hiệu quả.",
    image: duongSenLiqui,
    price: "150,000 VND",
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

const ShopService = () => {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>SẢN PHẨM NỔI BẬT</h2>
      <Slider {...settings}>
        {services.map((service, index) => (
          <div key={index} style={styles.slideItem}>
            <div
              style={{
                ...styles.card,
                ...(hoverIndex === index ? styles.cardHover : {}),
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
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
                <p style={styles.price}>{service.price}</p>
                <button
                  style={styles.buyButton}
                  onClick={() => alert(`Mua ${service.title}`)}
                >
                  Mua ngay
                </button>
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
    margin: " 0",
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
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)", // Đổ bóng khi hover
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "contain",
    display: "block",
    backgroundColor: "white",
    borderRadius: "15px",
  },
  textContainer: { padding: "15px", flex: 1 },
  title: { color: "rgb(180,0,0)", fontSize: "1.3rem", fontWeight: "bold" },
  description: {
    fontSize: "0.95rem",
    color: "#555",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "4.5em",
  },
  price: {
    fontSize: "1.1rem",
    color: "green",
    marginBottom: "10px",
  },
  buyButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "rgb(180,0,0)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buyButtonHover: {
    backgroundColor: "rgb(140,0,0)",
  },
};

export default ShopService;
