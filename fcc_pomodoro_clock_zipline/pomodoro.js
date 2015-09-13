
var timerOn = false;
var btimerOn = false;
var sessionTime = 1500;
var breakTime = 300;
var seconds = sessionTime;
var mins;
var secs;
var timer;
var pomodorosRan = 0;
var session = 'work';
var audio = new Audio('http://home.nightcpu.com/power_up_ray.mp3')
function displayTimer() {
    mins = Math.floor(seconds / 60);
    secs = seconds % 60;
    mins > 9 ? '' : mins = '0' + mins;
    secs > 9 ? '' : secs = '0' + secs;
    $('#pomodoro').html(Math.floor(sessionTime / 60) < 1 ? '1' : Math.floor(sessionTime / 60));
    $('.pomodoro-display').html(mins + ':' + secs);
    $('#break').html(Math.floor(breakTime / 60) < 1 ? '1' : Math.floor(breakTime / 60));
    if (session == 'work') {
        $('.break').toggleClass('break-session', false);
        $('.work').toggleClass('work-session', true);
    }
    else {
        $('.work').toggleClass('work-session', false);
        $('.break').toggleClass('break-session', true);
    }
}
function buttons(event) {
    if (!timerOn) {
        if ($(event.target).hasClass('pbutton-down')) {
            if (+$('#pomodoro').text() <= 1) { return; }
            sessionTime -= 60;
            seconds = sessionTime;
            displayTimer();
            return;
        }
        else if ($(event.target).hasClass('pbutton-up')) {
            if (+$('#pomodoro').text() >= 59) { return; }
            sessionTime += 60;
            seconds = sessionTime;
            displayTimer();
            return;
        }
        else if ($(event.target).hasClass('bbutton-down')) {
            if (+$('#break').text() <= 1) { return; }
            breakTime -= 60;
            if (btimerOn) {
                seconds = breakTime;
            }
            displayTimer();
            return;
        }
        else if ($(event.target).hasClass('bbutton-up')) {
            if (+$('#break').text() >= 59) { return; }
            breakTime += 60;
            if (btimerOn) {
                seconds = breakTime;
            }
            displayTimer();
            return;
        }
    }
}
function runTimer() {
    if (seconds > 0) {
        seconds -= 1;
        displayTimer();
        if (seconds <= 0) {
            soundAlarm();
            pomodorosRan += 1;
        }
    }
    else {
        if (!btimerOn) {
            seconds = breakTime;
            if (pomodorosRan > 5) {
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
function soundAlarm() {
    audio.play();
    return;
}

$(document).ready(function () {
    displayTimer();
    $('.pbutton-down, .pbutton-up, .bbutton-down, .bbutton-up').on('click', function (event) {
        buttons(event);
    });
    $('.pomodoro-display').on('click', function () {
        if (!timerOn) {
            timer = setInterval(runTimer, 1000);
            timerOn = true;
        }
        else {
            clearInterval(timer);
            timerOn = false;
        }
    });
});