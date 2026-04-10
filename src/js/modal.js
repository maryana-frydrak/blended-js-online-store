import { onBtnCardClick, onBtnWishlistClick } from './handlers';
import { refs } from './refs';
import { updateNavCartCount, updateNavWishlistCount } from './render-function';
import { handlerModalCartLogic } from './storage';

export function openModal(productData) {
  refs.backdrop.classList.add('is-open');
  refs.body.style.overflow = 'hidden';

  const productId = productData._id || productData.id;

  refs.modalProductBtnCart.dataset.id = productId;
  handlerModalCartLogic(productId, refs.modalProductBtnCart);

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

  updateNavWishlistCount();
  const isInWishlist = checkIsItemInWishlist(productId);

  if (isInWishlist) {
    refs.modalProductBtnWishlist.textContent = 'Remove from Wishlist';
  } else {
    refs.modalProductBtnWishlist.textContent = 'Add to Wishlist';
  }
  refs.modalProductBtnWishlist.removeEventListener('click', onBtnWishlistClick);
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
