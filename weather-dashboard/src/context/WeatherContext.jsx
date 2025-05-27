import React, { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
};

// Local storage utility functions (inline)
const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const getFromLocalStorage = (key) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null || serializedValue === undefined) {
      return null;
    }
    
    // Handle both JSON and plain string values
    if (serializedValue.startsWith('"') && serializedValue.endsWith('"')) {
      // It's a JSON string
      return JSON.parse(serializedValue);
    } else if (serializedValue.startsWith('{') || serializedValue.startsWith('[')) {
      // It's a JSON object/array
      return JSON.parse(serializedValue);
    } else {
      // It's a plain string from old version, return as is and update storage
      console.log('Converting legacy localStorage value');
      saveToLocalStorage(key, serializedValue);
      return serializedValue;
    }
  } catch (error) {
    console.error('Error getting from localStorage, clearing the value:', error);
    // Clear the problematic value
    localStorage.removeItem(key);
    return null;
  }
};

// Clear any problematic localStorage data on app start
const clearLegacyStorage = () => {
  try {
    const testValue = localStorage.getItem('lastSearchedCity');
    if (testValue && !testValue.startsWith('"') && !testValue.startsWith('{')) {
      console.log('Clearing legacy localStorage data');
      localStorage.removeItem('lastSearchedCity');
    }
  } catch (error) {
    console.log('Clearing all localStorage due to errors');
    localStorage.clear();
  }
};

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState(() => {
    // Load temperature unit from localStorage on initialization
    const savedUnit = getFromLocalStorage('temperatureUnit');
    return savedUnit || 'metric';
  });
  const [lastSearchedCity, setLastSearchedCity] = useState('');

  // Clear legacy storage and load last searched city from localStorage on mount
  useEffect(() => {
    clearLegacyStorage();
    const savedCity = getFromLocalStorage('lastSearchedCity');
    if (savedCity && typeof savedCity === 'string') {
      setLastSearchedCity(savedCity);
      setCity(savedCity);
    }
  }, []);

  // Auto-fetch weather for last searched city on mount
  useEffect(() => {
    if (lastSearchedCity && !currentWeather) {
      fetchWeatherData(lastSearchedCity, temperatureUnit);
    }
  }, [lastSearchedCity]); // Only depend on lastSearchedCity

  // Auto-refresh every 30 seconds if we have current weather data
  useEffect(() => {
    if (!currentWeather || !city) return;

    const interval = setInterval(() => {
      fetchWeatherData(city, temperatureUnit);
    }, 30000);

    return () => clearInterval(interval);
  }, [currentWeather, city, temperatureUnit]); // Add temperatureUnit to dependencies

  const fetchWeatherData = async (cityName, unit = temperatureUnit) => {
    if (!cityName || !cityName.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // NOTE: Replace 'YOUR_API_KEY_HERE' with your actual OpenWeatherMap API key
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

      if (API_KEY === 'YOUR_API_KEY_HERE') {
        throw new Error('Please get a free API key from OpenWeatherMap.org and replace YOUR_API_KEY_HERE in WeatherContext.jsx');
      }
      
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${unit}`
      );
      
      if (!weatherResponse.ok) {
        if (weatherResponse.status === 404) {
          throw new Error('City not found. Please check the city name and try again.');
        } else if (weatherResponse.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        } else {
          throw new Error('Failed to fetch weather data. Please try again.');
        }
      }

      const weatherData = await weatherResponse.json();

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${unit}`
      );
      
      const forecastData = forecastResponse.ok ? await forecastResponse.json() : null;

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setCity(cityName);
      
      // Save to localStorage
      saveToLocalStorage('lastSearchedCity', cityName);
      setLastSearchedCity(cityName);
      
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setIsLoading(false);
    }
  };

  const searchCity = (cityName) => {
    if (cityName && cityName.trim()) {
      fetchWeatherData(cityName.trim(), temperatureUnit);
    }
  };

  const toggleTemperatureUnit = () => {
    const newUnit = temperatureUnit === 'metric' ? 'imperial' : 'metric';
    setTemperatureUnit(newUnit);
    
    // Save temperature unit to localStorage
    saveToLocalStorage('temperatureUnit', newUnit);
    
    // Re-fetch data with new unit if we have a city
    if (city) {
      fetchWeatherData(city, newUnit); // Pass the new unit directly
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    currentWeather,
    forecast,
    isLoading,
    error,
    city,
    temperatureUnit,
    searchCity,
    toggleTemperatureUnit,
    clearError
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};