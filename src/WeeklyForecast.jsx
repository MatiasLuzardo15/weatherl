import React, { useState } from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudDrizzle,
  CloudLightning,
  Droplets,
  Wind,
  Eye,
  Thermometer
} from 'lucide-react';
import { LANGUAGES } from './languages';
import WeeklyDayDetail from './WeeklyDayDetail';
import SunMoonTimesCard from './SunMoonTimesCard';
import LunarPhaseCard from './LunarPhaseCard';
import LunarPhaseDetail from './LunarPhaseDetail';

const WeeklyForecast = ({ forecast, temperatureUnit = 'celsius', language = 'es', location }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedLunarPhase, setSelectedLunarPhase] = useState(null);

  if (!forecast) return null;

  // Get current language texts
  const t = LANGUAGES[language] || LANGUAGES['es'];

  const getWeatherIcon = (condition, size = 32) => {
    const conditionLower = condition?.toLowerCase() || '';
    
    if (conditionLower.includes('lluvia') || conditionLower.includes('rain')) {
      return <CloudRain size={size} className="weekly-weather-icon" />;
    } else if (conditionLower.includes('nieve') || conditionLower.includes('snow')) {
      return <CloudSnow size={size} className="weekly-weather-icon" />;
    } else if (conditionLower.includes('tormenta') || conditionLower.includes('thunder')) {
      return <CloudLightning size={size} className="weekly-weather-icon" />;
    } else if (conditionLower.includes('llovizna') || conditionLower.includes('drizzle')) {
      return <CloudDrizzle size={size} className="weekly-weather-icon" />;
    } else if (conditionLower.includes('nube') || conditionLower.includes('cloud') || conditionLower.includes('nublado')) {
      return <Cloud size={size} className="weekly-weather-icon" />;
    } else if (conditionLower.includes('despejado') || conditionLower.includes('soleado') || conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return <Sun size={size} className="weekly-weather-icon" />;
    }
    return <Cloud size={size} className="weekly-weather-icon" />;
  };

  const formatTemperature = (temp) => {
    if (temperatureUnit === 'fahrenheit') {
      return `${Math.round((temp * 9/5) + 32)}°F`;
    }
    return `${Math.round(temp)}°C`;
  };

  const formatDate = (dateString, isToday = false) => {
    const date = new Date(dateString);
    if (isToday) return t.today || 'Today';
    
    const dayIndex = date.getDay();
    return t.days?.short[dayIndex] || date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getTemperatureRange = (minTemp, maxTemp, globalMin, globalMax) => {
    const range = globalMax - globalMin;
    const leftPercent = ((minTemp - globalMin) / range) * 100;
    const widthPercent = ((maxTemp - minTemp) / range) * 100;
    
    return { left: `${leftPercent}%`, width: `${widthPercent}%` };
  };

  // Calculate global temperature range for the week
  const allTemps = forecast.forecast.forecastday.flatMap(day => [day.day.mintemp_c, day.day.maxtemp_c]);
  const globalMin = Math.min(...allTemps);
  const globalMax = Math.max(...allTemps);

  // Calculate weekly averages
  const weeklyAvg = {
    humidity: Math.round(forecast.forecast.forecastday.reduce((sum, day) => sum + day.day.avghumidity, 0) / forecast.forecast.forecastday.length),
    wind: Math.round(forecast.forecast.forecastday.reduce((sum, day) => sum + day.day.maxwind_kph, 0) / forecast.forecast.forecastday.length),
    visibility: Math.round(forecast.forecast.forecastday.reduce((sum, day) => sum + day.day.avgvis_km, 0) / forecast.forecast.forecastday.length),
    uv: Math.round(forecast.forecast.forecastday.reduce((sum, day) => sum + day.day.uv, 0) / forecast.forecast.forecastday.length)
  };

  return (
    <div>
      <div className="weekly-forecast-modern">
        <h3 className="weekly-title-modern">{t.weeklyForecast}</h3>
        
        <div className="weekly-forecast-grid">
          {forecast.forecast.forecastday.map((day) => {
            // Corregir el marcado de "Hoy" comparando fechas
            const today = new Date();
            const dayDate = new Date(day.date);
            const isToday = today.getFullYear() === dayDate.getFullYear() &&
                            today.getMonth() === dayDate.getMonth() &&
                            today.getDate() === dayDate.getDate();
            const tempRange = getTemperatureRange(
              day.day.mintemp_c, 
              day.day.maxtemp_c, 
              globalMin, 
              globalMax
            );

            return (
              <div 
                key={day.date} 
                className={`weekly-day-card${isToday ? ' today' : ''}`}
                onClick={() => setSelectedDay(day)}
                style={{ cursor: 'pointer' }}
              >
                <div className="weekly-day-header">
                  <div className="weekly-day-name">
                    {formatDate(day.date, isToday)}
                  </div>
                  <div className="weekly-day-date">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>

                <div className="weekly-day-content">
                  <div className="weekly-weather-icon">
                    {getWeatherIcon(day.day.condition.text, 18)}
                  </div>
                  
                  <div className="weekly-temps">
                    <div className="weekly-temp-high">
                      {formatTemperature(day.day.maxtemp_c)}
                    </div>
                    <div className="weekly-temp-low">
                      {formatTemperature(day.day.mintemp_c)}
                    </div>
                    <div className="weekly-temp-range">
                      <div 
                        className="weekly-temp-bar"
                        style={tempRange}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Statistics */}

      <div className="weekly-forecast-modern">
        <h3 className="weekly-title-modern">{t.weeklyAverages}</h3>
        <div className="weekly-stats-grid">
          <div className="weekly-stat-card">
            <Droplets size={14} className="weekly-stat-icon" />
            <div className="weekly-stat-label">Humidity</div>
            <div className="weekly-stat-value">{weeklyAvg.humidity}%</div>
          </div>
          <div className="weekly-stat-card">
            <Wind size={14} className="weekly-stat-icon" />
            <div className="weekly-stat-label">Wind</div>
            <div className="weekly-stat-value">{weeklyAvg.wind} km/h</div>
          </div>
          <div className="weekly-stat-card">
            <Eye size={14} className="weekly-stat-icon" />
            <div className="weekly-stat-label">Visibility</div>
            <div className="weekly-stat-value">{weeklyAvg.visibility} km</div>
          </div>
          <div className="weekly-stat-card">
            <Sun size={14} className="weekly-stat-icon" />
            <div className="weekly-stat-label">UV Index</div>
            <div className="weekly-stat-value">{weeklyAvg.uv}</div>
          </div>
        </div>
      </div>

      {/* Tarjeta sol y luna separada con animación de resplandor */}
      <div style={{ margin: '2.5rem auto 0 auto', maxWidth: 480 }}>
        <SunMoonTimesCard astro={forecast.forecast.forecastday[0].astro} t={t} language={language} />
      </div>

      <WeeklyDayDetail day={selectedDay} onClose={() => setSelectedDay(null)} />
      <LunarPhaseDetail astro={selectedLunarPhase} t={t} language={language} onClose={() => setSelectedLunarPhase(null)} />
    </div>
  );
};

export default WeeklyForecast;
