let stopwatchInterval;
let startTime;
let pausedTime = 0;
let running = false;
let laps = [];

function startStop() {
  if (!running) {
    startTime = Date.now() - pausedTime;
    stopwatchInterval = setInterval(updateTime, 10);
    document.getElementById("startStop").textContent = "Stop";
    document.getElementById("pauseResume").style.display = "inline-block";
    document.getElementById("pauseResume").textContent = "Pause";
    running = true;
  } else {
    clearInterval(stopwatchInterval);
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("pauseResume").style.display = "none";
    running = false;
  }
}

function updateTime() {
  let currentTime = Date.now();
  let elapsedTime = currentTime - startTime;
  let formattedTime = formatTime(elapsedTime);
  document.getElementById("minutes").textContent = formattedTime.minutes;
  document.getElementById("seconds").textContent = formattedTime.seconds;
  document.getElementById("milliseconds").textContent =
    formattedTime.milliseconds;
}

function formatTime(ms) {
  let minutes = Math.floor(ms / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  let milliseconds = ms % 1000;
  return {
    minutes: minutes < 10 ? "0" + minutes : minutes,
    seconds: seconds < 10 ? "0" + seconds : seconds,
    milliseconds:
      milliseconds < 100
        ? "0" + (milliseconds < 10 ? "0" + milliseconds : milliseconds)
        : milliseconds,
  };
}

function lapReset() {
  if (running) {
    let lapTime = Date.now() - startTime;
    let formattedTime = formatTime(lapTime);
    laps.push(formattedTime);
    displayLaps();
  } else {
    clearInterval(stopwatchInterval);
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("milliseconds").textContent = "000";
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("pauseResume").style.display = "none";
    document.getElementById("laps").innerHTML = "";
    laps = [];
    pausedTime = 0;
    running = false;
  }
}

function displayLaps() {
  let lapsList = document.getElementById("laps");
  lapsList.innerHTML = "";
  laps.forEach((lap, index) => {
    let lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${index + 1}: ${lap.minutes}:${lap.seconds}.${
      lap.milliseconds
    }`;
    lapsList.appendChild(lapItem);
  });
}

function pauseResume() {
  if (running) {
    clearInterval(stopwatchInterval);
    pausedTime = Date.now() - startTime;
    document.getElementById("pauseResume").textContent = "Resume";
    document.querySelector(".progress-ring-circle").style.animationPlayState =
      "paused";
    running = false;
  } else {
    startTime = Date.now() - pausedTime;
    stopwatchInterval = setInterval(updateTime, 10);
    document.getElementById("pauseResume").textContent = "Pause";
    document.querySelector(".progress-ring-circle").style.animationPlayState =
      "running";
    running = true;
  }
}
