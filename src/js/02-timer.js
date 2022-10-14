import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

let targetTime = null;
let timerId = null;

const optionsFlatpickr = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validDate(selectedDates[0]);
  },
};

const refs = {
  btnStart: document.querySelector('[data-start]'),
  timerItemDays: document.querySelector('[data-days]'),
  timerItemHours: document.querySelector('[data-hours]'),
  timerItemMinutes: document.querySelector('[data-minutes]'),
  timerItemSeconds: document.querySelector('[data-seconds]'),
  datePicker: document.querySelector('#datetime-picker'),
};

flatpickr('input#datetime-picker', optionsFlatpickr);
btnStartIsActive();

refs.btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  btnStartIsActive();
  checkBtnStopEnable();

  refs.datePicker.toggleAttribute('disabled');
  Notify.success('Сountdown starts');

  timerId = setInterval(() => {
    const currentTime = new Date();

    dateIntervalMs = targetTime.getTime() - currentTime.getTime();

    const countdown = convertMs(dateIntervalMs);

    updateClockValue(countdown);
    isCountdownEnd(dateIntervalMs, timerId);
  }, 1000);
}

function isCountdownEnd(interval, timer) {
  if (interval < 1000) {
    clearTimeout(timer);

    refs.btnStart.toggleAttribute('disabled');

    Notify.warning('Countdown is over');
  }
}

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockValue({ days, hours, minutes, seconds }) {
  refs.timerItemDays.textContent = addLeadingZero(days);
  refs.timerItemHours.textContent = addLeadingZero(hours);
  refs.timerItemMinutes.textContent = addLeadingZero(minutes);
  refs.timerItemSeconds.textContent = addLeadingZero(seconds);
}

function btnStartIsActive() {
  refs.btnStart.toggleAttribute('disabled');
}

function validDate(date) {
  targetTime = new Date(date);
  const currentDate = new Date();
  if (targetTime < currentDate) {
    return Notify.failure('Please choose a date in the future');
  }
  Notify.info('Push start for begining');
  refs.btnStart.removeAttribute('disabled');
}

//===================================== add StopButton

function addStopBtn() {
  if (!document.querySelector('.stop-button')) {
    const btnStop = document.createElement('button');
    btnStop.textContent = 'Stop';
    btnStop.style.marginLeft = '8px';
    btnStop.classList = 'stop-button';

    refs.btnStart.after(btnStop);
    refs.btnStop = document.querySelector('.stop-button');
  }
  refs.btnStop.addEventListener('click', onClickBtnStop);
}

function onClickBtnStop() {
  refs.timerItemDays.textContent = '00';
  refs.timerItemHours.textContent = '00';
  refs.timerItemMinutes.textContent = '00';
  refs.timerItemSeconds.textContent = '00';
  refs.btnStop.toggleAttribute('disabled');
  refs.datePicker.toggleAttribute('disabled');
  clearTimeout(timerId);
  Notify.failure('Countdown has stopped');

  btnStartIsActive();
}

function checkBtnStopEnable() {
  if (!document.querySelector('.stop-button')) {
    addStopBtn();
  } else {
    refs.btnStop.toggleAttribute('disabled');
  }
}
