const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

const API_KEY = '12693584e2e70827dd584e85869419d5'

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
    const description = data.weather[0].description;
    const city = data.name;
    
    weatherResult.innerHTML = `
        <h2>${city}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Weather: ${description}</p>
    `;
}