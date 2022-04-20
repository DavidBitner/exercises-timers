const container = document.querySelector(`.container`);
const btnReset = document.querySelector(`.reset`);
const btnChange = document.querySelector(`.change`);
const overlay = document.querySelector(`.overlay`);
const modal = document.querySelector(`.modal`);
const inputNumberTimers = document.querySelector(`.numberTimers`);
const inputDurationTimers = document.querySelector(`.durationTimers`);
const btnAdd = document.querySelector(`.add`);

function createTimer(amount = 4) {
  for (let i = 0; i < amount; i++) {
    const timerHtml = `
      <div class="time-left">120</div>
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

btnAdd.addEventListener("click", addTimers);
btnReset.addEventListener("click", resetTimers);
btnChange.addEventListener("click", toggleModal);
overlay.addEventListener("click", (e) => {
  if (!e.target.closest(".modal")) {
    toggleModal(false);
  }
});
window.addEventListener("load", createTimer.bind(0, 4));
container.addEventListener("click", (e) => {
  if (!e.target.parentNode.classList.contains("timer")) {
    return;
  }
  const currentTimer = e.target.parentNode;
  const currentTimeLeft = currentTimer.children[0];
  const currentProgress = currentTimer.children[1];
});
