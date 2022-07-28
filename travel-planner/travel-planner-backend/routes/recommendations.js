const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const axios = require("axios");
require("dotenv").config();

router.post("/getWeather", async (req, res) => {
	const location = req.body.location;

	const exclude = "minutely,hourly,daily";
	const API_KEY = process.env.OPEN_WEATHER_API_KEY;

	const params = {
		lat: location.lat,
		lon: location.lng,
		appid: API_KEY,
		units: "imperial",
	};

	axios
		.get("https://api.openweathermap.org/data/2.5/weather", { params })
		.then((response) => {
      const results = response.data;

			res
				.status(200)
				.send({
          temp: { current: results.main.temp, min: results.main.temp_min, max: results.main.temp_max }, // degrees F
					feels_like: results.main.feels_like,
          humidity: results.main.humidity,
          wind: results.wind.speed, // mph
          clouds: results.clouds.all, // %
          daylight: { sunrise: results.sys.sunrise, sunset: results.sys.sunset, timezone: results.timezone }, //unix utc time (need to convert the user's travel time to this and see if it's in the range)
          // use this api: https://unixtime.co.za/
            // GET request url: https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=2022/07/27 14:16:00
          description: { text: results.weather[0].description, icon: results.weather[0].icon }
				});
		})
		.catch((error) => {
			res.status(500).send({ message: error });
		});

	// I can also display weather for the next 5 days, but let's not do that for now. (I can even get weather icons!)
	// https://openweathermap.org/weather-conditions#How-to-get-icon-URL

	// From this I can get:
	// - Temperature (set temperature limit) (I can just look at feels_like to account for all these right now)
	// - sunrise and sunset - is the user comfortable being out after dark?
	// - humidity - is it comfortable being outside?
	// - wind_speed - is it too strong?
	// - save weather.description
});

module.exports = router;
