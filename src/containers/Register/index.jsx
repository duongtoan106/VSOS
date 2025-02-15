import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import backgroundImage from "../../assets/background.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đăng ký với:", { username, phone, email, password });
  };

  const handleGoogleLogin = () => {
    console.log("Đăng nhập bằng Google");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gray-700 opacity-60 z-0"></div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative z-10">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          Đăng Ký
        </h2>

        {/* Form đăng ký */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-1 text-left"
            >
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 mb-1 text-left"
            >
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1 text-left"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1 text-left"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700 mb-1 text-left"
            >
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all"
          >
            Đăng Ký
          </button>
        </form>

        {/* Đăng nhập bằng Google */}
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 flex items-center justify-center gap-3 bg-[#DB4437] text-white rounded-md hover:bg-[#C1351D] transition-all focus:ring-4 focus:ring-red-300"
          >
            <FaGoogle size={18} />
            <span>Đăng Nhập bằng Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
