import { useState } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useUpdateUserAttribute = (refetch) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateUserAttribute = async (userId, attributeId, value) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const response = await fetchWithSession(`${API_URL}/users/${userId}/attributes/${attributeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update skill: ${response.status} - ${errorText}`);
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

  return { updateUserAttribute, isUpdating, updateError };
};