import truckImage from "../../assets/home.png";
import circle1 from "../../assets/img/circle1.jpg";
import circle4 from "../../assets/img/circle4.jpg";
import circle3 from "../../assets/img/circle3.jpg";
import circle2 from "../../assets/img/circle2.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <div className="w-full">
      {/* Section 1 */}
      <div className="w-full bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            {
              title: "AN TOÀN - NHANH CHÓNG - TIỆN LỢI",
              imgSrc: circle1,
              description:
                "Dịch vụ cứu hộ an toàn, nhanh chóng, hỗ trợ tận nơi.",
            },
            {
              title: "GIÁ THÀNH HỢP LÍ",
              imgSrc: circle2,
              description:
                "Báo giá minh bạch, cam kết không phát sinh chi phí.",
            },
            {
              title: "CHẤT LƯỢNG DỊCH VỤ",
              imgSrc: circle3,
              description: "Đội ngũ chuyên nghiệp, tận tâm với khách hàng.",
            },
            {
              title: "CHÍNH SÁCH",
              imgSrc: circle4,
              description:
                "Chính sách bảo hành và hỗ trợ dài hạn cho khách hàng.",
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="w-24 h-24 bg-white border-4 border-red-500 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden">
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-red-500 font-semibold whitespace-nowrap mt-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="text-left">
              <p className="text-sm leading-relaxed">
                Cứu hộ giao thông, cứu hộ xe ô tô chuyên nghiệp. Chuyên Cẩu Kéo
                Xe Hư, Xe Tai Nạn, Vận Chuyển Xe Đi Tỉnh, Phạm vi hoạt động toàn
                khu vực miền nam nói chung và SÀI GÒN, TPHCM, Bình Dương, Long
                An, Đồng Nai, Và các Tuyến Đường Cao Tốc nội riêng, Và Các Tỉnh
                Lân Cận. Dịch vụ nhanh chóng, hỗ trợ 24/24. Hỗ trợ sửa chữa
                chuyên nghiệp.
              </p>
              <button
                onClick={() =>
                  toast.info(
                    <p>
                      Chúng tôi đang nỗ lực hoàn thiện tính năng này để mang đến
                      trải nghiệm tốt nhất. Hãy quay lại sau để cập nhật những
                      cải tiến mới nhất!
                    </p>,
                    {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "colored",
                    }
                  )
                }
                className="mt-4 bg-white text-red-600 px-6 py-2 rounded font-semibold shadow-md hover:bg-gray-200 transition-all duration-200"
              >
                Xem Chi Tiết
              </button>
            </div>

            {/* Image */}
            <div className="relative w-full md:w-1/2 ml-16">
              <img
                src={truckImage}
                alt="Cứu hộ xe"
                className="w-full h-56 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
