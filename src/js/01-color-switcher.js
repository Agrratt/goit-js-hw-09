const refs = {
    btnStart: document.querySelector("button[data-start]"),
  btnStop: document.querySelector("button[data-stop]"),
    body: document.querySelector('body'),
};

refs.btnStart.addEventListener('click', startRandomColor);
refs.btnStop.addEventListener('click', stopRandomColor);

refs.btnStop.disabled = true;
let timerId = 0;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function changeColorBody() { 
  refs.body.style.background = getRandomHexColor()
};

function startRandomColor() {
  timerId = setInterval(changeColorBody, 1000);
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
};

function stopRandomColor() {
  clearInterval(timerId);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
};

