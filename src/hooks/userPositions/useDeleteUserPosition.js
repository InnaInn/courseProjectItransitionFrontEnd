import { useState } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useDeleteUserPosition = (refetch) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteUserPosition = async (userId, positionId) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetchWithSession(`${API_URL}/users/${userId}/positions/${positionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete application: ${response.status} - ${errorText}`);
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

  return { deleteUserPosition, isDeleting, deleteError };
};