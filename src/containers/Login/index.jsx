import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import backgroundImage from "../../assets/background.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đăng nhập với:", { email, password });
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
      {/* Lớp phủ làm mờ nền với màu xám */}
      <div className="absolute inset-0 bg-gray-700 opacity-60 z-0"></div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Đăng Nhập
        </h2>

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2 text-left"
            >
              Tên đăng nhập
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2 text-left"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all"
          >
            Đăng Nhập
          </button>
        </form>

        {/* Đăng nhập bằng Google */}
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 flex items-center justify-center gap-3 bg-[#DB4437] text-white rounded-md hover:bg-[#C1351D] transition-all focus:ring-4 focus:ring-red-300"
          >
            <FaGoogle size={20} />
            <span>Đăng Nhập bằng Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
