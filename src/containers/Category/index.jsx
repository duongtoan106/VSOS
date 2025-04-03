import { useState, useEffect } from "react";
import { fetchProducts } from "../../constant/api";
import Card from "../../containers/Layouts/Card";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
        setTotalProducts(data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [currentPage]);

  const applyFilters = () => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    setFilteredProducts(currentProducts);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex p-6 font-[Prata] bg-[#f5e6da] min-h-screen">
      <div className="w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2">
          Danh Sách Sản Phẩm
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex flex-wrap justify-center mt-6 gap-3">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 border rounded-lg text-sm md:text-base font-medium transition duration-300 ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
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
