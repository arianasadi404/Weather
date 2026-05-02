/**
 * Updates the UI with weather description and icon based on weather code
 * @param {number} code - Weather code from Open-Meteo API
 */
function getWeatherDescription(code) {
  let info = weatherDataDict[code] || weatherDataDict[0];

  statusText.innerHTML = info.text;
  imgStatus.src = info.icon;
}
