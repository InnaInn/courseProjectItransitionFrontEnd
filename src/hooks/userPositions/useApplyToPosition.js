import { useState } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useApplyToPosition = (refetchUserPositions) => {
  const [isApplying, setIsApplying] = useState(false);
  const [applyError, setApplyError] = useState(null);

  const applyToPosition = async (userId, positionId) => {
    setIsApplying(true);
    setApplyError(null);

    try {
      const response = await fetchWithSession(`${API_URL}/users/${userId}/positions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ positionId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to apply: ${response.status} - ${errorText}`);
      }

      if (refetchUserPositions) refetchUserPositions();
      return true;
    } catch (err) {
      console.error('Apply error:', err);
      setApplyError(err.message);
      return false;
    } finally {
      setIsApplying(false);
    }
  };

  return { applyToPosition, isApplying, applyError };
};