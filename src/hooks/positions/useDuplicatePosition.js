import { useState } from 'react';
import { fetchWithSession } from '../useAuth';
import { config } from '../../config';

const API_URL = config.beURL + '/api';

export const useDuplicatePosition = (refetch) => {
    const [isDuplicating, setIsDuplicating] = useState(false);
    const [duplicateError, setDuplicateError] = useState(null);

    const duplicatePosition = async (positionId) => {
        setIsDuplicating(true);
        setDuplicateError(null);

        try {
            const url = `${API_URL}/position/${positionId}/duplicate`;
            
            const response = await fetchWithSession(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                let errorMessage = `Failed to duplicate position. Status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();

            if (refetch) {
                await refetch();
            }

            return true;
        } catch (err) {
            setDuplicateError(err.message);
            return false;
        } finally {
            setIsDuplicating(false);
        }
    };

    return { duplicatePosition, isDuplicating, duplicateError };
};