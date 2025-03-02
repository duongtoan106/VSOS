import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/background.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

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
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gray-700 opacity-60 z-0"></div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative z-10">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          Đăng Ký
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="tel"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Đăng Ký
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100"
            >
              Đăng Nhập
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 flex items-center justify-center gap-3 bg-[#DB4437] text-white rounded-md hover:bg-[#C1351D]"
          >
            <FaGoogle size={18} /> <span>Đăng Nhập bằng Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
