import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './AdminLayout.scss';

const AdminLayout = () => {
    const location = useLocation();

    return (
        <div className="admin-layout">
            <div className="admin-sidebar">
                <div className="admin-logo">
                    <h2>Admin Panel</h2>
                </div>
                <nav className="admin-nav">
                    <Link 
                        to="/admin" 
                        className={location.pathname === '/admin' ? 'active' : ''}
                    >
                        Dashboard
                    </Link>
                    <Link 
                        to="/admin/foods" 
                        className={location.pathname === '/admin/foods' ? 'active' : ''}
                    >
                        Quản lý Food
                    </Link>
                </nav>
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <h1>Quản trị hệ thống</h1>
                </div>
                <div className="admin-main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
