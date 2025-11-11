import { post } from "../ultils/request";

// Tiền tố API cho đơn hàng
const API_PREFIX = 'api/orders';

/**
 * Tạo một đơn hàng mới.
 * POST /api/orders
 * @param {object} orderData - Dữ liệu đơn hàng từ trang checkout
 */
export const createOrder = async (orderData) => {
    // orderData sẽ chứa: { shippingAddress, paymentMethod, items, amounts }
    const result = await post(API_PREFIX, orderData);
    return result; // Trả về đơn hàng đã tạo
};