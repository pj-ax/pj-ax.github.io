function getNewQuote() {
    $.ajax({
        method: "GET",
        url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en",
        dataType: "jsonp",
        jsonp: "jsonp"
    }).done(function (q) {
        $('#quote').text(q.quoteText);
        if (q.quoteAuthor) {
            $('.quote-author').text(q.quoteAuthor);
        } else {
            $('.quote-author').text('Unknown');
        }
        twttr.widgets.createShareButton(
            'http://www.freecodecamp.com',
            document.getElementById('twt'),
            {
                text: q.quoteText + ' -' + $('.quote-author').text() + '-' + '\n',
                hashtags: 'RandomQuotes',
                count: 'none'
            }
       );
    });
}
$(document).ready(function () {
    getNewQuote();
    $('button').on('click', function () {
        $('#twt').empty();
        getNewQuote();
    });
    
});