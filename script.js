const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

const API_KEY = '12693584e2e70827dd584e85869419d5';
// Geolocation button
const geoBtn = document.createElement('button');
geoBtn.textContent = 'Use My Location';
geoBtn.id = 'geoBtn';
document.querySelector('.search-box').appendChild(geoBtn);

geoBtn.addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        });
    } else {
        alert('Geolocation not supported');
    }
});

function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error:', error);
            weatherResult.innerHTML = 'Could not fetch weather!';
        });
}

searchBtn.addEventListener('click', function() {
    const city = cityInput.value;
    
    if (city === '') {
        alert('Please enter a city name');
        return;
    }
    
    // Fetch weather data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error:', error);
            weatherResult.innerHTML = 'City not found!';
        });
});

function displayWeather(data) {
    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;
    const city = data.name;
    const country = data.sys.country;
    
    weatherResult.innerHTML = `
        <h2>${city}, ${country}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Feels Like: ${feelsLike}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Weather: ${description}</p>
    `;
}