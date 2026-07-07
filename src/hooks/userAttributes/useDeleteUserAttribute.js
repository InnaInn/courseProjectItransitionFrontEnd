import { useState } from 'react';
import { config } from '../../config.js';

const API_URL = config.beURL + '/api';

export const useDeleteUserAttribute = (refetch) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteUserAttributes = async (userId, attributeIds) => {
    if (!userId || !attributeIds || attributeIds.length === 0) return false;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      for (const attributeId of attributeIds) {
        const response = await fetch(`${API_URL}/users/${userId}/attributes/${attributeId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to delete skill ${attributeId}: ${response.status} - ${errorText}`);
        }
      }

      if (refetch) refetch();
      return true;
    } catch (err) {
      console.error('Delete error:', err);
      setDeleteError(err.message);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteUserAttributes, isDeleting, deleteError };
};