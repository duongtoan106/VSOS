import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import backgroundImage from "../../assets/cart.png";
import { getCartItems } from "../../constant/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const items = await getCartItems();
      setCartItems(items);
    };
    fetchCart();
  }, []);

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center p-10"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-3/4 bg-white shadow-lg rounded-lg p-6 flex gap-6 flex-col">
        <h1 className="text-xl font-medium text-gray-700 text-center pb-4 border-b border-gray-300">
          Giỏ hàng của bạn
        </h1>
        <div className="flex gap-6">
          {/* Bảng thông tin sản phẩm */}
          <div className="w-2/3">
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border border-gray-300 p-3">Chọn</th>
                  <th className="border border-gray-300 p-3">Hình ảnh</th>
                  <th className="border border-gray-300 p-3">Tên sản phẩm</th>
                  <th className="border border-gray-300 p-3">Số lượng</th>
                  <th className="border border-gray-300 p-3">Giá tiền</th>
                  <th className="border border-gray-300 p-3">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      Giỏ hàng của bạn đang trống
                    </td>
                  </tr>
                ) : (
                  cartItems.map((item, index) => (
                    <tr
                      key={index}
                      className="text-center border-b hover:bg-gray-50"
                    >
                      <td className="border border-gray-300 p-3">
                        <input type="checkbox" />
                      </td>
                      <td className="border border-gray-300 p-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md mx-auto"
                        />
                      </td>
                      <td className="border border-gray-300 p-3">
                        {item.name}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <input
                          type="number"
                          className="w-16 border p-2 rounded text-center bg-gray-100"
                          defaultValue={item.quantity}
                          min={1}
                        />
                      </td>
                      <td className="border border-gray-300 p-3 text-blue-600 font-semibold">
                        {item.price}đ
                      </td>
                      <td className="border border-gray-300 p-3">
                        <button className="text-red-500 hover:text-red-700">
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div className="w-1/3 bg-gray-50 shadow-md p-6 rounded-lg border border-gray-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Tóm tắt đơn hàng
            </h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Quý khách chưa chọn sản phẩm nào. Vui lòng chọn sản phẩm để tạo
                đơn hàng.
              </p>
            ) : (
              <p className="text-lg font-semibold text-gray-700">
                Tổng tiền:{" "}
                {cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
                đ
              </p>
            )}
            <Link to="/checkout">
              <button className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 mt-4 transition">
                Tạo đơn hàng
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
