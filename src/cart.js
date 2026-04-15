import { showToast } from './js/helpers';
import { refs } from './js/refs';
import { loadPageData, updateNavCartCount } from './js/render-function';
import { load, save } from './js/storage';

//Логіка сторінки Cart
export async function removeFromCart(productId) {
  const currentCart = load('cart') || [];

  const updatedCart = currentCart.filter(
    id => Number(id) !== Number(productId)
  );

  save('cart', updatedCart);

  updateNavCartCount();

  await loadPageData('cart');
}

export function calculateTotals(products) {
  const totalItems = products.length;

  const totalPrice = products.reduce((acc, product) => {
    return acc + Number(product.price || 0);
  }, 0);

  if (refs.itemsCount) {
    refs.itemsCount.textContent = totalItems;
  }

  if (refs.totalPrice) {
    refs.totalPrice.textContent = `${totalPrice.toFixed(2)} грн`;
  }
}

export function handleBuyProducts() {
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];

  if (cartData.length === 0) {
    showToast('Your cart is empty!', 'warning');
    return;
  }

  showToast('Success! Your order has been placed.', 'success');

  save('cart', []);

  updateNavCartCount();
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

if (refs.buyBtn) {
  refs.buyBtn.addEventListener('click', handleBuyProducts);
}

loadPageData('cart');
