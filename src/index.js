import './style.css';

const inputField = document.querySelector('#input');
const searchButton = document.querySelector('.search');
const unitChnagerButton = document.querySelector('.unit-changer');
const mainDisplay = document.querySelector('body');
const weatherCard = document.querySelector('.weather-card');
const placeCondition = document.querySelector('.condition');
const placeName = document.querySelector('.place');
const placeRegion = document.querySelector('.region');
const placeCountry = document.querySelector('.country');
const placeTemp = document.querySelector('.temp');
const feelsLike = document.querySelector('.feels-like');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
let unit = '°C';

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
  try {
    const weatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=cf662b3cd7a3420bba641613242403&q=${inputField.value}`, { mode: 'cors' });
    const weatherData = await weatherResponse.json();

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
  } catch (err) {
    alert(`${err}:There is a problem in getting weather data`);
  }

  try {
    const giphyResponse = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=PLDN9wpwI7tLq7MjXQzLjk9SNVaTZ4Ho&s=sky_${place.placeCondition}`, { mode: 'cors' });
    const giphyData = await giphyResponse.json();
    place.placeGif = giphyData.data.images.original.url;
  } catch (err) {
    alert(`${err}: giphy could not be loaded`);
  }
}

function domRenderer() {
  // main card for display
  weatherCard.style.display = 'block';
  mainDisplay.style.backgroundImage = `url('${place.placeGif}')`;
  mainDisplay.style.backgroundSize = 'cover';
  placeCondition.textContent = place.placeCondition;
  placeName.textContent = `${place.placeName},`;
  placeRegion.textContent = `${place.placeRegion},`;
  placeCountry.textContent = `${place.placeCountry}.`;
  placeTemp.textContent = `${place.placeTemperatureInCelsius + unit}`;
  feelsLike.textContent = `Feels like ${place.placeFeelsLikeInCelsius + unit}`;
  windSpeed.textContent = `Windspeed: ${place.placeWindSpeed} km/hr`;
  humidity.textContent = `Humidity: ${place.placeHumidity} %`;
}

function unitChager() {
  if (unit === '°C') {
    unit = '°F';
    placeTemp.textContent = `${place.placeTemperatureInFahrenheit + unit}`;
    feelsLike.textContent = `Feels like ${place.placeFeelsLikeInFahrenheit + unit}`;
  } else {
    unit = '°C';
    placeTemp.textContent = `${place.placeTemperatureInCelsius + unit}`;
    feelsLike.textContent = `Feels like ${place.placeFeelsLikeInCelsius + unit}`;
  }
}

unitChnagerButton.onclick = () => {
  unitChager();
};

searchButton.onclick = () => {
  getWeatherData().then(() => {
    domRenderer();
  });
};
