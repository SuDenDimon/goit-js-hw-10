import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delayForm = document.querySelector('.form');

delayForm.addEventListener('submit', event => {
  event.preventDefault();
  const delay = event.currentTarget.elements.delay.value;
  const radio = event.currentTarget.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(delay, radio);
      if (radio === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Registering promise callbacks
  promise
    .then(value => {
      iziToast.success({
        color: 'green',
        position: 'topRight',
        message: `✅ Fulfilled promise in ${value}ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        color: 'red',
        position: 'topRight',
        message: `❌ Rejected promise in ${error}ms`,
      });
    });
});
