import { useEffect, useState } from "react";
import { fetchOrders } from "../../constant/api";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        console.error("Error loading orders:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Lịch Sử Giao Dịch
      </h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-blue-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="py-3 px-4 text-left">Mã đơn</th>
                <th className="py-3 px-4 text-left">Ngày đặt</th>
                <th className="py-3 px-4 text-left">Khách hàng</th>
                <th className="py-3 px-4 text-left">Địa chỉ</th>
                <th className="py-3 px-4 text-left">SĐT</th>
                <th className="py-3 px-4 text-left">Sản phẩm</th>
                <th className="py-3 px-4 text-right">Tổng tiền</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-blue-700">
                    #{order.id}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(order.date).toLocaleString("vi-VN")}
                  </td>
                  <td className="py-3 px-4">{order.customer.username}</td>
                  <td className="py-3 px-4">{order.customer.address}</td>
                  <td className="py-3 px-4">{order.customer.phone}</td>
                  <td className="py-3 px-4">
                    <ul className="space-y-2">
                      {order.orderDetail.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-start gap-2 text-left"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 rounded object-cover mt-1"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800">
                              {item.product.name}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {item.quantity} x{" "}
                              {Number(item.price).toLocaleString()}₫
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-blue-600">
                    {Number(order.total).toLocaleString()}₫
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
