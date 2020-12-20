import React, { useState } from "react";
import "./App.css";
import { Helmet } from "react-helmet";


require('dotenv').config();
const api = {
	key: process.env.REACT_APP_API_KEY,
	base: process.env.REACT_APP_BASE,
};

function App() {
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});

	const search = (evt) => {
		if (evt.key === "Enter") {
			fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
				.then((res) => res.json())
				.then((result) => {
					setWeather(result);
					setQuery("");
					console.log(result);
				});
		}
	};

	const dateBuilder = (d) => {
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day}, ${month} ${date} ${year}`;
	};

	const buildTime = (today) => {
		let hours = today.getHours();
		let minutes = today.getMinutes();
		let time = 0;

		if (minutes < 10) {
			minutes = "0" + minutes;
		}

		if (hours > 12) {
			time = hours - 12 + ":" + minutes + " PM";
		} else {
			time = hours + ":" + minutes + " AM";
		}

		return time;
	};
	return (
		<div
			className={
				typeof weather.main != "undefined"
					? weather.main.temp > 12
						? "App warm"
						: "App cold"
					: "App warm"
			}
		>
			<Helmet>
				<title>Weather App</title>
			</Helmet>
			<main>
				<div className="search-box">
					<input
						type="text"
						className="search-bar"
						placeholder="Search.."
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					/>
				</div>
				{typeof weather.main != "undefined" ? (
					<div>
						<div className="location-box">
							<div className="location">
								{weather.name}, {weather.sys.country}{" "}
							</div>
							<div className="date"> {dateBuilder(new Date())}</div>
						</div>

						<div className="weather-box">
							{/* Celcius */}
							{/* <div className="temp">{Math.round(weather.main.temp)}°C</div> */}

							{/* Farenheiit */}
							<div className="temp">
								{Math.round((weather.main.temp * 9) / 5 + 32)}°F
							</div>

							<div className="weather"> {weather.weather[0].main}</div>

							<div className="time">{buildTime(new Date())}</div>
						</div>
					</div>
				) : (
					""
				)}
			</main>
		</div>
	);
}

export default App;
