document.addEventListener("DOMContentLoaded", () => {
  getWeather();
});

console.log("TEST1");

const toggle = document.getElementById("dark-mode-toggle");
toggle.addEventListener("change", () => {
  document.body.classList.toggle("night");
  if (weatherData && weatherData.daily) {
    showWeeklyChart(weatherData.daily);
  }
});

mainTemp = document.getElementById("main-temp");
mainComm = document.getElementById("main-comm");
weatherIcon = document.getElementById("weather-icon");
realFeel = document.getElementById("real-feel");
windSpeed = document.getElementById("wind-speed");
windGust = document.getElementById("wind-gust");
windDeg = document.getElementById("wind-deg");
humidity = document.getElementById("humidity");
pressure = document.getElementById("pressure");
let weatherData;

function selectButton(clickedBtn) {
  //skip the logTempBtn
  if (clickedBtn.id === "logTempBtn") {
    return;
  }

  document.querySelectorAll(".top-buttons button").forEach((btn) => {
    btn.classList.remove("selected-button");
  });
  clickedBtn.classList.add("selected-button");
}

function logTemperature() {
  alert("Temperature was successfully logged!");
}
const dateBtn = document.querySelector(".date-button");
const dateOptionsContainer = document.getElementById("date-options");

dateBtn.addEventListener("click", () => {
  if (!weatherData || !weatherData.daily || !weatherData.daily.time) return;

  dateOptionsContainer.classList.toggle("hidden");

  if (!dateOptionsContainer.classList.contains("hidden")) {
    selectButton(dateBtn);
    showDateOptions(weatherData.daily.time);
  } else {
    dateOptionsContainer.innerHTML = "";
  }
});

function showDateOptions(dates) {
  dateOptionsContainer.innerHTML = "";
  for (let i = 1; i <= 6; i++) {
    const btn = document.createElement("button");
    const date = new Date(dates[i]);
    const dateStr = date
      .toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
      .replace(/20(\d{2})/, "$1");
    btn.textContent = dateStr;

    btn.addEventListener("click", () => {
      showSpecificDay(weatherData.daily, i);

      document
        .querySelectorAll("#date-options button")
        .forEach((b) => b.classList.remove("selected-button"));

      btn.classList.add("selected-button");
    });

    dateOptionsContainer.appendChild(btn);
  }
}

const nowBtn = document.getElementById("nowBtn");
nowBtn.addEventListener("click", () => {
  if (!dateOptionsContainer.classList.contains("hidden")) {
    dateOptionsContainer.classList.add("hidden");
  }

  if (weatherData && weatherData.current) {
    showNow(weatherData.current);
  }
});

const todayBtn = document.querySelector(".today-button");
todayBtn.addEventListener("click", () => {
  if (!dateOptionsContainer.classList.contains("hidden")) {
    dateOptionsContainer.classList.add("hidden");
  }

  showToday(weatherData.daily);
});

//refresh per min
setInterval(() => {
  console.log("1-min data refresh");
}, 60000);

async function getWeather() {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.5872&longitude=22.9482&daily=weather_code,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max,temperature_2m_max,temperature_2m_min,wind_gusts_10m_max,wind_direction_10m_dominant,relative_humidity_2m_max,surface_pressure_max&current=relative_humidity_2m,temperature_2m,is_day,wind_speed_10m,wind_gusts_10m,wind_direction_10m,apparent_temperature,weather_code,surface_pressure&timezone=auto"
    );
    const data = await response.json();
    weatherData = data;

    showNow(data.current);
    selectButton(document.getElementById("nowBtn"));
    showWeeklyChart(data.daily);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

function showNow(current) {
  const isDay = current.is_day;
  mainTemp.textContent = `${current.temperature_2m}°C`;
  mainComm.textContent = getWeatherDescription(current.weather_code);
  weatherIcon.src = getWeatherIcon(current.weather_code, isDay);
  realFeel.textContent = `${current.apparent_temperature}°C`;
  windSpeed.textContent = `${current.wind_speed_10m} m/s`;
  windGust.textContent = `${current.wind_gusts_10m} m/s`;
  windDeg.textContent = `${current.wind_direction_10m}°`;
  humidity.textContent = `${current.relative_humidity_2m}%`;
  pressure.textContent = `${current.surface_pressure} hPa`;
}

function showToday(daily) {
  const avgTemp = (
    (daily.temperature_2m_max[0] + daily.temperature_2m_min[0]) /
    2
  ).toFixed(1);
  const avgApparent = (
    (daily.apparent_temperature_max[0] + daily.apparent_temperature_min[0]) /
    2
  ).toFixed(1);

  mainTemp.textContent = `${avgTemp}°C`;
  mainComm.textContent = getWeatherDescription(daily.weather_code[0]);
  realFeel.textContent = `${avgApparent}°C`;
  windSpeed.textContent = `${daily.wind_speed_10m_max[0]} m/s`;
  windGust.textContent = `${daily.wind_gusts_10m_max[0]} m/s`;
  windDeg.textContent = `${daily.wind_direction_10m_dominant[0]}°`;
  humidity.textContent = `${daily.relative_humidity_2m_max[0]}%`;
  pressure.textContent = `${daily.surface_pressure_max[0]} hPa`;
  weatherIcon.src = getWeatherIcon(daily.weather_code[0], 1);
}

function showSpecificDay(daily, index) {
  const avgTemp = (
    (daily.temperature_2m_max[index] + daily.temperature_2m_min[index]) /
    2
  ).toFixed(1);
  const avgApparent = (
    (daily.apparent_temperature_max[index] +
      daily.apparent_temperature_min[index]) /
    2
  ).toFixed(1);

  mainTemp.textContent = `${avgTemp}°C`;
  mainComm.textContent = getWeatherDescription(daily.weather_code[index]);
  realFeel.textContent = `${avgApparent}°C`;
  windSpeed.textContent = `${daily.wind_speed_10m_max[index]} m/s`;
  windGust.textContent = `${daily.wind_gusts_10m_max[index]} m/s`;
  windDeg.textContent = `${daily.wind_direction_10m_dominant[index]}°`;
  humidity.textContent = `${daily.relative_humidity_2m_max[index]}%`;
  pressure.textContent = `${daily.surface_pressure_max[index]} hPa`;
  weatherIcon.src = getWeatherIcon(daily.weather_code[index], 1);
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

function getWeatherIcon(code, isDay) {
  if (isDay === 0) {
    if (code === 0 || code === 1) return "icons/Night/005-crescent-moon.png";
    if (code === 2) return "icons/Night/006-cloudy-night.png";
    if (code === 3) return "icons/Night/007-moonlight.png";
    if (code === 45 || code === 48) return "icons/Night/004-fog.png";
    if (code >= 51 && code <= 65) return "icons/Night/001-rain.png";
    if (code >= 66 && code <= 79) return "icons/Night/008-winter.png";
    if (code >= 80 && code < 95) return "icons/Night/003-night-storm.png";
    if (code >= 95) return "icons/Night/002-thunder.png";
    return "icons/caution.png";
  } else {
    if (code === 0 || code === 1) return "icons/Day/007-sunny.png";
    if (code === 2) return "icons/Day/006-weather.png";
    if (code === 3) return "icons/Day/cloudy.png";
    if (code === 45 || code === 48) return "icons/Day/005-foggy.png";
    if (code >= 51 && code <= 65) return "icons/Day/001-rainy-day.png";
    if (code >= 66 && code <= 79) return "icons/Day/004-snow.png";
    if (code >= 80 && code < 95) return "icons/Day/002-heavy-rain.png";
    if (code >= 95) return "icons/Day/003-thunderstorm.png";
    return "icons/caution.png";
  }
}

document.getElementById("logTempBtn").addEventListener("click", function () {
  const city = "Thessaloniki"; // or dynamically from your app
  const temperature = parseFloat(
    document.getElementById("main-temp").textContent
  );
  const humidity = parseInt(document.getElementById("humidity").textContent);

  fetch("http://localhost:8080/log-momentary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ city, temperature, humidity }),
  })
    .then((res) => res.text())
    .then((data) => alert(data))
    .catch((err) => console.error("Fetch failed:", err));
});

function showWeeklyChart(daily) {
  const oldChart = Chart.getChart("weekChart");
  if (oldChart) oldChart.destroy();
  const ctx = document.getElementById("weekChart").getContext("2d");

  const labels =
    daily.time.map((date) => {
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    }) || [];

  const maxTemperatures = daily.temperature_2m_max || [];
  const minTemperatures = daily.temperature_2m_min || [];

  if (
    labels.length === 0 ||
    maxTemperatures.length === 0 ||
    minTemperatures.length === 0
  ) {
    console.error("Missing data for the chart.");
    return;
  }

  const isDarkMode = document.body.classList.contains("night");
  const maxLineColor = "#ff9800";
  const minLineColor = "#2196f3";
  const textColor = isDarkMode ? "#cabec8" : "rgb(54, 54, 54)";
  const gridColor = isDarkMode
    ? "rgba(202, 190, 200, 0.1)"
    : "rgba(54, 54, 54, 0.1)";

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Max Temperature (°C)",
          data: maxTemperatures,
          fill: false,
          borderColor: maxLineColor,
          tension: 0.2,
        },
        {
          label: "Min Temperature (°C)",
          data: minTemperatures,
          fill: false,
          borderColor: minLineColor,
          tension: 0.2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              family: "'Segoe UI', Tahoma",
              size: 14,
              weight: "bold",
            },
            color: textColor,
          },
        },
        tooltip: {
          backgroundColor: isDarkMode ? "#424242" : "#ffffff",
          titleFont: {
            weight: "bold",
            color: textColor,
          },
          bodyFont: {
            weight: "bold",
            color: textColor,
          },
          titleColor: textColor,
          bodyColor: textColor,
        },
      },
      scales: {
        y: {
          ticks: {
            color: textColor,
            font: {
              weight: "bold",
            },
          },
          grid: {
            color: gridColor,
          },
        },
        x: {
          ticks: {
            color: textColor,
            font: {
              weight: "bold",
            },
          },
          grid: {
            color: gridColor,
          },
        },
      },
    },
  });
}

getWeather();

console.log("weatherData", weatherData);
