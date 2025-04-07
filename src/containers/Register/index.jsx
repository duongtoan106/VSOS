import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../../assets/register.jpg";
import { register } from "../../constant/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }

    const result = await register({
      username,
      password,
      email,
      phone,
      address,
    });

    if (result.success) {
      toast.success(result.message);
      setTimeout(() => navigate("/login"), 2000);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gray-700 opacity-60 z-0"></div>

      <h1 className="text-4xl text-white font-extrabold mt-10 absolute top-0 left-10 z-20 tracking-wide">
        Bắt Đầu Hành Trình
      </h1>
      <h1 className="text-5xl font-extrabold text-[#1565C0] absolute top-24 left-10 z-20 tracking-wide">
        Cùng VSOS
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative z-10 opacity-80">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-2 tracking-wide">
          Tạo Tài Khoản
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Đăng ký ngay để tận hưởng ưu đãi!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 text-left mb-2"
            >
              Tên tài khoản
            </label>
            <input
              type="text"
              id="username"
              placeholder="Nhập tên tài khoản"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2 relative">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 text-left mb-2"
              >
                Mật khẩu
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                required
              />
              <span
                className="absolute right-3 top-3/4 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="w-1/2 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 text-left mb-2"
              >
                Xác nhận mật khẩu
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                required
              />
              <span
                className="absolute right-3 top-3/4 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 text-left mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 text-left mb-2"
            >
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-gray-700 text-left mb-2"
            >
              Địa chỉ
            </label>
            <textarea
              id="address"
              placeholder="Nhập địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-105"
          >
            Đăng Ký Ngay
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Đã có tài khoản?
          <span
            className="text-sm text-center mt-2 text-teal-500 cursor-pointer font-semibold hover:text-teal-600 hover:underline transition duration-200 transform hover:scale-105 ml-1"
            onClick={() => navigate("/login")}
          >
            Đăng Nhập
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
