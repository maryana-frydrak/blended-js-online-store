import { showToast } from './helpers';
import { openModal } from './modal';
import {
  getCategories,
  getProducts,
  getProductsByCategory,
  getProductsById,
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
let category = '';

export async function initHomePage() {
  try {
    currentPage = 1;
    hideNotFound();
    hideloadMoreBtn();
    showloader();
    const categories = await getCategories();
    const allCategories = ['all', ...categories];
    renderCategories(allCategories);
    document
      .querySelector('.categories__btn')
      .classList.add('categories__btn--active');
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
    if (category === '') {
      const { products, skip, total } = await getProducts(currentPage);
      if (products.length === 0) {
        showNotFound();
        return;
      }
      renderProducts(products);
      if (total - (skip + 12) > 0) {
        showloadMoreBtn();
      }
    } else {
      const { products, skip, total } = await getProductsByCategory(
        category,
        currentPage
      );
      if (products.length === 0) {
        showNotFound();
        return;
      }
      renderProducts(products);
      if (total - (skip + 12) > 0) {
        showloadMoreBtn();
      }
    }
  } catch (error) {
    showToast('Something went wrong, try again, please', 'error');
  } finally {
    hideloader();
  }
}

export async function handlerClickByCategory(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  category = e.target.dataset.category;
  document
    .querySelectorAll('.categories__btn')
    .forEach(item => item.classList.remove('categories__btn--active'));
  e.target.classList.add('categories__btn--active');
  try {
    currentPage = 1;
    hideNotFound();
    hideloadMoreBtn();
    showloader();
    clearProductList();
    if (category === 'all') {
      const { products, skip, total } = await getProducts(currentPage);
      if (products.length === 0) {
        showNotFound();
        return;
      }
      renderProducts(products);
      if (total - (skip + 12) > 0) {
        showloadMoreBtn();
      }
    } else {
      const { products, skip, total } = await getProductsByCategory(
        category,
        currentPage
      );
      if (products.length === 0) {
        showNotFound();
        return;
      }
      renderProducts(products);
      if (total - (skip + 12) > 0) {
        showloadMoreBtn();
      }
    }
  } catch (error) {
    showToast('Something went wrong, try again, please', 'error');
  } finally {
    hideloader();
  }
}

export async function handlerProductCard(e) {
  const productCard = e.target.closest('li');
  if (!productCard) return;
  const id = productCard.dataset.id;
  console.log('find card', productCard);
  console.log('get id', id);
  if (!productId) {
    showToast('Помилка: ID не знайдено в атрибутах data-id!', 'error');
    return;
  }
  try {
    const response = await getProductsById(id);
    const productData = await response.json();
    console.log(productData);
    renderModalContent(productData);
    openModal();
  } catch (error) {
    showToast('Something went wrong, try again, please', 'error');
  } finally {
    hideloader();
  }
}
