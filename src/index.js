let currentTime = new Date();
console.log(document.querySelector("date"));

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

let hours = currentTime.getHours();
let minutes = (`0` + currentTime.getMinutes()).slice(-2);

let li = document.querySelector("li");

li.innerHTML = `Today is ${day}  ${hours}:${minutes}`;
console.log(new Date());

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "19154091ef405cf7e237c7771b2363c3";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "19154091ef405cf7e237c7771b2363c3";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeatherCondition);
}
function getCurrentPositon(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function displayWeatherCondition(response) {
  document.querySelector("#here").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `The temperature in 
     is ${Math.round(response.data.main.temp)}°C`;
  document.querySelector("#wind").innerHTML = `The wind speed is ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#humid").innerHTML = `The humidity is
    ${response.data.main.humidity} %`;
  document.querySelector("#describe").innerHTML = response.data.weather[0].main;
}

let currentBttn = document.querySelector("#current");
currentBttn.addEventListener("click", getCurrentPositon);

let searchBttn = document.querySelector("#search-form");
searchBttn.addEventListener("submit", searchCity);
