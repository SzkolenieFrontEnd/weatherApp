import { API_KEY } from "./config.js";
import { convertTemp } from "./utils.js";

const SEARCH_BTN = document.getElementById("SearchBtn");
const SEARCH_INPUT = document.getElementById("SearchField");
const ERROR_MSG = document.getElementById("ErrorMsg");
const wrapper = document.getElementById("WeatherBox");

const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const response = await fetch(url);

  if (response.status === 200) {
    const data = await response.json();
    weatherInfo(data);
    ERROR_MSG.textContent = "";
  } else {
    ERROR_MSG.textContent = "Podane miasto nie istnieje";
    wrapper.innerHTML = "";
  }
};

const weatherInfo = (city) => {
  console.log(city);

  const isWarm = city.main.temp > 15 ? "orange" : "blue";

  const icon =
    "http://openweathermap.org/img/w/" + city.weather[0].icon + ".png";

  wrapper.innerHTML = `
     <h2>${city.name}</h2>
     <h3 style="color:${isWarm}">${convertTemp(city.main.temp)}</h3>
     <h3>${convertTemp(city.main.feels_like)}</h3>
     <h3>${city.weather[0].main}</h3>
     <img class="klasa" src="${icon}"/>
   `;
};

SEARCH_BTN.addEventListener("click", () => fetchWeather(SEARCH_INPUT.value));

const getLocation = () => {
  navigator.geolocation.getCurrentPosition((res) => showWeatherByLocation(res.coords));
};
getLocation();

const showWeatherByLocation = async (position) => {
  console.log(position);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  weatherInfo(data);
};

