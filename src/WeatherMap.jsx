import React from 'react';
import { MapPin } from 'lucide-react';

const WeatherMap = ({ weather }) => {
  if (!weather) return null;

  const { location } = weather;
  
  // Generar URL del mapa estático usando OpenStreetMap
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lon-0.01}%2C${location.lat-0.01}%2C${location.lon+0.01}%2C${location.lat+0.01}&layer=mapnik&marker=${location.lat}%2C${location.lon}`;

  return (
    <div className="map-container-modern">
      <div className="map-header-modern">
        <MapPin size={24} style={{ color: '#3b82f6' }} />
        <h3 className="map-title-modern">Location</h3>
      </div>
      
      <div className="map-wrapper-modern">
        <iframe
          src={mapUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '16px'
          }}
          title={`Map of ${location.name}`}
          loading="lazy"
        />
      </div>
      
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <MapPin size={16} style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
        <div>
          <div style={{ color: 'white', fontWeight: 500 }}>
            {location.name}, {location.region}
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
            {location.lat.toFixed(4)}°, {location.lon.toFixed(4)}°
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;
