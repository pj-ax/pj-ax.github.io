$(document).ready(function () {
    var users = ["brunofin", "monstercat", "freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "comster404"];
    function getTwitchStatus() {
        var $image,$div,$spanImg,$spanName,$spanStatus,$link,$hodiv,$hodivimg,moveLeft,moveDown;
        $.each(users, function (i, v) {
            var url = "https://api.twitch.tv/kraken/streams/";
            $.ajax({
                method: "GET",
                url: url + v,
                dataType: "jsonp",
                success: function (sdata) {
                    url = "https://api.twitch.tv/kraken/channels/";
                    $.ajax({
                        method: "GET",
                        url: url + v,
                        dataType: "jsonp",
                        success: function (data) {
                            $spanImg = $('<span>', { class: "img-span" });
                            $spanName = $('<span>', { class: "name-span" });
                            $spanStatus = $('<span>', { class: "status-span" });
                            $div = $('<div>', { id: v, class: "channels" }).append($spanImg).append($spanName).append($spanStatus);
                            if (data.status == 422) {
                                $image = $('<img>', {
                                    class: 'channel-logo img-circle',
                                    src: 'http://home.nightcpu.com/images/redx.png'
                                });
                                $div.attr("title", data.message + '\n' + 'Click To Remove').addClass('s404');
                                $spanName.append(v + ' (404)').addClass('channel-name');
                                $spanStatus.append('<span class="glyphicon glyphicon-exclamation-sign status"></span>');
                                $spanImg.append($image);
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
                                $spanName.append(v).addClass("channel-name");
                                if (!sdata.stream) {
                                    $spanStatus.append('<span class="glyphicon glyphicon-ban-circle status"></span>');
                                }
                                else {
                                    $spanStatus.append('<span class="glyphicon glyphicon-ok-circle status"></span>');
                                }
                                $spanImg.append($image);
                            }
                            $('.main').append($div);
                            if (sdata.stream) {
                                $hodiv = $('<div>', {
                                    class: "dhover text-center",
                                    id: v + 'h',
                                    html: sdata.stream.channel.status + "<br>" + "<span>FPS: " + Math.round(sdata.stream.average_fps) + "</span>" + "<br>" + "<span> Viewers: " + sdata.stream.viewers + "</span>"
                                });
                                $hodivimg = $('<img>', {
                                    src: sdata.stream.preview.medium
                                })
                                if (!$('#' + v + 'h').html()) {
                                    $('body').append($hodiv);
                                    $hodiv.append($hodivimg);
                                }
                                //$('body').append($hodiv);
                                //$hodiv.append($hodivimg);
                                $div.hover(function (e) {
                                    $('#' + v + 'h').show();
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
                                    var index = users.indexOf($(this).attr('id'));
                                    $(this).remove();
                                    users.splice(index, 1);
                                    console.log('user removed');
                                }
                            });
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
        });
    }
    getTwitchStatus();
    $('.add').val('');
    $('.search').val('');
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
    $('.plus').click(function () {
        var addtxt = $('.add').val();
        var lusers = users.map(function (value) { return value.toLowerCase(); })
        if (addtxt !== '') {
            if (lusers.indexOf(addtxt.toLowerCase()) !== -1) {
                alert('User Already Exists');
                return;
            }
            $('.add').val('');
            $('.search').val('');
            users.push(addtxt);
            $('.main').empty();
            $('.all').click();
            getTwitchStatus();
        }
        else {
            alert('Please Enter A Channel Name');
            return;
        }
    });
    $('.minus').click(function () {
        $('.add').val('');
    });
});