import { refs } from './refs';
import { handlerModalCartLogic } from './storage';

export function openModal(e) {
  refs.modal.classList.add('modal--is-open');
  refs.body.style.overflow = 'hidden';

  window.addEventListener('keydown', onEskKeyPress);

  const card = e.target.closest('products__item');
  if (!card) return;
  const productId = card.dataset.id;
  console.log('Id from card', productId);
  refs.modalProductBtnCart.dataset.id = productId;
  handlerModalCartLogic(productId, modalProductBtnCart);
}

export function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  refs.body.style.overflow = '';

  window.removeEventListener('keydown', onEskKeyPress);
}

refs.modalCloseBtn.addEventListener('click', closeModal);
refs.modal.addEventListener('click', e => {
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

export function renderModalContent(arr) {
  const markup = arr
    .map(
      ({
        thumbnail,
        title,
        tags,
        description,
        shipping,
        returnPolicy,
        price,
      }) => `<img class="modal-product__img" src="${thumbnail}" alt="${title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${tags}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping: ${shipping}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price">Price: ${price} $</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`
    )
    .join('');
  refs.modalProduct.innerHTML = markup;
}
