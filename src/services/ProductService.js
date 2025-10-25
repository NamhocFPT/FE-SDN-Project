import {dele, get, patch, post} from "../ultils/request.js";


export const getProductList = async () => {
    const result = await get('foods');
    return result;
}

export const getCategoryList = async () => {
    const result = await get('categories'); 
    return result;
}

// ✅ Update món ăn
export const updateFood = async (id, data) => {
  const result = await patch('api/food', data, id);
  return result;
}