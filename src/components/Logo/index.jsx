import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      aria-label="Go to homepage"
      role="button"
      className="w-28 h-28 flex items-center justify-center cursor-pointer rounded-full overflow-hidden hover:scale-105 focus-visible:outline-none transition-transform duration-300"
    >
      <img
        className="w-full h-full object-contain"
        src={logo}
        alt="Logo của VSOS"
      />
    </button>
  );
};

export default Logo;
