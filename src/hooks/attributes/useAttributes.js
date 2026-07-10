import { useState, useEffect } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useAttributes = () => {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttributes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWithSession(`${API_URL}/attributes`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      setAttributes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  return { attributes, loading, error, refetch: fetchAttributes };
};