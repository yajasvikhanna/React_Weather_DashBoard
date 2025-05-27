import React from 'react';
import { useWeather } from '../context/WeatherContext';
import styles from '../styles/WeatherForecast.module.css';

const WeatherForecast = () => {
  const { forecast, isLoading, temperatureUnit } = useWeather();

  if (isLoading) {
    return (
      <div className={styles.forecastContainer}>
        <h3 className={styles.forecastTitle}>5-Day Forecast</h3>
        <div className={styles.loadingMessage}>Loading forecast...</div>
      </div>
    );
  }

  if (!forecast || !forecast.list) {
    return null;
  }

  const getTemperatureUnit = () => {
    return temperatureUnit === 'metric' ? '°C' : '°F';
  };

  const getWindSpeedUnit = () => {
    return temperatureUnit === 'metric' ? 'm/s' : 'mph';
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  const formatTemperature = (temp) => {
    return Math.round(temp);
  };

  // Group forecast data by day (take one entry per day around noon)
  const dailyForecasts = forecast.list.filter((item, index) => {
    return index % 8 === 0; // Every 8th item (24 hours / 3 hours = 8 intervals)
  }).slice(0, 5);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.forecastContainer}>
      <h3 className={styles.forecastTitle}>5-Day Forecast</h3>
      <div className={styles.forecastGrid}>
        {dailyForecasts.map((forecastItem, index) => (
          <div key={index} className={styles.forecastCard}>
            <div className={styles.forecastDate}>
              {index === 0 ? 'Today' : formatDate(forecastItem.dt)}
            </div>
            <img 
              src={getWeatherIcon(forecastItem.weather[0].icon)}
              alt={forecastItem.weather[0].description}
              className={styles.forecastIcon}
            />
            <div className={styles.forecastTemps}>
              <span className={styles.tempHigh}>
                {formatTemperature(forecastItem.main.temp_max)}{getTemperatureUnit()}
              </span>
              <span className={styles.tempLow}>
                {formatTemperature(forecastItem.main.temp_min)}{getTemperatureUnit()}
              </span>
            </div>
            <div className={styles.forecastCondition}>
              {forecastItem.weather[0].main}
            </div>
            <div className={styles.forecastDetails}>
              <div className={styles.forecastDetail}>
                <span>💧 {forecastItem.main.humidity}%</span>
              </div>
              <div className={styles.forecastDetail}>
                <span>💨 {formatTemperature(forecastItem.wind.speed)} {getWindSpeedUnit()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;