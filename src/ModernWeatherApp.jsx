import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Settings, 
  Sun, 
  Moon, 
  Cloud, 
  CloudRain, 
  Eye, 
  Droplets, 
  Wind, 
  Gauge, 
  Sunrise, 
  Sunset,
  X
} from 'lucide-react';
import SettingsPanel from './SettingsPanel';
import { weatherPhrases } from './weatherPhrases';
import './modern-styles.css';

import SunMoonTimesCard from './SunMoonTimesCard';
const API_KEY = '528f46b8804049b9a89222651252407';
const BASE_URL = 'https://api.weatherapi.com/v1';

function ModernWeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    showMotivation: true,
    theme: 'auto',
    temperatureUnit: 'C',
    showNotifications: true
  });
  const [activeTab, setActiveTab] = useState('today');
  const [phrase, setPhrase] = useState('');

  // Get current weather
  const getCurrentWeather = async (location) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=yes`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
      
      // Get phrase based on weather
      if (settings.showMotivation) {
        const condition = data.current.condition.text.toLowerCase();
        const randomPhrase = weatherPhrases.getRandomPhrase(condition);
        setPhrase(randomPhrase);
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get forecast
  const getForecast = async (location) => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=yes`
      );
      
      if (!response.ok) {
        throw new Error('Forecast data not found');
      }
      
      const data = await response.json();
      setForecastData(data);
      
    } catch (err) {
      console.error('Forecast error:', err);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      getCurrentWeather(searchTerm);
      getForecast(searchTerm);
      setSearchTerm('');
    }
  };

  // Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCurrentWeather(`${latitude},${longitude}`);
          getForecast(`${latitude},${longitude}`);
        },
        (error) => {
          setError('Unable to get your location');
        }
      );
    } else {
      setError('Geolocation is not supported');
    }
  };

  // Get weather icon
  const getWeatherIcon = (condition, size = 64) => {
    const conditionLower = condition?.toLowerCase() || '';
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return <Sun size={size} className="weather-icon-main" />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud size={size} className="weather-icon-main" />;
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain size={size} className="weather-icon-main" />;
    } else if (conditionLower.includes('snow')) {
      return <Cloud size={size} className="weather-icon-main" />;
    }
    return <Sun size={size} className="weather-icon-main" />;
  };

  // Temperature conversion
  const getTemperature = (temp) => {
    return settings.temperatureUnit === 'F' ? Math.round(temp * 9/5 + 32) : Math.round(temp);
  };

  // Load settings
  useEffect(() => {
    const savedSettings = localStorage.getItem('weatherAppSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    // Get initial location
    getUserLocation();
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem('weatherAppSettings', JSON.stringify(settings));
  }, [settings]);

  // Detectar tema de lluvia
  const isRainy = weatherData && (
    weatherData.current.condition.text.toLowerCase().includes('lluvia') ||
    weatherData.current.condition.text.toLowerCase().includes('rain') ||
    weatherData.current.condition.text.toLowerCase().includes('drizzle') ||
    weatherData.current.condition.text.toLowerCase().includes('llovizna') ||
    weatherData.current.condition.text.toLowerCase().includes('shower')
  );

  // Gradiente de fondo según clima
  let bgGradient = 'linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #a29bfe 100%)';
  if (weatherData) {
    if (isRainy) {
      bgGradient = 'linear-gradient(135deg, #636e72 0%, #2d3436 50%, #74b9ff 100%)';
    } else if (weatherData.current.is_day) {
      bgGradient = 'linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #a29bfe 100%)';
    } else {
      bgGradient = 'linear-gradient(135deg, #2d3436 0%, #636e72 50%, #74b9ff 100%)';
    }
  }

  return (
    <div
      className={`modern-weather-app${isRainy ? ' theme-rainy' : ''}`}
      style={{
        minHeight: '100vh',
        background: bgGradient,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Fondo animado de lluvia superpuesto */}
      {isRainy && <div className="weather-bg-lluvia" />}

      <div style={{ position: 'relative', zIndex: 10 }} className="container">
        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Search */}
            <form onSubmit={handleSearch} className="search-container">
              <input
                type="text"
                placeholder="Search for a city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button 
                type="submit"
                style={{ 
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  opacity: 0.7,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Search size={20} />
              </button>
            </form>
            
            {/* Tab Switcher */}
            <div className="tab-switcher">
              <button 
                className={`tab ${activeTab === 'today' ? 'active' : ''}`}
                onClick={() => setActiveTab('today')}
              >
                Today
              </button>
              <button 
                className={`tab ${activeTab === 'week' ? 'active' : ''}`}
                onClick={() => setActiveTab('week')}
              >
                Week
              </button>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Temperature Unit */}
            <div className="temp-unit-switcher">
              <button 
                className={`unit-btn ${settings.temperatureUnit === 'C' ? 'active' : ''}`}
                onClick={() => setSettings(prev => ({ ...prev, temperatureUnit: 'C' }))}
              >
                °C
              </button>
              <button 
                className={`unit-btn ${settings.temperatureUnit === 'F' ? 'active' : ''}`}
                onClick={() => setSettings(prev => ({ ...prev, temperatureUnit: 'F' }))}
              >
                °F
              </button>
            </div>
            
            {/* Settings Button */}
            <button 
              className="settings-btn"
              onClick={() => setShowSettings(true)}
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1.4fr', 
          gap: '1.5rem',
          '@media (max-width: 1024px)': {
            gridTemplateColumns: '1fr'
          }
        }}>
          {/* Main Weather Card */}
          <div>
            <div className="weather-card-main">
              {loading ? (
                <div className="loading-state">
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '1rem'
                  }}></div>
                  <p style={{ color: 'white', opacity: 0.7 }}>Loading weather data...</p>
                </div>
              ) : error ? (
                <div className="error-state">
                  <p style={{ color: 'white', marginBottom: '1rem' }}>{error}</p>
                  <button onClick={() => getUserLocation()} className="retry-btn">
                    <MapPin size={16} />
                    Try Again
                  </button>
                </div>
              ) : weatherData ? (
                <>
                  {/* Weather Icon */}
                  <div className="weather-icon-large">
                    {getWeatherIcon(weatherData.current.condition.text, 120)}
                  </div>
                  
                  {/* Temperature */}
                  <div className="temperature-main">
                    {getTemperature(weatherData.current.temp_c)}
                    <span className="temperature-unit">°{settings.temperatureUnit}</span>
                  </div>
                  
                  {/* Date & Location */}
                  <div className="date-location">
                    <p className="date-text">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  
                  {/* Weather Description */}
                  <div className="weather-description">
                    <p className="condition-text">{weatherData.current.condition.text}</p>
                    <p className="rain-chance">
                      Feels like {getTemperature(weatherData.current.feelslike_c)}°{settings.temperatureUnit}
                    </p>
                  </div>
                  
                  {/* Location Card */}
                  <div className="location-image">
                    <div className="location-card">
                      <MapPin size={16} className="text-white opacity-70" />
                      <span className="location-text">
                        {weatherData.location.name}, {weatherData.location.country}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="welcome-state">
                  <p style={{ color: 'white', marginBottom: '1rem' }}>Welcome to WeatherL</p>
                  <button onClick={getUserLocation} className="location-btn">
                    <MapPin size={16} />
                    Get Weather for My Location
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Forecast & Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* 7-day Forecast */}
            {forecastData && (
              <div className="forecast-card">
                <h3 className="section-title">7-day Forecast</h3>
                <div className="grid grid-cols-7 gap-4">
                  {forecastData.forecast.forecastday.map((day, index) => (
                    <div 
                      key={day.date} 
                      className={`forecast-day ${index === 0 ? 'today' : ''}`}
                    >
                      <div className="day-name">
                        {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="forecast-icon">
                        {getWeatherIcon(day.day.condition.text, 32)}
                      </div>
                      <div className="forecast-temps">
                        <div className="temp-high">
                          {getTemperature(day.day.maxtemp_c)}°
                        </div>
                        <div className="temp-low">
                          {getTemperature(day.day.mintemp_c)}°
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Today's Highlights */}
            {weatherData && (
              <div className="highlights-section">
                <h3 className="section-title">Today's Highlights</h3>
                <div className="grid grid-cols-3 gap-4">
                  {/* UV Index */}
                  <div className="highlight-card">
                    <div className="highlight-header">
                      <Sun size={16} className="text-orange-400" />
                      <span className="highlight-label">UV Index</span>
                    </div>
                    <div className="highlight-value">
                      {weatherData.current.uv}
                      <span className="unit">UV</span>
                    </div>
                    <div className="uv-meter">
                      <div 
                        className="uv-bar" 
                        style={{ width: `${(weatherData.current.uv / 12) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Wind */}
                  <div className="highlight-card">
                    <div className="highlight-header">
                      <Wind size={16} className="text-blue-400" />
                      <span className="highlight-label">Wind</span>
                    </div>
                    <div className="highlight-value">
                      {Math.round(weatherData.current.wind_kph)}
                      <span className="unit">km/h</span>
                    </div>
                    <div className="wind-direction">
                      <div className="wind-compass">
                        <div 
                          className="wind-arrow"
                          style={{ transform: `rotate(${weatherData.current.wind_degree}deg)` }}
                        >
                          ↑
                        </div>
                      </div>
                      <span className="wind-dir">{weatherData.current.wind_dir}</span>
                    </div>
                  </div>
                  
                  {/* Humidity */}
                  <div className="highlight-card">
                    <div className="highlight-header">
                      <Droplets size={16} className="text-blue-400" />
                      <span className="highlight-label">Humidity</span>
                    </div>
                    <div className="highlight-value">
                      {weatherData.current.humidity}
                      <span className="unit">%</span>
                    </div>
                    <div className="humidity-status">
                      {weatherData.current.humidity > 70 ? 'High' : 
                       weatherData.current.humidity > 40 ? 'Normal' : 'Low'}
                    </div>
                  </div>
                  
                  {/* Visibility */}
                  <div className="highlight-card">
                    <div className="highlight-header">
                      <Eye size={16} className="text-gray-400" />
                      <span className="highlight-label">Visibility</span>
                    </div>
                    <div className="highlight-value">
                      {weatherData.current.vis_km}
                      <span className="unit">km</span>
                    </div>
                    <div className="visibility-status">
                      {weatherData.current.vis_km > 10 ? 'Excellent' :
                       weatherData.current.vis_km > 5 ? 'Good' : 'Poor'}
                    </div>
                  </div>
                  
                  {/* Pressure */}
                  <div className="highlight-card">
                    <div className="highlight-header">
                      <Gauge size={16} className="text-purple-400" />
                      <span className="highlight-label">Pressure</span>
                    </div>
                    <div className="highlight-value">
                      {Math.round(weatherData.current.pressure_mb)}
                      <span className="unit">mb</span>
                    </div>
                  </div>
                  
                  {/* Sunrise & Sunset */}
                  {forecastData && (
                    <div className="highlight-card">
                      <div className="highlight-header">
                        <Sunrise size={16} className="text-orange-400" />
                        <span className="highlight-label">Sun Times</span>
                      </div>
                      <div className="sun-times">
                        <div className="sun-time">
                          <Sunrise size={16} className="text-orange-400" />
                          <div>
                            <div className="time">{forecastData.forecast.forecastday[0].astro.sunrise}</div>
                            <div className="time-detail">Sunrise</div>
                          </div>
                        </div>
                        <div className="sun-time">
                          <Sunset size={16} className="text-orange-600" />
                          <div>
                            <div className="time">{forecastData.forecast.forecastday[0].astro.sunset}</div>
                            <div className="time-detail">Sunset</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Motivational Phrase */}
            {settings.showMotivation && phrase && (
              <motion.div 
                className="motivation-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div>
                  <Sun size={24} className="text-yellow-400" />
                </div>
                <p className="motivation-text">"{phrase}"</p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
      
      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              className="fixed right-0 top-0 h-full w-80 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg z-50"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white text-xl font-semibold">Settings</h2>
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="text-white opacity-70 hover:opacity-100"
                  >
                    <X size={24} />
                  </button>
                </div>
                <SettingsPanel 
                  settings={settings} 
                  onSettingsChange={setSettings} 
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ModernWeatherApp;
