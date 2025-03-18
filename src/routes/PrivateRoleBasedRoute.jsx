import { Navigate } from "react-router-dom";

const PrivateRoleBasedRoute = ({ children }) => {
  const allowedRoles = ["ADMIN", "MANAGER", "STAFF"];
  const userRole = localStorage.getItem("role");

  if (!allowedRoles.includes(userRole)) {
    return (
      <h2 style={{ color: "red", textAlign: "center" }}>
        🚫 Bạn không có quyền truy cập vào trang này!
      </h2>
    );
  }

  return children;
};

export default PrivateRoleBasedRoute;
