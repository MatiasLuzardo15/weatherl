import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  CloudSnow, 
  CloudDrizzle,
  CloudLightning,
  Search,
  MapPin,
  Thermometer,
  Eye,
  Wind,
  Droplets,
  Loader2,
  Settings,
  Menu,
  Quote,
  RefreshCw,
  X,
  Sunrise,
  Moon,
  CalendarDays
} from 'lucide-react'
import { WEATHER_API_CONFIG } from './config'
import { getWeatherPhrase, loadSettings, saveSettings, DEFAULT_SETTINGS } from './weatherPhrases'
// Extiende los ajustes por defecto
const EXTENDED_DEFAULT_SETTINGS = {
  ...DEFAULT_SETTINGS,
  useLocalTimeGreeting: true,
};
import { LANGUAGES, getGreeting, getLocalizedDate } from './languages'
import SettingsPanel from './SettingsPanel'
import ModernSettingsPanel from './ModernSettingsPanel'
import WeatherMap from './WeatherMap'
import WeeklyForecast, { default as WeeklyForecastWithLunar } from './WeeklyForecast'
import './App.css'
import MoonAnimation from './MoonAnimation'

const weatherIcons = {
  '01d': Sun,
  '01n': Sun,
  '02d': Cloud,
  '02n': Cloud,
  '03d': Cloud,
  '03n': Cloud,
  '04d': Cloud,
  '04n': Cloud,
  '09d': CloudRain,
  '09n': CloudRain,
  '10d': CloudDrizzle,
  '10n': CloudDrizzle,
  '11d': CloudLightning,
  '11n': CloudLightning,
  '13d': CloudSnow,
  '13n': CloudSnow,
  '50d': Cloud,
  '50n': Cloud,
}

function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [city, setCity] = useState('')
  const [refreshTime, setRefreshTime] = useState(null)
  const [settings, setSettings] = useState(EXTENDED_DEFAULT_SETTINGS)
  const [showSettings, setShowSettings] = useState(false)
  const [currentPhrase, setCurrentPhrase] = useState('')
  const [activeTab, setActiveTab] = useState('today')
  const [cityOptions, setCityOptions] = useState([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  useEffect(() => {
    const savedSettings = loadSettings()
    setSettings({ ...EXTENDED_DEFAULT_SETTINGS, ...savedSettings })
    if (savedSettings.autoLocation) {
      getCurrentLocationWeather()
    }
  }, [])

  useEffect(() => {
    if (weather && settings.showPhrase) {
      const phrase = getWeatherPhrase(weather.current.condition.text, weather.current.is_day)
      setCurrentPhrase(phrase)
    }
  }, [weather, settings.showPhrase])

  const updateSettings = (newSettings) => {
    setSettings(newSettings)
    saveSettings(newSettings)
  }

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          fetchWeatherByCoords(latitude, longitude)
        },
        (error) => {
          setError(t.locationError)
          setLoading(false)
        }
      )
    } else {
      setError(t.locationError)
    }
  }

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `${WEATHER_API_CONFIG.BASE_URL}/current.json?key=${WEATHER_API_CONFIG.API_KEY}&q=${lat},${lon}&aqi=yes&lang=es`
      )
      const data = await response.json()
      if (response.ok) {
        setWeather(data)
        setError('')
        setRefreshTime(new Date())
        // Fetch forecast for the same location
        fetchForecast(`${lat},${lon}`)
      } else {
        setError(t.connectionError)
      }
    } catch (err) {
      setError(t.connectionError)
    } finally {
      setLoading(false)
    }
  }

  const fetchForecast = async (location) => {
    try {
      console.log('Fetching forecast for:', location)
      // Ajustamos a 3 días ya que es el límite del plan gratuito
      const url = `${WEATHER_API_CONFIG.BASE_URL}/forecast.json?key=${WEATHER_API_CONFIG.API_KEY}&q=${location}&days=7&aqi=no&alerts=no&lang=es`
      console.log('API URL:', url)
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (response.ok) {
        console.log('Forecast data received:', data)
        if (data.forecast?.forecastday?.length) {
          console.log('Number of forecast days:', data.forecast.forecastday.length)
        }
        setForecast(data)
      } else {
        console.error('API Error:', data.error || 'Unknown error')
      }
    } catch (err) {
      console.error('Error fetching forecast:', err)
    }
  }

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return
    
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(
        `${WEATHER_API_CONFIG.BASE_URL}/current.json?key=${WEATHER_API_CONFIG.API_KEY}&q=${encodeURIComponent(cityName)}&aqi=yes&lang=es`
      )
      
      const data = await response.json()
      
      if (response.ok) {
        setWeather(data)
        setCity('')
        setRefreshTime(new Date())
        // Fetch forecast for the same city
        fetchForecast(cityName)
      } else {
        setError(data.error?.message || t.cityNotFound)
      }
    } catch (err) {
      setError(t.connectionError)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchWeather(city)
  }

  const refreshWeather = () => {
    if (weather) {
      fetchWeather(weather.location.name)
    }
  }

  const formatTemperature = (temp) => {
    if (settings.temperatureUnit === 'fahrenheit') {
      return `${Math.round((temp * 9/5) + 32)}°F`
    }
    return `${Math.round(temp)}°C`
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString(settings.timeFormat === '24h' ? 'es-ES' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Get current language texts
  const t = LANGUAGES[settings.language] || LANGUAGES['es']

  // Get greeting info según preferencia del usuario
  const getGreetingInfo = () => {
    if (settings.useLocalTimeGreeting) {
      const hour = new Date().getHours();
      let greeting, icon, timeClass;
      if (hour >= 5 && hour < 12) {
        greeting = settings.language === 'en' ? 'Good morning' : 'Buen día';
        icon = '☀️';
        timeClass = 'morning';
      } else if (hour >= 12 && hour < 18) {
        greeting = settings.language === 'en' ? 'Good afternoon' : 'Buenas tardes';
        icon = '☀️';
        timeClass = 'afternoon';
      } else {
        greeting = settings.language === 'en' ? 'Good evening' : 'Buenas noches';
        icon = '🌙';
        timeClass = 'evening';
      }
      return { greeting, icon, timeClass };
    } else if (weather) {
      const isDay = weather.current.is_day === 1;
      let greeting, icon, timeClass;
      if (isDay) {
        greeting = settings.language === 'en' ? 'Good morning' : 'Buen día';
        icon = '☀️';
        timeClass = 'morning';
      } else {
        greeting = settings.language === 'en' ? 'Good evening' : 'Buenas noches';
        icon = '🌙';
        timeClass = 'evening';
      }
      return { greeting, icon, timeClass };
    } else {
      // Fallback hora local
      const hour = new Date().getHours();
      let greeting, icon, timeClass;
      if (hour >= 5 && hour < 12) {
        greeting = settings.language === 'en' ? 'Good morning' : 'Buen día';
        icon = '☀️';
        timeClass = 'morning';
      } else if (hour >= 12 && hour < 18) {
        greeting = settings.language === 'en' ? 'Good afternoon' : 'Buenas tardes';
        icon = '☀️';
        timeClass = 'afternoon';
      } else {
        greeting = settings.language === 'en' ? 'Good evening' : 'Buenas noches';
        icon = '🌙';
        timeClass = 'evening';
      }
      return { greeting, icon, timeClass };
    }
  }

  const getBackgroundClass = () => {
    if (!weather) return 'bg-gradient-blue'
    
    const time = new Date().getHours()
    const isDay = time >= 6 && time < 18
    const weatherCondition = weather.current.condition.text.toLowerCase()
    
    if (weatherCondition.includes('lluvia') || weatherCondition.includes('rain')) {
      return isDay ? 'bg-gradient-day-rain' : 'bg-gradient-night-rain'
    } else if (weatherCondition.includes('nube') || weatherCondition.includes('cloud') || weatherCondition.includes('nublado')) {
      return isDay ? 'bg-gradient-day-clouds' : 'bg-gradient-night-clouds'
    } else if (weatherCondition.includes('despejado') || weatherCondition.includes('soleado') || weatherCondition.includes('clear') || weatherCondition.includes('sunny')) {
      return isDay ? 'bg-gradient-day-clear' : 'bg-gradient-night-clear'
    } else if (weatherCondition.includes('nieve') || weatherCondition.includes('snow')) {
      return isDay ? 'bg-gradient-day-snow' : 'bg-gradient-night-snow'
    }
    
    return 'bg-gradient-blue'
  }

  // Get weather icon principal (tarjeta)
  const getWeatherIcon = () => {
    if (!weather) return Cloud;
    const condition = weather.current.condition.text.toLowerCase();
    // Detecta si el saludo es de noche
    const isNightGreeting = getGreetingInfo().timeClass === 'evening';
    if (condition.includes('lluvia') || condition.includes('rain')) {
      return CloudRain;
    } else if (condition.includes('nieve') || condition.includes('snow')) {
      return CloudSnow;
    } else if (condition.includes('tormenta') || condition.includes('thunder')) {
      return CloudLightning;
    } else if (condition.includes('llovizna') || condition.includes('drizzle')) {
      return CloudDrizzle;
    } else if (condition.includes('nube') || condition.includes('cloud') || condition.includes('nublado')) {
      return Cloud;
    } else if (condition.includes('despejado') || condition.includes('soleado') || condition.includes('clear') || condition.includes('sunny')) {
      return isNightGreeting ? Moon : Sun;
    }
    return Cloud;
  }

  // Get dynamic theme según preferencia del usuario
  const getWeatherTheme = () => {
    if (!weather) return 'theme-cloudy';
    const condition = weather.current.condition.text.toLowerCase();
    let isDay;
    if (settings.useLocalTimeGreeting) {
      const hour = new Date().getHours();
      isDay = hour >= 5 && hour < 18;
    } else {
      isDay = weather.current.is_day === 1;
    }
    // Night theme regardless of weather
    if (!isDay) {
      return 'theme-night';
    }
    // Day themes based on conditions
    if (condition.includes('lluvia') || condition.includes('rain') || condition.includes('drizzle') || condition.includes('llovizna')) {
      return 'theme-rainy';
    } else if (condition.includes('nieve') || condition.includes('snow')) {
      return 'theme-snow';
    } else if (condition.includes('tormenta') || condition.includes('thunder') || condition.includes('storm')) {
      return 'theme-storm';
    } else if (condition.includes('niebla') || condition.includes('fog') || condition.includes('mist') || condition.includes('haze')) {
      return 'theme-fog';
    } else if (condition.includes('despejado') || condition.includes('soleado') || condition.includes('clear') || condition.includes('sunny')) {
      return 'theme-sunny';
    } else if (condition.includes('nube') || condition.includes('cloud') || condition.includes('nublado') || condition.includes('overcast')) {
      return 'theme-cloudy';
    }
    // Default to cloudy
    return 'theme-cloudy';
  }

  const renderWeatherBackground = () => {
    if (!weather) return null;
    const condition = weather.current.condition.text.toLowerCase();
    if (
      condition.includes('lluvia') ||
      condition.includes('rain') ||
      condition.includes('drizzle') ||
      condition.includes('llovizna') ||
      condition.includes('shower')
    ) {
      // Lluvia: animación ultra liviana con líneas
      return (
        <div className="weather-bg-lluvia">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="rain-stripe"
              style={{
                left: `${(i * 100) / 12 + Math.random() * 5}vw`,
                animationDelay: `${Math.random() * 1.2}s`
              }}
            />
          ))}
        </div>
      );
    } else if (condition.includes('nieve') || condition.includes('snow')) {
      // Nieve: copos
      return (
        <div className="weather-bg-nieve">
          {Array.from({ length: 22 }).map((_, i) => (
            <div
              key={i}
              className="snow-flake"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 2.5}s`,
                top: `${Math.random() * 10}vh`
              }}
            />
          ))}
        </div>
      );
    } else if (condition.includes('nube') || condition.includes('cloud') || condition.includes('nublado')) {
      // Nubes: nubes animadas
      return (
        <div className="weather-bg-nubes">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="cloud-anim"
              style={{
                top: `${10 + i * 12}vh`,
                left: `${-80 + i * 60}px`,
                animationDelay: `${i * 2}s`
              }}
            />
          ))}
        </div>
      );
    } else if (condition.includes('despejado') || condition.includes('soleado') || condition.includes('clear') || condition.includes('sunny')) {
      // Sol: rayo solar
      return (
        <div className="weather-bg-sol">
          <div className="sun-ray" />
        </div>
      );
    }
    return null;
  };

  const WeatherIcon = getWeatherIcon()
  const weatherTheme = getWeatherTheme()

  const searchCities = async (query) => {
    if (!query.trim()) return;
    const url = `${WEATHER_API_CONFIG.BASE_URL}/search.json?key=${WEATHER_API_CONFIG.API_KEY}&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) return setCityOptions([]);
    const data = await res.json();
    setCityOptions(data);
    setShowCityDropdown(true);
  };

  const handleCityInput = (e) => {
    setCity(e.target.value);
    if (e.target.value.length > 2) {
      searchCities(e.target.value);
    } else {
      setCityOptions([]);
      setShowCityDropdown(false);
    }
  };

  const handleCitySelect = (cityObj) => {
    setShowCityDropdown(false);
    setCityOptions([]);
    setCity(cityObj.name);
    fetchWeather(cityObj.name);
  };

  return (
    <div 
      className={`min-h-screen weather-app-container ${weatherTheme}`}
    >
      {renderWeatherBackground()}
      <div className="container">
        {/* Modern Header */}
        <header className="modern-header">
          <div className="header-left">
            {/* Tab Switcher */}
            <nav className="tab-switcher-ios">
              <button
                className={`tab-ios ${activeTab === 'today' ? 'active' : ''}`}
                onClick={() => setActiveTab('today')}
                aria-label="Hoy"
                title={t.today}
              >
                <Sun size={22} />
                <span className="tab-label">{t.today}</span>
              </button>
              <button
                className={`tab-ios ${activeTab === 'week' ? 'active' : ''}`}
                onClick={() => setActiveTab('week')}
                aria-label="Semana"
                title={t.week}
              >
                <CalendarDays size={22} />
                <span className="tab-label">{t.week}</span>
              </button>
            </nav>
          </div>
          
          <div className="header-center">
            {/* Espacio central vacío para balance visual */}
          </div>
          
          <div className="header-right">
            {/* Settings Button */}
            <button 
              className="settings-btn-modern"
              onClick={() => setShowSettings(true)}
              aria-label="Ajustes"
              title={t.settings}
            >
              <span className="settings-icon-desktop"><Settings size={22} /></span>
              <span className="settings-icon-mobile"><Menu size={26} /></span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="extended-grid-modern">
          {/* Main Weather Card */}
          <div>
            {/* Saludo como h1 Apple bold alineado a la izquierda */}
            {weather && (
              <div style={{
                margin: '2px 0 6px 0',
                padding: 0,
                textAlign: 'left',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'San Francisco', 'Helvetica Neue', Arial, sans-serif",
                fontWeight: 800,
                fontSize: '2.3rem',
                letterSpacing: '0.01em',
                color: 'white',
                textShadow: '0 2px 8px rgba(0,0,0,0.18)'
              }}>
            {/* Luna solo si es modo noche */}
            {getGreetingInfo().timeClass === 'evening' && (
              <span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle', marginRight: '10px' }}>
                <MoonAnimation />
              </span>
            )}
            <h1
              className={`greeting-gradient ${getGreetingInfo().timeClass}`}
              style={{
                margin: 0,
                paddingBottom: '0px',
                fontFamily: "'Rock Salt', cursive, 'Segoe UI', 'Fira Sans', 'Montserrat', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Helvetica Neue', Arial, sans-serif",
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontSize: '3.2rem',
                color: 'white',
                letterSpacing: '0.01em',
                textShadow: 'none',
                display: 'block',
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              {getGreetingInfo().greeting}
            </h1>
              </div>
            )}

            {/* Resumen técnico del día, texto corrido aesthetic alineado a la izquierda */}
            {weather && (
              <div style={{
                margin: '0 0 32px 0',
                padding: 0,
                textAlign: 'center',
                color: 'rgba(255,255,255,0.92)',
                fontFamily: "'Manrope', 'Fira Sans', 'Montserrat', 'Segoe UI', sans-serif",
                fontSize: '1.08rem',
                fontWeight: 400,
                lineHeight: '1.7',
                textShadow: '0 1px 3px rgba(0,0,0,0.13)'
              }}>
                {settings.language === 'en'
                  ? (() => {
                      // Descripción completamente en inglés
                      const temp = Math.round(weather.current.temp_c);
                      const feels = Math.round(weather.current.feelslike_c);
                      const wind = Math.round(weather.current.wind_kph);
                      const humidity = weather.current.humidity;
                      // Si el API no devuelve la condición en inglés, traducir manualmente lo más común
                      let condition = weather.current.condition.text;
                      // Traducción básica de condiciones comunes
                      const map = {
                        'Lluvia moderada a intervalos': 'Moderate rain at times',
                        'Lluvia ligera': 'Light rain',
                        'Lluvia moderada': 'Moderate rain',
                        'Nublado': 'Cloudy',
                        'Despejado': 'Clear',
                        'Soleado': 'Sunny',
                        'Parcialmente nublado': 'Partly cloudy',
                        'Niebla': 'Fog',
                        'Nieve': 'Snow',
                        'Tormenta': 'Thunderstorm',
                        // Agrega más según sea necesario
                      };
                      if (map[condition]) condition = map[condition];
                      return `${condition} with a temperature of ${temp}°C, feels like ${feels}°C, wind ${wind} km/h, humidity ${humidity}%, visibility ${weather.current.vis_km} km.`;
                    })()
                  : (() => {
                      // Descripción en español
                      const temp = Math.round(weather.current.temp_c);
                      const feels = Math.round(weather.current.feelslike_c);
                      const wind = Math.round(weather.current.wind_kph);
                      const humidity = weather.current.humidity;
                      const condition = weather.current.condition.text;
                      return `${condition} con temperatura de ${temp}°C, sensación térmica ${feels}°C, viento ${wind} km/h, humedad ${humidity}%, visibilidad ${weather.current.vis_km} km.`;
                    })()
                }
              </div>
            )}

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="search-container-below"
            >
              <form onSubmit={handleSubmit} className="search-modern-below" style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={city}
                  onChange={handleCityInput}
                  placeholder={t.searchPlaceholder}
                  className="search-input-modern-below"
                  disabled={loading}
                  autoComplete="off"
                  onFocus={() => cityOptions.length > 0 && setShowCityDropdown(true)}
                  onBlur={() => setTimeout(() => setShowCityDropdown(false), 120)}
                />
                <button 
                  type="submit"
                  disabled={loading || !city.trim()}
                  className="search-btn-modern-below"
                >
                  <Search size={18} />
                </button>
                {showCityDropdown && cityOptions.length > 0 && (
                  <ul className="city-dropdown-list">
                    {cityOptions.map((city, idx) => (
                      <li key={city.id || idx}>
                        <button type="button" className="city-dropdown-option" onMouseDown={() => handleCitySelect(city)}>
                          {city.name}{city.region ? `, ${city.region}` : ''}{city.country ? `, ${city.country}` : ''}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </form>
            </motion.div>
            
            <div className="weather-card-modern">
              {loading ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  textAlign: 'center'
                }}>
                  <Loader2 className="w-12 h-12 text-white mb-4" style={{ animation: 'spin 1s linear infinite' }} />
                  <p style={{ color: 'white', opacity: 0.7 }}>{t.loadingWeather}</p>
                </div>
              ) : error ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  textAlign: 'center'
                }}>
                  <p style={{ color: 'white', marginBottom: '1rem' }}>{error}</p>
                  <button onClick={getCurrentLocationWeather} className="btn">
                    <MapPin size={16} />
                    {t.tryAgain}
                  </button>
                </div>
              ) : weather ? (
                <>
                  {/* Weather Icon */}
                  <div className="weather-icon-large-modern">
                    <WeatherIcon size={80} className="weather-icon-main-modern" />
                  </div>
                  
                  {/* Temperature */}
                  <div className="temperature-main-modern">
                    {Math.round(weather.current.temp_c)}
                    <span className="temperature-unit-modern">°{settings.temperatureUnit === 'fahrenheit' ? 'F' : 'C'}</span>
                  </div>
                  
                  {/* Date & Location */}
                  <div className="date-location-modern">
                    <p className="date-text-modern">
                      {getLocalizedDate(new Date(), settings.language)}
                    </p>
                  </div>
                  
                  {/* Weather Description */}
                  <div className="weather-description-modern">
                    <p className="condition-text-modern">
                      {settings.language === 'en'
                        ? (() => {
                            let condition = weather.current.condition.text;
                            const map = {
                              'Lluvia moderada a intervalos': 'Moderate rain at times',
                              'Lluvia ligera': 'Light rain',
                              'Lluvia moderada': 'Moderate rain',
                              'Nublado': 'Cloudy',
                              'Cielo cubierto': 'Overcast',
                              'Despejado': 'Clear',
                              'Soleado': 'Sunny',
                              'Parcialmente nublado': 'Partly cloudy',
                              'Niebla': 'Fog',
                              'Nieve': 'Snow',
                              'Tormenta': 'Thunderstorm',
                              // Agrega más según sea necesario
                            };
                            if (map[condition]) condition = map[condition];
                            return condition;
                          })()
                        : weather.current.condition.text
                      }
                    </p>
                    <p className="feels-like-modern">
                      {t.feelsLike} {formatTemperature(weather.current.feelslike_c)}
                    </p>
                  </div>
                  
                  {/* Location Card */}
                  <div className="location-card-modern">
                    <MapPin size={16} style={{ color: 'white', opacity: 0.7 }} />
                    <span className="location-text-modern">
                      {weather.location.name}, {weather.location.country}
                    </span>
                  </div>
                </>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  textAlign: 'center'
                }}>
                  <p style={{ color: 'white', marginBottom: '1rem' }}>{t.welcomeMessage}</p>
                  <button onClick={getCurrentLocationWeather} className="btn">
                    <MapPin size={16} />
                    {t.getLocationWeather}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Forecast & Details */}
          <div>
            {activeTab === 'today' ? (
              // Today's Content
              <>
                {weather && (
                  <div className="highlights-modern">
                    <h3 className="section-title-modern">{t.todayHighlights}</h3>
                    <div className="highlights-grid-modern">
                      {/* UV Index */}
                      <div className="highlight-card-modern">
                        <div className="highlight-header-modern">
                          <Sun size={16} style={{ color: '#f59e0b' }} />
                          <span className="highlight-label-modern">{t.uvIndex}</span>
                        </div>
                        <div className="highlight-value-modern">
                          {weather.current.uv}
                          <span className="unit-modern">UV</span>
                        </div>
                        <div className="uv-meter-modern">
                          <div 
                            className="uv-bar-modern" 
                            style={{ width: `${(weather.current.uv / 12) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Wind */}
                      <div className="highlight-card-modern">
                        <div className="highlight-header-modern">
                          <Wind size={16} style={{ color: '#3b82f6' }} />
                          <span className="highlight-label-modern">{t.wind}</span>
                        </div>
                        <div className="highlight-value-modern">
                          {Math.round(weather.current.wind_kph)}
                          <span className="unit-modern">km/h</span>
                        </div>
                        <div className="wind-direction-modern">
                          <div className="wind-compass-modern">
                            <div 
                              className="wind-arrow-modern"
                              style={{ transform: `rotate(${weather.current.wind_degree}deg)` }}
                            >
                              ↑
                            </div>
                          </div>
                          <span className="wind-dir-modern">{weather.current.wind_dir}</span>
                        </div>
                      </div>
                      
                      {/* Humidity */}
                      <div className="highlight-card-modern">
                        <div className="highlight-header-modern">
                          <Droplets size={16} style={{ color: '#06b6d4' }} />
                          <span className="highlight-label-modern">{t.humidity}</span>
                        </div>
                        <div className="highlight-value-modern">
                          {weather.current.humidity}
                          <span className="unit-modern">%</span>
                        </div>
                        <div className="status-indicator-modern">
                          {weather.current.humidity > 70 ? t.high : 
                           weather.current.humidity > 40 ? t.normal : t.low}
                        </div>
                      </div>
                      
                      {/* Visibility */}
                      <div className="highlight-card-modern">
                        <div className="highlight-header-modern">
                          <Eye size={16} style={{ color: '#6b7280' }} />
                          <span className="highlight-label-modern">{t.visibility}</span>
                        </div>
                        <div className="highlight-value-modern">
                          {weather.current.vis_km}
                          <span className="unit-modern">km</span>
                        </div>
                        <div className="status-indicator-modern">
                          {weather.current.vis_km > 10 ? t.excellent :
                           weather.current.vis_km > 5 ? t.good : t.poor}
                        </div>
                      </div>
                      
                      {/* Pressure */}
                      <div className="highlight-card-modern">
                        <div className="highlight-header-modern">
                          <Thermometer size={16} style={{ color: '#8b5cf6' }} />
                          <span className="highlight-label-modern">{t.pressure}</span>
                        </div>
                        <div className="highlight-value-modern">
                          {Math.round(weather.current.pressure_mb)}
                          <span className="unit-modern">mb</span>
                        </div>
                      </div>
                      
                      {/* Feels Like */}
                      <div className="highlight-card-modern">
                        <div className="highlight-header-modern">
                          <Thermometer size={16} style={{ color: '#ef4444' }} />
                          <span className="highlight-label-modern">{t.feelsLike}</span>
                        </div>
                        <div className="highlight-value-modern">
                          {Math.round(weather.current.feelslike_c)}
                          <span className="unit-modern">°C</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Motivational Phrase */}
                {settings.showPhrase && currentPhrase && weather && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))',
                      backdropFilter: 'blur(30px)',
                      border: '1px solid rgba(147, 51, 234, 0.3)',
                      borderRadius: '20px',
                      padding: '1.5rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      boxShadow: 'var(--shadow-glass)',
                      marginTop: '1.5rem'
                    }}
                  >
                    <div>
                      <Sun size={24} style={{ color: '#fbbf24' }} />
                    </div>
                    <p style={{
                      color: 'white',
                      fontSize: '1.1rem',
                      fontStyle: 'italic',
                      lineHeight: 1.5
                    }}>
                      "{currentPhrase}"
                    </p>
                  </motion.div>
                )}
              </>
            ) : (
              // Week's Content
              <WeeklyForecastWithLunar 
                forecast={forecast} 
                temperatureUnit={settings.temperatureUnit}
                language={settings.language}
                location={city || settings.location || ''}
              />
            )}
          </div>          {/* Map Column */}
          <div>
            <WeatherMap weather={weather} />
          </div>
        </main>
      </div>
      
      <ModernSettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={updateSettings}
      />
    </div>
  )
}

export default App
