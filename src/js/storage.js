export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function handlerModalCartLogic(productId, modalProductBtnCart) {
  const isInCart = cart.includes(productId);
  modalProductBtnCart.textContent = isInCart
    ? 'Remove from Cart'
    : 'Add to Cart';
}

export let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

export function handlerModalWishlistLogic(productId, modalProductBtnWishlist) {
  const isInWishlist = wishlist.includes(productId);
  modalProductBtnWishlist.textContent = isInWishlist
    ? 'Remove from Wishlist'
    : 'Add to Wishlist';
}
