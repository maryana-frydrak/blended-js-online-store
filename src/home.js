//Логіка сторінки Home
import {
  handlerClickByCategory,
  handlerForm,
  handlerFormCloseBtn,
  handlerInputCloseBtn,
  handlerLoadMore,
  handlerProductCard,
  initHomePage,
  onBtnCardClick,
  onBtnWishlistClick,
} from './js/handlers.js';

import { refs } from './js/refs.js';

document.addEventListener('DOMContentLoaded', initHomePage);
refs.loadMoreBtn.addEventListener('click', handlerLoadMore);
refs.categories.addEventListener('click', handlerClickByCategory);
// console.log('Target element:', refs.products);
refs.products.addEventListener('click', handlerProductCard);
window.addEventListener('click', e => {
  console.log('real el of click:');
  console.log('you click in', event.target);
});
refs.searchForm.addEventListener('submit', handlerForm);
refs.clearBtn.addEventListener('click', handlerFormCloseBtn);
refs.searchInput.addEventListener('input', handlerInputCloseBtn);
refs.modalProductBtnCart.addEventListener('click', onBtnCardClick);
refs.modalProductBtnWishlist.addEventListener('click', onBtnWishlistClick);
