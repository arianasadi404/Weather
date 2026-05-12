import axios from "axios";
import { getWeatherDescription } from "./ui.js";
import { temperature, humidity, wind, statusText } from "./elements.js";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

async function fetchWeather() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        latitude: 35.6875,
        longitude: 51.375,
        current:
          "temperature_2m,relative_humidity_2m,windspeed_10m,weather_code",
      },
    });

    const weatherData = response.data;

    temperature.innerHTML = weatherData.current.temperature_2m + "°C";
    humidity.innerHTML = weatherData.current.relative_humidity_2m + "%";
    wind.innerHTML = weatherData.current.windspeed_10m + "km/h";

    getWeatherDescription(weatherData.current.weather_code);
  } catch (error) {
    statusText.innerHTML = "خطا در دریافت اطلاعات";

    temperature.innerHTML = "---";
    wind.innerHTML = "---";
    humidity.innerHTML = "---";

    console.error(error);
  }
}

fetchWeather();
