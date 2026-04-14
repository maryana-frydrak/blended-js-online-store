import { calculateTotals } from '../cart';
import { STORAGE_KEYS } from './constants';
import { getProductsById } from './products-api';
import { refs } from './refs';
import { load } from './storage';

export function renderCategories(arr) {
  const markup = arr
    .map(
      category => `<li class="categories__item">
   <button class="categories__btn" type="button" data-category="${category}">${category}</button>
 </li>`
    )
    .join('');
  refs.categories.innerHTML = markup;
}

export function renderProducts(arr) {
  clearProductList();

  if (arr.length === 0) {
    return;
  }

  const markup = arr
    .map(
      ({
        id,
        thumbnail,
        title,
        brand,
        category,
        price,
      }) => `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${brand}</span></p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
 </li>`
    )
    .join('');
  refs.products.insertAdjacentHTML('beforeend', markup);
}

export function clearProductList() {
  refs.products.innerHTML = '';
}

let currentPage = 1;
export function getPaginatedData(allProducts, currentPage) {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  return allProducts.slice(startIndex, endIndex);
}

export function showloadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

export function hideloadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

export function showloader() {
  refs.loader.classList.remove('is-hidden');
}

export function hideloader() {
  refs.loader.classList.add('is-hidden');
}

export function showNotFound() {
  refs.notFound.classList.add('not-found--visible');
}

export function hideNotFound() {
  refs.notFound.classList.remove('not-found--visible');
}

export function showClearBtn() {
  refs.clearBtn.classList.add('is-visible');
}

export function hideClearBtn() {
  refs.clearBtn.classList.remove('is-visible');
}

export function updateNavCartCount() {
  if (refs.cartCountSpan) {
    const cart = load(STORAGE_KEYS.CART);
    refs.cartCountSpan.textContent = cart.length;
  }
}

export function updateNavWishlistCount() {
  if (refs.wishlistCountSpan) {
    const wishlist = load(STORAGE_KEYS.WISHLIST);
    refs.wishlistCountSpan.textContent = wishlist.length;
  }
}

export async function loadPageData(storageKey) {
  const ids = load(storageKey);

  if (ids.length === 0) {
    renderProducts([]);
    if (storageKey === 'cart') calculateTotals([]);
    hideClearBtn();
    return;
  }

  try {
    showloader();

    const products = await Promise.all(ids.map(id => getProductsById(id)));

    renderProducts(products);

    if (storageKey === 'cart') {
      calculateTotals(products);
    }
  } catch (error) {
    showToast('Something went wrong, try again, please', 'error');
  } finally {
    hideloader();
  }
}
