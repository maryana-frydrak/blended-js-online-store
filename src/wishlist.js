import { loadPageData, updateNavWishlistCount } from './js/render-function';
import { load, save } from './js/storage';

//Логіка сторінки Wishlist
export async function remoweFromWishlist(productId) {
  const currentWishlist = load('wishlist') || [];

  const updatedWishlist = currentWishlist.filter(
    id => Number(id) !== Number(productId)
  );

  save('wishlist', updatedWishlist);

  updateNavWishlistCount();

  await loadPageData('wishlist');
}

loadPageData('wishlist');
