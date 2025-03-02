import truckImage from "../../assets/home.png";

const Home = () => {
  return (
    <div className="w-full">
      {/* Section 1 */}
      <div className="w-full bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 text-center">
          {[
            "AN TOÀN - NHANH CHÓNG - TIỆN LỢI",
            "GIÁ THÀNH HỢP LÍ",
            "CHẤT LƯỢNG DỊCH VỤ",
            "CHÍNH SÁCH",
          ].map((title, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="w-24 h-24 bg-white border-4 border-red-500 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
              </div>
              <h3 className="text-red-500 font-semibold whitespace-nowrap mt-2">
                {title}
              </h3>
              <p className="text-gray-600 text-sm">
                Cam kết phục vụ khách hàng nhanh chóng và tiện lợi nhất.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 */}
      <div className="w-full bg-[#E53935] py-12 text-white">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl font-bold mb-4 text-center">
            CỨU HỘ KHẨN CẤP 24/24
          </h2>

          <div className="grid grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="text-left">
              <p className="text-sm leading-relaxed">
                Cứu hộ giao thông, cứu hộ xe ô tô chuyên nghiệp. Chuyên Cẩu Kéo
                Xe Hư, Xe Tai Nạn, Vận Chuyển Xe Đi Tỉnh, Phạm vi hoạt động toàn
                khu vực miền nam nói chung và SÀI GÒN, TPHCM, Bình Dương, Long
                An, Đồng Nai, Và các Tuyến Đường Cao Tốc nội riêng, Và Các Tỉnh
                Lân Cận. Dịch vụ nhanh chóng, hỗ trợ 24/24. Hỗ trợ sửa chữa
                chuyên, nghiệp.
              </p>
              <button className="mt-4 bg-white text-red-600 px-6 py-2 rounded font-semibold shadow-md hover:bg-gray-200">
                Xem Chi Tiết
              </button>
            </div>

            {/* Image */}
            <div className="relative w-1/2 ml-16">
              {" "}
              <img
                src={truckImage}
                alt="Cứu hộ xe"
                className="w-full h-56 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
