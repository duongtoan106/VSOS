import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      aria-label="Go to homepage"
      className="w-28 h-28 rounded-full overflow-hidden transition-transform duration-300 group hover:scale-105"
    >
      <img className="w-full h-full object-contain" src={logo} alt="Logo" />
    </button>
  );
};

export default Logo;
