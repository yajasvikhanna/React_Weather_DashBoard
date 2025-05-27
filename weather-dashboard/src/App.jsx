import React from 'react';
import { useWeather } from './context/WeatherContext';
import SearchInput from './components/SearchInput';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorMessage from './components/ErrorMessage';
import WeatherForecast from './components/WeatherForecast';
import TemperatureToggle from './components/TemperatureToggle';
import styles from './styles/App.module.css';

function App() {
  const { 
    currentWeather, 
    forecast, 
    isLoading, 
    error, 
    clearError,
    temperatureUnit 
  } = useWeather();

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Weather Dashboard</h1>
          <p className={styles.subtitle}>Get real-time weather information for any city</p>
        </header>

        <div className={styles.controls}>
          <SearchInput />
          <TemperatureToggle />
        </div>

        {error && (
          <ErrorMessage 
            message={error} 
            onClose={clearError}
          />
        )}

        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {currentWeather && !isLoading && (
          <>
            <WeatherDisplay 
              weather={currentWeather} 
              unit={temperatureUnit}
            />
            {forecast && (
              <WeatherForecast 
                forecast={forecast} 
                unit={temperatureUnit}
              />
            )}
          </>
        )}

        {!currentWeather && !isLoading && !error && (
          <div className={styles.welcome}>
            <h2>Welcome to Weather Dashboard</h2>
            <p>Search for a city to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;