import { Link, useNavigate } from "react-router-dom";
import { Search, PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Logo from "../Logo";

import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setRole(role);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const userMenu = [
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
      hover: "hover:text-[#E53935]",
    },
    {
      to: "/landingPage",
      label: "GIỚI THIỆU",
      color: "text-[#0288D1]",
      hover: "hover:text-[#01579B]",
    },
    {
      to: "/category",
      label: "CỬA HÀNG VSOS",
      color: "text-[#0288D1]",
      hover: "hover:text-[#01579B]",
    },
    {
      to: "/gps_location",
      label: "ĐỊNH VỊ GPS",
      color: "text-[#0288D1]",
      hover: "hover:text-[#01579B]",
    },
    {
      to: "/partners",
      label: "ĐỐI TÁC LIÊN KẾT",
      color: "text-[#0288D1]",
      hover: "hover:text-[#01579B]",
    },
    // {
    //   to: "/community",
    //   label: "CỘNG ĐỒNG",
    //   color: "text-[#B0BEC5]",
    //   hover: "hover:text-[#78909C]",
    // },
    // {
    //   to: "/policy",
    //   label: "CHÍNH SÁCH",
    //   color: "text-[#B0BEC5]",
    //   hover: "hover:text-[#78909C]",
    // },
  ];

  return (
    <header className="flex items-center justify-between h-16 px-4 lg:px-8 bg-white shadow-md sticky top-0 z-50">
      {/* Logo + Slogan */}
      <div className="flex items-center gap-3">
        <Link to="/">
          <Logo className="w-12 h-12 transition-transform hover:scale-110 block" />
        </Link>
        <div>
          <h1 className="text-transparent bg-clip-text bg-[#D32F2F] font-semibold italic text-base">
            VSOS
          </h1>
          <p className="text-[#D32F2F] text-[10px] font-semibold italic">
            ĐỒNG HÀNH MỌI NƠI
          </p>
          <p className="text-[#D32F2F] text-[10px] font-semibold italic">
            KHÔNG LO CHƠI VƠI
          </p>
        </div>
      </div>

      {/* Hotline */}
      <Button
        title={
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 animate-[shake_0.5s_infinite] text-white" />
            <span>0327 730 336</span>
          </div>
        }
        className="font-semibold text-xs px-4 py-2 rounded-full bg-[#E53935] hover:bg-[#B71C1C] text-white transition-all"
      />

      {/* Navigation */}
      <nav className="hidden md:flex items-center text-xs font-semibold gap-5">
        {navLinks.map(({ to, label }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className={`relative ${
              location.pathname === to ? "text-[#B71C1C]" : "text-[#0288D1]"
            } hover:text-[#E53935] transition-all after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-current after:transition-all hover:after:w-full`}
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
              menu={{ items: userMenu }}
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
            className="font-semibold text-xs px-4 py-2 rounded-full transition-all border border-gray-300 bg-[#E53935] hover:bg-gray-100"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
