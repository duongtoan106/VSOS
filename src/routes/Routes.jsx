import { Route, Routes } from "react-router-dom";
import Layout from "@/containers/Layouts/Layout";
import HomeLayout from "@/containers/Layouts/HomeLayout";
import LayoutLanding from "@/components/landingPage/page/LayoutLanding";
import MainLayout from "@/components/dashboard/MainLayout";
import Login from "@/containers/Login";
import Register from "@/containers/Register";
import Category from "@/containers/Category";
import Order from "@/containers/Order";
import Cart from "@/containers/Cart";
import PrivateRoleBasedRoute from "./PrivateRoleBasedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomeLayout />} />
        <Route path="category" element={<Category />} />
        <Route path="order" element={<Order />} />
        <Route path="cart" element={<Cart />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <PrivateRoleBasedRoute>
            <MainLayout />
          </PrivateRoleBasedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/landingPage" element={<LayoutLanding />} />
    </Routes>
  );
};

export default AppRoutes;
