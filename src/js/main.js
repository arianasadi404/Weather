import { dateEl, dayStatusEl } from "./elements.js";
import "./api.js";

// Wait for DOM to be fully loaded before executing code**********
document.addEventListener("DOMContentLoaded", () => {
  // const dateEl = document.getElementById("date");
  // const dayStatusEl = document.getElementById("dayStatus");

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
