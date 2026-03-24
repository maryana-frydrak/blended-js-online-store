import { showToast } from './helpers';
import {
  getCategories,
  getProducts,
  getProductsByCategory,
} from './products-api';
import {
  clearProductList,
  hideloader,
  hideloadMoreBtn,
  hideNotFound,
  renderCategories,
  renderProducts,
  showloader,
  showloadMoreBtn,
  showNotFound,
} from './render-function';

let currentPage = 1;

export async function initHomePage() {
  try {
    hideNotFound();
    hideloadMoreBtn();
    showloader();
    const categories = await getCategories();
    const allCategories = ['all', ...categories];
    renderCategories(allCategories);
    const { products, skip, total } = await getProducts(currentPage);
    if (products.length === 0) {
      showNotFound();
      return;
    }
    renderProducts(products);
    if (total - (skip + 12) > 0) {
      showloadMoreBtn();
    }
  } catch (error) {
    showToast('Something went wrong, try again, please', 'error');
  } finally {
    hideloader();
  }
}

export async function handlerLoadMore() {
  currentPage += 1;
  try {
    hideNotFound();
    hideloadMoreBtn();
    showloader();
    const { products, skip, total } = await getProducts(currentPage);
    if (products.length === 0) {
      showNotFound();
      return;
    }
    renderProducts(products);
    if (total - (skip + 12) > 0) {
      showloadMoreBtn();
    }
  } catch (error) {
    showToast('Something went wrong, try again, please', 'error');
  } finally {
    hideloader();
  }
}

export async function handlerClickByCategory(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  const category = e.target.dataset.category;
  try {
    hideNotFound();
    hideloadMoreBtn();
    showloader();
    const { products } = await getProductsByCategory(category);
    if (products.length === 0) {
      showNotFound();
      return;
    }
    clearProductList();
    renderProducts(products);
    if (total - (skip + 12) > 0) {
      showloadMoreBtn();
    }
  } catch (error) {
    showToast('Something went wrong, try again, please', 'error');
  } finally {
    hideloader();
  }
}
