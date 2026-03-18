async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();

    if (data.error) {
        document.getElementById("result").innerHTML = data.error;
        return;
    }

    const message = `
        Temperature: ${data.temp}°C<br>
        Pressure: ${data.pressure} hPa<br>
        Humidity: ${data.humidity}%<br>
        Description: ${data.description}
    `;

    document.getElementById("result").innerHTML = message;

    showNotification(city, data);
}

function showNotification(city, data) {
    if (Notification.permission === "granted") {
        new Notification(`Weather in ${city}`, {
            body: `Temp: ${data.temp}°C\nHumidity: ${data.humidity}%\n${data.description}`
        });
    } else {
        Notification.requestPermission();
    }
}

// Auto refresh every 1 hour
setInterval(() => {
    const city = document.getElementById("cityInput").value;
    if (city) getWeather();
}, 3600000);
