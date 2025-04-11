import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import backgroundImage from "../../assets/cart.png";
import { getCartItems, removeFromCart } from "../../constant/api";
import { toast } from "react-toastify";
import { useMemo } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const customerId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [showQRModal, setShowQRModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const qrURL = useMemo(() => {
    return `https://img.vietqr.io/image/VCB-9766710603-compact2.png?amount=${totalAmount}&addInfo=THANH%20TOAN%20DON%20HANG`;
  }, [totalAmount]);

  const groupCartItems = (items) => {
    const grouped = {};
    items.forEach((item) => {
      const pid = item.product.id;
      if (grouped[pid]) {
        grouped[pid].quantity += 1;
      } else {
        grouped[pid] = { ...item, quantity: 1 };
      }
    });
    return Object.values(grouped);
  };

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const items = await getCartItems();
      const groupedItems = groupCartItems(items);
      setCartItems(groupedItems);
      setLoading(false);
    };
    fetchCart();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(cartItems.map((item) => item.product.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (e, productId) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedItems((prev) => [...prev, productId]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== productId));
    }
  };

  const isItemSelected = (productId) => selectedItems.includes(productId);

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId, customerId, token);

      const updatedItems = cartItems.filter(
        (item) => item.product.id !== productId
      );
      setCartItems(updatedItems);
      setSelectedItems((prev) => prev.filter((id) => id !== productId));
    } catch {
      alert("Không thể xoá sản phẩm. Vui lòng thử lại!");
    }
  };

  const handleCreateOrder = async () => {
    if (selectedItems.length === 0) return;

    toast.success("Vui lòng quét mã để thanh toán!");
    setShowQRModal(true);
  };

  useEffect(() => {
    const total = cartItems
      .filter((item) => selectedItems.includes(item.product.id))
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    setTotalAmount(total);
  }, [selectedItems, cartItems]);

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
          <div className="w-2/3">
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border border-gray-300 p-3">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        cartItems.length > 0 &&
                        selectedItems.length === cartItems.length
                      }
                    />
                  </th>
                  <th className="border border-gray-300 p-3">Hình ảnh</th>
                  <th className="border border-gray-300 p-3">Tên sản phẩm</th>
                  <th className="border border-gray-300 p-3">Số lượng</th>
                  <th className="border border-gray-300 p-3">Giá tiền</th>
                  <th className="border border-gray-300 p-3">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      Đang tải giỏ hàng...
                    </td>
                  </tr>
                ) : cartItems.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      Giỏ hàng của bạn đang trống
                    </td>
                  </tr>
                ) : (
                  cartItems.map((item) => (
                    <tr
                      key={item.product.id}
                      className="text-center border-b hover:bg-gray-50"
                    >
                      <td className="border border-gray-300 p-3">
                        <input
                          type="checkbox"
                          onChange={(e) => handleSelectItem(e, item.product.id)}
                          checked={isItemSelected(item.product.id)}
                        />
                      </td>
                      <td className="border border-gray-300 p-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-md mx-auto"
                        />
                      </td>
                      <td className="border border-gray-300 p-3">
                        {item.product.name}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <input
                          type="number"
                          className="w-16 border p-2 rounded text-center bg-gray-100"
                          value={item.quantity}
                          disabled
                        />
                      </td>
                      <td className="border border-gray-300 p-3 text-blue-600 font-semibold">
                        {(item.product.price * item.quantity).toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </td>
                      <td className="border border-gray-300 p-3">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveItem(item.product.id)}
                        >
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
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Tóm tắt đơn hàng
            </h2>

            {selectedItems.length === 0 ? (
              <p className="text-gray-500 text-sm italic">
                Bạn chưa chọn sản phẩm nào. Hãy chọn để tạo đơn hàng.
              </p>
            ) : (
              <>
                <ul className="space-y-2 text-sm text-gray-700 mb-4">
                  {cartItems
                    .filter((item) => isItemSelected(item.product.id))
                    .map((item) => (
                      <li
                        key={item.product.id}
                        className="flex justify-between border-b pb-2 last:border-none flex-col"
                      >
                        <div className="flex justify-between items-center text-xs text-gray-600">
                          <span className="truncate w-2/3">
                            {item.product.name}
                          </span>
                          <span>
                            {Number(item.product.price).toLocaleString("vi-VN")}
                            đ x {item.quantity}
                          </span>
                        </div>
                        <div className="text-right font-medium text-blue-600 text-sm mt-1">
                          {(item.product.price * item.quantity).toLocaleString(
                            "vi-VN"
                          )}
                          đ
                        </div>
                      </li>
                    ))}
                </ul>

                <div className="flex justify-between font-semibold text-base text-gray-800 border-t pt-3">
                  <span>Tổng cộng:</span>
                  <span className="text-green-600">
                    {cartItems
                      .filter((item) => isItemSelected(item.product.id))
                      .reduce(
                        (total, item) =>
                          total + item.product.price * item.quantity,
                        0
                      )
                      .toLocaleString("vi-VN")}
                    đ
                  </span>
                </div>
              </>
            )}

            <button
              onClick={handleCreateOrder}
              className={`mt-6 bg-blue-500 text-white w-full py-3 rounded-lg transition font-medium ${
                selectedItems.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
              disabled={selectedItems.length === 0}
            >
              Thanh toán
            </button>
          </div>
        </div>
        {showQRModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center relative w-[350px]">
              <h2 className="text-lg font-semibold text-green-700 mb-4">
                Quét mã để thanh toán
              </h2>
              <img
                src={qrURL}
                alt="QR thanh toán"
                className="w-full h-auto rounded-lg"
              />

              <button
                className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                onClick={() => setShowQRModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
