import { refs } from './refs';

export function openModal() {
  refs.modal.classList.add('modal--is-open');
}

export function closeModal() {
  refs.modal.classList.remove('modal--is-open');
}

refs.modalCloseBtn.addEventListener('click', closeModal);
refs.modal.addEventListener('click', e => {
  if (e.target === modal) {
    closeModal;
  }
});

window.addEventListener('keydown', e => {
  if (e.code === 'Escape' && modal.classList.contains('modal--is-open')) {
    closeModal;
  }
});
