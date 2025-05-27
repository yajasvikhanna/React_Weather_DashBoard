import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import styles from '../styles/SearchInput.module.css';

const SearchInput = () => {
  const [inputValue, setInputValue] = useState('');
  const { searchCity, isLoading } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      searchCity(inputValue.trim());
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter city name..."
          className={styles.searchInput}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className={styles.searchButton}
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? (
            <div className={styles.buttonSpinner}></div>
          ) : (
            <span>Search</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchInput;