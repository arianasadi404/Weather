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
