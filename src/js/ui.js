/**
 * Updates the UI with weather description and icon based on weather code
 * @param {number} code - Weather code from Open-Meteo API
 */

import { statusText, imgStatus } from "./elements.js";
import { weatherDataDict } from "./data.js";

export function getWeatherDescription(code) {
  let info = weatherDataDict[code] || weatherDataDict[0];

  statusText.innerHTML = info.text;
  imgStatus.src = info.icon;
}
