import { useState } from 'react';
import { config } from '../../config.js';

const API_URL = config.beURL + '/api';

export const useDeletePosition = (refetch) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deletePositions = async (ids) => {
    if (!ids || ids.length === 0) return false;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      for (const id of ids) {
        const response = await fetch(`${API_URL}/position/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to delete position ${id}: ${response.status} - ${errorText}`);
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

  return { deletePositions, isDeleting, deleteError };
};