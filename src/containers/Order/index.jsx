import { useEffect, useState } from "react";
import { fetchMyOrders } from "../../constant/api";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Go to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchMyOrders();
        console.log("đơn hàng của bạn: ", data);

        const sortedOrders = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setOrders(sortedOrders);
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
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-blue-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="py-3 px-4 text-center">Mã đơn</th>
                  <th className="py-3 px-4 text-center">Ngày đặt</th>
                  <th className="py-3 px-4 text-center">Khách hàng</th>
                  <th className="py-3 px-4 text-center">Địa chỉ</th>
                  <th className="py-3 px-4 text-center">SĐT</th>
                  <th className="py-3 px-4 text-center">Sản phẩm</th>
                  <th className="py-3 px-4 text-center">Tổng tiền</th>
                  <th className="py-3 px-4 text-center">Trạng thái đơn</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold text-blue-700 text-center">
                      #{order.id}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {new Date(order.date).toLocaleString("vi-VN")}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {order.customer.username}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {order.customer.address}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {order.customer.phone}
                    </td>
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
                    <td className="py-3 px-4 text-center">
                      {order.status === "PENDING" ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <span className="w-2 h-2 mr-1 bg-yellow-500 rounded-full"></span>
                          Đợi thanh toán
                        </span>
                      ) : order.status === "COMPLETED" ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                          Thanh toán thành công
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <span className="w-2 h-2 mr-1 bg-gray-500 rounded-full"></span>
                          Không xác định
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                &laquo; Trước
              </button>

              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md ${
                    currentPage === number + 1
                      ? "bg-blue-500 text-white"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  {number + 1}
                </button>
              ))}

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                Sau &raquo;
              </button>
            </div>
          )}

          {/* Page info */}
          <div className="text-center text-sm text-gray-500 mt-4">
            Hiển thị {indexOfFirstOrder + 1} -{" "}
            {Math.min(indexOfLastOrder, orders.length)} của {orders.length} đơn
            hàng
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
