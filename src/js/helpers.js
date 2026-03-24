import iziToast from 'izitoast';

export function showToast(message, type = 'success') {
  const options = {
    message,
    position: 'topRight',
    background: '#ef4040',
    timeout: 5000,
  };

  switch (type) {
    case 'success':
      iziToast.success(options);
      break;

    case 'error':
      iziToast.error(options);
      break;

    case 'warning':
      iziToast.warning(options);
      break;

    case 'info':
      iziToast.info(options);
      break;

    case 'default':
      iziToast.error({
        message: `Invalid type of toast: ${type}`,
        position: 'topRight',
        timeout: 5000,
      });
      break;
  }
}
