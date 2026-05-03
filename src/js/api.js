import { getWeatherDescription } from "./ui.js";
import { temperature, humidity, wind, statusText } from "./elements.js";

// FETCH WEATHER DATA**********
const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://api.open-meteo.com/v1/forecast?latitude=35.6875&longitude=51.375&current=temperature_2m,relative_humidity_2m,windspeed_10m,weather_code",
  true,
);

// Handle API response**********
xhr.addEventListener("readystatechange", () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let weatherData = JSON.parse(xhr.responseText);

    // Update DOM with weather data**********
    temperature.innerHTML = weatherData.current.temperature_2m + "°C";
    humidity.innerHTML = weatherData.current.relative_humidity_2m + "%";
    wind.innerHTML = weatherData.current.windspeed_10m + "km/h";
    getWeatherDescription(weatherData.current.weather_code);
  } else if (xhr.readyState === 4 && xhr.status !== 200) {
    statusText.innerHTML = "خطا: " + xhr.status;
  }
});
xhr.send();

// Handle network errors**********
xhr.onerror = function () {
  statusText.innerHTML = "خطا در دریافت اطلاعات";
  temperature.innerHTML = "---";
  wind.innerHTML = "---";
  humidity.innerHTML = "---";
};
