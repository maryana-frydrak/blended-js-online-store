export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function handlerModalCartLogic(productId, modalProductBtnCart) {
  const isInCart = cart.includes(productId);
  modalProductBtnCart.textContent = isInCart
    ? 'Remove from Cart'
    : 'Add to Cart';
}
