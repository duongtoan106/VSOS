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
        const filteredData = data.filter(
          (product) => product.status === "TRUE" && product.pending === "FALSE"
        );
        setProducts(filteredData);
        setFilteredProducts(filteredData.slice(0, productsPerPage));
        setTotalProducts(filteredData.length);
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
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-center bg-[#f5e6da] min-h-screen font-[Prata] p-6">
      <div className="w-full max-w-[1280px] bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 border-b pb-4">
          Danh Sách Sản Phẩm
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
