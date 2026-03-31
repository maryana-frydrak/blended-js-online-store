import { updateNavCartCount } from './js/render-function';
import { cart } from './js/storage';

//Логіка сторінки Cart
export function remoweFromCart(productId) {
  cart = cart.filter(id => id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateNavCartCount();
  const productCard = document.querySelector(`[data-id="${id}"]`);
  if (productCard) {
    productCard.remove();
  }
}
