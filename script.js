let startTime, updatedTime, difference;
let interval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const clearLapsButton = document.getElementById('clear-laps');
const lapsList = document.getElementById('laps');

startButton.addEventListener('click', function() {
    if (!running) {
        running = true;
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 10);
    }
});

pauseButton.addEventListener('click', function() {
    if (running) {
        running = false;
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
    }
});

resetButton.addEventListener('click', function() {
    clearInterval(interval);
    running = false;
    difference = 0;
    lapCounter = 0;
    display.textContent = "00:00:00.000";
    lapsList.innerHTML = '';
});

lapButton.addEventListener('click', function() {
    if (running) {
        lapCounter++;
        const lapTime = formatTime(new Date().getTime() - startTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapElement);
    }
});

clearLapsButton.addEventListener('click', function() {
    lapsList.innerHTML = '';
    lapCounter = 0;
});

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(ms) {
    let milliseconds = ms % 1000;
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + "." +
        (milliseconds < 100 ? "0" : "") + (milliseconds < 10 ? "0" : "") + milliseconds
    );
}
