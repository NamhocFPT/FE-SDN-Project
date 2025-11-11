import React from "react";
import { Link, Outlet } from "react-router-dom";
import './AdminLayout.scss';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-title">Admin Panel</div>
        <nav className="nav-links">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/users">Users</Link>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
