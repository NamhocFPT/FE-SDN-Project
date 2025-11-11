import React, { useState, useEffect } from 'react';
import './CartPage.scss'; // Import SCSS
import CartItem from './CartItem/CartItem';
import CartSummary from './CartSummary/CartSummary';
// Import các hàm service đã được viết lại
import { getCart, updateCartItemQuantity, removeCartItem } from '../../../services/CartService';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const loadCart = async () => {
        try {
            setLoading(true);
            const itemsFromAPI = await getCart();

            const itemsWithSelection = itemsFromAPI.map(item => {
                const id = item.id || item._id;
                const unitPrice = Number(item.unitPrice) || 0;
                const quantity = Number(item.quantity) || 0;
                const lineTotal = Number.isFinite(item.lineTotal)
                  ? Number(item.lineTotal)
                  : unitPrice * quantity;
                return {
                    ...item,
                    id,
                    unitPrice,
                    quantity,
                    lineTotal,
                    image: item.foodId?.images?.[0] || 'https://via.placeholder.com/100',
                    isSelected: true,
                };
            });

            setCartItems(itemsWithSelection);
            setSelectedItems(itemsWithSelection.map(item => item.id));
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const handleQuantityChange = async (id, newQuantity) => {
        try {
            const updatedItem = await updateCartItemQuantity(id, newQuantity);
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === id ? {
                        ...item,
                        quantity: updatedItem.quantity,
                        lineTotal: updatedItem.lineTotal
                    } : item
                )
            );
        } catch (err) {
            alert('Cập nhật số lượng thất bại: ' + err.message);
        }
    };

    const handleRemoveItem = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            try {
                await removeCartItem(id);
                setCartItems(prevItems => prevItems.filter(item => item.id !== id));
                setSelectedItems(prevItems => prevItems.filter(itemId => itemId !== id));
            } catch (err) {
                alert('Xóa sản phẩm thất bại: ' + err.message);
            }
        }
    };

    const handleSelectItem = (id, isChecked) => {
        setSelectedItems(prevSelected => {
            if (isChecked) {
                return [...prevSelected, id];
            } else {
                return prevSelected.filter(itemId => itemId !== id);
            }
        });
    };

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            setSelectedItems(cartItems.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
            return;
        }

        // Lọc ra danh sách các object sản phẩm đã được chọn
        const itemsToCheckout = cartItems.filter(item =>
            selectedItems.includes(item.id)
        );

        // Lấy tổng số tiền (bạn đã có hàm này)
        const subtotal = calculateSubtotal();

        // 4. Điều hướng đến /checkout và gửi dữ liệu qua `state`
        navigate('/checkout', {
            state: {
                items: itemsToCheckout, // Danh sách sản phẩm (bao gồm id cart item)
                selectedItemIds: itemsToCheckout.map(it => it.id), // dùng cho API checkout
                subtotal: subtotal      // Tổng tiền
            }
        });
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            if (selectedItems.includes(item.id)) {
                const lt = Number(item.lineTotal);
                return total + (Number.isFinite(lt) ? lt : 0);
            }
            return total;
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

    if (loading) return <div className="cart-page-container"><p>Đang tải giỏ hàng...</p></div>;
    if (error) return <div className="cart-page-container"><p className="cart-empty-message">Lỗi: {error}. Không thể tải giỏ hàng.</p></div>;

    return (
        <div className="cart-page-container">
            <h1 className="cart-page-title">Giỏ Hàng Của Bạn</h1>
            {cartItems.length === 0 ? (
                <div className="cart-empty-container">
                    <p className="cart-empty-message">Giỏ hàng của bạn đang trống.</p>
                    <Link to="/" className="continue-shopping-btn">Tiếp tục mua sắm</Link>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items-list">
                        <div className="cart-select-all">
                            <input
                                type="checkbox"
                                id="selectAll"
                                checked={isAllSelected}
                                onChange={(e) => handleSelectAll(e.target.checked)}
                            />
                            <label htmlFor="selectAll">Chọn tất cả ({cartItems.length} sản phẩm)</label>
                        </div>
                        {cartItems.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onQuantityChange={handleQuantityChange}
                                onRemove={handleRemoveItem}
                                onSelect={handleSelectItem}
                                isSelected={selectedItems.includes(item.id)}
                            />
                        ))}
                    </div>
                    <CartSummary
                        subtotal={subtotal}
                        selectedItemCount={selectedItems.length}
                        onCheckout={handleCheckout}
                    />
                </div>
            )}
        </div>
    );
};

export default CartPage;