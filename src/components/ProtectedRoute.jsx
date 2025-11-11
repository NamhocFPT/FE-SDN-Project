// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- 1. Import useAuth

const ProtectedRoute = ({ children, roles }) => {
  // 2. Lấy state từ Context, KHÔNG đọc localStorage
  const { isAuthenticated, user, loading } = useAuth(); 
  const location = useLocation();

  // 3. Xử lý trạng thái Loading (RẤT QUAN TRỌNG)
  // Trong khi context đang kiểm tra localStorage, ta phải chờ
  if (loading) {
    return <div>Đang kiểm tra quyền truy cập...</div>; // Hoặc component Spinner
  }

  // 4. Kiểm tra đã đăng nhập chưa (dùng isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 5. Kiểm tra vai trò (dùng user từ context)
  if (roles && !roles.includes(user.role)) {
    // Đã đăng nhập nhưng sai role (ví dụ user vào /admin)
    return <Navigate to="/404" replace />; // Chuyển về 404 hoặc trang chủ
  }

  // 6. Nếu mọi thứ OK, cho phép vào
  return children;
};

export default ProtectedRoute;