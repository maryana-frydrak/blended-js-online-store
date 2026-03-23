import { getCategories } from './products-api';
import { renderCategories } from './render-function';

export async function initHomePage() {
  try {
    const categories = await getCategories();
    const allCategories = ['all', ...categories];
    renderCategories(allCategories);
  } catch (error) {
    console.log(error);
  }
}
