//Логіка сторінки Home
import {
  handlerClickByCategory,
  handlerLoadMore,
  handlerProductCard,
  initHomePage,
} from './js/handlers.js';

import { refs } from './js/refs.js';

document.addEventListener('DOMContentLoaded', initHomePage);
refs.loadMoreBtn.addEventListener('click', handlerLoadMore);
refs.categories.addEventListener('click', handlerClickByCategory);
refs.products.addEventListener('click', handlerProductCard);
