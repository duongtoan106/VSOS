import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { login } from " // Import API login
import backgroundImage from "../../assets/background.png";
import { login } from "../../constant/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(username, password); // Gọi API từ service
      console.log("Đăng nhập thành công:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userName", data.username);
      navigate("/dashboard"); // Chuyển hướng sau khi đăng nhập thành công
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gray-700 opacity-60 z-0"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Đăng Nhập
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-1/2 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all"
            >
              Đăng Nhập
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-1/2 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 transition-all"
            >
              Đăng Ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
