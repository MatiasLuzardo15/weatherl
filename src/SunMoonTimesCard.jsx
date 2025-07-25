import React from 'react';
import { Sun, Moon } from 'lucide-react';

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

const SunMoonTimesCard = ({ astro, t, language = 'es' }) => {
  if (!astro) return null;
  const phaseName = getLunarPhaseName(astro.moon_phase, t, language);
  return (
    <div className="sun-moon-glow" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2rem',
      background: 'rgba(35,36,58,0.55)',
      borderRadius: '1.5rem',
      boxShadow: '0 4px 32px 0 #0002',
      padding: '1.5rem 1.3rem',
      maxWidth: 420,
      margin: 'auto',
      color: '#fff',
      border: '1.5px solid #2d2e4a',
      backdropFilter: 'blur(12px)',
    }}>
      {/* Sol */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        background: 'rgba(255,255,255,0.07)',
        borderRadius: '1rem',
        padding: '1rem',
        boxShadow: '0 2px 12px 0 #ffd70011',
      }}>
        <Sun size={32} style={{ color: '#ffe066', opacity: 0.7 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '1.08rem', color: '#ffe066', opacity: 0.8 }}>{t.sun || (language === 'en' ? 'Sun' : 'Sol')}</div>
          <div style={{ display: 'flex', gap: '1.2rem', marginTop: 4 }}>
            <div>
              <div style={{ fontSize: 13, color: '#fff8' }}>{t.sunrise || (language === 'en' ? 'Sunrise' : 'Salida')}</div>
              <div style={{ fontSize: 17, fontWeight: 500 }}>{astro.sunrise || '-'}</div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#fff8' }}>{t.sunset || (language === 'en' ? 'Sunset' : 'Puesta')}</div>
              <div style={{ fontSize: 17, fontWeight: 500 }}>{astro.sunset || '-'}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Luna */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        background: 'rgba(255,255,255,0.07)',
        borderRadius: '1rem',
        padding: '1rem',
        boxShadow: '0 2px 12px 0 #7db7ff11',
      }}>
        <Moon size={32} style={{ color: '#7db7ff', opacity: 0.7 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '1.08rem', color: '#7db7ff', opacity: 0.8 }}>{t.moon || (language === 'en' ? 'Moon' : 'Luna')}</div>
          <div style={{ display: 'flex', gap: '1.2rem', marginTop: 4 }}>
            <div>
              <div style={{ fontSize: 13, color: '#fff8' }}>{t.moonrise || (language === 'en' ? 'Moonrise' : 'Salida')}</div>
              <div style={{ fontSize: 17, fontWeight: 500 }}>{astro.moonrise || '-'}</div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#fff8' }}>{t.moonset || (language === 'en' ? 'Moonset' : 'Puesta')}</div>
              <div style={{ fontSize: 17, fontWeight: 500 }}>{astro.moonset || '-'}</div>
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 14, color: '#fff' }}>
            <span style={{ fontWeight: 500 }}>{t.lunarPhase || (language === 'en' ? 'Lunar phase' : 'Fase lunar')}:</span> {phaseName}
            <span style={{ marginLeft: 10, color: '#ffe7a0' }}>{t.lunarIllumination || (language === 'en' ? 'Illumination' : 'Iluminación')}: {astro.moon_illumination}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunMoonTimesCard;
