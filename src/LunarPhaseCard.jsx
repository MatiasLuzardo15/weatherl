import React from 'react';
import './lunar-phase-card.css';
import { Moon } from 'lucide-react';
import { useLunarApi } from './useLunarApi';

const getLunarPhaseName = (phase, t = {}, language) => {
  if (!t) t = {};
  // Si el idioma es inglés, mostrar la descripción original
  if (language === 'en') return typeof phase === 'string' ? phase : '';
  // Si es español, traducir
  if (typeof phase === 'string') {
    const map = {
      'New Moon': t.lunarNew || 'Luna nueva',
      'Waxing Crescent': t.lunarWaxingCrescent || 'Creciente visible',
      'First Quarter': t.lunarFirstQuarter || 'Cuarto creciente',
      'Waxing Gibbous': t.lunarWaxingGibbous || 'Gibosa creciente',
      'Full Moon': t.lunarFull || 'Luna llena',
      'Waning Gibbous': t.lunarWaningGibbous || 'Gibosa menguante',
      'Last Quarter': t.lunarLastQuarter || 'Cuarto menguante',
      'Waning Crescent': t.lunarWaningCrescent || 'Creciente menguante',
    };
    return map[phase] || phase;
  }
  // Si es numérico, usar el mapeo clásico
  if (phase === 0) return t.lunarNew || '';
  if (phase < 0.25) return t.lunarWaxingCrescent || '';
  if (phase === 0.25) return t.lunarFirstQuarter || '';
  if (phase < 0.5) return t.lunarWaxingGibbous || '';
  if (phase === 0.5) return t.lunarFull || '';
  if (phase < 0.75) return t.lunarWaningGibbous || '';
  if (phase === 0.75) return t.lunarLastQuarter || '';
  return t.lunarWaningCrescent || '';
};

const API_KEY = '3ad81db2392a497e8d8de35562fb2929'; // <-- API key proporcionada

const LunarPhaseCard = ({ astro, t = {}, language = 'es', location = 'New York, US', elevation = 10 }) => {
  const [expanded, setExpanded] = React.useState(false);
  // Solo consulta la API si está expandido
  const { data: apiData, loading, error } = useLunarApi({
    location,
    elevation,
    apiKey: API_KEY,
    enabled: expanded
  });
  if (!astro) return null;
  const phaseName = getLunarPhaseName(astro.moon_phase, t, language);
  return (
    <div
      className={"highlight-card-modern lunar-phase-card lunar-phase-bg" + (expanded ? " expanded" : "")}
      tabIndex={0}
      style={{
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        maxWidth: 480,
        margin: 'auto',
      }}
      onClick={() => setExpanded(e => !e)}
      onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') setExpanded(v => !v); }}
      aria-expanded={expanded}
      title={expanded ? (t.collapseDetails || 'Ocultar detalles') : (t.expandDetails || 'Ver más detalles')}
    >
      <div className="highlight-header-modern">
        <Moon size={16} style={{ color: '#fbbf24' }} />
        <span className="highlight-label-modern">{t.lunarPhase || 'Fase lunar'}</span>
      </div>
      <div className="highlight-value-modern" style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
        {phaseName}
      </div>
      <div style={{ fontSize: '0.95rem', color: '#ffe7a0', marginTop: '0.3rem' }}>
        {t.lunarIllumination || 'Iluminación'}: {astro.moon_illumination}%
      </div>
      {/* Datos técnicos solo al expandir */}
      {expanded && (
        <div style={{ marginTop: '0.7rem', fontSize: '0.97rem', color: '#f1c27d', textAlign: 'left' }}>
          {loading && <div>Cargando datos técnicos...</div>}
          {error && <div>Error al cargar datos técnicos.</div>}
          {apiData && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>Edad lunar: {apiData.moon_age} días</li>
              <li>Distancia a la Tierra: {apiData.moon_distance} km</li>
              <li>Ángulo: {apiData.moon_altitude}°</li>
              <li>Ascensión recta: {apiData.moon_right_ascension}°</li>
              <li>Declinación: {apiData.moon_declination}°</li>
              <li>Fase: {apiData.moon_phase}</li>
              <li>Iluminación: {apiData.moon_illumination}%</li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LunarPhaseCard;
