import { get, put } from "../ultils/request.js";

// Hàm tiện ích đã sửa để trả về TOÀN BỘ OBJECT RESULT cho getProductList
const handleServiceResult = (
  result,
  defaultErrorMessage,
  returnFullResult = false
) => {
  // Nếu kết quả không tồn tại hoặc không thành công
  if (!result || result.success === false) {
    throw new Error(result?.message || defaultErrorMessage);
  }

  // 🎯 LOGIC MỚI: Nếu yêu cầu trả về toàn bộ object, thì trả về result (dùng cho ProductList)
  if (returnFullResult) {
    return result;
  }

  // Nếu không, chỉ trả về data (dùng cho FeaturedFoods, Categories)
  return Array.isArray(result.data) ? result.data : [];
};

// 1. Lấy danh sách MÓN ĂN NỔI BẬT: GET /api/food/featured
export const getFeaturedFoods = async (limit = 6) => {
  try {
    const result = await get(`food/featured?limit=${limit}`);
    // Không truyền true, nên chỉ trả về data
    return handleServiceResult(result, "Lỗi khi tải món ăn nổi bật.");
  } catch (error) {
    throw new Error(
      error.message || "Không thể kết nối để tải món ăn nổi bật."
    );
  }
};

// 2. Lấy danh sách CATEGORY: GET /api/category
export const getCategoryList = async () => {
  try {
    const result = await get("category");
    // Không truyền true, nên chỉ trả về data
    return handleServiceResult(result, "Lỗi khi tải danh mục.");
  } catch (error) {
    throw new Error(error.message || "Không thể kết nối để tải danh mục.");
  }
};

// 3. Lấy danh sách SẢN PHẨM: GET /api/food (Đã sửa)
export const getProductList = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();

  try {
    const result = await get(`food?${queryString}`);
    // 🎯 TRUYỀN TRUE: Yêu cầu trả về toàn bộ object (chứa data và pagination)
    return handleServiceResult(result, "Lỗi khi tải danh sách sản phẩm.", true);
  } catch (error) {
    throw new Error(
      error.message || "Không thể kết nối để tải danh sách sản phẩm."
    );
  }
};

// Hàm lấy món ăn theo danh mục (cũng cần phân trang nên sử dụng getProductList)
export const getFoodsByCategory = async (categoryId, params = {}) => {
  if (!categoryId) {
    throw new Error("Cần cung cấp ID danh mục (categoryId) để lọc.");
  }

  // Thêm categoryId vào params
  const fullParams = { ...params, categoryId };

  try {
    // Sử dụng getProductList để có hỗ trợ phân trang
    // Hàm này sẽ trả về toàn bộ object { data: [...], pagination: {...} }
    const result = await getProductList(fullParams);
    return result;
  } catch (error) {
    throw new Error(
      error.message || `Lỗi khi tải món ăn cho danh mục ID: ${categoryId}.`
    );
  }
};

// --- 🎯 HÀM MỚI: Lấy chi tiết món ăn theo ID/Slug ---
// GET /api/food/:idOrSlug
export const getFoodDetail = async (idOrSlug) => {
  if (!idOrSlug) {
    throw new Error("Cần cung cấp ID hoặc Slug để xem chi tiết món ăn.");
  }

  try {
    // Gọi API: GET /api/food/idOrSlug
    const result = await get(`food/${idOrSlug}`);

    // Giả định BE trả về { success: true, data: { ... } }
    if (!result || result.success === false) {
      throw new Error(result?.message || "Không tìm thấy món ăn này.");
    }

    // Trả về đối tượng món ăn (không phải mảng)
    return result.data;
  } catch (error) {
    throw new Error(
      error.message || `Lỗi khi tải chi tiết món ăn ${idOrSlug}.`
    );
  }
};
//  Update món ăn
export const updateFood = async (id, data) => {
  const result = await put(`admin/foods/${id}/update`, data);
  return result;
};
