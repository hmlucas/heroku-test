import "./UniversalNavbar.css";
import "./gear-svgrepo-com.svg";
import useWeatherStore from "../store/useWeatherStore";
import { useState, useEffect } from "react";

const Weather = () => {
  const { weatherData, error, loading, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather("College Station");
  }, [fetchWeather]);

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div>
      {weatherData == null ? (
        <p>{error}</p>
      ) : (
        <p>
          {weatherData.location.name} {weatherData.current.temp_f}°F{" "}
          {weatherData.current.condition.text}
        </p>
      )}
    </div>
  );
};

const Time = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  const updateDateTime = () => {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    setCurrentDateTime(now.toLocaleString("en-US", options));
  };

  // const intervalId = setInterval(updateDateTime, 1000);

  updateDateTime();

  // return () => clearInterval(intervalId);

  return <p>{currentDateTime}</p>;
};

function UniversalNavbar() {
  return (
    <div className="universal-navbar">
      <img
        className="settings-icon"
        src="/src/components/gear-svgrepo-com.svg"
      />
      <Weather />
    </div>
  );
}

export default UniversalNavbar;
