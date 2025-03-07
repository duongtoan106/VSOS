import { Route, Routes } from "react-router-dom";
// import PrivateRoleBasedRoute from "./PrivateRoleBasedRoute";
import Layout from "@/containers/Layouts/Layout";

import Login from "@/containers/Login/index";
import Register from "@/containers/Register/index";

import HomeLayout from "../containers/Layouts/HomeLayout";
import Category from "../containers/Category";

import LayoutLanding from "../components/landingPage/page/LayoutLanding";
import MainLayout from "../components/dashboard/MainLayout";

//luồng ruoting chính sẽ là component này
const AppRoutes = () => {
  return (
    <Routes>
      {/* Route chính có Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category" element={<Category />} />
        <Route path="/dashboard" element={<MainLayout />} />
      </Route>
      <Route path="/landingPage" element={<LayoutLanding />} />
    </Routes>
  );
};

export default AppRoutes;
