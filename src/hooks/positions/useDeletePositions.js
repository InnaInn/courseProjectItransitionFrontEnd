import { useState } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

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
        const response = await fetchWithSession(`${API_URL}/position/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          let errorMessage = `Failed to delete position ${id}`;
          
          try {
            const errorText = await response.text();
            
            if (errorText.includes('foreign key constraint') || 
                errorText.includes('position_attributes_position_id_fkey') ||
                errorText.includes('violates foreign key constraint')) {
              errorMessage = 'Cannot delete: position has linked attributes. Remove attributes first.';
            } else {
              errorMessage = `Failed to delete position ${id}: ${response.status}`;
            }
          } catch (e) {
            errorMessage = `Failed to delete position ${id}: ${response.status}`;
          }
          
          throw new Error(errorMessage);
        }
      }
      
      if (refetch) refetch();
      setDeleteError(null);
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