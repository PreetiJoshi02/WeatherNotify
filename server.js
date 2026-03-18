import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.static("public"));

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod != 200) {
            return res.json({ error: "City not found" });
        }

        const weather = {
            temp: (data.main.temp - 273.15).toFixed(2),
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            description: data.weather[0].description
        };

        res.json(weather);
    } catch (err) {
        res.json({ error: "Error fetching weather" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
