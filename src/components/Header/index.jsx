import { Link, useNavigate } from "react-router-dom";
import { Search, PhoneCall } from "lucide-react";
import { useState } from "react";
import Button from "../Button/Button";
import Logo from "../Logo";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const navLinks = [
    {
      to: "/home",
      label: "TRANG CHỦ",
      color: "text-[#B71C1C]",
      hover: "hover:text-[#E53935]",
    },
    {
      to: "/introduce",
      label: "GIỚI THIỆU",
      color: "text-[#0288D1]",
      hover: "hover:text-[#01579B]",
    },
    {
      to: "/category",
      label: "DỊCH VỤ",
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
    {
      to: "/community",
      label: "CỘNG ĐỒNG",
      color: "text-[#B0BEC5]",
      hover: "hover:text-[#78909C]",
    },
    {
      to: "/policy",
      label: "CHÍNH SÁCH",
      color: "text-[#B0BEC5]",
      hover: "hover:text-[#78909C]",
    },
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
            <span>1900 636 106</span>
          </div>
        }
        className="font-semibold text-xs px-4 py-2 rounded-full bg-[#E53935] hover:bg-[#B71C1C] text-white transition-all"
      />

      {/* Navigation */}
      <nav className="hidden md:flex items-center text-xs font-semibold gap-5">
        {navLinks.map(({ to, label, color, hover }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className={`relative ${color} ${hover} transition-all after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-current after:transition-all hover:after:w-full`}
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

      <div className="flex gap-3">
        {/* Đăng Nhập */}
        <Button
          title="Đăng Nhập"
          onClick={() => navigate("/login")}
          className="font-semibold text-xs px-4 py-2 rounded-full transition-all border border-gray-300 bg-[#2196F3] hover:bg-gray-100"
        />
      </div>
    </header>
  );
};

export default Header;
