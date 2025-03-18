import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const Top = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeVisible = window.scrollY > 300;
      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Lên đầu trang"
      className={`fixed bottom-2.5 right-2.5 md:bottom-4 md:right-4 bg-[#FF6B6B] text-[#FFFFFF] 
      shadow-md p-1.5 md:p-2 rounded-full transition-all duration-300 flex items-center justify-center
      hover:bg-[#E63946] hover:shadow-lg active:scale-90 font-merriweather
      ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp size={16} className="md:size-18" />
    </button>
  );
};

export default Top;
