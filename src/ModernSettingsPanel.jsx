import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Settings, 
  Thermometer, 
  Clock, 
  MapPin, 
  Sparkles, 
  Palette,
  Bell,
  Globe
} from 'lucide-react';
import { LANGUAGES } from './languages';
import WeatherLLogo from './img/Weatherl.svg.svg';

const ModernSettingsPanel = ({ isOpen, onClose, settings, onSettingsChange }) => {
  // Get current language texts
  const t = LANGUAGES[settings.language] || LANGUAGES['es'];
  
  const toggleSetting = (key, value = null) => {
    if (value !== null) {
      onSettingsChange({ ...settings, [key]: value });
    } else {
      onSettingsChange({ ...settings, [key]: !settings[key] });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            className="settings-overlay-modern"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Settings Panel */}
          <motion.div
            className="settings-panel-modern settings-panel-fullscreen"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="settings-content-modern">
              {/* Header */}
              <div className="settings-header-modern">
                <h2 className="settings-title-modern">Settings</h2>
                <button 
                  onClick={onClose}
                  className="settings-close-btn-modern"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Language Settings */}
              <div className="settings-section-modern">
                <div className="settings-section-title-modern">
                  <Globe size={20} style={{ color: '#06b6d4' }} />
                  {t.language}
                </div>
                <div className="settings-item-modern">
                  <div className="settings-item-content-modern">
                    <div className="settings-item-label-modern">{t.language}</div>
                    <div className="settings-item-description-modern">
                      {t.languageDescription || 'Elige tu idioma preferido'}
                    </div>
                  </div>
                  <div className="settings-button-group-modern">
                    <button 
                      className={`settings-option-btn-modern ${settings.language === 'es' ? 'active' : ''}`}
                      onClick={() => toggleSetting('language', 'es')}
                    >
                      ES
                    </button>
                    <button 
                      className={`settings-option-btn-modern ${settings.language === 'en' ? 'active' : ''}`}
                      onClick={() => toggleSetting('language', 'en')}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>

              {/* Temperature Settings */}
              <div className="settings-section-modern">
                <div className="settings-section-title-modern">
                  <Thermometer size={20} style={{ color: '#ef4444' }} />
                  {t.temperature}
                </div>
                <div className="settings-item-modern">
                  <div className="settings-item-content-modern">
                    <div className="settings-item-label-modern">{t.unit || 'Unidad'}</div>
                    <div className="settings-item-description-modern">
                      {t.unitDescription || 'Elige la unidad de temperatura'}
                    </div>
                  </div>
                  <div className="settings-button-group-modern">
                    <button 
                      className={`settings-option-btn-modern ${settings.temperatureUnit === 'celsius' ? 'active' : ''}`}
                      onClick={() => toggleSetting('temperatureUnit', 'celsius')}
                    >
                      °C
                    </button>
                    <button 
                      className={`settings-option-btn-modern ${settings.temperatureUnit === 'fahrenheit' ? 'active' : ''}`}
                      onClick={() => toggleSetting('temperatureUnit', 'fahrenheit')}
                    >
                      °F
                    </button>
                  </div>
                </div>
              </div>

              {/* Time Settings */}
              <div className="settings-section-modern">
                <div className="settings-section-title-modern">
                  <Clock size={20} style={{ color: '#06b6d4' }} />
                  {t.timeFormat}
                </div>
                <div className="settings-item-modern">
                  <div className="settings-item-content-modern">
                    <div className="settings-item-label-modern">{t.timeFormat}</div>
                    <div className="settings-item-description-modern">
                      {t.timeFormatDescription || 'Elige el formato de hora'}
                    </div>
                  </div>
                  <div className="settings-button-group-modern">
                    <button 
                      className={`settings-option-btn-modern ${settings.timeFormat === '12h' ? 'active' : ''}`}
                      onClick={() => toggleSetting('timeFormat', '12h')}
                    >
                      12h
                    </button>
                    <button 
                      className={`settings-option-btn-modern ${settings.timeFormat === '24h' ? 'active' : ''}`}
                      onClick={() => toggleSetting('timeFormat', '24h')}
                    >
                      24h
                    </button>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="settings-section-modern">
                <div className="settings-section-title-modern">
                  <Sparkles size={20} style={{ color: '#8b5cf6' }} />
                  {t.features}
                </div>
                <div className="settings-item-modern">
                  <div className="settings-item-content-modern">
                    <div className="settings-item-label-modern">{t.showPhrase}</div>
                    <div className="settings-item-description-modern">
                      {t.showPhraseDescription || 'Mostrar frases motivacionales según el clima'}
                    </div>
                  </div>
                  <div 
                    className={`settings-toggle-modern ${settings.showPhrase ? 'active' : ''}`}
                    onClick={() => toggleSetting('showPhrase')}
                  >
                    <div className="settings-toggle-knob-modern"></div>
                  </div>
                </div>
                <div className="settings-item-modern">
                  <div className="settings-item-content-modern">
                    <div className="settings-item-label-modern">{t.autoLocation}</div>
                    <div className="settings-item-description-modern">
                      {t.autoLocationDescription || 'Detectar ubicación automáticamente'}
                    </div>
                  </div>
                  <div 
                    className={`settings-toggle-modern ${settings.autoLocation ? 'active' : ''}`}
                    onClick={() => toggleSetting('autoLocation')}
                  >
                    <div className="settings-toggle-knob-modern"></div>
                  </div>
                </div>
              </div>

              {/* Theme Settings */}
              <div className="settings-section-modern">
                <div className="settings-section-title-modern">
                  <Palette size={20} style={{ color: '#f59e0b' }} />
                  {t.dynamicThemes || 'Temas dinámicos'}
                </div>
                <div style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ color: 'white', fontWeight: 500, marginBottom: '0.5rem' }}>
                    🌤️ Weather-Based Themes
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem', lineHeight: 1.4 }}>
                    {t.dynamicThemesDescription || 'La app cambia los colores según el clima actual: ☀️ Soleado, ⛅ Nublado, 🌧️ Lluvia, 🌙 Noche, ❄️ Nieve, ⛈️ Tormenta'}
                  </div>
                </div>
              </div>

              {/* App Info */}
              <div className="settings-section-modern">
                <div style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <img 
                      src={WeatherLLogo} 
                      alt="WeatherL" 
                      style={{ 
                        height: '32px',
                        width: 'auto',
                        filter: 'brightness(0) invert(1)'
                      }} 
                    />
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
                    Beautiful weather app with Apple-style animations
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    Version 2.0
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.7rem', marginTop: '0.25rem', fontStyle: 'italic' }}>
                    --By Matias Luzardo 👨‍💻
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModernSettingsPanel;
