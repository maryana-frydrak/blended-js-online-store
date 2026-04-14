import { loadPageData, updateNavWishlistCount } from './js/render-function';
import { load, save, wishlist } from './js/storage';

//Логіка сторінки Wishlist
export async function remoweFromWishlist(productId) {
  const currentWishlist = load('wishlist') || [];

  const updatedWishlist = currentWishlist.filter(
    id => String(id) !== String(productId)
  );

  save('wishlist', updatedWishlist);

  updateNavWishlistCount();

  await loadPageData('wishlist');
}
