import React from 'react';
import './CartSummary.scss'; // Import SCSS riêng

const CartSummary = ({ subtotal, selectedItemCount, onCheckout }) => {
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="cart-summary">
            <h2 className="cart-summary-title">Tóm Tắt Giỏ Hàng</h2>
            <div className="cart-summary-row">
                <span>Số lượng đã chọn:</span>
                <span>{selectedItemCount}</span>
            </div>
            
            <div className="cart-summary-row total">
                <span>Tổng tiền:</span>
                <span className="cart-summary-total-price">{formatCurrency(subtotal)}</span>
            </div>
            
            <button 
                className="checkout-button" 
                onClick={onCheckout} 
                disabled={selectedItemCount === 0}
            >
                Thanh Toán ({selectedItemCount})
            </button>
        </div>
    );
};

export default CartSummary;