const Button = ({ title, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`font-merriweather px-3 py-1.5 md:px-4 md:py-2 border-2 border-transparent 
      bg-[#FF6B6B] text-black font-medium rounded-full shadow-md transition-all 
      duration-300 ease-in-out hover:bg-[#E63946] hover:shadow-lg active:scale-95 
      text-xs md:text-sm focus:outline-none focus:ring-2  ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
