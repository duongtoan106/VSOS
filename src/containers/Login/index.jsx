import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/login.jpg";
import { login } from "../../constant/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      <ToastContainer />
      <h1 className="text-4xl text-white font-extrabold mt-10 absolute top-0 left-10 z-20 tracking-wide">
        Chào Mừng Đến
      </h1>
      <h1
        className="text-5xl font-extrabold text-[#1565C0] absolute top-24 left-10 z-20 tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        Với VSOS
      </h1>

      <div className="absolute inset-0 bg-gray-700 opacity-50 z-0"></div>
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm relative z-10 transform transition-all duration-500 ease-in-out opacity-80">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-2 tracking-wide">
          Đăng Nhập
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Xin chào! Vui lòng nhập thông tin của bạn.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              Tên tài khoản
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên tài khoản"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm text-sm"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-105"
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
          className="text-sm text-center mt-2 text-teal-500 cursor-pointer font-semibold hover:text-teal-600 hover:underline transition duration-200 transform hover:scale-105"
          onClick={() => navigate("/")}
        >
          Quay về trang chủ
        </p>
      </div>
    </div>
  );
};

export default Login;
