import React from "react";
import { Navigate } from "react-router-dom";

// roles = ["admin"] hoặc ["user"]
const ProtectedRoute = ({ children, roles }) => {
  const user = JSON.parse(localStorage.getItem("user")); // giả sử lưu user vào localStorage khi login

  if (!user) {
    // chưa login → chuyển về login page
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // không có quyền
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
