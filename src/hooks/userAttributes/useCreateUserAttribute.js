import { useState } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useCreateUserAttribute = (refetch) => {
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState(null);

    const createUserAttribute = async (userId, attributeData) => {
        if (!userId) {
            setCreateError('User ID is required');
            return false;
        }

        setIsCreating(true);
        setCreateError(null);

        try {
            const response = await fetchWithSession(`${API_URL}/users/${userId}/attributes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(attributeData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create skill: ${response.status} - ${errorText}`);
            }

            if (refetch) refetch();
            return true;
        } catch (err) {
            console.error('Create error:', err);
            setCreateError(err.message);
            return false;
        } finally {
            setIsCreating(false);
        }
    };

    return { createUserAttribute, isCreating, createError };
};