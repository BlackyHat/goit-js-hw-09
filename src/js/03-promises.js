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
    let delay = Number(refs.form.delay.value);
    const step = Number(refs.form.step.value);
    const amount = Number(refs.form.amount.value);

    //==================================================
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
    //================================================== toggle submit button
    setTimeout(() => {
      e.target.toggleAttribute('disabled');
    }, delay);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const newOptions = { position, delay };
      if (shouldResolve) {
        resolve(newOptions);
      } else {
        reject(newOptions);
      }
    }, delay);
  });
}
