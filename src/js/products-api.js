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
  const { data } = await axios(`${API_ENDPOINTS.BYID}/${id}`);
  return data;
}
// console.log(API_ENDPOINTS);
// getProductsById(1).then(data => console.log('result', data));
// https://dummyjson.com/products/1
export async function getProductsByName(query) {
  const { data } = await axios(
    `${API_ENDPOINTS.BYNAME}?q=${query}&limit=${ITEMS_PER_PAGE}`
  );
  return data;
}
// getProductsByName().then(data => console.log('result', data));
// https://dummyjson.com/products/search?q=nail
