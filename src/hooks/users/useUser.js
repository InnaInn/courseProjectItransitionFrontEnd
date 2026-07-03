
import { useState, useEffect } from 'react';
import { config } from '../../config.js';

const API_URL = config.beURL + '/api';

export const useUser = (userId) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = async (id) => {
        if (!id) {
            setLoading(false);
            setError('ID пользователя не указан');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/users/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Пользователь не найден');
                }
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const userData = await response.json();
            setUser(userData);
        } catch (err) {
            setError(err.message);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId]);

    
    return { 
        user, 
        setUser,     
        loading, 
        error, 
        refetch: fetchUser 
    };
};