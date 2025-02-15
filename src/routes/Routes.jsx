import { Route, Routes } from "react-router-dom";
// import PrivateRoleBasedRoute from "./PrivateRoleBasedRoute";
import Layout from "@/containers/Layouts/Layout";
import Login from "@/containers/Login/index";
import Register from "@/containers/Register/index";

//luồng ruoting chính sẽ là component này
const AppRoutes = () => {
  return (
    <Routes>
      {/* Route chính có Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
