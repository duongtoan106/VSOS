import { useEffect, useState } from "react";
import {
  fetchAllOrders,
  fetchOrders,
  patchOrderStatus,
} from "../../constant/api";
import OrderDetailsToEvaluate from "./OrderDetailsToEvaluate";

const OrderListControlPanel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [orderToConfirm, setOrderToConfirm] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Filter orders by status
  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "ALL") return true;
    return order.status === filterStatus;
  });

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

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
        const data = await fetchAllOrders();
        console.log(data);
        setOrders(data);
      } catch (err) {
        console.error("Error loading orders:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  // import { updateOrder } from "./api";

  const updateOrderStatus = async (orderId) => {
    try {
      // Gọi API với phương thức PATCH và cập nhật status thành "COMPLETED"
      await patchOrderStatus(orderId, { status: "COMPLETED" });

      // Cập nhật lại state trong local nếu cần
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "COMPLETED" } : order
        )
      );

      return true;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  };

  const handleConfirmPayment = (order) => {
    setOrderToConfirm(order);
    setShowConfirmDialog(true);
  };

  const confirmPayment = async () => {
    if (!orderToConfirm) return;

    try {
      await updateOrderStatus(orderToConfirm.id, "COMPLETED");
      // Hide the confirmation dialog
      setShowConfirmDialog(false);
      setOrderToConfirm(null);
      // Show success message
      alert("Đơn hàng đã được xác nhận thanh toán thành công.");
    } catch (err) {
      alert("Lỗi khi cập nhật đơn hàng.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Lịch Sử Tổng Giao Dịch
      </h2>
      <div className="mb-4 flex justify-end items-center gap-2">
        <label
          htmlFor="filterStatus"
          className="text-sm font-medium text-gray-700"
        >
          Filter trạng thái đơn:
        </label>
        <select
          id="filterStatus"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
        >
          <option value="ALL">Tất cả</option>
          <option value="PENDING">Đợi thanh toán</option>
          <option value="COMPLETED">Thanh toán thành công</option>
        </select>
      </div>

      {selectedOrder && (
        <OrderDetailsToEvaluate
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && orderToConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Xác nhận thanh toán
            </h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xác nhận đã nhận thanh toán cho đơn hàng #
              {orderToConfirm.id}?
            </p>
            <div className="flex items-center space-x-3 justify-end">
              <button
                onClick={() => {
                  setShowConfirmDialog(false);
                  setOrderToConfirm(null);
                }}
                className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={confirmPayment}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <th className="py-3 px-4 text-left">Mã đơn</th>
                  <th className="py-3 px-4 text-left">Ngày đặt</th>
                  <th className="py-3 px-4 text-left">Khách hàng</th>
                  <th className="py-3 px-4 text-left">Địa chỉ</th>
                  <th className="py-3 px-4 text-left">SĐT</th>
                  <th className="py-3 px-4 text-left">Sản phẩm</th>
                  <th className="py-3 px-4 text-right">Tổng tiền</th>
                  <th className="py-3 px-4 text-right">Trạng thái đơn</th>
                  <th className="py-3 px-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {currentOrders.map((order) => (
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
                    <td className="py-3 px-4 text-right">
                      {order.status === "PENDING" ? (
                        <span className="text-yellow-500 font-semibold">
                          Đợi thanh toán
                        </span>
                      ) : order.status === "COMPLETED" ? (
                        <span className="text-green-600 font-semibold">
                          Thanh toán thành công
                        </span>
                      ) : (
                        <span className="text-gray-500 italic">
                          Không xác định
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-2 items-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="w-full bg-blue-50 border border-blue-300 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center gap-1 text-sm font-medium"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          Xem chi tiết
                        </button>

                        {order.status === "PENDING" && (
                          <button
                            onClick={() => handleConfirmPayment(order)}
                            className="w-full bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-1 text-sm font-medium"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Xác nhận thanh toán
                          </button>
                        )}
                      </div>
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
            {Math.min(indexOfLastOrder, filteredOrders.length)} của{" "}
            {filteredOrders.length} đơn hàng
          </div>
        </>
      )}
    </div>
  );
};

export default OrderListControlPanel;
