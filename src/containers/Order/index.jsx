const Order = () => {
  const cart = [
    {
      id: 1,
      name: "Nhớt xe máy Motul 10W40",
      image: "https://via.placeholder.com/80",
      price: "150,000",
      quantity: 2,
    },
    {
      id: 2,
      name: "Lọc gió xe Air Blade",
      image: "https://via.placeholder.com/80",
      price: "120,000",
      quantity: 1,
    },
    {
      id: 3,
      name: "Bugi NGK CR7HSA",
      image: "https://via.placeholder.com/80",
      price: "80,000",
      quantity: 3,
    },
  ];

  const totalPrice = cart.reduce(
    (total, item) =>
      total + parseInt(item.price.replace(",", "")) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10 bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Xác nhận đơn hàng
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b text-gray-600 font-semibold bg-gray-100">
                <th className="p-3">Hình ảnh</th>
                <th className="p-3">Tên sản phẩm</th>
                <th className="p-3">Số lượng</th>
                <th className="p-3">Giá tiền</th>
                <th className="p-3">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b text-gray-700">
                  <td className="p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="p-3 font-semibold">{item.name}</td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3">{item.price}₫</td>
                  <td className="p-3 font-semibold">
                    {(
                      parseInt(item.price.replace(",", "")) * item.quantity
                    ).toLocaleString()}
                    ₫
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-xl font-semibold">
            Tổng giá trị: {totalPrice.toLocaleString()}₫
          </p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Xác nhận đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
