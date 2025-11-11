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

// Helper: fire a global event so UI badges can refresh immediately
const dispatchCartUpdated = () => {
  try {
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  } catch (_) {}
};

/**
 * Thêm sản phẩm vào giỏ hàng.
 * POST /api/cart/items
 */
export const addCartItem = async (foodId, quantity = 1) => {
  const result = await post(`${API_PREFIX}/items`, { foodId, quantity });
  dispatchCartUpdated();
  return result.item || result;
};

/**
 * Cập nhật số lượng sản phẩm.
 * PATCH /api/cart/items/:itemId
 */
export const updateCartItemQuantity = async (itemId, quantity) => {
  // Backend expects PUT /api/cart/items/:itemId
  const result = await put(`${API_PREFIX}/items/${itemId}`, { quantity });
  dispatchCartUpdated();
  return result.item || result; // Return updated item
};

/**
 * Xóa sản phẩm khỏi giỏ hàng.
 * DELETE /api/cart/items/:itemId
 */
export const removeCartItem = async (itemId) => {
  const result = await dele(`${API_PREFIX}/items`, itemId);
  dispatchCartUpdated();
  return result; // { message, itemId }
};

/**
 * Gửi yêu cầu thanh toán.
 * POST /api/cart/checkout
 */
export const checkout = async (payloadOrIds) => {
  // Support both array of IDs or full payload object
  const body = Array.isArray(payloadOrIds)
    ? { cartItemIds: payloadOrIds }
    : payloadOrIds || {};
  const result = await post(`${API_PREFIX}/checkout`, body);
  // After checkout, cart should be emptied (or processed) -> refresh badge
  dispatchCartUpdated();
  return result; // { message, order, cartItemsProcessed }
};

/**
 * Clear entire cart
 * DELETE /api/cart
 */
export const clearCart = async () => {
  const result = await dele(API_PREFIX, "");
  dispatchCartUpdated();
  return result;
};

/**
 * Convenience: clear local cart UI state by dispatching event (used after using legacy order/add flow)
 */
export const notifyCartCleared = () => dispatchCartUpdated();
