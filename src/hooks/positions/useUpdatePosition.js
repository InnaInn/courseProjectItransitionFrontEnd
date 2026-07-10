import { useState } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useUpdatePosition = (refetch) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updatePosition = async (id, positionData) => {
    setIsUpdating(true);
    setUpdateError(null);
    try {
      const response = await fetchWithSession(`${API_URL}/position/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(positionData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update position: ${response.status} - ${errorText}`);
      }
      if (refetch) refetch();
      return true;
    } catch (err) {
      console.error('Update error:', err);
      setUpdateError(err.message);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updatePosition, isUpdating, updateError };
};