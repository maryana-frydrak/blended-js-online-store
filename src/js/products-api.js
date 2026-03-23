import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './constants';
axios.defaults.baseURL = API_BASE_URL;

export async function getCategories() {
  const { data } = await axios(`${API_ENDPOINTS.CATEGORIES}`);
  return data;
}
