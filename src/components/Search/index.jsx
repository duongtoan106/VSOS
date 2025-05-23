import { useState, useEffect } from "react";
import { fetchProducts } from "../../constant/api";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const highlightMatch = (text, keyword) => {
    const keywords = removeVietnameseTones(keyword.toLowerCase()).split(" ");
    const words = text.split(" ");

    return words.map((word, i) => {
      const normalized = removeVietnameseTones(word.toLowerCase());
      const isMatch = keywords.some((kw) => normalized.includes(kw));

      return (
        <span
          key={i}
          className={isMatch ? "font-bold text-blue-600" : undefined}
        >
          {i > 0 && " "}
          {word}
        </span>
      );
    });
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered([]);
      return;
    }

    const normalizedQuery = removeVietnameseTones(query.toLowerCase());

    const result = products.filter((p) =>
      removeVietnameseTones(p.name.toLowerCase()).includes(normalizedQuery)
    );
    setFiltered(result);
  }, [query, products]);

  const handleSelect = (productId) => {
    setQuery("");
    setFiltered([]);
    navigate(`/product/${productId}`);
  };

  return (
    <div className="relative hidden md:block w-64 lg:w-80">
      {/* Search Bar */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 border border-gray-300 focus-within:border-gray-500 transition-all"
      >
        <input
          type="text"
          placeholder="Tìm sản phẩm bạn mong muốn..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 text-sm"
        />
        <button
          type="submit"
          className="text-gray-500 hover:text-black transition-all"
        >
          <SearchIcon size={18} />
        </button>
      </form>

      {/* Gợi ý kết quả */}
      {filtered.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded mt-2 max-h-64 overflow-y-auto z-50">
          {filtered.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="flex items-center gap-3 p-2 hover:bg-blue-100 cursor-pointer transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => (e.target.src = "/fallback.jpg")}
                className="w-10 h-10 rounded object-cover border"
              />
              <div className="text-sm text-left">
                <p className="font-medium text-gray-800 line-clamp-1">
                  {highlightMatch(item.name, query)}
                </p>
                <p className="text-gray-500 text-xs">
                  {Number(item.price).toLocaleString()}₫
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
