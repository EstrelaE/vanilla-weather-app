function displayTemperature(response) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  
}

let apiKey = "a27b2f052c3b6156c214f3a13d66d3bf";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let unit = "metric";
let apiUrl = `${apiEndpoint}?q=evora&appid=${apiKey}&units=${unit}`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
