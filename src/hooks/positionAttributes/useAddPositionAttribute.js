import { useState } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useAddPositionAttribute = (refetch) => {
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState(null);

  const addPositionAttribute = async (positionId, attributeId) => {
    setIsAdding(true);
    setAddError(null);

    try {
      const response = await fetchWithSession(`${API_URL}/position/${positionId}/attributes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attributeId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add attribute: ${response.status} - ${errorText}`);
      }

      if (refetch) refetch();
      return true;
    } catch (err) {
      console.error('Add error:', err);
      setAddError(err.message);
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  return { addPositionAttribute, isAdding, addError };
};