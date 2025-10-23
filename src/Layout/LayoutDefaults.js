// src/components/Layout/LayoutDefaults.js

import React from 'react';
import './LayoutDefaults.scss';
import { Link, NavLink, Outlet } from 'react-router-dom';
// import CartMini from '../../components/CartMini';


const LayoutDefaults = () => {
    
    return (
        <div className='layout-default'>
            <header className='header'>
                <div className='container header__container'>
                    {/* Phần Logo */}
                    <div className='header__logo'>
                        <Link to='/'>My E-Shop</Link>
                    </div>

                    {/* Phần Điều hướng (Navigation) */}
                    <nav className='header__nav'>
                        <ul>
                            <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Trang Chủ</NavLink></li>
                            <li><NavLink to="/blog" className={({ isActive }) => isActive ? "active" : ""}>Blog</NavLink></li>
                            <li><NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>Sản Phẩm</NavLink></li>
                            <li><NavLink to="/sale" className={({ isActive }) => isActive ? "active" : ""}>Khuyến Mãi</NavLink></li>
                            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Liên Hệ</NavLink></li>
                        </ul>
                    </nav>

                    {/* Phần Hành động (Search, Cart, User) */}
                    <div className='header__actions'>
                        <div className="header__search">
                            <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                            {/* <button><FiSearch /></button> */}
                            <button>🔍</button> {/* Tạm dùng emoji nếu chưa có thư viện icon */}
                        </div>
                        {/* <CartMini /> */}
                        <Link to="/login" className="header__user-icon">
                            {/* <FiUser /> */}
                            👤 {/* Tạm dùng emoji */}
                        </Link>
                    </div>
                </div>
            </header>

            <main className='main-content'>
                <div className='container'>
                    {/* Nội dung của các trang con sẽ được render ở đây */}
                    <Outlet />
                </div>
            </main>

            <footer className='footer'>
                <div className='container'>
                    <div className="footer__main">
                        <div className="footer__column">
                            <h4>Về My E-Shop</h4>
                            <p>Chúng tôi cung cấp những sản phẩm chất lượng tốt nhất với giá cả phải chăng. Sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi.</p>
                        </div>
                        <div className="footer__column">
                            <h4>Hỗ trợ khách hàng</h4>
                            <ul>
                                <li><Link to="/faq">Câu hỏi thường gặp</Link></li>
                                <li><Link to="/shipping">Chính sách giao hàng</Link></li>
                                <li><Link to="/returns">Chính sách đổi trả</Link></li>
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
                    <div className='footer__bottom'>
                        <p>Copyright © 2025 by Nguyen Hoai Nam. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LayoutDefaults;