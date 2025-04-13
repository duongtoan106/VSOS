import React from "react";

const OrderDetailsToEvaluate = ({ order, onClose }) => {
  if (!order) return null;

  const totalOrder = order.orderDetail.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">
        {/* Tiêu đề */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-red-600">
            Chi tiết đơn hàng #{order.id}
          </h3>
          <button
            onClick={onClose}
            className="text-red-500 text-3xl font-bold hover:opacity-80 px-2"
          >
            ×
          </button>
        </div>

        {/* Thông tin người đặt */}
        <div className="grid grid-cols-[140px_1fr] gap-4 text-gray-700 text-base mb-6">
          <div className="flex flex-col space-y-2 text-blue-700 font-semibold text-left">
            <span>Ngày đặt:</span>
            <span>Tài khoản:</span>
            <span>Email:</span>
            <span>Số điện thoại:</span>
            <span>Địa chỉ:</span>
          </div>
          <div className="flex flex-col space-y-2 text-left">
            <span>{new Date(order.date).toLocaleString("vi-VN")}</span>
            <span>{order.customer.username}</span>
            <span>{order.customer.email}</span>
            <span>{order.customer.phone}</span>
            <span>{order.customer.address}</span>
          </div>
        </div>

        {/* Sản phẩm */}
        <div className="border-t pt-4 text-left">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Sản phẩm:
          </h4>
          <div className="space-y-4">
            {order.orderDetail.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 text-left">
                  <h5 className="text-base font-semibold text-gray-900 mb-1">
                    {item.product.name}
                  </h5>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.product.description}
                  </p>
                  <p className="text-sm font-medium">
                    Số lượng:{" "}
                    <span className="font-normal">{item.quantity}</span>
                  </p>
                  <p className="text-sm font-medium">
                    Đơn giá:{" "}
                    <span className="text-blue-600 font-semibold">
                      {Number(item.price).toLocaleString()}₫
                    </span>
                  </p>
                  <p className="text-sm font-medium">
                    Tổng:{" "}
                    <span className="text-green-600 font-semibold">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tổng đơn hàng */}
        <div className="mt-6 text-lg font-semibold text-left">
          <span className="text-blue-700">Tổng đơn hàng: </span>
          <span className="text-green-700">{totalOrder.toLocaleString()}₫</span>
        </div>
        {/* Button Close form góc dưới bên phải */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            {" "}
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsToEvaluate;
