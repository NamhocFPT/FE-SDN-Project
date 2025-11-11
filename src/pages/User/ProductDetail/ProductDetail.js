import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFoodDetail } from '../../../services/ProductService.js';
import './ProductDetail.scss';

const ProductDetail = () => {
    // Lấy tham số động (id hoặc slug) từ URL
    const { idOrSlug } = useParams();

    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State cho số lượng sản phẩm muốn mua
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!idOrSlug) {
            setError("Thiếu tham số ID/Slug sản phẩm.");
            setLoading(false);
            return;
        }

        const fetchFoodDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                // 🚀 Gọi hàm lấy chi tiết sản phẩm
                const foodData = await getFoodDetail(idOrSlug);
                setFood(foodData);
            } catch (err) {
                setError(err.message);
                console.error(`Lỗi khi tải chi tiết món ăn ${idOrSlug}:`, err);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodDetail();
    }, [idOrSlug]);

    // Xử lý khi nhấn nút Thêm vào giỏ hàng (chỉ là placeholder)
    const handleAddToCart = () => {
        if (food) {
            console.log(`Đã thêm ${quantity} x ${food.name} vào giỏ hàng.`);
            // TODO: Triển khai logic Redux/Context để thêm sản phẩm vào giỏ hàng thực tế
            alert(`Đã thêm ${quantity} x ${food.name} vào giỏ hàng!`);
        }
    };

    if (loading) {
        return <div className="product-detail-page container"><div className="status-message">Đang tải chi tiết món ăn...</div></div>;
    }

    if (error) {
        return <div className="product-detail-page container"><div className="status-message error">Lỗi: {error}</div></div>;
    }

    if (!food) {
        return <div className="product-detail-page container"><div className="status-message">Không tìm thấy món ăn này.</div></div>;
    }

    return (
        <div className="product-detail-page container">
            <div className="product-detail-grid">

                {/* Cột 1: Hình ảnh */}
                <div className="detail__image">
                    {/* 1. SỬA LỖI ẢNH: Truy cập food.images[0] */}
                    <img
                        src={food.images?.[0] || 'placeholder-default.jpg'}
                        alt={food.name}
                    />
                </div>

                {/* Cột 2: Thông tin chi tiết */}
                <div className="detail__info">
                    <h1>{food.name}</h1>
                    <p className="detail__price">
                        {(food.salePrice && food.salePrice > 0
                            ? food.salePrice
                            : food.price
                        ).toLocaleString('vi-VN')} VNĐ
                    </p>


                    <div className="detail__description">
                        <h3>Mô tả</h3>
                        <p>{food.description || "Chưa có mô tả chi tiết cho món ăn này."}</p>
                    </div>

                    <div className="detail__actions">
                        {/* ... (Quantity controls giữ nguyên) */}
                        <div className="quantity-control">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                            />
                            <button onClick={() => setQuantity(q => q + 1)}>+</button>
                        </div>

                        <button
                            className="add-to-cart-btn"
                            onClick={handleAddToCart}
                            // Tùy chọn: Vô hiệu hóa nút nếu hết hàng
                            disabled={!food.inStock}
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>

                    <div className="detail__meta">
                        <p>
                            <strong>Danh mục:</strong>
                            {/* 🎯 SỬA ĐỔI: Sử dụng Optional Chaining (?) để truy cập name */}
                            {/* food.categoryId?._id là ID, food.categoryId?.name là tên */}
                            {food.categoryId?.name || 'Chưa phân loại'}
                        </p>

                        {/* 3. SỬA LỖI TRẠNG THÁI: BE dùng food.inStock */}
                        <p>
                            <strong>Trạng thái:</strong>
                            {food.inStock ? (
                                <span style={{ color: 'green', fontWeight: 'bold' }}>Còn hàng</span>
                            ) : (
                                <span style={{ color: 'red', fontWeight: 'bold' }}>Hết hàng</span>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;