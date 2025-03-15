import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let timeInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    timeInterval = userSelectedDate - new Date();

    if (userSelectedDate <= new Date()) {
      iziToast.error({
        color: 'red',
        position: 'topRight',
        message: `Please choose a date in the future`,
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      startButton.classList.add(`btn-active`);
    }
  },
};

flatpickr('#datetime-picker', options);
const startButton = document.querySelector('button');
const showTime = document.querySelectorAll('.value');

startButton.disabled = true;
startButton.addEventListener('click', event => {
  const intervalId = setInterval(() => {
    timeInterval = userSelectedDate - new Date();
    startButton.classList.remove(`btn-active`);
    if (timeInterval < 1) {
      startButton.disabled = true;
      clearInterval(intervalId);
      return;
    }
    const timer = convertMs(timeInterval);
    showTime[0].innerText = timer.days.toString().padStart(2, '0');
    showTime[1].innerText = timer.hours.toString().padStart(2, '0');
    showTime[2].innerText = timer.minutes.toString().padStart(2, '0');
    showTime[3].innerText = timer.seconds.toString().padStart(2, '0');
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
