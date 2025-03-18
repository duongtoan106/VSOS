import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

const Card = ({ image, name, description, price, id }) => {
  return (
    <motion.div
      className="w-full h-full flex flex-col bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 relative"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex justify-center">
        <img
          className="rounded-lg w-full h-48 object-cover"
          src={image}
          alt={name}
        />
      </div>
      <div className="p-3 mt-3 text-center">
        <h3 className="font-semibold text-md text-gray-900 mt-1">{name}</h3>
        <h3 className="font-semibold text-lg text-green-600 mt-2">{price}đ</h3>
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
