# 🌤️ Weather App - Aplicación del Clima Estética

Una hermosa aplicación del clima con animaciones estilo Apple, construida con React, Framer Motion y Ta# ☀️ WeatherL

> Una aplicación del clima hermosa y moderna con animaciones estilo Apple

<div align="center">

![WeatherL Preview](https://via.placeholder.com/800x400/4f46e5/ffffff?text=WeatherL+Preview)

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

</div>

## ✨ Características

- 🎨 **Diseño moderno** con efectos glassmorphism y gradientes dinámicos
- 🌈 **Temas adaptativos** que cambian según el clima y la hora del día
- 📱 **Completamente responsive** con diseño mobile-first
- 🌍 **Soporte multiidioma** (Español/Inglés)
- 🗺️ **Mapa interactivo** con ubicación actual
- 📊 **Pronóstico de 7 días** con estadísticas detalladas
- ⚡ **Animaciones fluidas** con Framer Motion
- 🔧 **Panel de configuración** completo
- 📍 **Geolocalización automática**
- 🌡️ **Múltiples unidades** (Celsius/Fahrenheit)

## 🚀 Demo en Vivo

[Ver Demo](https://weatherl-demo.vercel.app) <!-- Actualizar con tu URL de deploy -->

## 📷 Capturas de Pantalla

### Vista Principal (Día)
![Vista Principal](https://via.placeholder.com/600x400/60a5fa/ffffff?text=Vista+Principal)

### Vista Semanal
![Vista Semanal](https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Vista+Semanal)

### Panel de Configuración
![Panel de Configuración](https://via.placeholder.com/600x400/10b981/ffffff?text=Panel+de+Configuracion)

## 🛠️ Tecnologías

- **Frontend**: React 19, Vite 5.4
- **Animaciones**: Framer Motion 11
- **Iconos**: Lucide React
- **API del Clima**: WeatherAPI.com
- **Mapas**: OpenStreetMap con Leaflet
- **Estilos**: CSS3 con variables personalizadas
- **Build**: Vite con HMR

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- Clave API de [WeatherAPI.com](https://www.weatherapi.com/)

### Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tuusuario/weatherl.git
cd weatherl
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura las variables de entorno**
```bash
# Crea un archivo src/config.js con tu API key
export const WEATHER_API_CONFIG = {
  API_KEY: 'tu_api_key_aqui',
  BASE_URL: 'https://api.weatherapi.com/v1'
}
```

4. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

5. **Abre tu navegador**
```
http://localhost:5173
```

## 📦 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Lint del código
```

## 🌟 Características Detalladas

### 🎨 Temas Dinámicos
- **Día Soleado**: Gradientes dorados y azules
- **Día Nublado**: Tonos grises y azules suaves
- **Día Lluvioso**: Azules profundos con efectos de lluvia
- **Noche**: Gradientes oscuros con toques morados

### 📱 Responsive Design
- **Desktop**: Layout de 3 columnas con mapa lateral
- **Tablet**: Layout adaptativo con navegación optimizada
- **Mobile**: Diseño minimalista de una columna

### 🔧 Panel de Configuración
- Idioma (Español/Inglés)
- Unidades de temperatura (°C/°F)
- Geolocalización automática
- Frases motivacionales
- Información de la aplicación

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commitea tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Matias Luzardo** 👨‍💻

- GitHub: [@tuusuario](https://github.com/tuusuario)
- LinkedIn: [Tu LinkedIn](https://linkedin.com/in/tuusuario)

## 🙏 Agradecimientos

- [WeatherAPI.com](https://www.weatherapi.com/) por la API del clima
- [Lucide](https://lucide.dev/) por los iconos hermosos
- [Framer Motion](https://www.framer.com/motion/) por las animaciones
- [OpenStreetMap](https://www.openstreetmap.org/) por los mapas

## 📈 Roadmap

- [ ] 🌙 Modo oscuro manual
- [ ] 📊 Gráficos de temperatura
- [ ] 🔔 Notificaciones del clima
- [ ] 💾 Ciudades favoritas
- [ ] 🌪️ Alertas meteorológicas
- [ ] 📱 PWA (Progressive Web App)

---

<div align="center">
  <p>Hecho con ❤️ en Uruguay</p>
  <p>WeatherL © 2025 - Todas las ciudades, todos los climas</p>
</div> CSS.

## ✨ Características

- 🎨 **Diseño moderno y estético** inspirado en el estilo de Apple
- 🌈 **Fondos dinámicos** que cambian según el clima y la hora del día
- ⚡ **Animaciones suaves** con Framer Motion
- 🔍 **Búsqueda de ciudades** en tiempo real
- 📍 **Geolocalización automática** para obtener el clima local
- 📱 **Responsive design** que se adapta a cualquier dispositivo
- 🌡️ **Información completa del clima** (temperatura, humedad, viento, visibilidad, presión)

## 🚀 Instalación y Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar API Key de WeatherAPI

1. Ve a [WeatherAPI](https://www.weatherapi.com/) y crea una cuenta gratuita
2. Obtén tu API key desde el dashboard
3. Abre el archivo `src/config.js`
4. Reemplaza `'TU_API_KEY_AQUI'` con tu API key real:

```javascript
const API_KEY = 'tu_api_key_real_aqui'
```

### 3. Ejecutar la aplicación

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework de JavaScript
- **Vite** - Herramienta de build ultrarrápida
- **Framer Motion** - Librería de animaciones
- **Tailwind CSS** - Framework de CSS utilitario
- **Lucide React** - Iconos modernos
- **OpenWeatherMap API** - Datos meteorológicos

## 🎯 Funcionalidades

### 🌦️ Información del Clima
- Temperatura actual y sensación térmica
- Descripción del clima en español
- Icono animado según las condiciones
- Datos adicionales: humedad, viento, visibilidad, presión

### 🎨 Experiencia Visual
- Fondos degradados que cambian dinámicamente
- Efectos de glassmorphism (cristal esmerilado)
- Animaciones fluidas de entrada y salida
- Iconos flotantes con movimiento suave

### 📱 Interactividad
- Búsqueda de ciudades por nombre
- Detección automática de ubicación
- Manejo de errores elegante
- Estados de carga con spinner

## 🌍 API de WeatherAPI

La aplicación utiliza la API gratuita de WeatherAPI que proporciona:

- Datos actuales del clima en tiempo real
- Pronósticos precisos en más de 3 millones de ubicaciones
- Soporte para múltiples idiomas (configurado en español)
- Datos meteorológicos detallados (temperatura, humedad, viento, visibilidad, UV)

### Límites de la API gratuita:
- 1,000,000 llamadas por mes
- Sin límite de llamadas por minuto
- Datos actuales y pronósticos de hasta 3 días
- Datos históricos del clima

## 📁 Estructura del Proyecto

```
weatherl/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos específicos
│   ├── index.css        # Estilos globales + Tailwind
│   ├── main.jsx         # Punto de entrada
│   └── config.js        # Configuración y constantes
├── public/
├── index.html
├── package.json
├── tailwind.config.js   # Configuración de Tailwind
├── postcss.config.js    # Configuración de PostCSS
└── vite.config.js       # Configuración de Vite
```

## 🎨 Personalización

### Cambiar colores de fondo

Edita el archivo `src/config.js` para modificar los gradientes de fondo según el clima:

```javascript
export const WEATHER_BACKGROUNDS = {
  day: {
    clear: 'from-blue-400 via-blue-500 to-blue-600',
    // ... más configuraciones
  }
}
```

### Añadir nuevas animaciones

Utiliza Framer Motion para crear animaciones personalizadas:

```javascript
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Tu contenido aquí
</motion.div>
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [WeatherAPI](https://www.weatherapi.com/) por la API del clima
- [Framer Motion](https://www.framer.com/motion/) por las animaciones
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de diseño
- [Lucide](https://lucide.dev/) por los iconos hermosos

---

¡Disfruta usando tu nueva aplicación del clima! 🌤️+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
