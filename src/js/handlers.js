import { showToast } from './helpers';
import { openModal, renderModalContent } from './modal';
import {
  getCategories,
  getProducts,
  getProductsByCategory,
  getProductsById,
  getProductsByName,
} from './products-api';
import { refs } from './refs';
import {
  clearProductList,
  getPaginatedData,
  hideClearBtn,
  hideloader,
  hideloadMoreBtn,
  hideNotFound,
  renderCategories,
  renderProducts,
  showClearBtn,
  showloader,
  showloadMoreBtn,
  showNotFound,
  updateNavCartCount,
  updateNavWishlistCount,
} from './render-function';
import { cart, wishlist } from './storage';

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
  showloader();
  const id = productCard.dataset.id;

  if (!id) {
    showToast('Помилка: ID не знайдено в атрибутах data-id!', 'error');
    return;
  }
  try {
    const productData = await getProductsById(id);

    renderModalContent(productData);
    openModal(productData);
  } catch (error) {
    showToast('Something went wrong, try again, please', 'error');
  } finally {
    hideloader();
  }
}

export async function handlerForm(e) {
  e.preventDefault();
  const query = refs.searchInput.value.trim();
  if (!query) return;
  showloader();
  try {
    const response = await getProductsByName(query);
    const data = await response.json();
    if (data.length > 0) {
      hideNotFound();
      const dataToRender = getPaginatedData(allProducts, currentPage);
      clearProductList();
      renderProducts(dataToRender);
    } else {
      clearProductList();
      showNotFound();
    }
  } catch (error) {
    showToast('Something went wrong, try again, please', 'error');
  } finally {
    hideloader();
  }
}

export async function handlerFormCloseBtn(e) {
  showloader();
  refs.searchInput.value = '';
  hideClearBtn();
  hideNotFound();
  try {
    const res = await getProducts(currentPage);
    const products = await res.json();
    renderProducts(products);
  } catch (error) {
    showToast('Something went wrong, try again, please', 'error');
  } finally {
    hideloader();
  }
}

export function handlerInputCloseBtn(e) {
  const query = e.target.value.trim();

  if (query.length > 0) {
    showClearBtn();
  } else {
    hideClearBtn();
  }
}

export function onBtnCardClick(e) {
  // console.log('клік по кнопці відбувся');
  const id = e.currentTarget.dataset.id;
  // console.log('check id', e.currentTarget.dataset.id);
  // console.log('button', e.currentTarget);
  const currentIndex = cart.indexOf(id);

  if (currentIndex === -1) {
    cart.push(id);
    refs.modalProductBtnCart.textContent = 'Remove from Cart';
  } else {
    cart.splice(currentIndex, 1);
    refs.modalProductBtnCart.textContent = 'Add to Cart';
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateNavCartCount();
}

export function onBtnWishlistClick(e) {
  // console.log('клік по кнопці відбувся');
  const id = e.currentTarget.dataset.id;
  // console.log('check id', e.currentTarget.dataset.id);
  // console.log('button', e.currentTarget);
  const index = wishlist.indexOf(id);

  if (index === -1) {
    wishlist.push(id);
    refs.modalProductBtnWishlist.textContent = 'Remove from Wishlist';
  } else {
    wishlist.splice(index, 1);
    refs.modalProductBtnWishlist.textContent = 'Add to Wishlist';
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateNavWishlistCount();
}
