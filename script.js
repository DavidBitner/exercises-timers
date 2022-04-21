const container = document.querySelector(`.container`);
const btnReset = document.querySelector(`.reset`);
const btnChange = document.querySelector(`.change`);
const overlay = document.querySelector(`.overlay`);
const modal = document.querySelector(`.modal`);
const inputNumberTimers = document.querySelector(`.numberTimers`);
const inputDurationTimers = document.querySelector(`.durationTimers`);
const btnAdd = document.querySelector(`.add`);

function createTimerDisplay(amount = 4, timerDuration = 120) {
  for (let i = 0; i < amount; i++) {
    const timerHtml = `
      <div class="time-left">${timerDuration}</div>
      <div class="progress"></div>
      <div class="child"></div>
  `;
    const timerElement = document.createElement("div");
    timerElement.classList.add("timer");
    timerElement.innerHTML = timerHtml;
    container.appendChild(timerElement);
  }
}

function resetTimers() {}

function addTimers() {}

function toggleModal(visible = true) {
  if (visible) {
    overlay.style.visibility = "visible";
    modal.style.transform = "scale(1)";
  } else {
    overlay.style.visibility = "hidden";
    modal.style.transform = "scale(0)";
  }
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
      clearInterval(timer);
    }

    timeLeft--;
    currentPercentage++;
  }, 1000);
}

btnAdd.addEventListener("click", addTimers);
btnReset.addEventListener("click", resetTimers);
btnChange.addEventListener("click", toggleModal);
window.addEventListener("load", createTimerDisplay.bind(0, 4, 120));
container.addEventListener("click", (e) => startTimer(e));
overlay.addEventListener("click", (e) => {
  if (!e.target.closest(".modal")) {
    toggleModal(false);
  }
});
