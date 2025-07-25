import { useState, useEffect } from 'react';

// Hook para obtener datos técnicos de la luna usando la API de ipgeolocation.io
export function useLunarApi({ location, elevation = 10, apiKey, enabled }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !location || !apiKey) return;
    setLoading(true);
    setError(null);
    fetch(`https://api.ipgeolocation.io/v2/astronomy?apiKey=${apiKey}&location=${encodeURIComponent(location)}&elevation=${elevation}`)
      .then(r => {
        if (!r.ok) throw new Error('Error en la API lunar');
        return r.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [location, elevation, apiKey, enabled]);

  return { data, loading, error };
}
