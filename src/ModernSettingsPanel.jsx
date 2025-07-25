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
            className="settings-panel-modern"
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
                    <div className="settings-item-label-modern">Language</div>
                    <div className="settings-item-description-modern">
                      Choose your preferred language
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
                    <div className="settings-item-label-modern">Unit</div>
                    <div className="settings-item-description-modern">
                      Choose temperature unit
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
                  Time Format
                </div>
                
                <div className="settings-item-modern">
                  <div className="settings-item-content-modern">
                    <div className="settings-item-label-modern">Format</div>
                    <div className="settings-item-description-modern">
                      Choose time format
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
                  Features
                </div>
                
                <div className="settings-item-modern">
                  <div className="settings-item-content-modern">
                    <div className="settings-item-label-modern">Motivational Phrases</div>
                    <div className="settings-item-description-modern">
                      Show weather-based motivational quotes
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
                    <div className="settings-item-label-modern">Auto Location</div>
                    <div className="settings-item-description-modern">
                      Automatically detect your location
                    </div>
                  </div>
                  <div 
                    className={`settings-toggle-modern ${settings.autoLocation ? 'active' : ''}`}
                    onClick={() => toggleSetting('autoLocation')}
                  >
                    <div className="settings-toggle-knob-modern"></div>
                  </div>
                </div>

                <div className="settings-item-modern">
                  <div className="settings-item-content-modern">
                    <div className="settings-item-label-modern">Notifications</div>
                    <div className="settings-item-description-modern">
                      Enable weather notifications
                    </div>
                  </div>
                  <div 
                    className={`settings-toggle-modern ${settings.showNotifications ? 'active' : ''}`}
                    onClick={() => toggleSetting('showNotifications')}
                  >
                    <div className="settings-toggle-knob-modern"></div>
                  </div>
                </div>
              </div>

              {/* Theme Settings */}
              <div className="settings-section-modern">
                <div className="settings-section-title-modern">
                  <Palette size={20} style={{ color: '#f59e0b' }} />
                  Dynamic Themes
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
                    The app automatically changes colors based on current weather conditions:
                    ☀️ Sunny, ⛅ Cloudy, 🌧️ Rainy, 🌙 Night, ❄️ Snow, ⛈️ Storm
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
