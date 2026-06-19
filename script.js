let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapResetBtn = document.getElementById('lapResetBtn');
const lapsContainer = document.getElementById('lapsContainer');
const lapsList = document.getElementById('lapsList');
const outerRing = document.querySelector('.outer-ring');

function formatTime(timeMs) {
    let hrs = Math.floor(timeMs / 3600000);
    let mins = Math.floor((timeMs % 3600000) / 60000);
    let secs = Math.floor((timeMs % 60000) / 1000);
    let ms = Math.floor((timeMs % 1000) / 10);

    let formatHrs = hrs.toString().padStart(2, '0');
    let formatMins = mins.toString().padStart(2, '0');
    let formatSecs = secs.toString().padStart(2, '0');
    let formatMs = ms.toString().padStart(2, '0');

    return `${formatHrs}:${formatMins}:${formatSecs}<span class="ms">.${formatMs}</span>`;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.innerHTML = formatTime(elapsedTime);
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10); // Precise 10ms execution loop
    
    isRunning = true;
    outerRing.classList.add('running');
    
    startPauseBtn.textContent = 'Pause';
    startPauseBtn.className = 'btn btn-pause';
    
    lapResetBtn.textContent = 'Lap';
    lapResetBtn.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    outerRing.classList.remove('running');
    
    startPauseBtn.textContent = 'Start';
    startPauseBtn.className = 'btn btn-start';
    
    lapResetBtn.textContent = 'Reset';
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCount = 0;
    isRunning = false;
    
    display.innerHTML = '00:00:00<span class="ms">.00</span>';
    outerRing.className = 'outer-ring';
    
    startPauseBtn.textContent = 'Start';
    startPauseBtn.className = 'btn btn-start';
    
    lapResetBtn.textContent = 'Lap';
    lapResetBtn.disabled = true;
    
    lapsList.innerHTML = '';
    lapsContainer.style.display = 'none';
}

function recordLap() {
    lapCount++;
    lapsContainer.style.display = 'block';
    
    const li = document.createElement('li');
    li.innerHTML = `<span>Lap ${lapCount}</span><span>${formatTime(elapsedTime)}</span>`;
    
    // Inserts the newest lap entry at the top of the history list
    lapsList.insertBefore(li, lapsList.firstChild);
}

// Global UI Event Configurations
startPauseBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTimer();
    } else {
        pauseTimer();
    }
});

lapResetBtn.addEventListener('click', () => {
    if (isRunning) {
        recordLap();
    } else {
        resetTimer();
    }
});