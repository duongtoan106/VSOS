import { Route, Routes } from "react-router-dom";
// import PrivateRoleBasedRoute from "./PrivateRoleBasedRoute";
import Layout from "@/containers/Layouts/Layout";
import Login from "@/containers/Login/index";

//luồng ruoting chính sẽ là component này
const AppRoutes = () => {
  return (
    <Routes>
      {/* Route chính có Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
