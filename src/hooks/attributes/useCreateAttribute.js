import { useState } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useCreateAttribute = (refetch) => {
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  const createAttribute = async (attributeData) => {
    setIsCreating(true);
    setCreateError(null);

    try {
  
      const payload = { ...attributeData };
      if (payload.values && typeof payload.values === 'string') {
        payload.values = payload.values.split(',').map(v => v.trim());
      }

      const response = await fetchWithSession(`${API_URL}/attributes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create attribute: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      if (refetch) refetch();
      return result;
    } catch (err) {
      console.error('Create error:', err);
      setCreateError(err.message);
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  return { createAttribute, isCreating, createError };
};