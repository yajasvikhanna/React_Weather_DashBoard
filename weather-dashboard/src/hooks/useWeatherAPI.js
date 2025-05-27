import { useQuery } from "@tanstack/react-query";

// NOTE: Replace with your actual OpenWeatherMap API key
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const fetchWeatherData = async (city, units = "metric") => {
  if (API_KEY === "YOUR_API_KEY_HERE") {
    throw new Error(
      "Please get a free API key from OpenWeatherMap.org and replace YOUR_API_KEY_HERE in useWeatherAPI.js"
    );
  }

  if (!city) {
    throw new Error("City name is required");
  }

  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "City not found. Please check the city name and try again."
      );
    } else if (response.status === 401) {
      throw new Error(
        "Invalid API key. Please check your OpenWeatherMap API key."
      );
    } else {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
  }

  return response.json();
};

const fetchForecastData = async (city, units = "metric") => {
  if (API_KEY === "YOUR_API_KEY_HERE") {
    throw new Error(
      "Please get a free API key from OpenWeatherMap.org and replace YOUR_API_KEY_HERE in useWeatherAPI.js"
    );
  }

  if (!city) {
    throw new Error("City name is required");
  }

  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found for forecast data.");
    } else if (response.status === 401) {
      throw new Error("Invalid API key for forecast data.");
    } else {
      throw new Error(`Failed to fetch forecast data: ${response.statusText}`);
    }
  }

  return response.json();
};

export const useWeatherData = (city, units = "metric", enabled = true) => {
  return useQuery({
    queryKey: ["weather", city, units],
    queryFn: () => fetchWeatherData(city, units),
    enabled: enabled && !!city && city.trim() !== "",
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    staleTime: 25000, // Consider data stale after 25 seconds
    retry: (failureCount, error) => {
      // Don't retry on 401 (unauthorized) or 404 (not found) errors
      if (
        error.message.includes("Invalid API key") ||
        error.message.includes("City not found")
      ) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useForecastData = (city, units = "metric", enabled = true) => {
  return useQuery({
    queryKey: ["forecast", city, units],
    queryFn: () => fetchForecastData(city, units),
    enabled: enabled && !!city && city.trim() !== "",
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    staleTime: 25000, // Consider data stale after 25 seconds
    retry: (failureCount, error) => {
      // Don't retry on 401 (unauthorized) or 404 (not found) errors
      if (
        error.message.includes("Invalid API key") ||
        error.message.includes("City not found")
      ) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
