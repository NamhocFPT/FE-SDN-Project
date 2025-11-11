import { get } from "../ultils/request";


export const getBlogList = async () => {
    const result = await get('api/blog');
    return result;
}


export const getBlogCategoryList = async () => {
    const result = await get('api/blog-category');
    return result;
}