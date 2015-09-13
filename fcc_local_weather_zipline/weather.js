var locationData;
var weatherData;
var kmh;
var latLon;
var images = [
    'http://home.nightcpu.com/images/weather/0-tornado.jpg',
    'http://home.nightcpu.com/images/weather/1-tropical_storm.jpg',
    'http://home.nightcpu.com/images/weather/2-hurricane.jpg',
    'http://home.nightcpu.com/images/weather/3-severe thunderstorms.jpg',
    'http://home.nightcpu.com/images/weather/4-thunderstorms.jpg',
    'http://home.nightcpu.com/images/weather/5-mixed-rain-and-snow.jpg',
    'http://home.nightcpu.com/images/weather/5-mixed-rain-and-snow.jpg',
    'http://home.nightcpu.com/images/weather/5-mixed-rain-and-snow.jpg',
    'http://home.nightcpu.com/images/weather/5-mixed-rain-and-snow.jpg',
    'http://home.nightcpu.com/images/weather/9-drizzle.jpg',
    'http://home.nightcpu.com/images/weather/5-mixed-rain-and-snow.jpg',
    'http://home.nightcpu.com/images/weather/11-showers.jpg',
    'http://home.nightcpu.com/images/weather/11-showers.jpg',
    'http://home.nightcpu.com/images/weather/13-snow_flurries.jpg',
    'http://home.nightcpu.com/images/weather/13-snow_flurries.jpg',
    'http://home.nightcpu.com/images/weather/13-snow_flurries.jpg',
    'http://home.nightcpu.com/images/weather/13-snow_flurries.jpg',
    'http://home.nightcpu.com/images/weather/17-hail.jpg',
    'http://home.nightcpu.com/images/weather/18-sleet.jpg',
    'http://home.nightcpu.com/images/weather/19-dust.jpg',
    'http://home.nightcpu.com/images/weather/20-foggy.jpg',
    'http://home.nightcpu.com/images/weather/21-haze.jpg',
    'http://home.nightcpu.com/images/weather/22-smoky.jpg',
    'http://home.nightcpu.com/images/weather/23-blustery.jpg',
    'http://home.nightcpu.com/images/weather/24-windy.jpg',
    'http://home.nightcpu.com/images/weather/25-cold.jpg',
    'http://home.nightcpu.com/images/weather/26-cloudy.jpg',
    'http://home.nightcpu.com/images/weather/27-mostly-cloudy-n.jpg',
    'http://home.nightcpu.com/images/weather/28-mostly-cloudy-d.jpg',
    'http://home.nightcpu.com/images/weather/29-partly-cloudy-n.jpg',
    'http://home.nightcpu.com/images/weather/30-partly-cloudy-d.jpg',
    'http://home.nightcpu.com/images/weather/31-clear-night.jpg',
    'http://home.nightcpu.com/images/weather/32-sunny.jpg',
    'http://home.nightcpu.com/images/weather/31-clear-night.jpg',
    'http://home.nightcpu.com/images/weather/32-sunny.jpg',
    'http://home.nightcpu.com/images/weather/17-hail.jpg',
    'http://home.nightcpu.com/images/weather/36-hot.jpg',
    'http://home.nightcpu.com/images/weather/37-isolated-thunderstorms.jpg',
    'http://home.nightcpu.com/images/weather/37-isolated-thunderstorms.jpg',
    'http://home.nightcpu.com/images/weather/37-isolated-thunderstorms.jpg',
    'http://home.nightcpu.com/images/weather/41-heavy-snow.jpg',
    'http://home.nightcpu.com/images/weather/13-snow_flurries.jpg',
    'http://home.nightcpu.com/images/weather/41-heavy-snow.jpg',
    'http://home.nightcpu.com/images/weather/30-partly-cloudy-d.jpg',
    'http://home.nightcpu.com/images/weather/4-thunderstorms.jpg',
    'http://home.nightcpu.com/images/weather/41-heavy-snow.jpg',
    'http://home.nightcpu.com/images/weather/37-isolated-thunderstorms.jpg',
    'http://home.nightcpu.com/images/weather/11-showers.jpg',
];

function getData() {
    $.ajax({
        method: "GET",
        url: "http://ip-api.com/json/",
        dataType: "jsonp",
        success: function (data) {
            locationData = JSON.parse(JSON.stringify(data));
            console.log(locationData);
            latLon = locationData.lat + ',' + locationData.lon;
        }
    }).done(function () {
        $.simpleWeather({
            location: latLon,
            success: function (data) {
                weatherData = JSON.parse(JSON.stringify(data));
                console.log(weatherData);
                kmh = parseFloat(weatherData.wind.speed * 1.60934).toFixed(2);
                $('body').css({ "background": "url(" + images[weatherData.code] + ") no-repeat center center fixed", "background-size": "cover" });
                $('#title').text(weatherData.city + ', ' + weatherData.region);
                $('#wicon').removeClass();
                $('#wicon').addClass("wi wi-yahoo-" + weatherData.code);
                $('#speed').text(weatherData.wind.speed + ' ');
                $('#direction').text(weatherData.wind.direction);
                $('#wind-unit').text(weatherData.units.speed + ' ');
                $('#current').text(weatherData.currently + ':' + ' ');
                $('#current-temp').text(weatherData.temp);
                $('#temp-unit').text(weatherData.units.temp);
                $('#deg').text("\u00B0");
            }
        });
    });
}

$(document).ready(function () {
    getData();
    $('.far-cel').click(function () {
        if ($('#current-temp').text() == weatherData.temp) {
            $('#current-temp').text(weatherData.alt.temp);
            $('#temp-unit').text(weatherData.alt.unit);
            $('#speed').text(kmh);
            $('#wind-unit').text(' km/h ');
        }
        else {
            $('#current-temp').text(weatherData.temp);
            $('#temp-unit').text(weatherData.units.temp);
            $('#speed').text(weatherData.wind.speed + ' ');
            $('#wind-unit').text(weatherData.units.speed + ' ');
        }
    });
});