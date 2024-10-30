import { create } from "zustand";

const useWeatherStore = create((set) => ({
  weatherData: null,
  error: null,
  loading: false, // Include a loading varaible for temporary div updates
  fetchWeather: async (city) => {
    set({ loading: true, error: null });

    // Get environment variables (./client/.env)
    const API_KEY = import.meta.env.VITE_WEATHER_KEY;
    const BASE_URL = import.meta.env.VITE_WEATHER_URL;

    // Ensure that the environment variables exist
    if (!API_KEY || !BASE_URL) {
      set({
        error: "Missing WEATHER_KEY or WEATHER_URL in environment variables",
        loading: false,
      });
      return;
    }

    try {
      // Get the weather based on the given city
      const response = await fetch(
        `${BASE_URL}?key=${API_KEY}&q=${city}&aqi=no`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      // Jsonify the response and return it alongisde the loading variable
      const data = await response.json();
      set({ weatherData: data, loading: false });
    } catch (err) {
      // If data retrieval failed, return with an error
      set({ error: err.message, weatherData: null, loading: false });
    }
  },
}));

export default useWeatherStore;
