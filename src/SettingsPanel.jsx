import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings, 
  X, 
  Sun, 
  Moon, 
  Thermometer, 
  Clock, 
  MapPin, 
  Sparkles, 
  Palette,
  Globe,
  RefreshCw
} from 'lucide-react'

const SettingsPanel = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    onSettingsChange(newSettings)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Panel de configuración */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white-20 backdrop-blur-lg z-50 overflow-y-auto border-l border-white-20"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white-20">
              <div className="flex items-center">
                <Settings className="w-6 h-6 text-white mr-3" />
                <h2 className="text-xl font-semibold text-white">Configuración</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white-20 hover:bg-white-30 transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Contenido de configuración */}
            <div className="p-6 space-y-6">
              
              {/* Frases motivacionales */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 text-white-70 mr-2" />
                  <h3 className="text-white font-medium">Frases Motivacionales</h3>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showPhrase}
                    onChange={(e) => handleSettingChange('showPhrase', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.showPhrase ? 'bg-blue-500' : 'bg-white-30'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.showPhrase ? 'transform translate-x-6' : ''
                    }`} />
                  </div>
                  <span className="ml-3 text-white-80">Mostrar frases según el clima</span>
                </label>
              </div>

              {/* Unidad de temperatura */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Thermometer className="w-5 h-5 text-white-70 mr-2" />
                  <h3 className="text-white font-medium">Temperatura</h3>
                </div>
                <div className="flex space-x-2">
                  {[
                    { value: 'celsius', label: '°C' },
                    { value: 'fahrenheit', label: '°F' }
                  ].map((unit) => (
                    <button
                      key={unit.value}
                      onClick={() => handleSettingChange('temperatureUnit', unit.value)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                        settings.temperatureUnit === unit.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-white-20 text-white-80 hover:bg-white-30'
                      }`}
                    >
                      {unit.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Formato de hora */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-white-70 mr-2" />
                  <h3 className="text-white font-medium">Formato de Hora</h3>
                </div>
                <div className="flex space-x-2">
                  {[
                    { value: '12h', label: '12h' },
                    { value: '24h', label: '24h' }
                  ].map((format) => (
                    <button
                      key={format.value}
                      onClick={() => handleSettingChange('timeFormat', format.value)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                        settings.timeFormat === format.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-white-20 text-white-80 hover:bg-white-30'
                      }`}
                    >
                      {format.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ubicación automática */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-white-70 mr-2" />
                  <h3 className="text-white font-medium">Ubicación</h3>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoLocation}
                    onChange={(e) => handleSettingChange('autoLocation', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.autoLocation ? 'bg-blue-500' : 'bg-white-30'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.autoLocation ? 'transform translate-x-6' : ''
                    }`} />
                  </div>
                  <span className="ml-3 text-white-80">Detectar ubicación automáticamente</span>
                </label>
              </div>

              {/* Animaciones */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 text-white-70 mr-2" />
                  <h3 className="text-white font-medium">Animaciones</h3>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showAnimation}
                    onChange={(e) => handleSettingChange('showAnimation', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.showAnimation ? 'bg-blue-500' : 'bg-white-30'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.showAnimation ? 'transform translate-x-6' : ''
                    }`} />
                  </div>
                  <span className="ml-3 text-white-80">Habilitar animaciones</span>
                </label>
              </div>

              {/* Tema */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Palette className="w-5 h-5 text-white-70 mr-2" />
                  <h3 className="text-white font-medium">Tema</h3>
                </div>
                <div className="flex space-x-2">
                  {[
                    { value: 'auto', label: 'Auto', icon: Sun },
                    { value: 'light', label: 'Claro', icon: Sun },
                    { value: 'dark', label: 'Oscuro', icon: Moon }
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => handleSettingChange('theme', theme.value)}
                      className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center ${
                        settings.theme === theme.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-white-20 text-white-80 hover:bg-white-30'
                      }`}
                    >
                      <theme.icon className="w-4 h-4 mr-1" />
                      <span className="text-xs">{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actualización automática */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <RefreshCw className="w-5 h-5 text-white-70 mr-2" />
                  <h3 className="text-white font-medium">Actualización</h3>
                </div>
                <select
                  value={settings.refreshInterval}
                  onChange={(e) => handleSettingChange('refreshInterval', parseInt(e.target.value))}
                  className="w-full p-3 rounded-lg bg-white-20 text-white border border-white-30 focus:border-white-50 focus:outline-none"
                >
                  <option value={5}>Cada 5 minutos</option>
                  <option value={10}>Cada 10 minutos</option>
                  <option value={15}>Cada 15 minutos</option>
                  <option value={30}>Cada 30 minutos</option>
                  <option value={60}>Cada hora</option>
                </select>
              </div>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white-20">
              <p className="text-white-70 text-sm text-center">
                🌤️ Weather App v1.0
              </p>
              <p className="text-white-60 text-xs text-center mt-1">
                Hecho con ❤️ y React
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SettingsPanel
