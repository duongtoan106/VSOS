import { Navigate } from "react-router-dom";

const PrivateRoleBasedRoute = ({ children }) => {
  const allowedRoles = ["ADMIN", "MANAGER", "STAFF"];
  const userRole = localStorage.getItem("role");

  // Kiểm tra nếu không có role hoặc role không hợp lệ
  if (!userRole || !allowedRoles.includes(userRole.toUpperCase())) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "Bạn không có quyền truy cập vào trang này!",
        }}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoleBasedRoute;
