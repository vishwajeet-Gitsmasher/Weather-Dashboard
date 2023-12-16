
function getWeather() {
    const apiKey = '20d226bf7eb2b3582b4af1962ea53000';
    const city = $('#cityInput').val();

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    $.get(apiUrl, function (data) {
        displayCurrentWeather(data);
    }).fail(function () {
        alert('Error fetching weather data. Please try again.');
    });

    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://easy-weather1.p.rapidapi.com/daily/5?latitude=1.28&longitude=103.86',
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '715fec78b6mshbc636c4781c9857p192df3jsn90105e5e2b38',
            'X-RapidAPI-Host': 'easy-weather1.p.rapidapi.com'
        }
    };
    
    $.ajax(settings).done(function (response) {
        displayDailyForecast(response.data)
    });

}

function displayCurrentWeather(data) {
    const temperature = data.main.temp;
    const condition = data.weather[0].description;
    const otherInfo = `Humidity: ${data.main.humidity}%, Wind Speed: ${data.wind.speed} m/s`;

    $('#currentTemperature').text(`Temperature: ${temperature}°C`);
    $('#weatherCondition').text(`Condition: ${condition}`);
    $('#otherInfo').text(otherInfo);
}

// Additional functionality for hourly and daily forecasts can be added here.
function getWeather() {
    const apiKey = '20d226bf7eb2b3582b4af1962ea53000';
    const city = $('#cityInput').val();

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const hourlyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    // const dailyForecastUrl = `https://easy-weather1.p.rapidapi.com/daily/5?latitude=1.28&longitude=103.86`;

    // Fetch current weather
    $.get(currentWeatherUrl, function (currentData) {
        displayCurrentWeather(currentData);
    }).fail(function () {
        alert('Error fetching current weather data. Please try again.');
    });

    // Fetch hourly forecast
    $.get(hourlyForecastUrl, function (hourlyData) {
        displayHourlyForecast(hourlyData.list);
    }).fail(function () {
        alert('Error fetching hourly forecast data. Please try again.');
    });
    
    
    // // Fetch daily forecast
    // $.get(dailyForecastUrl, function (dailyData) {
    //     displayDailyForecast(dailyData.list);
    // }).fail(function () {
    //     alert('Error fetching daily forecast data. Please try again.');
    // });
}

function displayHourlyForecast(hourlyList) {
    const $hourlyList = $('#hourlyList');
    $hourlyList.empty();

    hourlyList.forEach(function (hour) {
        const time = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        const temperature = hour.main.temp;
        const condition = hour.weather[0].description;

        const listItem = `<li>${time}: ${temperature}°C, ${condition}</li>`;
        $hourlyList.append(listItem);
    });
}

function displayDailyForecast(dailyList) {
    const $dailyList = $('#dailyList');
    $dailyList.empty();

    dailyList.forEach(function (day) {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        const temperatureMin = day.temp.min;
        const temperatureMax = day.temp.max;
        const condition = day.weather[0].description;

        const listItem = `<li>${date}: ${temperatureMin}°C - ${temperatureMax}°C, ${condition}</li>`;
        $dailyList.append(listItem);
    });
}

