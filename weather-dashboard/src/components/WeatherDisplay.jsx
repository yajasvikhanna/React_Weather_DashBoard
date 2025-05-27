import React from 'react';
import styles from '../styles/WeatherDisplay.module.css';

const WeatherDisplay = ({ weather, unit }) => {
  if (!weather) return null;

  const getTemperatureUnit = () => {
    return unit === 'metric' ? '°C' : '°F';
  };

  const getWindSpeedUnit = () => {
    return unit === 'metric' ? 'm/s' : 'mph';
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatTemperature = (temp) => {
    return Math.round(temp);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.weatherCard}>
        <div className={styles.locationInfo}>
          <h2 className={styles.cityName}>
            {weather.name}, {weather.sys.country}
          </h2>
          <p className={styles.dateTime}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className={styles.mainWeather}>
          <div className={styles.temperatureSection}>
            <img
              src={getWeatherIcon(weather.weather[0].icon)}
              alt={weather.weather[0].description}
              className={styles.weatherIcon}
            />
            <div className={styles.temperature}>
              <span className={styles.tempValue}>
                {formatTemperature(weather.main.temp)}
              </span>
              <span className={styles.tempUnit}>{getTemperatureUnit()}</span>
            </div>
          </div>
          
          <div className={styles.weatherDescription}>
            <h3 className={styles.condition}>
              {capitalizeFirstLetter(weather.weather[0].description)}
            </h3>
            <p className={styles.feelsLike}>
              Feels like {formatTemperature(weather.main.feels_like)}{getTemperatureUnit()}
            </p>
          </div>
        </div>

        <div className={styles.weatherDetails}>
          <div className={styles.detailItem}>
            <div className={styles.detailIcon}>💧</div>
            <div className={styles.detailInfo}>
              <span className={styles.detailLabel}>Humidity</span>
              <span className={styles.detailValue}>{weather.main.humidity}%</span>
            </div>
          </div>

          <div className={styles.detailItem}>
            <div className={styles.detailIcon}>💨</div>
            <div className={styles.detailInfo}>
              <span className={styles.detailLabel}>Wind Speed</span>
              <span className={styles.detailValue}>
                {weather.wind.speed} {getWindSpeedUnit()}
              </span>
            </div>
          </div>

          <div className={styles.detailItem}>
            <div className={styles.detailIcon}>🌡️</div>
            <div className={styles.detailInfo}>
              <span className={styles.detailLabel}>Pressure</span>
              <span className={styles.detailValue}>{weather.main.pressure} hPa</span>
            </div>
          </div>

          <div className={styles.detailItem}>
            <div className={styles.detailIcon}>👁️</div>
            <div className={styles.detailInfo}>
              <span className={styles.detailLabel}>Visibility</span>
              <span className={styles.detailValue}>
                {weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {weather.main.temp_min !== weather.main.temp_max && (
          <div className={styles.tempRange}>
            <span className={styles.highTemp}>
              H: {formatTemperature(weather.main.temp_max)}{getTemperatureUnit()}
            </span>
            <span className={styles.lowTemp}>
              L: {formatTemperature(weather.main.temp_min)}{getTemperatureUnit()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDisplay;