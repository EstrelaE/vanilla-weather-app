function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `a27b2f052c3b6156c214f3a13d66d3bf`;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
  navigator.geolocation.getCurrentPosition;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
               <div class="col-2">
                 <div class="weather-forecast-date">${formatDay(
                   forecastDay.dt
                 )}</div>
                   <img
                     src="https://openweathermap.org/img/wn/${
                       forecastDay.weather[0].icon
                     }@2x.png"
                     alt=""
                     width="42px"
                   />
                 <div class="weather-forecast-temperature">
                   <span class="weather-forecast-temperature-max">${Math.round(
                     forecastDay.temp.max
                   )}º</span>
                   <span class="weather-forecast-temperature-min">${Math.round(
                     forecastDay.temp.min
                   )}º </span>
                 </div>
               </div>                
                   `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `a27b2f052c3b6156c214f3a13d66d3bf`;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/onecall`;
  let apiUrl = `${apiEndPoint}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  document.getElementById("city-input").value = "";

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;

  celsiusTemp = response.data.main.temp;

  document.getElementById(
    "weather-app"
  ).style.backgroundImage = `url('images/${response.data.weather[0].icon}.jpg')`;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function displayError() {
  alert("Can't find that city. Check for any mistakes and try again 🌞");
}

function search(city) {
  let apiKey = "a27b2f052c3b6156c214f3a13d66d3bf";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayTemperature).catch(displayError);
}

function handleSubmit(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city");
  let cityInputElement = document.querySelector("#city-input");
  if (cityInputElement.value !== currentCity) {
    search(cityInputElement.value);
  }
}

function showRandomWeather() {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let icon = city.data.weather[0].icon;
}

function getRandomInt(max) {
  const randomNumberBetweenZeroAndOne = Math.random();
  const randomNumberProper = randomNumberBetweenZeroAndOne * max;
  const randomNumberClean = Math.floor(randomNumberProper);
  return randomNumberClean;
}

function getRandomCity(event) {
  event.preventDefault();
  const randomCityIndex = getRandomInt(cities.length);
  const city = cities[randomCityIndex];
  let id = city.id;
  let apiKey = "a27b2f052c3b6156c214f3a13d66d3bf";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?id=${id}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let randomButton = document.querySelector("#random-button");
randomButton.addEventListener("click", getRandomCity);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Angola");
