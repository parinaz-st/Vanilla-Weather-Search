function getFormattedCurrentTime() {
  let today = new Date();
  let formattedCurrentTime = `
  ${today.getHours().toString().padStart(2, "0")} : ${today
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  return formattedCurrentTime;
}
function getFormattedToday() {
  let today = new Date();
  let currentDay = today.getDay();
  let dayArr = ["Sunday", "Monday", "Thusday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return dayArr[currentDay];
}
function getFormattedDay(timestamp) {
  let day = new Date(timestamp * 1000);
  let currentDay = day.getDay();
  let dayArr = ["Sun", "Mon", "Thu", "Wed", "Thu", "Fri", "Sat"];
  return dayArr[currentDay];
}
function displayCurrentTempurture(response) {
  let currentTemp = Math.round(response.data.temperature.current);
  currentCelDegree = response.data.temperature.current;
  let currentTown = response.data.city;
  let currentDescription = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let timestamp = response.data.time;
  let iconLink = response.data.condition.icon_url;

  let htmlCurrentTemp = document.querySelector("#currentTemp");
  let htmlCurrentTown = document.querySelector("#currentTown");
  let htmlCurrentDesc = document.querySelector("#CurrentDesc");
  let htmlCurrentDay = document.querySelector("#CurrentDay");
  let htmlCurrentTime = document.querySelector("#CurrentTime");
  let htmlHumidity = document.querySelector("#humidity");
  let htmlWind = document.querySelector("#wind");
  let htmlIcon = document.querySelector("#icon");

  htmlCurrentTown.innerHTML = currentTown;
  htmlCurrentDesc.innerHTML = currentDescription;
  htmlCurrentDay.innerHTML = getFormattedToday();
  htmlCurrentTime.innerHTML = getFormattedCurrentTime();
  htmlCurrentTemp.innerHTML = currentTemp;
  htmlHumidity.innerHTML = humidity;
  htmlWind.innerHTML = wind;
  htmlIcon.setAttribute("src", iconLink);
}
function searchCity(event) {
  event.preventDefault();
  let HtmlCity = document.querySelector("#currentTown");
  let enteredCity = document.querySelector("#input-city");
  HtmlCity.innerHTML = enteredCity.value;
  loadCityWeatherInfo(enteredCity.value);
  loadCityForecastInfo(enteredCity.value);
}
function loadCityWeatherInfo(city) {
  let currentWeatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&unit=metrics`;
  axios.get(currentWeatherApiUrl).then(displayCurrentTempurture);
}
function loadCityForecastInfo(city) {
  forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&unit=metrics`;
  axios.get(forecastApiUrl).then(displayForecast);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  celciousLink.classList.remove("active");
  farenheightLink.classList.add("active");
  let fahrenheit = Math.round((currentCelDegree * 9) / 5 + 32);
  let HTMLcurrentCelDegree = document.querySelector("#currentTemp");
  HTMLcurrentCelDegree.innerHTML = fahrenheit;
  currentFarenheihtDegree = fahrenheit;
}
function fahrenheitToCelsius(event) {
  event.preventDefault();
  farenheightLink.classList.remove("active");
  celciousLink.classList.add("active");
  let HTMLcurrentCFarDegree = document.querySelector("#currentTemp");
  HTMLcurrentCFarDegree.innerHTML = Math.round(currentCelDegree);
}
function addForecastColumn(forecastday, index) {
  if (index < 6) {
    forecastHtml =
      forecastHtml +
      `       
            <div class="col-2">
              <div class="weather-forcast-date">
                ${getFormattedDay(forecastday.time)}
              </div>
              <img src="${forecastday.condition.icon_url}" alt="${
        forecastday.condition.icon
      }" width="40">
              <div class="weather-forcast-temp">
                <span class="max">${Math.round(
                  forecastday.temperature.maximum
                )}<span class = "celcius">°C</span></span> <span class="min">${Math.round(
        forecastday.temperature.minimum
      )}<span class = "celcius">°C</span></span>
              </div> 
            </div>                      
`;
  }
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  forecastHtml = `<div class="row">`;
  forecast.forEach(addForecastColumn);
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}
let currentCelDegree = null;
let currentFarenheihtDegree = null;
let apikey = "5foc97f943acfcb7c3t9b06b75ad0023";
let city = "Tehran";
let currentWeatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&unit=metrics`;
let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&unit=metrics`;

axios.get(currentWeatherApiUrl).then(displayCurrentTempurture);
axios.get(forecastApiUrl).then(displayForecast);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let farenheightLink = document.querySelector("#convertToFahrenheit");
farenheightLink.addEventListener("click", convertToFahrenheit);

let celciousLink = document.querySelector("#convertToCelcious");
celciousLink.addEventListener("click", fahrenheitToCelsius);

let forecastElement = document.querySelector("#forecast");
let forecastHtml = "";
