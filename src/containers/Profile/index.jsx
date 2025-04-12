import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchAccountDetails } from "../../constant/api";
import backgroundImage from "../../assets/profile.avif";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAccountDetails(userId);
        setFormData({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">
            Đang tải thông tin tài khoản...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Lỗi: {error}
      </div>
    );
  }

  return (
    <div className="font-merriweather min-h-screen flex items-center justify-center relative">
      <div
        className="w-full h-screen fixed top-0 left-0 z-[-1]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Thông Tin Tài Khoản
        </h2>

        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full space-y-4 text-left mt-4">
            {["username", "email", "phone", "address"].map((field) => (
              <div key={field}>
                <label className="block text-gray-600 text-sm font-semibold">
                  {field === "username"
                    ? "Tên Đăng Nhập"
                    : field === "email"
                    ? "Email"
                    : field === "phone"
                    ? "Số Điện Thoại"
                    : "Địa Chỉ"}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                  className={`w-full mt-1 p-2 rounded-lg border transition ${
                    isEditing ? "border-gray-300 bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`${
                isEditing ? "bg-green-500" : "bg-blue-500"
              } text-white px-4 py-2 rounded-lg hover:opacity-90 transition`}
            >
              {isEditing ? "Lưu" : "Chỉnh Sửa"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
