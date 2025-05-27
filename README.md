# Weather Dashboard

A modern, responsive React.js weather dashboard that provides real-time weather information and forecasts for any city worldwide.

## Features

- **Real-time Weather Data**: Get current weather conditions for any city
- **5-Day Forecast**: View upcoming weather predictions
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- **Auto-refresh**: Weather data updates every 30 seconds
- **Responsive Design**: Optimized for desktop and mobile devices
- **Local Storage**: Remembers your last searched city
- **Error Handling**: User-friendly error messages for various scenarios
- **Modern UI**: Glass-morphism design with smooth animations

##  Technologies Used

- **React.js** - Frontend framework
- **Context API** - State management
- **CSS Modules** - Styling
- **Axios** - HTTP requests
- **OpenWeatherMap API** - Weather data source
- **Vite** - Build tool

##  Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get API Key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key
   - Replace the API key in `src/hooks/useWeatherAPI.js`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
weather-dashboard/
├── public/
├── src/
│   ├── components/          # React components
│   │   ├── SearchInput.jsx
│   │   ├── WeatherDisplay.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── WeatherForecast.jsx
│   │   └── TemperatureToggle.jsx
│   ├── context/            # Context providers
│   │   └── WeatherContext.jsx
│   ├── hooks/              # Custom hooks
│   │   └── useWeatherAPI.js
│   ├── utils/              # Utility functions
│   │   └── localStorage.js
│   ├── styles/             # CSS modules
│   │   ├── App.module.css
│   │   ├── SearchInput.module.css
│   │   ├── WeatherDisplay.module.css
│   │   ├── ErrorMessage.module.css
│   │   ├── WeatherForecast.module.css
│   │   └── TemperatureToggle.module.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

##  Key Components

### WeatherContext
- Manages global state using React's Context API
- Handles city selection, temperature units, loading states, and errors

### useWeatherAPI Hook
- Custom hook for API calls using React Query
- Implements automatic polling every 30 seconds
- Handles caching and error scenarios

### Component Architecture
- **SearchInput**: City search functionality
- **WeatherDisplay**: Current weather information display
- **WeatherForecast**: 5-day weather forecast
- **ErrorMessage**: User-friendly error handling
- **TemperatureToggle**: Celsius/Fahrenheit switcher

## API Integration

The app uses the OpenWeatherMap API with the following endpoints:
- Current Weather: `https://api.openweathermap.org/data/2.5/weather`
- 5-Day Forecast: `https://api.openweathermap.org/data/2.5/forecast`

## Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones

##  Design Features

- **Glass-morphism UI**: Modern frosted glass effect
- **Smooth Animations**: Hover effects and transitions
- **Color-coded Information**: Intuitive visual hierarchy
- **Weather Icons**: Dynamic icons from OpenWeatherMap
- **Gradient Backgrounds**: Beautiful color gradients

## Error Handling

The app handles various error scenarios:
- Invalid city names (404 errors)
- Network connectivity issues
- API rate limiting
- Malformed API responses

## Local Storage

The application automatically saves:
- Last searched city
- Restores previous search on app reload

##  Performance Features

- **React Query Caching**: Efficient data caching and synchronization
- **Automatic Refresh**: Data updates every 30 seconds
- **Optimized Rendering**: Prevents unnecessary re-renders
- **Code Splitting**: Modular component architecture


## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Vite](https://vitejs.dev/) for fast development experience

##  Contact

For any questions or feedback, please reach out to [yajasvikhanna@gmail.com]
