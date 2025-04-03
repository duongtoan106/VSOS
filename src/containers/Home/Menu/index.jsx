import image1 from "../../../assets/menu1.png";
import image2 from "../../../assets/menu2.png";
import image3 from "../../../assets/menu3.png";
import image4 from "../../../assets/menu4.png";
import volunteerImage1 from "../../../assets/volunteer1.jpg";
import volunteerImage2 from "../../../assets/volunteer2.png";

const services = [
  { title: "DỊCH VỤ CỨU HỘ XE MÁY", img: image1 },
  { title: "DỊCH VỤ CỨU HỘ XE Ô-TÔ", img: image2 },
  { title: "DỊCH VỤ CẨU - CHỞ XE", img: image3 },
  { title: "DỊCH VỤ CỨU HỘ XE TẢI", img: image4 },
];

const community = [
  { title: "DIỄN ĐÀN HỖ TRỢ TRỰC TUYẾN", img: volunteerImage1 },
  { title: "HỆ THỐNG ĐÁNH GIÁ VÀ PHẢN HỒI", img: volunteerImage2 },
];

const Menu = () => {
  return (
    <div className="p-8 bg-white rounded-2xl max-w-5xl mx-auto mb-12">
      {/* Phần tiêu đề dịch vụ */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-blue-800 font-[Merriweather] uppercase tracking-wide">
          Các Dịch Vụ Cứu Hộ 24/24
        </h2>
        <p className="text-gray-700 mt-2 text-lg text-justify max-w-3xl mx-auto">
          Chúng tôi cung cấp các dịch vụ cứu hộ nhanh chóng, đảm bảo an toàn và
          tiện lợi. Hãy lựa chọn dịch vụ phù hợp với bạn!
        </p>
      </div>

      {/* Danh sách dịch vụ */}
      <div className="grid grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div key={index} className="text-center bg-gray-100 p-5 rounded-xl">
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-40 object-contain rounded-xl"
            />
            <p className="text-lg font-semibold mt-3 font-[Merriweather] text-blue-900 text-center">
              {service.title}
            </p>
          </div>
        ))}
      </div>

      {/* Phần tiêu đề cộng đồng */}
      <h3 className="text-4xl font-bold mt-12 mb-6 text-blue-800 text-center font-[Merriweather] uppercase tracking-wide">
        Cộng Đồng Hỗ Trợ Tình Nguyện
      </h3>

      <p className="text-gray-700 text-lg text-justify max-w-3xl mx-auto mb-6">
        Chúng tôi xây dựng một cộng đồng hỗ trợ lẫn nhau, giúp bạn có thể đánh
        giá và phản hồi dịch vụ một cách minh bạch.
      </p>

      {/* Danh sách cộng đồng */}
      <div className="grid grid-cols-2 gap-8">
        {community.map((item, index) => (
          <div key={index} className="text-center bg-gray-100 p-5 rounded-xl">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-40 object-contain rounded-xl"
            />
            <p className="text-lg font-semibold mt-3 font-[Merriweather] text-blue-900 text-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Thông tin liên hệ */}
      <div className="bg-blue-900 py-5 mt-12 text-white text-center rounded-xl">
        <p className="text-2xl font-bold font-[Merriweather] tracking-wide">
          24/7 Liên Hệ: 0327 730 336
        </p>
      </div>
    </div>
  );
};

export default Menu;
