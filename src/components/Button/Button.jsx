const Button = ({ title, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`font-prata px-6 py-2 border-2 border-transparent bg-[#FFDCAB] text-black 
        font-medium rounded-full shadow-md transition-all duration-300 ease-in-out 
        hover:bg-[#FFC785] hover:shadow-lg 
        active:scale-95 ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
