import Carousel from "../../components/Carousel/Carousel";
import Home from "../../containers/Home/index";
import Menu from "../Home/Menu";
const HomeLayout = () => {
  return (
    <>
      <Carousel />
      <Home />
      <Menu />
    </>
  );
};

export default HomeLayout;
