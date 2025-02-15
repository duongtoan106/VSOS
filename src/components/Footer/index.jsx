import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import Logo from "../../components/Logo";

const FooterSection = ({ title, links, isSocial = false }) => (
  <div>
    <h1 className="text-lg font-semibold pb-4 pt-5 md:pt-0 text-white">
      {title}
    </h1>
    <nav className="flex flex-col gap-2 text-sm font-light text-gray-200">
      {links.map((link, index) => (
        <span
          key={index}
          className="hover:text-[#F5F5DC] transition-all cursor-pointer"
        >
          {link}
        </span>
      ))}
    </nav>
    {isSocial && (
      <div className="flex gap-4 mt-3">
        {[
          { icon: <FaFacebookF size={20} />, color: "hover:bg-blue-600" },
          { icon: <FaYoutube size={22} />, color: "hover:bg-red-600" },
          { icon: <SiZalo size={22} />, color: "hover:bg-blue-500" },
          { icon: <FaInstagram size={22} />, color: "hover:bg-pink-500" },
        ].map((social, index) => (
          <a
            key={index}
            href="#"
            className={`w-10 h-10 flex items-center justify-center bg-gray-400 rounded-full transition-all ${social.color}`}
          >
            {social.icon}
          </a>
        ))}
      </div>
    )}
  </div>
);

const Footer = () => {
  const footerLinks = [
    {
      title: "Liên Kết Nhanh",
      links: [
        "Giới Thiệu",
        "Dịch Vụ Cứu Hộ",
        "Định Vị GPS",
        "Đối Tác Liên Kết",
        "Hỗ Trợ Khách Hàng",
      ],
    },
    {
      title: "Danh Mục",
      links: [
        "Dầu Nhớt & Bảo Dưỡng",
        "Phụ Tùng Thay Thế",
        "Đồ Bảo Hộ & Phụ Kiện",
        "Dụng Cụ Sửa Chữa",
        "Dịch Vụ Cứu Hộ & Định Vị GPS",
      ],
    },
    {
      title: "Liên Hệ",
      links: [
        "Email: support@vsos.com",
        "Hotline: 1900 636 106",
        "Social Media:",
      ],
      isSocial: true,
    },
  ];

  return (
    <div className="bg-[#E53935] text-white rounded-t-3xl mt-8 md:mt-0 font-prata">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        {/* Logo & Description */}
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
            <Logo className="w-16 h-16" />
          </div>
          <h1 className="text-1xl font-bold tracking-wide text-white mb-3">
            VSOS – Đồng hành mọi nẻo đường, an tâm vững lái!
          </h1>

          <p className="text-sm leading-relaxed max-w-2xl text-gray-200">
            Chào mừng bạn đến với <strong>VSOS</strong> – dịch vụ cứu hộ xe máy,
            ô tô nhanh chóng và uy tín. Chúng tôi không chỉ hỗ trợ bạn trên
            những hành trình gian nan mà còn cung cấp các sản phẩm, phụ tùng
            chất lượng, giúp chiếc xe của bạn luôn bền bỉ và mạnh mẽ. Hãy để
            VSOS trở thành người bạn đồng hành đáng tin cậy trên từng cây số!
          </p>
        </div>

        {/* Footer Sections */}
        {footerLinks.map((section, index) => (
          <FooterSection
            key={index}
            title={section.title}
            links={section.links}
            isSocial={section.isSocial}
          />
        ))}
      </div>

      {/* Copyright */}
      <p className="text-center py-4 text-xs text-gray-200">
        © {new Date().getFullYear()} Được phát triển bởi
        <span className="text-white font-semibold"> VSOS </span> | All rights
        reserved
      </p>
    </div>
  );
};

export default Footer;
