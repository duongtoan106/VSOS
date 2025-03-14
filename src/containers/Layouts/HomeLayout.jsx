import Carousel from "../../components/Carousel/Carousel";
import Home from "../../containers/Home/index";
import MenuCard from "../Home/MenuCard";
const HomeLayout = () => {
  return (
    <>
      <Carousel />
      <Home />
      <MenuCard />
    </>
  );
};

export default HomeLayout;
