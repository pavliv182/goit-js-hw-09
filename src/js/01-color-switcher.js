// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

// ВНИМАНИЕ
// Учти, на кнопку «Start» можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).

// Для генерации случайного цвета используй функцию getRandomHexColor.

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtnEl: document.querySelector('[data-start]'),
  stopBtnEl: document.querySelector('[data-stop]'),
  bodyEl: document.querySelector('body'),
};
let intervalId = null;
refs.stopBtnEl.setAttribute('disabled', 1);

refs.startBtnEl.addEventListener('click', () => {
  intervalId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.startBtnEl.setAttribute('disabled', 1);
  refs.stopBtnEl.removeAttribute('disabled');
});

refs.stopBtnEl.addEventListener('click', () => {
  clearInterval(intervalId);
  refs.startBtnEl.removeAttribute('disabled');
  refs.stopBtnEl.setAttribute('disabled', 1);
});
