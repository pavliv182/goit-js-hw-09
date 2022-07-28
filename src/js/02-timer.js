import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};
// console.log(refs.datetimePicker);

let currentDate = new Date();
refs.startBtnEl.setAttribute('disabled', 1);

// console.log(new Date());
flatpickr(refs.datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] < currentDate) {
      Notify.failure('Please choose a date in the future');

      refs.startBtnEl.setAttribute('disabled', 1);
      return;
    }
    refs.startBtnEl.removeAttribute('disabled');
  },
});

let intervalId = null;

refs.startBtnEl.addEventListener('click', () => {
  //   console.log(convertMs(new Date()));
  //   console.log(Date.now(refs.datetimePicker.value));
  intervalId = setInterval(() => {
    const convertedDate = convertMs(
      Number(new Date(refs.datetimePicker.value)) - Number(Date.now())
    );
    refs.daysEl.textContent = addLeadingZero(convertedDate.days);
    refs.hoursEl.textContent = addLeadingZero(convertedDate.hours);
    refs.minutesEl.textContent = addLeadingZero(convertedDate.minutes);
    refs.secondsEl.textContent = addLeadingZero(convertedDate.seconds);
    if (Number(refs.secondsEl.textContent) <= 0) {
      clearInterval(intervalId);
    }
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
// console.log(addLeadingZero(4));

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
