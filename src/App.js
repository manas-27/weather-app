import { useState } from "react";
import "./App.css";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import Clock from "./components/current-weather/clock";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import Preloader from "./components/preloader/Preloader";
import Logo from "./logo.png";

import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);

    console.log(currentWeather);
    console.log(forecast);
  };

  return (
    <>
      <Preloader />
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        <section>
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div style={{ marginLeft: "15px", width: "100%" }}>
            <div className="clk">
              <Clock />
            </div>
            {currentWeather && <CurrentWeather data={currentWeather} />}
          </div>
        </section>
        {forecast && <Forecast data={forecast} />}
      </div>
    </>
  );
}

export default App;
