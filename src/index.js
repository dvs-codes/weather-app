import './style.css';
import { searchField } from './dom_handler';

async function getWeatherData() {
  const weatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=cf662b3cd7a3420bba641613242403&q=${searchField.value}`, { mode: 'cors' });
  const weatherData = await weatherResponse.json();
  const place = {
    placeName: weatherData.location.name,
    placeRegion: weatherData.location.region,
    placeCountry: weatherData.location.country,
    placeCondition: weatherData.current.condition.text,
    placeTemperatureInCelsius: weatherData.current.temp_c,
    placeTemperatureInFahrenheit: weatherData.current.temp_f,
    placeFeelsLikeInCelsius: weatherData.current.feelslike_c,
    placeFeelsLikeInFahrenheit: weatherData.current.feelslike_f,
    placeWindSpeed: weatherData.current.wind_kph,
    placeHumidity: weatherData.current.humidity,

  };

  console.log(place);
  const giphyResponse = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=PLDN9wpwI7tLq7MjXQzLjk9SNVaTZ4Ho&s=${place.placeCondition}`, { mode: 'cors' });
  const giphyData = await giphyResponse.json();
  const gifURL = giphyData.data.images.original.url;
  console.log(gifURL);
}

export { getWeatherData };
