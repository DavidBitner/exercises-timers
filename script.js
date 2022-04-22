const container = document.querySelector(`.container`);
const btnReset = document.querySelector(`.reset`);
const btnChange = document.querySelector(`.change`);
const overlay = document.querySelector(`.overlay`);
const modal = document.querySelector(`.modal`);
const inputNumberTimers = document.querySelector(`.numberTimers`);
const inputDurationTimers = document.querySelector(`.durationTimers`);
const btnAdd = document.querySelector(`.add`);
const audio = new Audio("sound.mp3");

let timers = [];
let currentTimerAmount = 4;
let currentTimerDuration = 120;

function createTimerDisplay(amount = 4, timerDuration = 120) {
  if (amount % 4 == 0) {
    container.style.gridTemplateColumns = "repeat(4, 1fr)";
  } else if (amount % 3 == 0) {
    container.style.gridTemplateColumns = "repeat(3, 1fr)";
  } else if (amount % 2 == 0) {
    container.style.gridTemplateColumns = "repeat(2, 1fr)";
  } else {
    container.style.gridTemplateColumns = "repeat(1, 1fr)";
  }

  for (let i = 0; i < amount; i++) {
    const timerHtml = `
      <div class="time-left">${timerDuration}</div>
      <div class="progress"></div>
      <div class="child"></div>
    `;
    const timerElement = document.createElement("div");
    timerElement.setAttribute(`id`, `timer${i}`);
    timerElement.classList.add("timer");
    timerElement.innerHTML = timerHtml;
    container.appendChild(timerElement);
  }
}

function toggleModal(visible = true) {
  if (visible) {
    overlay.style.visibility = "visible";
    modal.style.transform = "scale(1)";
  } else {
    overlay.style.visibility = "hidden";
    modal.style.transform = "scale(0)";
  }
}

function resetTimers() {
  container.innerHTML = "";
  createTimerDisplay(currentTimerAmount, currentTimerDuration);
  for (const timer of timers) {
    clearInterval(timer);
  }
  timers = [];
}

function addTimers() {
  currentTimerDuration = inputDurationTimers.value;
  currentTimerAmount = inputNumberTimers.value;

  if (isNaN(currentTimerDuration) || isNaN(currentTimerAmount)) {
    alert("Input must be a number");
    return;
  }

  if (currentTimerDuration <= 0) {
    currentTimerDuration = 120;
  }

  if (currentTimerAmount <= 0) {
    currentTimerAmount = 4;
  }

  container.innerHTML = "";
  createTimerDisplay(currentTimerAmount, currentTimerDuration);
  toggleModal(false);
  inputDurationTimers.value = "";
  inputNumberTimers.value = "";
}

function startTimer(e) {
  if (!e.target.parentNode.classList.contains("timer")) {
    return;
  }

  const currentTimer = e.target.parentNode;

  if (currentTimer.classList.contains("disabled")) {
    return;
  } else {
    currentTimer.classList.add("disabled");
  }

  const currentTimeLeft = currentTimer.children[0];
  const currentProgress = currentTimer.children[1];
  const duration = currentTimeLeft.textContent;
  let timeLeft = duration;
  let currentPercentage = 0;

  const timer = setInterval(() => {
    const progress = (currentPercentage / duration) * 100;
    currentTimeLeft.innerHTML = timeLeft;
    currentProgress.style.width = `${progress}%`;

    if (timeLeft <= 0) {
      audio.play();
      clearInterval(timer);
    }

    timeLeft--;
    currentPercentage++;
  }, 1000);
  timers.push(timer);
}

btnAdd.addEventListener("click", addTimers);
btnReset.addEventListener("click", resetTimers);
btnChange.addEventListener("click", toggleModal);
window.addEventListener(
  "load",
  createTimerDisplay.bind(0, currentTimerAmount, currentTimerDuration)
);
container.addEventListener("click", (e) => startTimer(e));
overlay.addEventListener("click", (e) => {
  if (!e.target.closest(".modal")) {
    toggleModal(false);
  }
});
