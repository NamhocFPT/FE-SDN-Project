import { get, put, post, dele } from "../ultils/request.js";

// NOTE: Backend food routes mounted at /api/food (listFoods supports query params)
export const getFoodList = async (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  const result = await get(`food${qs ? `?${qs}` : ""}`); // GET /api/food
  // Normalize to array for admin UI consumers
  if (Array.isArray(result)) return result;
  if (result && result.success && Array.isArray(result.data))
    return result.data;
  return [];
};

export const getFoodById = async (id) => {
  return await get(`food/${id}`); // GET /api/food/:id
};

export const getFoodByIdOrSlug = async (idOrSlug) => {
  return await get(`food/${idOrSlug}`); // unified route
};

// Admin create (mounted under /api/admin/foods)
export const createFood = async (foodData) => {
  return await post(`admin/foods/add`, foodData); // POST /api/admin/foods/add
};

// Admin update
export const updateFood = async (id, foodData) => {
  return await put(`admin/foods/${id}/update`, foodData); // PUT /api/admin/foods/:id/update
};

// Featured list
export const getFeaturedFoods = async (limit = 8) => {
  return await get(`food/featured?limit=${limit}`); // GET /api/food/featured
};

// Admin delete
export const deleteFood = async (id) => {
  return await dele(`admin/foods`, id); // DELETE /api/admin/foods/:id
};
