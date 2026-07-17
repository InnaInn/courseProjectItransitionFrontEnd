import { useState, useEffect } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useAttributes = (attributePrefix = '') => {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttributes = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_URL}/attributes`;
      if (attributePrefix && attributePrefix.trim() !== '') {
        url += `?attributePrefix=${encodeURIComponent(attributePrefix.trim())}`;
      }
      
      const response = await fetchWithSession(url);
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
  }, [attributePrefix]); 

  return { attributes, loading, error, refetch: fetchAttributes };
};