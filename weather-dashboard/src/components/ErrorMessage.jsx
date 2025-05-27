import React from 'react';
import { useWeather} from '../context/WeatherContext';
import styles from '../styles/ErrorMessage.module.css';

const ErrorMessage = () => {
  const { error, clearError } = useWeather();

  if (!error) return null;

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>⚠️</div>
        <div className={styles.errorText}>
          <h3 className={styles.errorTitle}>Oops! Something went wrong</h3>
          <p className={styles.errorMessage}>{error}</p>
        </div>
        <button 
          onClick={clearError} 
          className={styles.closeButton}
          aria-label="Close error message"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;