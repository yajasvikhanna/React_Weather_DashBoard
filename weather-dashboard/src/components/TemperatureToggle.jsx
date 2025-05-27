import React from 'react';
import { useWeather } from '../context/WeatherContext';
import styles from '../styles/TemperatureToggle.module.css';

const TemperatureToggle = () => {
  const { temperatureUnit, toggleTemperatureUnit } = useWeather();

  return (
    <div className={styles.toggleContainer}>
      <span className={styles.toggleLabel}>Temperature Unit:</span>
      <div className={styles.toggleButton} onClick={toggleTemperatureUnit}>
        <div className={styles.toggleOption}>
          <span className={temperatureUnit === 'metric' ? styles.active : ''}>
            °C
          </span>
        </div>
        <div className={styles.toggleOption}>
          <span className={temperatureUnit === 'imperial' ? styles.active : ''}>
            °F
          </span>
        </div>
        <div 
          className={`${styles.toggleSlider} ${
            temperatureUnit === 'metric' ? styles.left : styles.right
          }`}
        />
      </div>
    </div>
  );
};

export default TemperatureToggle;