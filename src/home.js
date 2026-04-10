//Логіка сторінки Home
// alert('Works');
// console.error('it`s a test');
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

window.addEventListener('scroll', () => {
  refs.scrollBtn.classList.toggle(
    'scroll-top-btn--visible',
    window.scrollY > 300
  );
});
refs.scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// const savedTheme = localStorage.getItem('theme');
// if (savedTheme === 'dark') {
//   document.body.classList.add('dark-theme');
//   refs.themeBtn.textContent = '🌛';
// } else {
//   refs.themeBtn.textContent = '🌞';
// }
// refs.themeBtn.addEventListener('click', () => {
//   document.body.classList.toggle('dark-theme');
//   const isDark = document.body.classList.contains('dark-theme');
//   localStorage.setItem('theme', isDark ? 'dark' : 'light');
//   refs.themeBtn.textContent = isDark ? '🌛' : '🌞';
// });
refs.themeBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);

  refs.themeBtn.textContent = newTheme === 'dark' ? '🌛' : '🌞';

  localStorage.setItem('theme', newTheme);
});
