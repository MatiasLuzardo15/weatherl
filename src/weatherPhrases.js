// Frases motivacionales y descriptivas según el clima
export const WEATHER_PHRASES = {
  clear: {
    day: [
      "¡Un día perfecto para brillar como el sol! ☀️",
      "El cielo despejado refleja las infinitas posibilidades de hoy ✨",
      "Aprovecha esta energía solar para conquistar tus metas 🌟",
      "Los días soleados son regalos del universo, ¡disfrútalo! 🎁",
      "Tu sonrisa puede competir con el brillo del sol hoy 😊"
    ],
    night: [
      "Las estrellas te guían hacia nuevos sueños 🌟",
      "Una noche clara para reflexionar y soñar en grande 🌙",
      "Bajo este cielo estrellado, todo es posible ✨",
      "La claridad de la noche trae paz a tu alma 🌌",
      "Perfecta noche para contemplar la belleza del universo 🔭"
    ]
  },
  clouds: {
    day: [
      "Las nubes son los pensamientos creativos del cielo 💭",
      "Un lienzo gris perfecto para pintar un día increíble 🎨",
      "Las nubes guardan sorpresas, como tu día de hoy ☁️",
      "Incluso nublado, tu luz interior puede brillar 💡",
      "Los días nublados invitan a la introspección y la creatividad 🌫️"
    ],
    night: [
      "Las nubes nocturnas guardan los secretos de la noche 🌙",
      "Una noche misteriosa llena de posibilidades ocultas 🔮",
      "Bajo las nubes, tus sueños encuentran refugio 💤",
      "La noche nublada abraza tus pensamientos más profundos 🤗",
      "Perfecta para una noche de meditación y descanso 🧘‍♀️"
    ]
  },
  rain: {
    day: [
      "La lluvia riega las semillas de nuevas oportunidades 🌱",
      "Cada gota es una bendición que renueva la tierra 💧",
      "Baila bajo la lluvia y celebra la vida ☔",
      "Los días lluviosos limpian el alma y refrescan el espíritu 🌧️",
      "La lluvia canta melodías de renovación y esperanza 🎵"
    ],
    night: [
      "El sonido de la lluvia nocturna calma el corazón 💕",
      "Una sinfonía líquida para acompañar tus sueños 🎼",
      "La lluvia nocturna lava las preocupaciones del día 🌙",
      "Perfecta para acurrucarse y sentir la paz interior ☔",
      "Las gotas nocturnas susurran historias de renovación 💫"
    ]
  },
  snow: {
    day: [
      "Cada copo de nieve es único, como tú ❄️",
      "La nieve transforma el mundo en un cuento de hadas ✨",
      "Un manto blanco de nuevas posibilidades te espera 🤍",
      "La pureza de la nieve refleja la belleza de tu alma 💎",
      "Día perfecto para crear recuerdos mágicos en la nieve ⛄"
    ],
    night: [
      "La nieve nocturna crea un silencio mágico y sereno 🤫",
      "Bajo la nieve, el mundo duerme en paz ❄️",
      "Una noche invernal perfecta para la contemplación 🌨️",
      "Los copos nocturnos danzan como estrellas bajando del cielo ⭐",
      "La nieve nocturna abraza al mundo con ternura 🤗"
    ]
  },
  thunderstorm: {
    day: [
      "Las tormentas traen cambios poderosos y necesarios ⚡",
      "Después de la tormenta, siempre sale el arcoíris 🌈",
      "Tu fuerza interior es más poderosa que cualquier tormenta 💪",
      "Las tormentas limpian el aire y renuevan la energía 🌩️",
      "En cada rayo hay poder, en cada trueno hay fuerza ⚡"
    ],
    night: [
      "La tormenta nocturna despierta tu lado más salvaje 🌪️",
      "Los rayos iluminan caminos que no sabías que existían ⚡",
      "Una noche dramática para reflexiones profundas 🌩️",
      "La tormenta trae cambios que tu alma necesitaba 💫",
      "En la intensidad de la noche encuentras tu verdadero poder 🔥"
    ]
  },
  mist: {
    day: [
      "La niebla revela misterios ocultos en tu camino 🌫️",
      "En la bruma encuentras la magia de lo desconocido ✨",
      "Los días brumosos invitan a la aventura interior 🧭",
      "La niebla abraza el mundo con suavidad y misterio 💭",
      "Perfecto para descubrir tesoros escondidos en tu alma 💎"
    ],
    night: [
      "La niebla nocturna teje sueños místicos y profundos 🌙",
      "Una noche envuelta en misterio y posibilidades infinitas 🔮",
      "La bruma nocturna susurra secretos del universo 👂",
      "Perfecta para conectar con tu intuición más profunda 🧘‍♀️",
      "En la neblina nocturna, tu alma encuentra su hogar 🏠"
    ]
  }
}

// Función para obtener una frase aleatoria según el clima
export const getWeatherPhrase = (condition, isDay) => {
  const timeOfDay = isDay ? 'day' : 'night'
  let weatherType = 'clear' // por defecto
  
  const conditionLower = condition.toLowerCase()
  
  if (conditionLower.includes('lluvia') || conditionLower.includes('rain') || conditionLower.includes('shower')) {
    weatherType = 'rain'
  } else if (conditionLower.includes('nieve') || conditionLower.includes('snow')) {
    weatherType = 'snow'
  } else if (conditionLower.includes('tormenta') || conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    weatherType = 'thunderstorm'
  } else if (conditionLower.includes('nube') || conditionLower.includes('cloud') || conditionLower.includes('nublado') || conditionLower.includes('overcast')) {
    weatherType = 'clouds'
  } else if (conditionLower.includes('niebla') || conditionLower.includes('bruma') || conditionLower.includes('mist') || conditionLower.includes('fog')) {
    weatherType = 'mist'
  } else if (conditionLower.includes('despejado') || conditionLower.includes('soleado') || conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    weatherType = 'clear'
  }
  
  const phrases = WEATHER_PHRASES[weatherType][timeOfDay]
  return phrases[Math.floor(Math.random() * phrases.length)]
}

// Configuraciones por defecto
export const DEFAULT_SETTINGS = {
  showPhrase: true,
  temperatureUnit: 'celsius', // celsius, fahrenheit
  timeFormat: '24h', // 12h, 24h
  autoLocation: true,
  showAnimation: true,
  language: 'es',
  refreshInterval: 10 // minutos
}

// Función para guardar configuraciones
export const saveSettings = (settings) => {
  localStorage.setItem('weatherAppSettings', JSON.stringify(settings))
}

// Función para cargar configuraciones
export const loadSettings = () => {
  const saved = localStorage.getItem('weatherAppSettings')
  return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS
}
