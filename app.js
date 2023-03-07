const timerHour = document.getElementById('timer-hour');
const timerMin = document.getElementById('timer-min');
const timerSec = document.getElementById('timer-sec');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const pointer = document.querySelector('.pointer');
const lapContainer = document.querySelector('.lap--container');
let canStop = false;
let running = false;

let seconds =  0;
let minutes =  0;
let hours = 0;
let pointerDeg = 0;
let interval = null;
let milisec = 0;
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;
let count;


function stopWatch () {
    running = true;
    canStop = false;    
    pointerDeg++;
    pointer.style.transform = `translateX(51%) translateY(50%) rotate(${pointerDeg*0.06 - 180}deg)`;
    milisec++;
    
    if (milisec / 100 === 1) {
        milisec = 0;
        seconds++;
        
        if (seconds/60 === 1) {
            seconds = 0;
            minutes++;
            
            if (minutes/60 === 1) {
                minutes = 0;
                hours++;
            }
            
            
        }
    }
    
    //if only one digit, add a 0
    if (seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    } else {
        displaySeconds = seconds;
    }
    
    if (minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    } else {
        displayMinutes = minutes;
    }
    
    if (hours < 10) {
        displayHours = "0" + hours.toString();
    } else {
        displayHours = hours;
    }
    
    //display updated time values to user
    timerHour.innerHTML = displayHours;
    timerMin.innerHTML = displayMinutes;
    timerSec.innerHTML = displaySeconds;
}

let idStopWatch, idClock;

startBtn.addEventListener('click', () => {
    if (!running) {
        idStopWatch = setInterval(stopWatch, 10);
        canStop = false;
        runningApp();
    } 
})

resetBtn.addEventListener('click', () => {
    seconds =  0;
    minutes =  0;
    hours = 0;
    pointerDeg = 0;
    timerHour.innerHTML = '00';
    timerMin.innerHTML = '00';
    timerSec.innerHTML = '00';
    stopBtn.innerHTML = 'stop';
    pointer.style.transform = `translateX(51%) translateY(50%) rotateZ(${pointerDeg*6 - 180}deg)`;
    running = false;
    canStop = false;
    clearInterval(idStopWatch);
    init();
    
});

stopBtn.addEventListener('click', () => {
    /* console.log(`canStop: ${canStop}`);
    console.log(`running: ${running}`); */
    if (running) {
        running = false;
        canStop = true;
        clearInterval(idStopWatch);
        stopBtn.innerHTML = 'resume';
    } else if (canStop) {
        running = true;
        canStop = false;
        idStopWatch = setInterval(stopWatch, 10);
        stopBtn.innerHTML = 'stop';
    }
    
});

lapBtn.addEventListener('click', () => {
    let time  = document.querySelector('.timer--container').textContent;
    time = time.replace(/\s+/g,'');
    count++;
    let div = `<div class="lap">
    <div class="lap-number">
    Lap ${count}
    </div>
    <div class="lap-time">
    ${time}
    </div>
    </div>`
    
    lapContainer.insertAdjacentHTML('afterbegin', div);
});
//if stoped you cant use start 

function init () {
    /* const startBtn = document.getElementById('start');
    const stopBtn = document.getElementById('stop');
    const lapBtn = document.getElementById('lap');
    const resetBtn = document.getElementById('reset'); */
    startBtn.style.pointerEvents = 'auto';
    stopBtn.style.pointerEvents = 'none';
    lapBtn.style.pointerEvents = 'none';
    resetBtn.style.pointerEvents = 'none';
    count = 0;
    lapContainer.innerHTML = '';
}

function runningApp() {
    startBtn.style.pointerEvents = 'none';
    stopBtn.style.pointerEvents = 'auto';
    lapBtn.style.pointerEvents = 'auto';
    resetBtn.style.pointerEvents = 'auto';
}

init();