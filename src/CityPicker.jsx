import React from 'react';

const CityPicker = ({ options, onSelect, onClose, t }) => {
  if (!options?.length) return null;
  return (
    <div className="city-picker-ios-bg" onClick={onClose}>
      <div className="city-picker-ios" onClick={e => e.stopPropagation()}>
        <div className="city-picker-title">{t?.chooseCity || 'Selecciona una ciudad'}</div>
        <ul className="city-picker-list">
          {options.map((city, idx) => (
            <li key={city.id || idx}>
              <button className="city-picker-option" onClick={() => onSelect(city)}>
                {city.name}
                {city.region ? `, ${city.region}` : ''}
                {city.country ? `, ${city.country}` : ''}
              </button>
            </li>
          ))}
        </ul>
        <button className="city-picker-cancel" onClick={onClose}>{t?.cancel || 'Cancelar'}</button>
      </div>
    </div>
  );
};

export default CityPicker;
