import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Top from "../../components/Button/Top";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Top />
      <Footer />
    </>
  );
};

export default Layout;
