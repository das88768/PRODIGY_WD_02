// create event listener
const playButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');
const lapButton = document.querySelector('.lap');

playButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lapTime);

let startTime;
let elapsedTime = 0;
let timeInterval;
let lapStartTime = 0;
let isRunning = false;
let lapCount = 0;

// convert time to a format of hour, minutes, seconds and miliseconds.
function timeToString(time){
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formatedSS = ss.toString().padStart(2, '0');
    let formatedMM = mm.toString().padStart(2, '0');
    let formatedMS = ms.toString().padStart(2, '0');

    return `${formatedMM} : ${formatedSS} : ${formatedMS}`;
}

// show play and pause button
function showButton(buttonKey){
    const buttonToShow = buttonKey === 'play' ? playButton : pauseButton;
    const buttonToHide = buttonKey === 'play' ? pauseButton : playButton;

    buttonToShow.style.display = 'block';
    buttonToHide.style.display = 'none';
}

// change the time when start button is clicked
function print(txt){
    document.getElementById('display').innerHTML = txt;
}

// starts the timer
function start(){
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    lapStartTime = startTime;
    timeInterval = setInterval(function printTime(){
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime))
    }, 10)
    showButton('pause')
}

// pause the stopwatch
function pause(){
    isRunning = false;
    clearInterval(timeInterval);
    showButton('play');
}

// reset the stopwatch completly.
function reset(){
    isRunning = false;
    clearInterval(timeInterval);
    print('00 : 00 : 00');
    document.getElementById('laps').innerHTML = '';
    lapCount = 0;
    elapsedTime = 0;
    showButton('play');
}


// Dsplay all the laps on the screen.
function showLastLap(lastLapTime){
    document.getElementById('laps').innerHTML += "<li>" + "<span class='counter'>" + `# ${lapCount} ` + "</span>" + "<span class='laptime'>" + lastLapTime + "</span>" + "</li>";
}

// capture and format the lap time.
function lapTime(){
    if(isRunning){
        const lapTime = Date.now() - lapStartTime; 
        const formatedLapTime = timeToString(lapTime);

        console.log(formatedLapTime);

        lapCount += 1;
        showLastLap(formatedLapTime);

        lapStartTime = Date.now();
    }
}