import { useState } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchWithSession(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

  
      let data = null;
      let errorMessage = 'Registration failed';
      try {
        data = await response.json();
      } catch (parseError) {
   
        const text = await response.text();
        errorMessage = text || errorMessage;
      }

      if (!response.ok) {
        if (data && data.error) {
          errorMessage = data.error;
        }
        
        if (response.status === 409) {
          throw new Error('USER_ALREADY_EXISTS');
        }
        throw new Error(errorMessage);
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};