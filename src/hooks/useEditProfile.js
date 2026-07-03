// hooks/useEditProfile.js
import { useState } from 'react';
import { config } from '../config.js';

const API_URL = config.beURL + '/api';

export function useEditProfile(user, setUser) {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});

    const startEdit = () => {
        setEditForm({ ...user });
        setIsEditing(true);
    };

    const changeField = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const save = async (userId) => {
        if (JSON.stringify(user) === JSON.stringify(editForm)) {
            cancel();
            return;
        }

        try {
            const response = await fetch(`${API_URL}/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            setUser(editForm);
            cancel();

            console.log('✅ Profile updated successfully');
            return true;

        } catch (err) {
            alert('Error updating profile: ' + err.message);
            console.error('Error updating profile:', err);
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