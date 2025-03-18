import { Route, Routes } from "react-router-dom";
import Layout from "@/containers/Layouts/Layout";
import Login from "@/containers/Login/index";
import Register from "@/containers/Register/index";
import HomeLayout from "../containers/Layouts/HomeLayout";
import Category from "../containers/Category/index";
import Order from "../containers/Order/index";
import LayoutLanding from "../components/landingPage/page/LayoutLanding";
import MainLayout from "../components/dashboard/MainLayout";
import PrivateRoleBasedRoute from "./PrivateRoleBasedRoute"; // Import chặn role

const AppRoutes = () => {
  return (
    <Routes>
      {/* Route chính có Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category" element={<Category />} />
        <Route path="/order" element={<Order />} />

        {/* Chặn truy cập dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoleBasedRoute>
              <MainLayout />
            </PrivateRoleBasedRoute>
          }
        />
      </Route>
      <Route path="/landingPage" element={<LayoutLanding />} />
    </Routes>
  );
};

export default AppRoutes;
