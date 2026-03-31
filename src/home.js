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
refs.products.addEventListener('click', handlerProductCard);
refs.searchForm.addEventListener('submit', handlerForm);
refs.clearBtn.addEventListener('click', handlerFormCloseBtn);
refs.searchInput.addEventListener('input', handlerInputCloseBtn);
refs.modalProductBtnCart.addEventListener('click', onBtnCardClick);
refs.modalProductBtnWishlist.addEventListener('click', onBtnWishlistClick);
