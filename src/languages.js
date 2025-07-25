// Language configurations for the weather app
export const LANGUAGES = {
  es: {
    // Header
    searchPlaceholder: "Buscar ciudad...",
    today: "Hoy",
    week: "Semana",
    
    // Main weather card
    feelsLike: "Sensación térmica",
    welcomeMessage: "Bienvenido a WeatherL",
    getLocationWeather: "Obtener clima de mi ubicación",
    loadingWeather: "Cargando datos del clima...",
    tryAgain: "Intentar de nuevo",
    locationError: "No se pudo obtener la ubicación",
    connectionError: "Error de conexión. Verifique su internet.",
    cityNotFound: "Ciudad no encontrada",
    
    // Highlights
    todayHighlights: "Destacados de Hoy",
    uvIndex: "Índice UV",
    wind: "Viento",
    humidity: "Humedad",
    visibility: "Visibilidad",
    pressure: "Presión",
    
    // Status indicators
    high: "Alto",
    normal: "Normal",
    low: "Bajo",
    excellent: "Excelente",
    good: "Bueno",
    poor: "Pobre",
    
    // Weekly forecast
    weeklyForecast: "Pronóstico de 7 Días",
    weeklyAverages: "Promedios Semanales",
    
    // Settings
    settings: "Configuraciones",
    temperature: "Temperatura",
    timeFormat: "Formato de Hora",
    features: "Características",
    dynamicThemes: "Temas Dinámicos",
    showPhrase: "Mostrar Frases",
    autoLocation: "Ubicación Automática",
    language: "Idioma",
    spanish: "Español",
    english: "Inglés",
    
    // Settings descriptions
    languageDescription: "Elige tu idioma preferido",
    unit: "Unidad",
    unitDescription: "Elige la unidad de temperatura",
    timeFormatDescription: "Elige el formato de hora",
    showPhraseDescription: "Mostrar frases motivacionales según el clima",
    autoLocationDescription: "Detectar ubicación automáticamente",
    dynamicThemesDescription: "La app cambia los colores según el clima actual: ☀️ Soleado, ⛅ Nublado, 🌧️ Lluvia, 🌙 Noche, ❄️ Nieve, ⛈️ Tormenta",
    
    // Greetings
    goodMorning: "Buenos Días",
    goodAfternoon: "Buenas Tardes",
    goodEvening: "Buenas Noches",
    
    // Days of week
    days: {
      short: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      long: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    },
    
    // Months
    months: {
      short: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      long: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    }
  },
  
  en: {
    // Header
    searchPlaceholder: "Search for a city...",
    today: "Today",
    week: "Week",
    
    // Main weather card
    feelsLike: "Feels like",
    welcomeMessage: "Welcome to WeatherL",
    getLocationWeather: "Get Weather for My Location",
    loadingWeather: "Loading weather data...",
    tryAgain: "Try Again",
    locationError: "Could not get location",
    connectionError: "Connection error. Check your internet.",
    cityNotFound: "City not found",
    
    // Highlights
    todayHighlights: "Today's Highlights",
    uvIndex: "UV Index",
    wind: "Wind",
    humidity: "Humidity",
    visibility: "Visibility",
    pressure: "Pressure",
    
    // Status indicators
    high: "High",
    normal: "Normal",
    low: "Low",
    excellent: "Excellent",
    good: "Good",
    poor: "Poor",
    
    // Weekly forecast
    weeklyForecast: "7-Day Forecast",
    weeklyAverages: "Weekly Averages",
    
    // Settings
    settings: "Settings",
    temperature: "Temperature",
    timeFormat: "Time Format",
    features: "Features",
    dynamicThemes: "Dynamic Themes",
    showPhrase: "Show Phrases",
    autoLocation: "Auto Location",
    language: "Language",
    spanish: "Spanish",
    english: "English",
    
    // Settings descriptions
    languageDescription: "Choose your preferred language",
    unit: "Unit",
    unitDescription: "Choose temperature unit",
    timeFormatDescription: "Choose time format",
    showPhraseDescription: "Show weather-based motivational quotes",
    autoLocationDescription: "Automatically detect your location",
    dynamicThemesDescription: "The app automatically changes colors based on current weather conditions: ☀️ Sunny, ⛅ Cloudy, 🌧️ Rainy, 🌙 Night, ❄️ Snow, ⛈️ Storm",
    
    // Greetings
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",
    
    // Days of week
    days: {
      short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    
    // Months
    months: {
      short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  }
}

// Helper function to get current greeting based on time
export const getGreeting = (language = 'es') => {
  const hour = new Date().getHours()
  const lang = LANGUAGES[language]
  
  if (hour >= 5 && hour < 12) {
    return lang.goodMorning
  } else if (hour >= 12 && hour < 18) {
    return lang.goodAfternoon
  } else {
    return lang.goodEvening
  }
}

// Helper function to get localized date
export const getLocalizedDate = (date = new Date(), language = 'es', format = 'long') => {
  const lang = LANGUAGES[language]
  const day = date.getDate()
  const dayOfWeek = date.getDay()
  const month = date.getMonth()
  const year = date.getFullYear()
  
  if (format === 'short') {
    return `${lang.days.short[dayOfWeek]} ${day} ${lang.months.short[month]}`
  }
  
  if (language === 'en') {
    return `${lang.days.long[dayOfWeek]}, ${lang.months.long[month]} ${day}, ${year}`
  }
  
  return `${lang.days.long[dayOfWeek]}, ${day} de ${lang.months.long[month]} de ${year}`
}
