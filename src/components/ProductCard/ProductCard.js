import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';

// Hàm định dạng tiền tệ
const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return amount;
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const ProductCard = ({ food }) => {
    return (
        <div className="product-card">
            <Link to={`/foods/${food.slug}`} className="product-card__image-link">
                {food.salePrice && <span className="product-card__sale-badge">Sale</span>}
                <img src={food.images[0]} alt={food.name} />
            </Link>
            <div className="product-card__info">
                <h3 className="product-card__name">
                    <Link to={`/foods/${food.slug}`}>{food.name}</Link>
                </h3>
                <p className="product-card__description">{food.description}</p>
                <div className="product-card__price">
                    {food.salePrice ? (
                        <>
                            <span className="product-card__sale-price">{formatCurrency(food.salePrice)}</span>
                            <span className="product-card__original-price">{formatCurrency(food.price)}</span>
                        </>
                    ) : (
                        <span>{formatCurrency(food.price)}</span>
                    )}
                </div>
                <button className="product-card__button">Thêm vào giỏ</button>
            </div>
        </div>
    );
};

export default ProductCard;