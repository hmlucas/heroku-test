import "./UniversalNavbar.css";
import "./gear-svgrepo-com.svg";
import { useState, useEffect } from "react";
import useWeatherStore from "../store/useWeatherStore";
import Popup from "./Popup";

const Weather = () => {
  const { weatherData, error, loading, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather("College Station");
  }, [fetchWeather]);

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  return (
    <>
      {weatherData == null ? (
        <p>{error}</p>
      ) : (
        <>
          <p>
            {weatherData.location.name} {weatherData.current.temp_f}°F{" "}
          </p>
          <p>{weatherData.current.condition.text}</p>
        </>
      )}
    </>
  );
};

const Time = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  // Use effect prevents infinite loops, do not remove
  useEffect(() => {
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

    // Update the time immediately on mount
    updateDateTime();

    // Set up an interval to update the time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this only runs once on mount

  return <p>{currentDateTime}</p>;
};

function UniversalNavbar() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Handle popup state
  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="universal-navbar">
      <button className="settings-button" onClick={togglePopup}>
        <img
          className="settings-icon"
          src="/src/components/gear-svgrepo-com.svg"
        />
      </button>
      <div className="weather-time-info">
        <Weather />
        <Time />
      </div>
      {isPopupVisible && <Popup onClose={closePopup} />}
    </div>
  );
}

export default UniversalNavbar;
