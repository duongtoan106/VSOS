import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../constant/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({ product, onAddToCart }) => {
  const { image, name, description, price } = product;
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = async () => {
    const storedUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    setLoading(true);

    try {
      await addToCart(product, storedUserId, token);
      toast.success("Đã thêm vào giỏ hàng!");
      if (onAddToCart) onAddToCart();
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    }

    setLoading(false);
  };

  const formatPrice = (number) =>
    new Intl.NumberFormat("vi-VN").format(number) + " ₫";

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-xs text-center transition-transform transform hover:scale-105">
      <div className="relative w-full h-52">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl animate-pulse">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <img
          className={`rounded-xl w-full h-52 object-contain transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={image}
          alt={name}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <h3
        className="font-semibold text-lg text-gray-800 mt-3 overflow-hidden text-ellipsis"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
        title={name}
      >
        {name}
      </h3>

      <h3 className="font-semibold text-xl text-green-600 mt-1">
        {formatPrice(price)}
      </h3>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>

      <button
        onClick={handleAddToCart}
        className="flex items-center justify-center bg-[#D2B48C] px-6 py-3 rounded-lg cursor-pointer shadow-md hover:bg-[#C19A6B] transition-all mt-4 w-full text-white font-medium"
        disabled={loading}
      >
        {loading ? (
          "Đang thêm..."
        ) : (
          <>
            <FaShoppingCart size={20} className="mr-2" /> Thêm vào giỏ hàng
          </>
        )}
      </button>
    </div>
  );
};

export default Card;
