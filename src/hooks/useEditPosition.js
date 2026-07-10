import { useState } from 'react';
import { config } from '../config.js';
import { fetchWithSession } from './useAuth.js';

const API_URL = config.beURL + '/api';

export function useEditPosition(position, setPosition) {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});

    const startEdit = () => {
        setEditForm({ ...position });
        setIsEditing(true);
    };

    const changeField = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const save = async (positionId) => {
        if (JSON.stringify(position) === JSON.stringify(editForm)) {
            cancel();
            return;
        }

        try {
            const response = await fetchWithSession(`${API_URL}/position/${positionId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm),
            });

            if (!response.ok) {
                throw new Error('Failed to update position');
            }

            setPosition(editForm);
            cancel();

            console.log(' Position updated successfully');
            return true;

        } catch (err) {
            alert('Error updating position: ' + err.message);
            console.error('Error updating position:', err);
            return false;
        }
    };

    const cancel = () => {
        setIsEditing(false);
        setEditForm({});
    };

    return {
        isEditing,
        editForm,
        startEdit,
        changeField,
        save,
        cancel,
    };
}