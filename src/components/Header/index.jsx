import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, PhoneCall } from "lucide-react";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import Button from "../Button/Button";
import Logo from "../Logo";

const Header = () => {
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setRole(storedRole);
  }, []);

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    navigate("/login");
  };

  const getUserMenu = (role) => [
    ...(["ADMIN", "MANAGER", "STAFF"].includes(role)
      ? [
          {
            key: "dashboard",
            label: "Dashboard",
            onClick: () => navigate("/dashboard"),
          },
        ]
      : []),
    {
      key: "profile",
      label: "Hồ Sơ Cá Nhân",
      onClick: () => navigate("/profile"),
    },
    {
      key: "cart",
      label: "Giỏ Hàng Của Bạn",
      onClick: () => navigate("/cart"),
    },
    {
      key: "order",
      label: "Đơn Hàng Của Bạn",
      onClick: () => navigate("/order"),
    },
    {
      key: "logout",
      label: "Đăng Xuất",
      onClick: handleLogout,
    },
  ];

  const navLinks = [
    {
      to: "/",
      label: "TRANG CHỦ",
      color: "text-[#B71C1C]",
      hover: "hover:text-[#D32F2F]",
    },
    {
      to: "/landingPage",
      label: "GIỚI THIỆU",
      color: "text-[#0288D1]",
      hover: "hover:text-[#D32F2F]",
    },
    {
      to: "/category",
      label: "CỬA HÀNG VSOS",
      color: "text-[#0288D1]",
      hover: "hover:text-[#D32F2F]",
    },
    {
      to: "/policy",
      label: "CHÍNH SÁCH",
      color: "text-[#0288D1]",
      hover: "hover:text-[#D32F2F]",
    },
    {
      to: "/partners",
      label: "ĐỐI TÁC LIÊN KẾT",
      color: "text-[#0288D1]",
      hover: "hover:text-[#D32F2F]",
    },
  ];

  return (
    <header className="flex items-center justify-between h-16 px-4 lg:px-8 bg-white shadow-md sticky top-0 z-50">
      {/* Logo + Slogan */}
      <div className="flex items-center gap-0">
        <Link to="/">
          <Logo className="w-12 h-12 transition-transform hover:scale-110 block" />
        </Link>
        <div className="text-left">
          {" "}
          <h1 className="text-transparent bg-clip-text bg-[#D32F2F] font-semibold italic text-base font-exo">
            VSOS
          </h1>
          <p className="text-[#D32F2F] text-[8px] font-light italic font-exo">
            ĐỒNG HÀNH MỌI NƠI
          </p>
          <p className="text-[#D32F2F] text-[8px] font-light italic font-exo">
            KHÔNG LO CHƠI VƠI
          </p>
        </div>
      </div>

      {/* Hotline */}
      <Button
        title={
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-white" />
            <span className="font-medium">0327 730 336</span>
          </div>
        }
        className="font-semibold text-xs px-5 py-3 rounded-full bg-[#E53935] hover:bg-[#C62828] text-white transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
      />

      {/* Navigation */}
      <nav className="hidden md:flex items-center text-xs font-semibold gap-5">
        {navLinks.map(({ to, label }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className={`relative ${
              location.pathname === to ? "text-[#B71C1C]" : "text-[#0288D1]"
            } transition-all after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-current after:transition-all hover:after:w-full`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Search Bar */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1.5 border border-gray-300 focus-within:border-gray-500 w-64 lg:w-80 transition-all"
      >
        <input
          type="text"
          placeholder="Tìm sản phẩm bạn mong muốn..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 text-xs"
        />
        <button
          type="submit"
          className="text-gray-500 hover:text-black transition-all"
        >
          <Search size={16} />
        </button>
      </form>

      {/* User Section */}
      <div className="flex gap-3">
        {isLoggedIn ? (
          <>
            <Dropdown
              menu={{ items: getUserMenu(role) }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div className="flex items-center gap-2 cursor-pointer bg-blue-100 px-3 py-2 rounded-full border border-gray-300 hover:bg-blue-200 transition-all">
                <UserOutlined className="text-xl text-gray-600" />
                <MenuOutlined className="text-lg text-gray-600" />
              </div>
            </Dropdown>
          </>
        ) : (
          <Button
            title="Đăng Nhập"
            onClick={() => navigate("/login")}
            className="font-semibold text-xs px-4 py-2 rounded-full transition-all border-gray-300 bg-[#0288D1] hover:bg-[#0277BD] text-white"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
