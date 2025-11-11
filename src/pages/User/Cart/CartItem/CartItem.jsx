import React from 'react';
import './CartItem.scss'; // Import SCSS riêng

const CartItem = ({ item, onQuantityChange, onRemove, onSelect, isSelected }) => {
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="cart-item">
            <input
                type="checkbox"
                className="cart-item-checkbox"
                checked={isSelected}
                onChange={(e) => onSelect(item.id, e.target.checked)}
            />
            
            <img src={item.image} alt={item.name} className="cart-item-image" />
            
            <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">Giá: {formatCurrency(item.unitPrice)}</p>
                
                <div className="cart-item-quantity-control">
                    <button
                        onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                    >
                        -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                
                <p className="cart-item-total">Tổng: {formatCurrency(item.lineTotal)}</p>
                
                <button className="cart-item-remove" onClick={() => onRemove(item.id)}>Xóa</button>
            </div>
        </div>
    );
};

export default CartItem;