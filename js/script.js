/**
 * Weather Dashboard Application
 * Displays current weather information for Tehran using Open-Meteo API
 */

// Wait for DOM to be fully loaded before executing code**********
document.addEventListener("DOMContentLoaded", () => {
  // DOM ELEMENT SELECTORS**********
  const dateEl = document.getElementById("date");
  const dayStatusEl = document.getElementById("dayStatus");
  const temperature = document.getElementById("temperature");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const statusText = document.getElementById("statusText");
  const imgStatus = document.getElementById("imgStatus");

  // Persian days of the week (starting with Sunday)**********
  const persianDays = [
    "یکشنبه", // Sunday
    "دوشنبه", // Monday
    "سه‌شنبه", // Tuesday
    "چهارشنبه", // Wednesday
    "پنج‌شنبه", // Thursday
    "جمعه", // Friday
    "شنبه", // Saturday
  ];

  // DATE CONFIGURATION**********
  const date = new Date();
  const pDate = date.toLocaleDateString("fa-IR-u-nu-latn"); // Persian date with Latin numbers
  const dayNumber = date.getDay(); // Get day index (0 = Sunday in Iran)

  // UPDATE DATE AND DAY DISPLAY**********
  const persianDayName = persianDays[dayNumber];
  dateEl.innerHTML = pDate;
  dayStatusEl.innerHTML = persianDayName;
});

// WEATHER CONDITIONS DATA**********
// Dictionary mapping weather codes to Persian descriptions and icons**********
const weatherDataDict = {
  0: { text: "آسمان صاف", icon: "../photo/set-4/light/clear_day.svg" },
  1: { text: "عمدتاً صاف", icon: "../photo/set-4/light/clear_day.svg" },
  2: {
    text: "نیمه ابری",
    icon: "../photo/set-4/light/partly_cloudy.svg",
  },
  3: { text: "تمام ابر", icon: "../photo/set-4/light/cloudy.svg" },
  45: {
    text: "مه‌آلود",
    icon: "../photo/set-4/light/haze_fog_dust_smoke.svg",
  },
  48: {
    text: "مه همراه با یخبندان",
    icon: "../photo/set-4/light/haze_fog_dust_smoke.svg",
  },
  51: {
    text: "نم نم باران خفیف",
    icon: "../photo/set-4/light/drizzle.svg",
  },
  53: {
    text: "نم نم باران ملایم",
    icon: "../photo/set-4/light/scattered_showers_night.svg",
  },
  55: {
    text: "نم نم باران شدید",
    icon: "../photo/set-4/light/heavy_rain.svg",
  },
  61: { text: "باران خفیف", icon: "../photo/set-4/light/drizzle.svg" },
  63: {
    text: "باران ملایم",
    icon: "../photo/set-4/light/rain_with_cloudy.svg",
  },
  65: { text: "باران شدید", icon: "../photo/set-4/light/heavy_rain.svg" },
  71: {
    text: "برف خفیف",
    icon: "../photo/set-4/light/scattered_snow_showers_day.svg",
  },
  73: { text: "برف ملایم", icon: "../photo/set-4/light/showers_snow.svg" },
  75: { text: "برف شدید", icon: "../photo/set-4/light/heavy_snow.svg" },
  80: {
    text: "رگبار خفیف",
    icon: "../photo/set-4/light/isolated_thunderstorms.svg",
  },
  81: {
    text: "رگبار ملایم",
    icon: "../photo/set-4/light/isolated_thunderstorms.svg",
  },
  82: {
    text: "رگبار شدید",
    icon: "../photo/set-4/light/isolated_scattered_thunderstorms_night.svg",
  },
  95: { text: "رعد و برق", icon: "../photo/set-1/light/thunderstorms.png" },
  96: { text: "رعد و برق با تگرگ", icon: "../photo/set-4/light/icy.svg" },
  99: {
    text: "رعد و برق شدید با تگرگ",
    icon: "../photo/set-4/light/strong_thunderstorms.svg",
  },
};

/**
 * Updates the UI with weather description and icon based on weather code
 * @param {number} code - Weather code from Open-Meteo API
 */
function getWeatherDescription(code) {
  let info = weatherDataDict[code] || weatherDataDict[0];

  statusText.innerHTML = info.text;
  imgStatus.src = info.icon;
}

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
