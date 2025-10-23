import { get } from "../ultils/request";


export const getBlogList = async () => {
    const result = await get('blogs');
    return result;
}


export const getBlogCategoryList = async () => {
    const result = await get('blog_categories');
    return result;
}