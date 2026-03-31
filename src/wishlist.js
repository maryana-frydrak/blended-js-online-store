import { updateNavWishlistCount } from './js/render-function';
import { wishlist } from './js/storage';

//Логіка сторінки Wishlist
export function remoweFromWishlist(productId) {
  wishlist = wishlist.filter(id => id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateNavWishlistCount();
  const productCard = document.querySelector(`[data-id="${id}"]`);
  if (productCard) {
    productCard.remove();
  }
}
