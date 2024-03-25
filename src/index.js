import './style.css';

const inputField = document.querySelector('#input');
const searchButton = document.querySelector('.search');
const mainDisplay = document.querySelector('body');
const placeCondition = document.querySelector('.condition');
const placeName = document.querySelector('.place');
const placeRegion = document.querySelector('.region');
const placeCountry = document.querySelector('.country');
const placeTemp = document.querySelector('.temp');
const feelsLike = document.querySelector('.feels-like');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const place = {
  placeName: '',
  placeRegion: '',
  placeCountry: '',
  placeCondition: '',
  placeTemperatureInCelsius: '',
  placeTemperatureInFahrenheit: '',
  placeFeelsLikeInCelsius: '',
  placeFeelsLikeInFahrenheit: '',
  placeWindSpeed: '',
  placeHumidity: '',
  placeGif: '',
};
async function getWeatherData() {
  const weatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=cf662b3cd7a3420bba641613242403&q=${inputField.value}`, { mode: 'cors' });
  const weatherData = await weatherResponse.json();
  const giphyResponse = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=PLDN9wpwI7tLq7MjXQzLjk9SNVaTZ4Ho&s=sky${place.placeCondition}`, { mode: 'cors' });
  const giphyData = await giphyResponse.json();

  place.placeName = weatherData.location.name;
  place.placeRegion = weatherData.location.region;
  place.placeCountry = weatherData.location.country;
  place.placeCondition = weatherData.current.condition.text;
  place.placeTemperatureInCelsius = weatherData.current.temp_c;
  place.placeTemperatureInFahrenheit = weatherData.current.temp_f;
  place.placeFeelsLikeInCelsius = weatherData.current.feelslike_c;
  place.placeFeelsLikeInFahrenheit = weatherData.current.feelslike_f;
  place.placeWindSpeed = weatherData.current.wind_kph;
  place.placeHumidity = weatherData.current.humidity;
  place.placeGif = giphyData.data.images.original.url;
}

function domRenderer() {
  // main card for display
  mainDisplay.style.backgroundImage = `url('${place.placeGif}')`;
  mainDisplay.style.backgroundSize = 'cover';
  placeCondition.textContent = place.placeCondition;
  placeName.textContent = `${place.placeName},`;
  placeRegion.textContent = `${place.placeRegion},`;
  placeCountry.textContent = `${place.placeCountry}.`;
  placeTemp.textContent = `${place.placeTemperatureInCelsius}°C`;
  feelsLike.textContent = `Feels like ${place.placeFeelsLikeInCelsius}°C`;
  windSpeed.textContent = `Windspeed: ${place.placeWindSpeed} km/hr`;
  humidity.textContent = `Humidity: ${place.placeHumidity} %`;
}

searchButton.onclick = () => {
  getWeatherData().then(() => {
    domRenderer();
  });
};
