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
