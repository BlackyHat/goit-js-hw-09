import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

Notify.init({ useIcon: false });

const refs = {
  form: document.querySelector('.form'),
};

let timerId = null;

refs.form.addEventListener('click', onClickSubmit);

function onClickSubmit(e) {
  e.preventDefault();
  if (e.target.type === 'submit') {
    e.target.toggleAttribute('disabled');
    const delay = refs.form.delay.value;
    const step = refs.form.step.value;
    const amount = refs.form.amount.value;
    let count = 0;

    //==================================================
    setTimeout(() => {
      timerId = setInterval(() => {
        count += 1;
        let isTrue = Number(amount) === Number(count);

        if (isTrue) {
          clearInterval(timerId);
          e.target.toggleAttribute('disabled');
        }
        //==================================================
        createPromise(count, step)
          .then(({ position, delay }) => {
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          });
        //==================================================
      }, step);
    }, delay);

    //==================================================
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    // Asynchronous operation
    const newOptions = {
      position,
      delay,
    };
    if (shouldResolve) {
      // Fulfill
      resolve(newOptions);
    }
    // Reject
    else {
      reject(newOptions);
    }
  });

  return promise;
}
