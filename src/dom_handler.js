import { getWeatherData } from '.';

const searchButton = document.querySelector('.search');
const searchField = document.querySelector('#search-field');

searchButton.onclick = getWeatherData;

export { searchButton, searchField };
