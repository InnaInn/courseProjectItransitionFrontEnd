import { useState } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useRemovePositionAttribute = (refetch) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [removeError, setRemoveError] = useState(null);

  const removePositionAttribute = async (positionId, attributeId) => {
    setIsRemoving(true);
    setRemoveError(null);

    try {
      const response = await fetchWithSession(`${API_URL}/position/${positionId}/attributes/${attributeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to remove attribute: ${response.status} - ${errorText}`);
      }

      if (refetch) refetch();
      return true;
    } catch (err) {
      console.error('Remove error:', err);
      setRemoveError(err.message);
      return false;
    } finally {
      setIsRemoving(false);
    }
  };

  return { removePositionAttribute, isRemoving, removeError };
};