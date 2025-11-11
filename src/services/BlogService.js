import { get } from "../ultils/request";

// Public blogs (published) list
export const getBlogList = async () => {
  return await get("blog"); // maps to GET /api/blog
};

// Blog categories list (plural path per backend)
export const getBlogCategoryList = async () => {
  return await get("blog-categories"); // maps to GET /api/blog-categories
};
