import { post } from "../ultils/request";

// Create order directly (legacy) -> POST /api/order/add
export const createOrder = async (orderData) => {
  // Map frontend payload to backend expected shape
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?._id || user?.id;

  const payload = {
    userId,
    items: (orderData.items || []).map((it) => ({
      foodId: it.foodId || it.id || it._id,
      quantity: it.quantity || 1,
    })),
    shipping: orderData.amounts?.shipping ?? 15000,
    discount: 0,
    tax: 0,
    notes: orderData.shippingAddress?.notes || "",
    paymentMethodCode: (orderData.paymentMethod || "COD").toUpperCase(),
  };

  const result = await post("order/add", payload);
  // Normalize return to { id, code, ... } for CheckoutPage consumption
  return result && result.order ? result.order : result;
};
