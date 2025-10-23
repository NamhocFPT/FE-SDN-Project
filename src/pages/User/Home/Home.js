import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 1. Import các hàm service thay vì data.json
import { getProductList, getCategoryList } from '../../../services/ProductService.js'; // Sửa lại đường dẫn nếu cần

import './Home.scss';
import ProductCard from '../../../components/ProductCard/ProductCard.js';

const HomePage = () => {
    // 2. Thêm state cho loading và error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State cho dữ liệu
    const [categories, setCategories] = useState([]);
    const [featuredFoods, setFeaturedFoods] = useState([]);

    useEffect(() => {
        const fetchHomePageData = async () => {
            try {
                // 3. Sử dụng Promise.all để gọi nhiều API song song cho hiệu quả
                const [foodsResponse, categoriesResponse] = await Promise.all([
                    getProductList(),
                    getCategoryList()
                ]);

                // 4. Cập nhật state với dữ liệu từ API
                setFeaturedFoods(foodsResponse.slice(0, 4)); // Vẫn chỉ lấy 4 sản phẩm nổi bật
                setCategories(categoriesResponse);

            } catch (err) {
                // Xử lý nếu có lỗi xảy ra
                setError(err.message);
                console.error("Lỗi khi fetch dữ liệu trang chủ:", err);
            } finally {
                // Luôn tắt loading sau khi hoàn tất
                setLoading(false);
            }
        };

        fetchHomePageData();
    }, []); // Mảng rỗng đảm bảo chỉ gọi 1 lần

    // 5. Render giao diện dựa trên trạng thái loading và error
    if (loading) {
        return <div className="status-message">Đang tải trang...</div>;
    }

    if (error) {
        return <div className="status-message error">Không thể tải dữ liệu: {error}</div>;
    }

    // Giao diện chính khi đã có dữ liệu
    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero__content">
                    <h1>Món Ngon Mỗi Ngày</h1>
                    <p>Khám phá và đặt hàng những món ăn yêu thích của bạn ngay hôm nay!</p>
                    <Link to="/products" className="hero__button">Xem Thực Đơn</Link>
                </div>
            </section>

            <section className="home-section">
                <h2>Danh Mục Món Ăn</h2>
                <div className="category-list">
                    {categories.map(category => (
                        <Link key={category._id} to={`/categories/${category.slug}`} className="category-item">
                            {category.name}
                        </Link>
                    ))}
                </div>
            </section>

            <section className="home-section">
                <h2>Món Ăn Nổi Bật</h2>
                <div className="product-grid">
                    {featuredFoods.map(food => (
                        <ProductCard key={food._id} food={food} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;