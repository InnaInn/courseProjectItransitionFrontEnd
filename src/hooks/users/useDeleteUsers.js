import { useState } from 'react';
import { config } from '../../config.js';
import { fetchWithSession } from '../useAuth.js';

const API_URL = config.beURL + '/api';

export const useDeleteUsers = (refetch) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const deleteUsers = async (ids) => {
        if (!ids || ids.length === 0) return false;

        setIsDeleting(true);
        setDeleteError(null);

        try {
            for (const id of ids) {
                const url = `${API_URL}/users/${id}`;
                console.log('DELETE URL:', url);

                const response = await fetchWithSession(url, {
                    method: 'DELETE',
                });

                console.log('Response status:', response.status);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error text:', errorText);
                    throw new Error(`Failed to delete user ${id}: ${response.status}`);
                }
            }

            refetch();
            return true;
        } catch (err) {
            console.error('Delete error:', err);
            setDeleteError(err.message);
            return false;
        } finally {
            setIsDeleting(false);
        }
    };

    return { deleteUsers, isDeleting, deleteError };
};