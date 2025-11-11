import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserMenu = () => {
  const { isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  if (!isAuthenticated) {
    return (
      <Link to="/login" className="header__user-icon" title="Đăng nhập">
        👤
      </Link>
    );
  }

  return (
    <div className="user-menu" ref={ref}>
      <button
        type="button"
        className="user-menu__button"
        title="Tài khoản"
        onClick={() => setOpen((v) => !v)}
      >
        👤
      </button>
      {open && (
        <div className="user-menu__dropdown">
          <Link to="/orders" className="user-menu__item" onClick={() => setOpen(false)}>
            📦 Đơn hàng của tôi
          </Link>
          <button
            type="button"
            className="user-menu__item user-menu__logout"
            onClick={() => {
              setOpen(false);
              logout();
              navigate("/login");
            }}
          >
            🚪 Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
