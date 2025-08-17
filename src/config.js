// Configuración de la aplicación del clima
export const WEATHER_API_CONFIG = {
  // La API key se obtiene de la variable de entorno o usa un placeholder
  // Obtén tu API key gratuita en: https://www.weatherapi.com/
  API_KEY: import.meta.env.VITE_WEATHER_API_KEY || 'fd206ef80156436d9f423642251708',
  BASE_URL: 'https://api.weatherapi.com/v1',
  DEFAULT_CITY: 'Montevideo'
}
