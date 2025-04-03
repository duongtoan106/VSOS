import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../constant/api";

const Card = ({ product, onAddToCart }) => {
  const { image, name, description, price } = product;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddToCart = async () => {
    const storedUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!storedUserId) {
      setMessage("Không thể thêm vào giỏ hàng. Hãy đăng nhập lại!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await addToCart(product, storedUserId, token);
      if (onAddToCart) onAddToCart();
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      setMessage("Có lỗi xảy ra. Vui lòng thử lại!");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-xs text-center transition-transform transform hover:scale-105">
      <img
        className="rounded-xl w-full h-52 object-cover"
        src={image}
        alt={name}
      />
      <h3 className="font-semibold text-lg text-gray-800 mt-3">{name}</h3>
      <h3 className="font-semibold text-xl text-[#8B5E3B]">{price}đ</h3>
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

      {message && <p className="text-sm mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default Card;
