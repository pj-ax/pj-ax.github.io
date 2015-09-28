
$(document).ready(function () {
    var users = ["monstercat", "freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "comster404"];
    function getTwitchStatus() {
        var $image,
            $div,
            $link,
            $hodiv,
            $hodivimg,
            moveLeft,
            moveDown;

        $.each(users, function (i, v) {
            var url = "https://api.twitch.tv/kraken/streams/";
            $.ajax({
                method: "GET",
                url: url + v,
                dataType: "jsonp",
                success: function (sdata) {
                    if (sdata.stream !== null) {
                        console.log(sdata);
                    }
                    url = "https://api.twitch.tv/kraken/channels/";
                    $.ajax({
                        method: "GET",
                        url: url + v,
                        dataType: "jsonp",
                        success: function (data) {
                              //  console.log(data);
                            if (data.status == 422) {
                                $image = $('<img>', {
                                    class: 'channel-logo img-circle',
                                    src: 'http://home.nightcpu.com/images/redx.png'
                                });
                                $div = $('<div>', {
                                    id: v,
                                    class: "channels s404",
                                    title: data.message + '\n' + 'Click To Remove',
                                    append: $('<span>', { html: v + ' (404)', class: "channel-name" })
                                });
                                $div.append('<span class="glyphicon glyphicon-exclamation-sign status"></span>');
                                $image.prependTo($div);
                            }
                            else {
                                if (!data.logo) {
                                    $image = $('<img>', {
                                        class: 'channel-logo img-circle',
                                        src: 'http://home.nightcpu.com/images/pph.png'
                                    });
                                }
                                else {
                                    $image = $('<img>', {
                                        class: 'channel-logo img-circle',
                                        src: data.logo
                                    });
                                }
                                $div = $('<div>', {
                                    id: v,
                                    class: "channels",
                                    append: $('<span>', { html: data.display_name, class: "channel-name" })
                                });
                                if (!sdata.stream) {
                                    $div.append('<span class="glyphicon glyphicon-ban-circle status"></span>');
                                }
                                else {
                                    $div.append('<span class="glyphicon glyphicon-ok-circle status"></span>');
                                }
                                $image.prependTo($div);
                            }
                            $('.twitch-channels').append($div);
                            if (sdata.stream) {
                                $hodiv = $('<div>', {
                                    class: "dhover text-center",
                                    id: v +'h',
                                    html: sdata.stream.channel.status + "<br>" + "<span>FPS: " + sdata.stream.average_fps + "</span>" + "<br>" + "<span> Viewers: " + sdata.stream.viewers + "</span>"
                                });
                                $hodivimg = $('<img>', {
                                    src: sdata.stream.preview.medium
                                })
                                $('body').append($hodiv);
                                $hodiv.append($hodivimg);
                                $div.hover(function (e) {
                                    $('#'+v+'h').show();
                                }, function (e) {
                                    $('#' + v + 'h').hide();
                                });
                                $div.mousemove(function (e) {
                                    moveLeft = 10;
                                    moveDown = 10;
                                    $('.dhover').css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
                                });
                            }
                            $div.click(function () {
                                if (data.url) {
                                    window.open(data.url, '_blank');
                                }
                                if ($(this).hasClass('s404')) {
                                    $(this).remove();
                                }
                            });

                            $('.all').click(function () {
                                $("#" + v).show();
                            });
                            $('.online').click(function () {
                                $("#" + v).show();
                                if (!sdata.stream) {
                                    $("#" + v).hide();
                                }
                            });
                            $('.offline').click(function () {
                                $("#" + v).show();
                                if (sdata.stream) {
                                    $("#" + v).hide();
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    getTwitchStatus();

    $('.search').val('');
    var txt = $('.search').val();
    $('.controls').click(function () {
        $('.controls').not(this).removeClass('controls-active');
        $(this).addClass('controls-active');
    });
    $('.search').on('input', function () {
        $('.all').click();
        var txt = $('.search').val().toLowerCase();
        $('.channel-name').each(function () {
            if ($(this).text().toLowerCase().indexOf(txt) != -1) {
                $(this).parent().show();
            }
            else {
                $(this).parent().hide();
            }
        });
    });
});