import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import các hàm service đã cập nhật
import { getFeaturedFoods, getCategoryList } from '../../../services/ProductService.js';

import './Home.scss';
import ProductCard from '../../../components/ProductCard/ProductCard.js';

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [categories, setCategories] = useState([]);
    const [featuredFoods, setFeaturedFoods] = useState([]);

    useEffect(() => {
        const fetchHomePageData = async () => {
            try {
                // 3. Sử dụng getFeaturedFoods(4) và getCategoryList()
                const [foodsData, categoriesData] = await Promise.all([
                    getFeaturedFoods(6), // Gọi đúng API Featured Foods với limit=4
                    getCategoryList()    // Gọi API Category mới
                ]);

                // 4. Cập nhật state với dữ liệu ĐÃ LỌC TỪ SERVER
                setFeaturedFoods(foodsData);
                setCategories(categoriesData);

            } catch (err) {
                // Xử lý lỗi (Nếu server trả về lỗi, nó sẽ được hiển thị ở đây)
                setError(err.message);
                console.error("Lỗi khi fetch dữ liệu trang chủ:", err);
            } finally {
                // Tắt loading
                setLoading(false);
            }
        };

        fetchHomePageData();
    }, []);

    // 5. Render giao diện dựa trên trạng thái loading và error
    if (loading) {
        return <div className="status-message">Đang tải trang...</div>;
    }

    if (error) {
        // Hiển thị lỗi từ Service (ví dụ: "Lỗi khi tải danh mục" hoặc lỗi từ BE)
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
                <h2>Món Ăn Nổi Bật</h2>
                <div className="product-grid">
                    {Array.isArray(featuredFoods) && featuredFoods.map(food => (
                        <ProductCard key={food._id} food={food} />
                    ))}
                    {featuredFoods.length === 0 && <p>Không có món ăn nổi bật nào.</p>}
                </div>
            </section>
        </div>
    );
};

export default HomePage;