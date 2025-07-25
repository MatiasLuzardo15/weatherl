// Configuración de la aplicación del clima
export const WEATHER_API_CONFIG = {
  // La API key se obtiene de la variable de entorno o usa un placeholder
  // Obtén tu API key gratuita en: https://www.weatherapi.com/
  API_KEY: import.meta.env.VITE_WEATHER_API_KEY || '528f46b8804049b9a89222651252407',
  BASE_URL: 'https://api.weatherapi.com/v1',
  DEFAULT_CITY: 'Madrid'
}
