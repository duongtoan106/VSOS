import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../constant/api";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../constant/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductDetails(id);
        setProduct(data);
      } catch (error) {
        setError("Lỗi khi lấy thông tin sản phẩm. Vui lòng thử lại.");
        console.error("Lỗi khi lấy sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    const storedUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    setIsAddingToCart(true);

    try {
      await addToCart(product, storedUserId, token);
      toast.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (number) =>
    new Intl.NumberFormat("vi-VN").format(number) + " ₫";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-[#3ABEF9] rounded-full animate-spin mb-4 shadow-md"></div>
        <p className="text-lg text-[#3ABEF9] font-medium animate-pulse">
          Đang tải sản phẩm...
        </p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  if (!product) {
    return (
      <div className="text-center text-lg text-gray-600">
        Sản phẩm không tồn tại.
      </div>
    );
  }

  const { image, name, description, price, quantity, status } = product;

  return (
    <div className="container mx-auto p-6 max-w-6xl min-h-screen flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-xl rounded-xl p-8 mb-10">
        {/* Hình ảnh */}
        <div className="relative flex justify-center items-center w-80 h-96">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 rounded-xl flex items-center justify-center animate-pulse">
              <div className="w-6 h-6 border-4 border-t-transparent border-gray-500 border-solid rounded-full animate-spin" />
            </div>
          )}

          <img
            className={`w-80 h-96 object-cover rounded-xl transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            src={image || "/src/assets/img/noImage.jpg"}
            alt={name}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col justify-between text-left space-y-6">
          <h1 className="text-4xl font-serif text-gray-900 font-bold">
            {name}
          </h1>

          <p className="text-lg text-gray-600">{description}</p>

          {/* Giá */}
          <div className="flex items-center gap-3 mt-4">
            <span className="font-semibold text-2xl text-green-600">
              {formatPrice(price)}
            </span>
          </div>

          {/* Số lượng */}
          {quantity !== undefined && (
            <p className="text-lg text-gray-700">
              <strong>Số lượng:</strong> {quantity}
            </p>
          )}

          {/* Trạng thái */}
          {status && (
            <p className="text-lg text-gray-700">
              <strong>Trạng thái:</strong>{" "}
              {status === "TRUE" ? "Còn hàng" : "Hết hàng"}
            </p>
          )}

          {/* Thêm vào giỏ hàng */}
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-[#D2B48C] px-6 py-3 rounded-lg cursor-pointer shadow-md hover:bg-[#C19A6B] transition-all mt-6 w-full text-white font-medium"
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <>
                <div className="w-6 h-6 border-4 border-t-transparent border-white border-solid rounded-full animate-spin mr-2" />
                Đang thêm...
              </>
            ) : (
              <>
                <FaShoppingCart size={20} className="mr-2" /> Thêm vào giỏ hàng
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer space */}
      <div className="mt-8"></div>
    </div>
  );
};

export default CardDetail;
