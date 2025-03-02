import image1 from "../../../assets/menu1.png";
import image2 from "../../../assets/menu2.png";
import image3 from "../../../assets/menu3.png";
import image4 from "../../../assets/menu4.png";
import volunteerImage1 from "../../../assets/volunteer1.jpg";
import volunteerImage2 from "../../../assets/volunteer2.png";

const services = [
  { title: "DỊCH VỤ CỨU HỘ XE MÁY", img: image1 },
  { title: "DỊCH VỤ CỨU HỘ XE OTO", img: image2 },
  { title: "DỊCH VỤ CẨU - CHỞ XE", img: image3 },
  { title: "DỊCH VỤ CỨU HỘ XE TẢI", img: image4 },
];

const community = [
  { title: "DIỄN ĐÀN HỖ TRỢ TRỰC TUYẾN", img: volunteerImage1 },
  { title: "HỆ THỐNG ĐÁNH GIÁ VÀ PHẢN HỒI", img: volunteerImage2 },
];

const MenuCard = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mb-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-700 font-[Prata]">
          CÁC DỊCH VỤ CỨU HỘ 24/24
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="text-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-36 object-cover rounded-lg"
            />
            <p className="text-lg font-semibold mt-2 font-[Prata]">
              {service.title}
            </p>
          </div>
        ))}
      </div>

      <h3 className="text-3xl font-bold mt-8 mb-4 text-blue-700 text-center font-[Prata]">
        CỘNG ĐỒNG HỖ TRỢ TÌNH NGUYỆN
      </h3>

      <div className="grid grid-cols-2 gap-6 mt-4">
        {community.map((item, index) => (
          <div
            key={index}
            className="text-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-36 object-cover rounded-lg"
            />
            <p className="text-lg font-semibold mt-2 font-[Prata]">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-blue-900 py-4 mt-8 text-white text-center">
        <p className="text-xl font-bold font-[Prata]">24/7 : 000 0000 000</p>
      </div>
    </div>
  );
};

export default MenuCard;
