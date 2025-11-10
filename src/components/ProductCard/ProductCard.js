import React from 'react';
// 1. Thay thế Link bằng useNavigate
import { useNavigate } from 'react-router-dom';
import './ProductCard.scss';

// Hàm định dạng tiền tệ (Giữ nguyên)
const formatCurrency = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) return ''; // Xử lý trường hợp không phải số
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const ProductCard = ({ food }) => {
    const navigate = useNavigate();

    // 🎯 Sử dụng slug để điều hướng
    const identifier = food.slug;

    // Hàm xử lý khi click vào bất cứ đâu trên thẻ
    const handleCardClick = () => {
        // 2. Sử dụng useNavigate để chuyển hướng đến trang chi tiết
        // Đường dẫn thống nhất với Router: /products/:slug
        navigate(`/products/${identifier}`);
    };

    // Hàm xử lý cho nút "Thêm vào giỏ"
    const handleAddToCart = (e) => {
        // 3. NGĂN CHẶN SỰ KIỆN NỔI BỌT
        e.stopPropagation();
        e.preventDefault();

        // TODO: Logic thêm vào giỏ hàng thực tế
        console.log(`Đã thêm món ${food.name} vào giỏ hàng.`);
        alert(`Đã thêm ${food.name} vào giỏ!`);
    };

    // Nếu dữ liệu không hợp lệ, không render
    if (!food || !food.slug || !food.images || food.images.length === 0) return null;

    return (
        // 4. BỌC TOÀN BỘ DIV BẰNG SỰ KIỆN onClick
        <div
            className="product-card"
            onClick={handleCardClick}
            role="link" // Cho người dùng biết đây là một liên kết
            tabIndex={0} // Có thể focus bằng bàn phím
        >
            {/* Ảnh, không còn là Link nữa */}
            <div className="product-card__image-link">
                {food.salePrice && <span className="product-card__sale-badge">Sale</span>}
                <img src={food.images[0]} alt={food.name} />
            </div>

            <div className="product-card__info">
                {/* Tên sản phẩm, không còn là Link nữa */}
                <h3 className="product-card__name">
                    {food.name}
                </h3>

                <p className="product-card__description">{food.description}</p>

                <div className="product-card__price">
                    {food.salePrice && food.price ? ( // Kiểm tra cả hai giá trị
                        <>
                            <span className="product-card__sale-price">{formatCurrency(food.salePrice)}</span>
                            <span className="product-card__original-price">{formatCurrency(food.price)}</span>
                        </>
                    ) : (
                        <span>{formatCurrency(food.price)}</span>
                    )}
                </div>

                {/* 5. NÚT THÊM VÀO GIỎ PHẢI CÓ stopPropagation() */}
                <button
                    className="product-card__button"
                    onClick={handleAddToCart}
                >
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
};

export default ProductCard;