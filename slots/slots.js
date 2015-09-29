var images;
var total;
var bet;
var swap;
var jackpot;
$(document).ready(function () {
    images = ['./images/cherry.png', './images/gold.png', './images/Coins-512.png', './images/Lucky_Seven-512.png', './images/Horseshoe-512.png', './images/Bananas-512.png', './images/Jackpot-512.png', './images/gold_bar.png', './images/bar-512.png', './images/Diamond-512.png'];
    $('#slot1').append('<img src="' + images[ranSlotImage()] + '" />');
    $('#slot2').append('<img src="' + images[ranSlotImage()] + '" />');
    $('#slot3').append('<img src="' + images[ranSlotImage()] + '" />');

    total = +$('#total-span').text();
    bet = +$('#bet-span').text();
    jackpot = +$('#jackpot-number').text();

    function ranSlotImage() { return Math.floor(Math.random() * 10); return; }
    function changeSlots() {
        var newNum1 = Math.floor(Math.random() * 10);
        var newNum2 = Math.floor(Math.random() * 10);
        var newNum3 = Math.floor(Math.random() * 10);
        while ($('#slot1').children().attr('src').indexOf(images[newNum1]) != -1) {
            newNum1 = Math.floor(Math.random() * 10);
        }
        $('#slot1').children().attr('src', images[newNum1]);
        while ($('#slot2').children().attr('src').indexOf(images[newNum2]) != -1) {
            newNum2 = Math.floor(Math.random() * 10);
        }
        $('#slot2').children().attr('src', images[newNum2]);
        while ($('#slot3').children().attr('src').indexOf(images[newNum3]) != -1) {
            newNum3 = Math.floor(Math.random() * 10);
        }
        $('#slot3').children().attr('src', images[newNum3]);
        return;
    }

    $('#bet-up').on('click', function (event) {
        if (bet < total) {
            bet += 100;
            $('#bet-span').text(bet);
            $('.result').attr('class', 'result');
            $('#resulttxt').html('');
        }
        return;
    });
    $('#bet-down').on('click', function (event) {
        if (bet > 0) {
            bet -= 100;
            $('#bet-span').text(bet);
        }
        return;
    });

    $('#spin').on('mousedown mouseup mouseleave', function (event) {
        if (event.type == 'mousedown') {
            if (bet != 0) {
                swap = setInterval(changeSlots, 70);
                return;
            }
            else {
                $('#bet-span').effect('pulsate');
                return;
            }
        }
        if (event.type == 'mouseup'||event.type == 'mouseleave') {
            if (swap) {
                clearInterval(swap);
                swap = false;
                if ($('#slot1').children().attr('src') != $('#slot2').children().attr('src') || $('#slot1').children().attr('src') != $('#slot3').children().attr('src')) {
                    total -= bet;
                    $('#total-span').text(total);
                    if (total === 0) {
                        $('#resulttxt').text('GAME OVER');
                        bet = 0;
                        $('#bet-span').text(bet);
                        return;
                    }
                    jackpot += 5000;
                    $('#jackpot-number').text(jackpot);
                    bet = 0;
                    $('#bet-span').text(bet);
                    $('.result').addClass('result-lose');
                    $('#resulttxt').text('LOSE!');
                }
                else if ($('#slot1').children().attr('src') == $('#slot2').children().attr('src') && $('#slot1').children().attr('src') == $('#slot3').children().attr('src')) {
                    total += jackpot + bet;
                    $('#total-span').text(total);
                    jackpot = 50000;
                    $('#jackpot-number').text(jackpot);
                    bet = 0;
                    $('#bet-span').text(bet);
                    $('.result').addClass('result-win');
                    $('#resulttxt').text('JACKPOT!');
                }
                return;
            }           
        }
    });
});
