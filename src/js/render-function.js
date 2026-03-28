import { refs } from './refs';

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
  const markup = arr
    .map(
      ({
        thumbnail,
        title,
        id,
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
