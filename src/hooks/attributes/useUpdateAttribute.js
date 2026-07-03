import { useState } from 'react';
import { config } from '../../config.js';

const API_URL = config.beURL + '/api';

export const useUpdateAttribute = (refetch) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateAttribute = async (id, attributeData) => {
    setIsUpdating(true);
    setUpdateError(null);
    try {
      const response = await fetch(`${API_URL}/attributes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attributeData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update attribute: ${response.status} - ${errorText}`);
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

  return { updateAttribute, isUpdating, updateError };
};