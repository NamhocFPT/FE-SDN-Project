import { get, post, put, dele } from "../ultils/request";

// Backend mounts at /api/cart
const API_PREFIX = "cart";

/**
 * Lấy giỏ hàng của user hiện tại.
 * GET /api/cart
 */
export const getCart = async () => {
  const result = await get(API_PREFIX);
  // Return full object so FE can access totals, items, etc.
  return result.items ? result.items : [];
};

/**
 * Cập nhật số lượng sản phẩm.
 * PATCH /api/cart/items/:itemId
 */
export const updateCartItemQuantity = async (itemId, quantity) => {
  // Backend expects PUT /api/cart/items/:itemId
  const result = await put(`${API_PREFIX}/items/${itemId}`, { quantity });
  return result.item || result; // Return updated item
};

/**
 * Xóa sản phẩm khỏi giỏ hàng.
 * DELETE /api/cart/items/:itemId
 */
export const removeCartItem = async (itemId) => {
  const result = await dele(`${API_PREFIX}/items`, itemId);
  return result; // { message, itemId }
};

/**
 * Gửi yêu cầu thanh toán.
 * POST /api/cart/checkout
 */
export const checkout = async (selectedItemIds) => {
  const result = await post(`${API_PREFIX}/checkout`, {
    cartItemIds: selectedItemIds,
  });
  return result; // { message, order, cartItemsProcessed }
};
