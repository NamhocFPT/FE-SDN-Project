import {dele, get, patch, post,put } from "../ultils/request.js";


export const getProductList = async () => {
    const result = await get('api/food');
    return result;
}

export const getCategoryList = async () => {
    const result = await get('categories'); 
    return result;
}

//  Update món ăn
export const updateFood = async (id, data) => {
  const result = await put(`api/admin/foods/${id}/update`, data);
  return result;
};