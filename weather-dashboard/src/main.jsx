import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'
import { WeatherProvider } from './context/WeatherContext.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 30000, // Auto-refresh every 30 seconds
      staleTime: 25000,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)