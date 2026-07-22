import { useState, useEffect } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useUsers = (userPrefix = '') => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_URL}/users`;
      if (userPrefix && userPrefix.trim() !== '') {
        url += `?userPrefix=${encodeURIComponent(userPrefix.trim())}`;
      }
      
      const response = await fetchWithSession(url);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userPrefix]); 

  return { users, loading, error, setUsers, refetch: fetchUsers };
};