import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const Top = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 bg-[#FFDCAB] text-[#AB6B2E] shadow-lg 
      p-3 rounded-full transition-all duration-300 flex items-center justify-center
      hover:bg-[#FFC785] hover:shadow-xl active:scale-90 
      ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp size={22} />
    </button>
  );
};

export default Top;
