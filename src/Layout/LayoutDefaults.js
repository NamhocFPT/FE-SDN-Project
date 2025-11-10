import React, { useState } from 'react';
import './LayoutDefaults.scss';
// 1. Import useNavigate để điều hướng
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
// import CartMini from '../../components/CartMini';


const LayoutDefaults = () => {
    // 2. Sử dụng useNavigate
    const navigate = useNavigate();

    // 3. State để lưu giá trị tìm kiếm
    const [searchTerm, setSearchTerm] = useState('');

    // 4. Hàm xử lý khi nhấn nút tìm kiếm hoặc Enter
    const handleSearch = () => {
        const trimmedSearchTerm = searchTerm.trim();
        if (trimmedSearchTerm) {
            // 🚀 Điều hướng đến trang /products và thêm query parameter 'search'
            // Ví dụ: /products?search=pizza
            navigate(`/products?search=${encodeURIComponent(trimmedSearchTerm)}`);
            // Tùy chọn: Xóa nội dung input sau khi tìm kiếm
            setSearchTerm('');
        } else {
            // Nếu chuỗi rỗng, điều hướng về trang sản phẩm chung
            navigate(`/products`);
        }
    };

    // 5. Xử lý khi nhấn Enter trong input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

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
                            {/* Đã có sẵn link đến /products */}
                            <li><NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>Sản Phẩm</NavLink></li>
                            <li><NavLink to="/sale" className={({ isActive }) => isActive ? "active" : ""}>Khuyến Mãi</NavLink></li>
                            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Liên Hệ</NavLink></li>
                        </ul>
                    </nav>

                    {/* Phần Hành động (Search, Cart, User) */}
                    <div className='header__actions'>
                        <div className="header__search">
                            {/* 🎯 SỬA ĐỔI INPUT VÀ BUTTON TÌM KIẾM */}
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={handleKeyPress} // Bắt sự kiện Enter
                            />
                            <button onClick={handleSearch}>🔍</button>
                        </div>
                        {/* <CartMini /> */}
                        <Link to="/login" className="header__user-icon">
                            👤
                        </Link>
                    </div>
                </div>
            </header>

            <main className='main-content'>
                <div className='container'>
                    <Outlet />
                </div>
            </main>

            <footer className='footer'>
                {/* ... giữ nguyên Footer ... */}
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