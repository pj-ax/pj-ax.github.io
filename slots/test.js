var images = ['./images/cherry.png', './images/gold.png', './images/Coins-512.png', './images/Lucky_Seven-512.png', './images/Horseshoe-512.png', './images/Bananas-512.png', './images/Jackpot-512.png', './images/gold_bar.png', './images/bar-512.png', './images/Diamond-512.png'];
var swap;
$('#slot1').append('<img src="' + images[ranSlotImage()] + '" />');
$('#slot2').append('<img src="' + images[ranSlotImage()] + '" />');
$('#slot3').append('<img src="' + images[ranSlotImage()] + '" />');
function ranSlotImage() { return Math.floor(Math.random() * 10); }
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
}
$('#spin').on('mousedown mouseup', function (event) {
    if (event.type == 'mousedown') {
        swap = setInterval(changeSlots, 100);
    }
    if (event.type == 'mouseup') {
        clearInterval(swap);
    }
});