import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; // Để lấy thông tin user
import { createOrder } from '../../../services/OrderService'; // Service mới
import './CheckoutPage.scss';

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth(); // Lấy user đang đăng nhập từ context

    // 1. Lấy dữ liệu được gửi từ CartPage
    const data = location.state;

    // Nếu không có dữ liệu (ví dụ: gõ /checkout trực tiếp), quay về giỏ hàng
    if (!data || !data.items || data.items.length === 0) {
        return <Navigate to="/cart" replace />;
    }

    const { items, subtotal } = data;
    const shippingFee = 30000; // Phí ship (ví dụ cố định)
    const grandTotal = subtotal + shippingFee;

    // 2. State cho form thông tin giao hàng
    // Tự động điền thông tin nếu user đã có
    const [shippingAddress, setShippingAddress] = useState({
        fullName: user?.fullName || '',
        phone: user?.phone || '', // Giả sử user object có 'phone'
        address: user?.address || '', // Giả sử user object có 'address'
        city: user?.city || 'Hà Nội',
        notes: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' hoặc 'card'
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({ ...prev, [name]: value }));
    };

    // 3. Hàm xử lý khi bấm "Đặt Hàng"
    const handlePlaceOrder = async () => {
        if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address) {
            alert('Vui lòng điền đầy đủ thông tin giao hàng.');
            return;
        }
        setIsPlacingOrder(true);
        try {
            const orderData = {
                shippingAddress,
                paymentMethod,
                items: items.map(item => ({ // Chỉ gửi các thông tin cần thiết
                    foodId: item.foodId,
                    name: item.name,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    lineTotal: item.lineTotal
                })),
                amounts: {
                    subtotal: subtotal,
                    shipping: shippingFee,
                    grandTotal: grandTotal
                }
            };
            
            // Gọi API
            const createdOrder = await createOrder(orderData);
            
            // Thành công
            alert(`Đặt hàng thành công! Mã đơn hàng của bạn là: ${createdOrder.code}`);
            navigate('/'); // Chuyển về trang chủ

        } catch (error) {
            alert(`Có lỗi xảy ra: ${error.message}`);
            setIsPlacingOrder(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="checkout-page-container">
            <h1 className="checkout-page-title">Thanh Toán Đơn Hàng</h1>
            <div className="checkout-grid">
                
                {/* CỘT BÊN TRÁI: THÔNG TIN GIAO HÀNG */}
                <div className="shipping-form">
                    <h2>Thông tin giao hàng</h2>
                    <p>Đăng nhập với email: <strong>{user.email}</strong></p>
                    
                    <div className="form-group">
                        <label htmlFor="fullName">Họ và tên *</label>
                        <input type="text" id="fullName" name="fullName" value={shippingAddress.fullName} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại *</label>
                        <input type="tel" id="phone" name="phone" value={shippingAddress.phone} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Địa chỉ *</label>
                        <input type="text" id="address" name="address" value={shippingAddress.address} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Tỉnh / Thành phố</label>
                        <input type="text" id="city" name="city" value={shippingAddress.city} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Ghi chú (tùy chọn)</label>
                        <textarea id="notes" name="notes" value={shippingAddress.notes} onChange={handleInputChange}></textarea>
                    </div>

                    <h2>Phương thức thanh toán</h2>
                    <div className="payment-options">
                        <label className="payment-option">
                            <input type="radio" name="paymentMethod" value="cash" checked={paymentMethod === 'cash'} onChange={(e) => setPaymentMethod(e.target.value)} />
                            Thanh toán khi nhận hàng (COD)
                        </label>
                        {/* (Bạn có thể thêm các phương thức khác ở đây) */}
                    </div>
                </div>

                {/* CỘT BÊN PHẢI: TÓM TẮT ĐƠN HÀNG */}
                <div className="order-summary">
                    <h2>Đơn hàng của bạn ({items.length} sản phẩm)</h2>
                    <div className="summary-items-list">
                        {items.map(item => (
                            <div className="summary-item" key={item.id}>
                                <img src={item.image} alt={item.name} className="summary-item-image" />
                                <div className="summary-item-info">
                                    <span className="item-name">{item.name} (x{item.quantity})</span>
                                </div>
                                <span className="item-total">{formatCurrency(item.lineTotal)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-totals">
                        <div className="summary-row">
                            <span>Tạm tính:</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Phí vận chuyển:</span>
                            <span>{formatCurrency(shippingFee)}</span>
                        </div>
                        <div className="summary-row grand-total">
                            <span>Tổng cộng:</span>
                            <span>{formatCurrency(grandTotal)}</span>
                        </div>
                    </div>
                    <button 
                        className="place-order-button" 
                        onClick={handlePlaceOrder}
                        disabled={isPlacingOrder}
                    >
                        {isPlacingOrder ? 'Đang xử lý...' : 'Đặt Hàng'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CheckoutPage;