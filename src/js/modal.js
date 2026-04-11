import { STORAGE_KEYS } from './constants';
import { onBtnCardClick, onBtnWishlistClick } from './handlers';
import { refs } from './refs';
import { updateNavCartCount, updateNavWishlistCount } from './render-function';
import { isInStorage } from './storage';

export function openModal(productData) {
  refs.backdrop.classList.add('is-open');
  refs.body.style.overflow = 'hidden';

  const productId = productData._id || productData.id;

  refs.modalProductBtnCart.dataset.id = productId;
  refs.modalProductBtnWishlist.dataset.id = productId;

  handlerModalCartLogic(productId, refs.modalProductBtnCart);
  handlerModalWishlistLogic(productId, refs.modalProductBtnWishlist);

  window.addEventListener('keydown', onEskKeyPress);
  const addToCartBtn = refs.modalProductBtnCart;
  if (addToCartBtn) {
    addToCartBtn.dataset.id = productId;
    // console.log('Sucses add id to btn', id);
  }

  updateNavCartCount();
  const isInCart = checkIsItemInCart(productId);

  if (isInCart) {
    refs.modalProductBtnCart.textContent = 'Remove from Cart';
  } else {
    refs.modalProductBtnCart.textContent = 'Add to Cart';
  }
  refs.modalProductBtnCart.removeEventListener('click', onBtnCardClick);
  refs.modalProductBtnCart.addEventListener('click', onBtnCardClick);

  updateNavWishlistCount();
  const isInWishlist = checkIsItemInWishlist(productId);

  if (isInWishlist) {
    refs.modalProductBtnWishlist.textContent = 'Remove from Wishlist';
  } else {
    refs.modalProductBtnWishlist.textContent = 'Add to Wishlist';
  }
  refs.modalProductBtnWishlist.removeEventListener('click', onBtnWishlistClick);
  refs.modalProductBtnWishlist.addEventListener('click', onBtnWishlistClick);
}

export function closeModal() {
  refs.backdrop.classList.remove('is-open');
  refs.body.style.overflow = '';

  window.removeEventListener('keydown', onEskKeyPress);
}

refs.modalCloseBtn.addEventListener('click', closeModal);
refs.backdrop.addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    e.stopPropagation();
    closeModal();
  }
});

function onEskKeyPress(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

export function renderModalContent(product) {
  const {
    id,
    thumbnail,
    title,
    tags,
    description,
    shippingInformation,
    returnPolicy,
    price,
  } = product;

  const markup = `
 <img class="modal-product__img" src="${thumbnail}" alt="${title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${tags}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price">Price: ${price} $</p>
        <button class="modal-product__buy-btn" type="button data-id="${id}">Buy</button>
      </div>`;

  refs.modalProduct.innerHTML = markup;
}

export function handlerModalCartLogic(productId, modalProductBtnCart) {
  if (!modalProductBtnCart) return;

  const isInCart = isInStorage(STORAGE_KEYS.CART, productId);

  modalProductBtnCart.textContent = isInCart
    ? 'Remove from Cart'
    : 'Add to Cart';

  if (isInCart) {
    modalProductBtnCart.classList.add('is-active');
  } else {
    modalProductBtnCart.classList.remove('is-active');
  }
}

export function handlerModalWishlistLogic(productId, modalProductBtnWishlist) {
  if (!modalProductBtnWishlist) return;

  const isInWishlist = isInStorage(STORAGE_KEYS.WISHLIST, productId);
  modalProductBtnWishlist.textContent = isInWishlist
    ? 'Remove from Wishlist'
    : 'Add to Wishlist';

  modalProductBtnWishlist.classList.toggle('is-favorite', isInWishlist);
}
