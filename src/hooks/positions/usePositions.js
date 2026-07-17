import { useState, useEffect } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const usePositions = (positionPrefix = '') => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPositions = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_URL}/position`;
      if (positionPrefix && positionPrefix.trim() !== '') {
        url += `?positionPrefix=${encodeURIComponent(positionPrefix.trim())}`;
      }
      
      const response = await fetchWithSession(url);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      setPositions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, [positionPrefix]);

  return { positions, loading, error, refetch: fetchPositions };
};