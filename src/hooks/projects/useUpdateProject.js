import { useState } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useUpdateProject = (refetch) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateProject = async (id, projectData) => {
    setIsUpdating(true);
    setUpdateError(null);
    try {
      const response = await fetchWithSession(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update project: ${response.status} - ${errorText}`);
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

  return { updateProject, isUpdating, updateError };
};