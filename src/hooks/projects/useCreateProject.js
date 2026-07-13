import { useState } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useCreateProject = (refetch) => {
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  const createProject = async (userId, projectData) => {
    setIsCreating(true);
    setCreateError(null);
    try {
      const response = await fetchWithSession(`${API_URL}/users/${userId}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create project: ${response.status} - ${errorText}`);
      }
      if (refetch) refetch();
      return true;
    } catch (err) {
      console.error('Create error:', err);
      setCreateError(err.message);
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  return { createProject, isCreating, createError };
};