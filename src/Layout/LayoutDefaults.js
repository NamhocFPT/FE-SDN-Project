import React, { useState } from "react";
import "./LayoutDefaults.scss";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import CartBadge from "../components/CartBadge.jsx";
import { useAuth } from "../context/AuthContext";

const LayoutDefaults = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
      setSearchTerm("");
    } else {
      navigate(`/products`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="layout-default">
      <header className="header">
        <div className="container header__container">
          <div className="header__logo">
            <Link to="/">My E-Shop</Link>
          </div>

          <nav className="header__nav">
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Trang Chủ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Sản Phẩm
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sale"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Khuyến Mãi
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Liên Hệ
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="header__actions">
            <div className="header__search">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={handleSearch}>🔍</button>
            </div>
            <CartBadge />
            {isAuthenticated ? (
              <div className="header__user-auth">
                <Link
                  to="/orders"
                  className="header__user-icon"
                  title="Đơn hàng của tôi"
                >
                  📦
                </Link>
                <button
                  type="button"
                  className="header__logout-btn"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  🚪
                </button>
              </div>
            ) : (
              <Link to="/login" className="header__user-icon" title="Đăng nhập">
                👤
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer__main">
            <div className="footer__column">
              <h4>Về My E-Shop</h4>
              <p>
                Chúng tôi cung cấp những sản phẩm chất lượng tốt nhất với giá cả
                phải chăng. Sự hài lòng của bạn là ưu tiên hàng đầu của chúng
                tôi.
              </p>
            </div>
            <div className="footer__column">
              <h4>Hỗ trợ khách hàng</h4>
              <ul>
                <li>
                  <Link to="/faq">Câu hỏi thường gặp</Link>
                </li>
                <li>
                  <Link to="/shipping">Chính sách giao hàng</Link>
                </li>
                <li>
                  <Link to="/returns">Chính sách đổi trả</Link>
                </li>
              </ul>
            </div>
            <div className="footer__column">
              <h4>Liên hệ</h4>
              <ul>
                <li>Email: support@myeshop.com</li>
                <li>Hotline: 1900 1234</li>
                <li>Địa chỉ: Sơn Tây, Hà Nội, Việt Nam</li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p>Copyright © 2025 by Nguyen Hoai Nam. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutDefaults;
