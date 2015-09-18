// Global Variables
var timerOn = false,
    btimerOn = false,
    sessionTime = 1500,
    breakTime = 300,
    seconds = sessionTime,
    mins,
    secs,
    timer,
    pomodorosRan = 0,
    session = 'work',
    audio = new Audio('http://home.nightcpu.com/media/power_up_ray.mp3'),
    w = 0;
// End Global Variables

// Format And Display Timer
function displayTimer() {
    mins = Math.floor(seconds / 60);
    secs = seconds % 60;
    mins > 9 ? '' : mins = '0' + mins;
    secs > 9 ? '' : secs = '0' + secs;
    $('#pomodoro').html(Math.floor(sessionTime / 60) < 1 ? '1' : Math.floor(sessionTime / 60));
    $('.pomodoro-display').html(mins + ':' + secs);
    $('#break').html(Math.floor(breakTime / 60) < 1 ? '1' : Math.floor(breakTime / 60));
   
}

// Button Logic + Turning On And Off Variables
function buttons(event) {
    if (!timerOn) {
        if ($(event.target).hasClass('pbutton-down')) {
            if (+$('#pomodoro').text() <= 1) { return; }
            sessionTime -= 60;
            seconds = sessionTime;
            displayTimer();
// Set Timer Back To Work If Break Session            
            session = 'work';
            btimerOn = false;
// Set Animation Counter Back To Zero To Start New
            w = 0;
            $('.inner-break').css('width', (0) + '%');
            return;
        }
        else if ($(event.target).hasClass('pbutton-up')) {
            if (+$('#pomodoro').text() >= 59) { return; }
            sessionTime += 60;
            seconds = sessionTime;
            displayTimer();
            session = 'work';
            btimerOn = false;
            w = 0;
            $('.inner-break').css('width', (0) + '%');
            return;
        }
        else if ($(event.target).hasClass('bbutton-down')) {
            if (+$('#break').text() <= 1) { return; }
            breakTime -= 60;
// Keep Break Session On If Break Time Is Changed
            if (btimerOn) {
                seconds = breakTime;
                w = 0;
            }
            displayTimer();
            return;
        }
        else if ($(event.target).hasClass('bbutton-up')) {
            if (+$('#break').text() >= 59) { return; }
            breakTime += 60;
            if (btimerOn) {
                seconds = breakTime;
                w = 0;
            }
            displayTimer();
            return;
        }
    }
}
// Run The Timer
function runTimer() {
// Set Animation Time To Proper Session
    var ztime;
    if (session == 'work') {
        ztime = sessionTime;
    }
    else {
        ztime = breakTime;
    }
// Toggle Background DIV Of Session Signifier 
    if (session == 'work') {
        $('.break').toggleClass('session-on', false);
        $('.work').toggleClass('session-on', true);
    }
    else {
        $('.work').toggleClass('session-on', false);
        $('.break').toggleClass('session-on', true);
    }
// Timer
    if (seconds > 0) {
        seconds -= 1;
// Begin Animating Background DIV
        w++;
        var x = (w / ztime) * 100;
        //console.log(x.toFixed(2) + ' ' + ztime + ' ' + w);
        if (session == 'work') {
            $('.inner-work').css('width', (x) + '%');
        }
        else {
            $('.inner-break').css('width', (x) + '%');
        }
        displayTimer();
        if (seconds <= 0) {
            soundAlarm();
            w = 0;
            $('.inner-work').css('width', (0) + '%');
            $('.inner-break').css('width', (0) + '%');
            if (!btimerOn) {
                pomodorosRan += 1;
            }
        }
    }
// Switch Sessions After First Run
    else {
        if (!btimerOn) {
            seconds = breakTime;
// Increase Break Time After 4 Work Sessions
            if (pomodorosRan > 4) {
                breakTime += breakTime;
                seconds = breakTime;
                pomodorosRan = 0;
            }
            session = 'break';
            btimerOn = true;
        }
        else {
            seconds = sessionTime;
            session = 'work';
            btimerOn = false;
        }
    }

}
// Play Sound
function soundAlarm() {
    audio.play();
    return;
}
/*
function animateDisplay() {
    t = setInterval(function () {
        var x = (w / aniTime) * 100;
        w++;
        console.log(x.toFixed(1)+ ' ' + aniTime + ' ' + w);
                   
        if (x >= 100) {
            clearInterval(t);
        }
        if($('.work').hasClass('session-on')) {
            $('.inner-work').css('width',(x) +'%');
        }
        else {
            $('.inner-break').css('width',(x) +'%');
        }
        //document.getElementById('inner-work').style.width = (x) + "%";
    }, 1000);
}
*/

$(document).ready(function () {
    displayTimer();
    $('.pbutton-down, .pbutton-up, .bbutton-down, .bbutton-up').on('click', function (event) {
        buttons(event);
    });
    $('.pomodoro-display').on('click', function () {
        if (timerOn) {
            clearInterval(timer);
            timerOn = false;
            
        }
        else {
            timer = setInterval(runTimer, 1000);
            timerOn = true;
        }
    });
});