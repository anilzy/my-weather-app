document.getElementById("weatherForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const cityName = document.getElementById("cityInput").value;

  const apiUrl =  `https://api.weatherapi.com/v1/current.json?key=b73a4946845547aaa70130710250405&q=${cityName}&aqi=yes`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    document.getElementById("temperature").textContent = `Temperature: ${data.current.temp_c}°C`;
    document.getElementById("condition").textContent = `Condition: ${data.current.condition.text}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.current.humidity}%`;
    document.getElementById("wind").textContent = `Wind: ${data.current.wind_kph} kph`;

    const aqiValue = data.current.air_quality.pm2_5.toFixed(2);
    const aqiElement = document.getElementById("aqi");
    aqiElement.textContent = `AQI (PM2.5): ${aqiValue}`;

    // AQI color logic
    if (aqiValue <= 50) {
      aqiElement.style.backgroundColor = "#2ecc71";
    } else if (aqiValue <= 100) {
      aqiElement.style.backgroundColor = "#f1c40f";
    } else {
      aqiElement.style.backgroundColor = "#e74c3c";
    }

    // Save to localStorage
    localStorage.setItem("lastCity", cityName);
  } catch (error) {
    alert("Could not fetch weather data. Check city name or API key.");
  }
});


