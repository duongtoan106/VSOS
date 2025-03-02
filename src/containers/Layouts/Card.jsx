import { motion } from "framer-motion";
import { FaShoppingCart, FaStar } from "react-icons/fa";

const Card = ({
  img,
  name,
  brand,
  sale,
  price,
  originalPrice,
  description,
  rating,
  category,
}) => {
  return (
    <motion.div
      className="w-full h-full flex flex-col bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 relative"
      whileHover={{ scale: 1.05 }}
    >
      {sale && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
          -{sale}%
        </span>
      )}
      {category && (
        <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
          {category}
        </span>
      )}
      <div className="flex justify-center">
        <img
          className="rounded-lg w-full h-48 object-cover"
          src={img}
          alt={name}
        />
      </div>
      <div className="p-3 mt-3 text-center">
        <h3 className="font-semibold text-xs text-gray-600">{brand}</h3>
        <h3 className="font-semibold text-md text-gray-900 mt-1">{name}</h3>
        <div className="flex items-center justify-center mt-2">
          <h3 className="font-semibold text-lg text-green-600">{price}đ</h3>
          {originalPrice && (
            <h3 className="font-semibold text-md text-gray-500 line-through ml-2">
              {originalPrice}đ
            </h3>
          )}
        </div>
        <div className="flex items-center justify-center mt-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < rating ? "text-yellow-500" : "text-gray-300"}
            />
          ))}
        </div>
        <p className="text-gray-700 text-xs mt-1">{description}</p>
        <div className="flex justify-center mt-3">
          <motion.button
            className="flex items-center bg-[#FFDCAB] px-5 py-2 rounded-full cursor-pointer shadow-md hover:bg-[#FFC48C] transition-all"
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart size={20} className="mr-2" /> Thêm vào giỏ hàng
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
