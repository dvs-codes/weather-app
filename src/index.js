async function getWeatherData() {
  const response = await fetch('https://api.weatherapi.com/v1/current.json?key=&q=rajkot', { mode: 'cors' });
  const weatherData = await response.json();
  console.log(weatherData);
}
