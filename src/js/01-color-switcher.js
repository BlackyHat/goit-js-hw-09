const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.body,
};

refs.btnStart.addEventListener('click', onBtnStart);
refs.btnStop.addEventListener('click', onBtnStop);
// ;

let timerId = null;
isBtnStopctive();

function onBtnStart() {
  timerId = setInterval(changeBodyBgColor, 1000);
  refs.btnStart.setAttribute('disabled', '');
  isBtnStopctive();
}

function isBtnStopctive() {
  const isStopBtnActive = refs.btnStop.hasAttribute('disabled');
  if (isStopBtnActive) {
    refs.btnStop.removeAttribute('disabled', '');
  } else {
    refs.btnStop.setAttribute('disabled', '');
  }
}

function onBtnStop() {
  refs.btnStart.removeAttribute('disabled', '');
  clearInterval(timerId);
  isBtnStopctive();
}

function changeBodyBgColor() {
  return (refs.body.style.backgroundColor = getRandomHexColor());
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
