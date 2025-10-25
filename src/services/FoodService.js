import { get, post, patch, dele } from "../ultils/request.js";

// Lấy danh sách tất cả food
export const getFoodList = async () => {
    const result = await get('foods');
    return result;
};

// Lấy thông tin một food theo ID
export const getFoodById = async (id) => {
    const result = await get(`foods/${id}`);
    return result;
};

// Thêm món ăn mới
export const createFood = async (foodData) => {
    const result = await post('foods', foodData);
    return result;
};

// Cập nhật thông tin món ăn (chú ý truyền id vào tham số thứ 3)
export const updateFood = async (id, foodData) => {
    const result = await patch('foods', foodData, id);
    return result;
};

// Xóa món ăn (chú ý truyền id vào tham số thứ 2)
export const deleteFood = async (id) => {
    const result = await dele('foods', id);
    return result;
};

// Tìm kiếm món ăn theo tên
export const searchFoods = async (query) => {
    const result = await get(`foods?q=${encodeURIComponent(query)}`);
    return result;
};

// Lấy món ăn theo danh mục (categoryId)
export const getFoodsByCategory = async (categoryId) => {
    const result = await get(`foods?categoryId=${categoryId}`);
    return result;
};

// Lấy món ăn có khuyến mãi
export const getFoodsOnSale = async () => {
    const result = await get('foods?sale=true');
    return result;
};

// Lấy món ăn còn hàng
export const getAvailableFoods = async () => {
    const result = await get('foods?inStock=true');
    return result;
};
