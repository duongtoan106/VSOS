import { useState, useEffect } from "react";
import Card from "../../containers/Layouts/Card";
import img1 from "../../assets/engine_oil.jpg";
import img2 from "../../assets/brake_pads.jpg";
import img3 from "../../assets/spark_plug.jpg";
import img4 from "../../assets/air_filter.jpg";
import img5 from "../../assets/battery.png";
import img6 from "../../assets/coolant.jpg";
import img7 from "../../assets/engine_belt.jpg";
import img8 from "../../assets/brake_fluid.jpg";
import img9 from "../../assets/clutch_plate.jpg";
import img10 from "../../assets/fuel_pump.jpg";
import img11 from "../../assets/oil_filter.jpg";
import img12 from "../../assets/gear_oil.jpg";

const products = [
  {
    img: img1,
    name: "Dầu Nhớt Động Cơ",
    brand: "Castrol",
    sale: 10,
    price: "500.000",
    originalPrice: "550.000",
    description: "Dầu nhớt giúp bôi trơn và bảo vệ động cơ hiệu quả.",
    rating: 5,
    category: "Dầu nhớt",
  },
  {
    img: img2,
    name: "Bố Thắng",
    brand: "Brembo",
    sale: 15,
    price: "750.000",
    originalPrice: "880.000",
    description: "Bố thắng cao cấp giúp tăng hiệu suất phanh và an toàn.",
    rating: 4,
    category: "Hệ thống phanh",
  },
  {
    img: img3,
    name: "Bugi Đánh Lửa",
    brand: "NGK",
    price: "200.000",
    description: "Bugi chất lượng cao giúp tối ưu hóa hiệu suất động cơ.",
    rating: 4,
    category: "Hệ thống đánh lửa",
  },
  {
    img: img4,
    name: "Lọc Gió Động Cơ",
    brand: "K&N",
    sale: 10,
    price: "400.000",
    originalPrice: "450.000",
    description: "Lọc gió giúp bảo vệ động cơ khỏi bụi bẩn và cặn bẩn.",
    rating: 5,
    category: "Lọc gió",
  },
  {
    img: img5,
    name: "Ắc Quy Xe",
    brand: "GS Battery",
    price: "1.200.000",
    description: "Ắc quy chất lượng cao, đảm bảo hiệu suất khởi động.",
    rating: 4,
    category: "Ắc quy",
  },
  {
    img: img6,
    name: "Dung Dịch Làm Mát",
    brand: "Prestone",
    price: "250.000",
    description: "Giúp làm mát động cơ và tăng tuổi thọ hệ thống.",
    rating: 5,
    category: "Dung dịch làm mát",
  },
  {
    img: img7,
    name: "Dây Curoa Động Cơ",
    brand: "Gates",
    price: "600.000",
    description: "Dây curoa chịu lực tốt, giúp vận hành êm ái.",
    rating: 4,
    category: "Dây curoa",
  },
  {
    img: img8,
    name: "Dầu Phanh",
    brand: "Motul",
    price: "350.000",
    description: "Dầu phanh cao cấp giúp hệ thống phanh hoạt động tối ưu.",
    rating: 5,
    category: "Hệ thống phanh",
  },
  {
    img: img9,
    name: "Bố Côn Xe",
    brand: "Sachs",
    sale: 10,
    price: "900.000",
    originalPrice: "1.000.000",
    description: "Bố côn bền bỉ giúp truyền động hiệu quả.",
    rating: 4,
    category: "Ly hợp",
  },
  {
    img: img10,
    name: "Bơm Xăng",
    brand: "Bosch",
    price: "1.500.000",
    description: "Bơm xăng bền bỉ, cung cấp nhiên liệu ổn định cho động cơ.",
    rating: 5,
    category: "Hệ thống nhiên liệu",
  },
  {
    img: img11,
    name: "Lọc Dầu",
    brand: "Mann Filter",
    price: "450.000",
    description: "Lọc dầu cao cấp giúp giữ động cơ sạch sẽ.",
    rating: 4,
    category: "Lọc dầu",
  },
  {
    img: img12,
    name: "Dầu Hộp Số",
    brand: "Liqui Moly",
    price: "700.000",
    description: "Dầu hộp số giúp bôi trơn và bảo vệ hộp số.",
    rating: 5,
    category: "Dầu hộp số",
  },
];

const categories = [
  "Tất cả sản phẩm",
  "Dầu nhớt",
  "Hệ thống phanh",
  "Hệ thống đánh lửa",
  "Lọc gió",
  "Ắc quy",
  "Dung dịch làm mát",
  "Dây curoa",
  "Ly hợp",
  "Hệ thống nhiên liệu",
  "Lọc dầu",
  "Dầu hộp số",
];

const brands = [
  "Castrol",
  "Brembo",
  "NGK",
  "K&N",
  "GS Battery",
  "Prestone",
  "Gates",
  "Motul",
  "Sachs",
  "Bosch",
  "Mann Filter",
  "Liqui Moly",
];

const Category = () => {
  const [filters, setFilters] = useState({
    selectedCategory: "Tất cả sản phẩm",
    minPrice: "",
    maxPrice: "",
    selectedBrand: "",
    sortOrder: "",
  });
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [totalProducts, setTotalProducts] = useState(products.length);

  useEffect(() => {
    applyFilters();
  }, [filters, currentPage]);

  const applyFilters = () => {
    const { selectedCategory, minPrice, maxPrice, selectedBrand, sortOrder } =
      filters;
    const newFilteredProducts = products.filter((product) => {
      const productPrice = parseInt(product.price.replace(".", ""));
      return (
        (selectedCategory === "Tất cả sản phẩm" ||
          product.category === selectedCategory) &&
        productPrice >= (minPrice ? parseInt(minPrice) : 0) &&
        productPrice <= (maxPrice ? parseInt(maxPrice) : Infinity) &&
        (selectedBrand === "" || product.brand === selectedBrand)
      );
    });

    if (sortOrder) {
      newFilteredProducts.sort((a, b) => {
        if (sortOrder === "asc") {
          return (
            parseInt(a.price.replace(".", "")) -
            parseInt(b.price.replace(".", ""))
          );
        } else if (sortOrder === "desc") {
          return (
            parseInt(b.price.replace(".", "")) -
            parseInt(a.price.replace(".", ""))
          );
        } else if (sortOrder === "ratingAsc") {
          return a.rating - b.rating;
        } else if (sortOrder === "ratingDesc") {
          return b.rating - a.rating;
        }
        return 0;
      });
    }

    setTotalProducts(newFilteredProducts.length);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = newFilteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    setFilteredProducts(currentProducts);
  };

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === "selectedCategory") {
      setFilters((prev) => ({
        ...prev,
        selectedBrand: "",
        minPrice: "",
        maxPrice: "",
      }));
    }
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex p-4 font-[Prata] bg-white min-h-screen">
      <div className="hidden lg:block w-1/6 p-3 bg-[#B3E5FC] rounded-lg shadow-md">
        <h2 className="text-md font-semibold mb-3 text-left">Danh Mục</h2>
        <ul className="space-y-2 text-left text-sm">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer p-2 rounded-md transition-all duration-200 ${
                filters.selectedCategory === category
                  ? "bg-blue-300 font-semibold"
                  : "hover:bg-blue-200"
              }`}
              onClick={() => handleChange("selectedCategory", category)}
            >
              {category}
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <h3 className="text-md font-semibold text-left">Khoảng Giá</h3>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="number"
              placeholder="Từ"
              className="w-1/2 p-2 border rounded-md text-xs"
              value={filters.minPrice}
              onChange={(e) => handleChange("minPrice", e.target.value)}
            />
            <input
              type="number"
              placeholder="Đến"
              className="w-1/2 p-2 border rounded-md text-xs"
              value={filters.maxPrice}
              onChange={(e) => handleChange("maxPrice", e.target.value)}
            />
          </div>
          <button
            className="mt-2 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs transition duration-200"
            onClick={applyFilters}
          >
            Áp dụng
          </button>
        </div>
        <div className="mt-3">
          <h3 className="text-md font-semibold text-left">Thương Hiệu</h3>
          <ul className="space-y-2 text-left text-sm">
            {brands.map((brand) => (
              <li
                key={brand}
                className={`cursor-pointer p-2 rounded-md transition-all duration-200 ${
                  filters.selectedBrand === brand
                    ? "bg-blue-300 font-semibold"
                    : "hover:bg-blue-200"
                }`}
                onClick={() => handleChange("selectedBrand", brand)}
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full lg:w-5/6 p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{filters.selectedCategory}</h2>
          <select
            className="p-2 border rounded-md text-xs"
            value={filters.sortOrder}
            onChange={(e) => handleChange("sortOrder", e.target.value)}
          >
            <option value="">Sắp xếp</option>
            <option value="asc">Giá thấp đến cao</option>
            <option value="desc">Giá cao đến thấp</option>
            <option value="ratingAsc">Đánh giá thấp đến cao</option>
            <option value="ratingDesc">Đánh giá cao đến thấp</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.name} {...product} />
          ))}
        </div>
        {/* Phân trang */}
        <div className="flex flex-wrap justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-3 py-2 border rounded-md text-sm md:text-base ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
