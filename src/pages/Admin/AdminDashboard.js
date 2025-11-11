import React from 'react';
import './AdminDashboard.scss';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h2>Dashboard</h2>
                <p>Chào mừng đến với trang quản trị</p>
            </div>
            
            <div className="dashboard-stats">
                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-utensils"></i>
                    </div>
                    <div className="stat-content">
                        <h3>150</h3>
                        <p>Tổng số món ăn</p>
                    </div>
                </div>
                
                
                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                    <div className="stat-content">
                        <h3>1,250</h3>
                        <p>Đơn hàng</p>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-content">
                        <h3>850</h3>
                        <p>Khách hàng</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
