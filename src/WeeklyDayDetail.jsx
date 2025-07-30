import React from 'react';
import { Sun, CloudRain, CloudSnow, CloudDrizzle, CloudLightning, Cloud, Wind, Droplets, Eye, Thermometer } from 'lucide-react';

const getWeatherIcon = (condition, size = 38) => {
  const conditionLower = condition?.toLowerCase() || '';
  if (conditionLower.includes('lluvia') || conditionLower.includes('rain')) {
    return <CloudRain size={size} />;
  } else if (conditionLower.includes('nieve') || conditionLower.includes('snow')) {
    return <CloudSnow size={size} />;
  } else if (conditionLower.includes('tormenta') || conditionLower.includes('thunder')) {
    return <CloudLightning size={size} />;
  } else if (conditionLower.includes('llovizna') || conditionLower.includes('drizzle')) {
    return <CloudDrizzle size={size} />;
  } else if (conditionLower.includes('nube') || conditionLower.includes('cloud') || conditionLower.includes('nublado')) {
    return <Cloud size={size} />;
  } else if (conditionLower.includes('despejado') || conditionLower.includes('soleado') || conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return <Sun size={size} />;
  }
  return <Cloud size={size} />;
};

const getRecommendation = (condition) => {
  const c = condition?.toLowerCase() || '';
  if (c.includes('lluvia') || c.includes('rain')) {
    return 'Lleva paraguas y usa calzado impermeable.';
  } else if (c.includes('nieve') || c.includes('snow')) {
    return 'Abrígate bien y ten precaución al conducir.';
  } else if (c.includes('tormenta') || c.includes('thunder')) {
    return 'Evita actividades al aire libre y mantente seguro.';
  } else if (c.includes('llovizna') || c.includes('drizzle')) {
    return 'Una campera ligera o paraguas será útil.';
  } else if (c.includes('nube') || c.includes('cloud') || c.includes('nublado')) {
    return 'Día nublado, ideal para actividades tranquilas.';
  } else if (c.includes('despejado') || c.includes('soleado') || c.includes('clear') || c.includes('sunny')) {
    return 'Día despejado, ideal para salir a caminar o disfrutar actividades al aire libre.';
  }
  return 'Consulta el pronóstico antes de salir.';
};

const WeeklyDayDetail = ({ day, onClose }) => {
  if (!day) return null;
  const { date, day: info } = day;
  return (
    <div className="weekly-detail-modal-bg" onClick={onClose}>
      <div className="weekly-detail-modal" onClick={e => e.stopPropagation()}>
        <button className="weekly-detail-close" onClick={onClose}>×</button>
        <div className="weekly-detail-header">
          {getWeatherIcon(info.condition.text)}
          <div className="weekly-detail-date">{new Date(date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
          <div className="weekly-detail-condition">{info.condition.text}</div>
        </div>
        <div className="weekly-detail-temps">
          <span className="weekly-detail-temp-high">{Math.round(info.maxtemp_c)}°C</span>
          <span className="weekly-detail-temp-low">{Math.round(info.mintemp_c)}°C</span>
        </div>
        <div className="weekly-detail-stats">
          <div><Thermometer size={18}/> Sensación: {Math.round(info.avgtemp_c)}°C</div>
          <div><Droplets size={18}/> Humedad: {info.avghumidity}%</div>
          <div><Wind size={18}/> Viento: {Math.round(info.maxwind_kph)} km/h</div>
          <div><Eye size={18}/> Visibilidad: {info.avgvis_km} km</div>
          <div><Sun size={18}/> UV: {info.uv}</div>
        </div>
        <div style={{marginTop: '1.3rem', textAlign: 'center', fontSize: '1.08rem', color: '#ffe7a0', fontWeight: 500}}>
          {getRecommendation(info.condition.text)}
        </div>
      </div>
    </div>
  );
};

export default WeeklyDayDetail;
