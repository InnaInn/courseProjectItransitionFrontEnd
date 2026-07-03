import { useState, useEffect } from 'react';
import { config } from '../../config.js';

const API_URL = config.beURL + '/api';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/users`);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            const usersData = await response.json();
            setUsers(usersData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, loading, error, setUsers, refetch: fetchUsers };
};