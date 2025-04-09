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
      "https://api.open-meteo.com/v1/forecast?latitude=40.5872&longitude=22.9482&current=temperature_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_gusts_10m,wind_direction_10m,relative_humidity_2m,surface_pressure&timezone=auto"
    );
    const data = await response.json();
    const current = data.current;

    console.log("Current weather:", current); //test it

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
  if (code === 0) return "icons/sunny.png";
  if (code === 1 || code === 2) return "icons/cloudy.png";
  if (code === 3 || code === 45 || code === 48) return "icons/overcast.png";
  if (code >= 51 && code <= 65) return "icons/rain.png";
  if (code >= 80 && code < 95) return "icons/showers.png";
  if (code >= 95) return "icons/storm.png";
  return "icons/default.png";
}

document.addEventListener("DOMContentLoaded", () => {
  getWeather();
});
