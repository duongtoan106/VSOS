import Header from "../../components/Header/index";
// import Footer from "../../components/landingPage/page/FooterLanding";
import Top from "../../components/Button/Top";
import { Outlet } from "react-router-dom";
import FooterLanding from "../../components/landingPage/page/FooterLanding";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Top />
      <FooterLanding />
    </>
  );
};

export default Layout;
