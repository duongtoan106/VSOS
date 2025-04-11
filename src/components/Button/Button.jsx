import { memo } from "react";

const Button = ({
  title,
  onClick = () => {},
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-merriweather px-3 py-1.5 md:px-4 md:py-2 border-2 border-transparent 
      text-black font-medium rounded-full shadow-md transition-all 
      duration-300 ease-in-out hover:shadow-lg active:scale-95 
      text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC785] ${className}`}
    >
      {title}
    </button>
  );
};

export default memo(Button);
