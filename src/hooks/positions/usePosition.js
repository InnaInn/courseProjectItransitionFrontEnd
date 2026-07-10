import { useState, useEffect } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const usePosition = (positionId) => {
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosition = async (id) => {
        if (!id) {
            setLoading(false);
            setError('ID позиции не указан');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetchWithSession(`${API_URL}/position/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Позиция не найдена');
                }
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const positionData = await response.json();
            setPosition(positionData);
        } catch (err) {
            setError(err.message);
            setPosition(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (positionId) {
            fetchPosition(positionId);
        }
    }, [positionId]);

    return { 
        position, 
        setPosition,     
        loading, 
        error, 
        refetch: fetchPosition 
    };
};