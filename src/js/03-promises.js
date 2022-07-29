import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'notiflix/dist/notiflix-3.2.5.min.css';

// delayEl: document.querySelector('input[name="delay"]'),
//   stepEl: document.querySelector('input[name="step"]'),
//   amountEl: document.querySelector('input[name="amount"]'),

const refs = {
  formEl: document.querySelector('.form'),
  submitBtnEl: document.querySelector('button[type="submit"]'),
};
refs.formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  const formElements = evt.currentTarget.elements;
  // console.log(formElements);
  let delay = Number(formElements.delay.value);
  let step = Number(formElements.step.value);
  let amount = Number(formElements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
