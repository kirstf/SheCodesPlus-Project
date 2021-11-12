let dateToday = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let dateFormat = document.querySelector(".todaysDate");
  dateFormat.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentHour}:${currentMinutes}`;
}
formatDate(dateToday);

function showCurrentWeather(response) {
  let currentTemp = document.querySelector(".currentTemp");
  let currentTempData = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${currentTempData}ºC`;
  let currentLoc = document.querySelector(".searchCity");
  let currentLocData = response.data.name;
  currentLoc.innerHTML = `${currentLocData}`;

  let highLow = document.querySelector(".high-low");
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  highLow.innerHTML = `High: ${high}°C  ||  Low: ${low}°C`;
  let currentWind = document.querySelector(".wind");
  let currentWindData = Math.round(response.data.wind.speed);
  currentWind.innerHTML = `Wind: ${currentWindData} m/s`;
  let currentHumid = document.querySelector(".humid");
  let currentHumidData = Math.round(response.data.main.humidity);
  currentHumid.innerHTML = `Humidity: ${currentHumidData}%`;
  let currentCondition = document.querySelector("#cond");
  let currentConditionData = response.data.weather[0].description;
  currentCondition.innerHTML = `${currentConditionData}`;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-result").value;
  let apiKey = "a80790d87514220f02205f66063c1f98";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let apiKey = "a80790d87514220f02205f66063c1f98";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocTemperature);
}
function showLocTemperature(response) {
  let currentTemp = document.querySelector(".currentTemp");
  let currentTempData = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${currentTempData}ºC`;
  let currentLoc = document.querySelector(".searchCity");
  let currentLocData = response.data.name;
  currentLoc.innerHTML = `${currentLocData}`;

  let highLow = document.querySelector(".high-low");
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  highLow.innerHTML = `High: ${high}°C  ||  Low: ${low}°C`;
  let currentWind = document.querySelector(".wind");
  let currentWindData = Math.round(response.data.wind.speed);
  currentWind.innerHTML = `Wind: ${currentWindData} m/s`;
  let currentHumid = document.querySelector(".humid");
  let currentHumidData = Math.round(response.data.main.humidity);
  currentHumid.innerHTML = `Humidity: ${currentHumidData}%`;
  let currentCondition = document.querySelector("#cond");
  let currentConditionData = response.data.weather[0].description;
  currentCondition.innerHTML = `${currentConditionData}`;
}
let button = document.querySelector("#locButton");
button.addEventListener("click", getCurrentPosition);
