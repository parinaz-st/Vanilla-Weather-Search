function getFormattedTime() {
  let today = new Date();
  let formattedCurrentTime = `
  ${today.getHours().toString().padStart(2, "0")} : ${today
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return formattedCurrentTime;
}

function getFormattedDay() {
  let today = new Date();
  let currentDay = today.getDay();
  let dayArr = [
    "Sunday",
    "Monday",
    "Thusday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return dayArr[currentDay];
}

function getFormattedDateTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours().toString.padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  //Get FormattedDay()
  // change this function to return both date and time
}

function displayTempurture(response) {
  console.log(response);
  let currentTemp = Math.round(response.data.temperature.current);
  let currentTown = response.data.city;
  let currentDescription = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let timestamp = response.data.time;
  let iconLink = response.data.condition.icon_url;
  console.log(iconLink);

  let htmlCurrentTemp = document.querySelector("#currentTemp");
  let htmlCurrentTown = document.querySelector("#currentTown");
  let htmlCurrentDesc = document.querySelector("#CurrentDesc");
  let htmlCurrentDay = document.querySelector("#CurrentDay");
  let htmlCurrentTime = document.querySelector("#CurrentTime");
  let htmlHumidity = document.querySelector("#humidity");
  let htmlWind = document.querySelector("#wind");
  let htmlIcon = document.querySelector("#icon");

  htmlCurrentTemp.innerHTML = currentTemp;
  htmlCurrentTown.innerHTML = currentTown;
  htmlCurrentDesc.innerHTML = currentDescription;
  htmlCurrentDay.innerHTML = getFormattedDay();
  htmlCurrentTime.innerHTML = getFormattedTime();
  htmlHumidity.innerHTML = humidity;
  htmlWind.innerHTML = wind;
  htmlIcon.setAttribute("src", iconLink);
  
}
function searchCity(event){
  event.preventDefault();
  let HtmlCity = document.querySelector("#currentTown");
  let enteredCity = document.querySelector("#input-city");
  HtmlCity.innerHTML =enteredCity.value;
  loadCityWeatherInfo(enteredCity.value);
}
function loadCityWeatherInfo(city){
  // debugger;
  let currentWeatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&unit=metrics`;
  axios.get(currentWeatherApiUrl).then(displayTempurture);
}

let apikey = "5foc97f943acfcb7c3t9b06b75ad0023";
let city = "Tehran";
let currentWeatherApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&unit=metrics`;
axios.get(currentWeatherApiUrl).then(displayTempurture);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

