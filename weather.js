console.log("JS loaded");

mainTemp = document.getElementById("main-temp");
mainComm = document.getElementById("main-comm");
weatherIcon = document.getElementById("weather-icon");
realFeel = document.getElementById("real-feel");
windSpeed = document.getElementById("wind-speed");
windGust = document.getElementById("wind-gust");
windDeg = document.getElementById("wind-deg");
humidity = document.getElementById("humidity");
pressure = document.getElementById("pressure");

async function getWeather() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.5872&longitude=22.9482&daily=weather_code,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max,temperature_2m_max,temperature_2m_min,wind_gusts_10m_max,wind_direction_10m_dominant,relative_humidity_2m_max,surface_pressure_max&current=relative_humidity_2m,temperature_2m,is_day,wind_speed_10m,wind_gusts_10m,wind_direction_10m,apparent_temperature,weather_code,surface_pressure&timezone=auto"
    );
    const data = await response.json();
    const current = data.current;

    console.log("Current weather data:", current);

    mainTemp.textContent = `${current.temperature_2m}°C`;
    mainComm.textContent = getWeatherDescription(current.weather_code);
    weatherIcon.src = getWeatherIcon(current.weather_code);
    realFeel.textContent = `${current.apparent_temperature}°C`;
    windSpeed.textContent = `${current.wind_speed_10m} m/s`;
    windGust.textContent = `${current.wind_gusts_10m} m/s`;
    windDeg.textContent = `${current.wind_direction_10m}°`;
    humidity.textContent = `${current.relative_humidity_2m}%`;
    pressure.textContent = `${current.surface_pressure} hPa`;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

function getWeatherDescription(code) {
  const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    80: "Rain showers",
    95: "Thunderstorm",
  };
  return descriptions[code] || "Unknown";
}

function getWeatherIcon(code) {
  if (code === 0 || code === 1) return "icons/007-sunny.png";
  if (code === 2) return "icons/006-weather.png";
  if (code === 3) return "icons/cloudy.png";
  if (code === 45 || code === 48) return "icons/005-foggy.png";
  if (code >= 51 && code <= 65) return "icons/001-rainy-day.png";
  if (code >= 66 && code <= 79) return "icons/004-snow.png";
  if (code >= 80 && code < 95) return "icons/002-heavy-rain.png";
  if (code >= 95) return "icons/003-thunderstorm.png";
  return "icons/default.png";
}

//NIGHT

// function getWeatherIcon(code, isDay) {
//   if (isDay === 0) {
//     if (code === 0 || code === 1) return "icons-night/clear-night.png";
//     if (code === 2) return "icons-night/partly-cloudy-night.png";
//     if (code === 3) return "icons-night/cloudy.png";
//     if (code === 45 || code === 48) return "icons-night/foggy.png";
//     if (code >= 51 && code <= 65) return "icons-night/rainy.png";
//     if (code >= 66 && code <= 79) return "icons-night/snow.png";
//     if (code >= 80 && code < 95) return "icons-night/heavy-rain.png";
//     if (code >= 95) return "icons-night/thunderstorm.png";
//     return "icons-night/default.png";
//   } else {
//     if (code === 0 || code === 1) return "icons/007-sunny.png";
//     if (code === 2) return "icons/006-weather.png";
//     if (code === 3) return "icons/cloudy.png";
//     if (code === 45 || code === 48) return "icons/005-foggy.png";
//     if (code >= 51 && code <= 65) return "icons/001-rainy-day.png";
//     if (code >= 66 && code <= 79) return "icons/004-snow.png";
//     if (code >= 80 && code < 95) return "icons/002-heavy-rain.png";
//     if (code >= 95) return "icons/003-thunderstorm.png";
//     return "icons/default.png";
//   }
// }

document.addEventListener("DOMContentLoaded", () => {});

getWeather();
