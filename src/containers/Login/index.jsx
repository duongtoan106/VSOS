import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/login.png";
import { login } from "../../constant/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(username, password);
      console.log("Đăng nhập thành công:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userName", data.username);

      localStorage.setItem("userId", data.id);

      toast.success("Đăng nhập thành công!", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/");

    } catch (error) {
      console.error(error.message);
      toast.error("Đăng nhập thất bại! " + error.message, {
        position: "top-right",
        autoClose: 3000,
      });
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <p className="text-sm text-center mt-6 text-[#333]">
          Chưa có tài khoản?
          <span
            className="text-blue-600 cursor-pointer font-semibold ml-1 hover:underline"
            onClick={() => navigate("/register")}
          >
            Đăng Ký Miễn Phí
          </span>
        </p>
        <p
          className="text-sm text-center mt-2 text-teal-500 cursor-pointer font-semibold hover:text-teal-600 hover:underline transition"
          onClick={() => navigate("/")}
        >
          Quay về trang chủ
        </p>
      </div>
    </div>
  );
};

export default Login;
