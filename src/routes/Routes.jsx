import { Route, Routes } from "react-router-dom";
// import PrivateRoleBasedRoute from "./PrivateRoleBasedRoute";
import Layout from "@/containers/Layouts/Layout";

import Login from "@/containers/Login/index";
import Register from "@/containers/Register/index";
import LayoutLanding from "../components/landingPage/page/LayoutLanding";

//luồng ruoting chính sẽ là component này
const AppRoutes = () => {
  return (
    <Routes>
      {/* Route chính có Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/landingPage" element={<LayoutLanding />} />
    </Routes>
  );
};

export default AppRoutes;
