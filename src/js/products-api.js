import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, ITEMS_PER_PAGE } from './constants';
axios.defaults.baseURL = API_BASE_URL;

export async function getCategories() {
  const { data } = await axios(`${API_ENDPOINTS.CATEGORIES}`);
  return data;
}

export async function getProducts(currentPage) {
  const skip = (currentPage - 1) * 12;
  const { data } = await axios(
    `${API_ENDPOINTS.PRODUCTS}?limit=${ITEMS_PER_PAGE}&skip=${skip}`
  );
  return data;
}

export async function getProductsByCategory(category, currentPage) {
  const skip = (currentPage - 1) * 12;
  const { data } = await axios(
    `${API_ENDPOINTS.BYCATEGORY}${category}?limit=${ITEMS_PER_PAGE}&skip=${skip}`
  );
  return data;
}

export async function getProductsById(id) {
  try {
    const { data } = await axios(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    showToast('Помилка при отриманні товару за ID', 'error');
    throw error;
  }
}
console.log(API_ENDPOINTS);
getProductsById(1).then(data => console.log('result', data));
// https://dummyjson.com/products/1
