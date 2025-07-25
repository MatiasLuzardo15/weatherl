import React from 'react';
import { Moon } from 'lucide-react';

const getLunarPhaseName = (phase, t, language) => {
  // Si el idioma es inglés, mostrar la descripción original
  if (language === 'en') return typeof phase === 'string' ? phase : '';
  // Si es español, traducir
  if (typeof phase === 'string') {
    // Traducción básica de las fases más comunes
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
  if (phase === 0) return t.lunarNew;
  if (phase < 0.25) return t.lunarWaxingCrescent;
  if (phase === 0.25) return t.lunarFirstQuarter;
  if (phase < 0.5) return t.lunarWaxingGibbous;
  if (phase === 0.5) return t.lunarFull;
  if (phase < 0.75) return t.lunarWaningGibbous;
  if (phase === 0.75) return t.lunarLastQuarter;
  return t.lunarWaningCrescent;
};

const LunarPhaseCard = ({ astro, t, language = 'es' }) => {
  if (!astro) return null;
  const phaseName = getLunarPhaseName(astro.moon_phase, t, language);
  return (
    <div className="highlight-card-modern lunar-phase-card">
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
    </div>
  );
};

export default LunarPhaseCard;
