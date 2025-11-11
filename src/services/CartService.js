import { get, post, patch, dele } from "../ultils/request";

// Sử dụng 'api/' prefix giống như file ví dụ của bạn
const API_PREFIX = 'api/cart';

/**
 * Lấy giỏ hàng của user hiện tại.
 * GET /api/cart
 */
export const getCart = async () => {
    // Giả định backend trả về { items: [...] } hoặc []
    const result = await get(API_PREFIX); 
    return result?.items || [];
};

/**
 * Cập nhật số lượng sản phẩm.
 * PATCH /api/cart/items/:itemId
 */
export const updateCartItemQuantity = async (itemId, quantity) => {
    const result = await patch(`${API_PREFIX}/items`, { quantity }, itemId);
    return result; // Trả về item đã cập nhật
};

/**
 * Xóa sản phẩm khỏi giỏ hàng.
 * DELETE /api/cart/items/:itemId
 */
export const removeCartItem = async (itemId) => {
    const result = await dele(`${API_PREFIX}/items`, itemId);
    return result; // Trả về thông báo thành công
};

/**
 * Gửi yêu cầu thanh toán.
 * POST /api/cart/checkout
 */
export const checkout = async (selectedItemIds) => {
    const result = await post(`${API_PREFIX}/checkout`, { selectedItemIds });
    return result; // Trả về đơn hàng đã tạo
};