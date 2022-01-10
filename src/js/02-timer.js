import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
    timer:document.querySelector('.timer'),
};

refs.btnStart.disabled = true;
refs.btnStart.classList.add('disabled');

let useDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  
  onClose(selectedDates) {
      console.log(selectedDates[0]);

    if (selectedDates[0] < Date.now()) {
        Notiflix.Notify.failure('Please choose a date in the future')
    } else {
        refs.btnStart.classList.remove('disabled');
        refs.btnStart.disabled = false; 

        useDate = selectedDates[0];
      };
  },
  
};
console.log(options);

function pad(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return {days, hours, minutes, seconds};
};

class Timer { 
  constructor() { 
    this.isActive = false;
    this.timerId = null;
    refs.btnStart.disabled = true;
  };

  start() { 
    if (this.isActive) { 
      return;
    }
    this.isActive = true;
    refs.btnStart.disabled = true;
    refs.btnStart.classList.add('disabled');
    
    this.timerId = setInterval(() => {
      const currentTime = new Date();
      const deltaTime = useDate - currentTime;
      const element = convertMs(deltaTime);

      refs.days.textContent = element.days;
      refs.hours.textContent = element.hours;
      refs.minutes.textContent = element.minutes;
      refs.seconds.textContent = element.seconds;
      
       if (deltaTime <= 0) { 
        this.stop();
        refs.timer.innerHTML = 'Time is over!';
      };
    }, 1000);

  };
   
  stop() { 
    clearInterval(this.timerId)
  };
};
 
flatpickr(refs.input, options)
const timer = new Timer();
refs.btnStart.addEventListener('click', () => timer.start());