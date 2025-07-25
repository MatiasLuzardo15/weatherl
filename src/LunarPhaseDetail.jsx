import React from 'react';
import { Moon } from 'lucide-react';

const getLunarPhaseName = (phase, t, language) => {
  if (language === 'en') return typeof phase === 'string' ? phase : '';
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
  if (phase === 0) return t.lunarNew;
  if (phase < 0.25) return t.lunarWaxingCrescent;
  if (phase === 0.25) return t.lunarFirstQuarter;
  if (phase < 0.5) return t.lunarWaxingGibbous;
  if (phase === 0.5) return t.lunarFull;
  if (phase < 0.75) return t.lunarWaningGibbous;
  if (phase === 0.75) return t.lunarLastQuarter;
  return t.lunarWaningCrescent;
};

const LunarPhaseDetail = ({ astro, t, language = 'es', onClose }) => {
  if (!astro) return null;
  const phaseName = getLunarPhaseName(astro.moon_phase, t, language);
  const extraData = [
    astro.moonrise && { label: t.moonrise || 'Salida de la luna', value: astro.moonrise },
    astro.moonset && { label: t.moonset || 'Puesta de la luna', value: astro.moonset },
    astro.sunrise && { label: t.sunrise || 'Salida del sol', value: astro.sunrise },
    astro.sunset && { label: t.sunset || 'Puesta del sol', value: astro.sunset },
    astro.moon_distance && { label: t.moonDistance || 'Distancia lunar', value: astro.moon_distance + ' km' },
    astro.moon_age && { label: t.moonAge || 'Edad lunar', value: astro.moon_age + ' días' },
  ].filter(Boolean);

  return (
    <div className="weekly-detail-modal-bg" onClick={onClose}>
      <div className="weekly-detail-modal" onClick={e => e.stopPropagation()}>
        <button className="weekly-detail-close" onClick={onClose}>×</button>
        <div className="weekly-detail-header">
          <Moon size={38} style={{ color: '#fbbf24' }} />
          <div className="weekly-detail-date">{t.lunarPhase || 'Fase lunar'}</div>
          <div className="weekly-detail-condition">{phaseName}</div>
        </div>
        <div className="weekly-detail-temps">
          <span className="weekly-detail-temp-high">{t.lunarIllumination || 'Iluminación'}: {astro.moon_illumination}%</span>
        </div>
        <div className="weekly-detail-stats">
          {extraData.length > 0 ? (
            extraData.map((item, i) => (
              <div key={i}>{item.label}: {item.value}</div>
            ))
          ) : (
            <div>{t.noExtraLunarData || 'Sin datos adicionales.'}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LunarPhaseDetail;
