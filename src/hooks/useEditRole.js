
import { useState } from 'react';
import { config } from '../config.js';
import { fetchWithSession } from './useAuth.js';

const API_URL = config.beURL + '/api';

export const useEditRole = (users, setUsers) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editRoleValue, setEditRoleValue] = useState('');

    const startEdit = (userId) => {
        const user = users.find((u) => u.id === userId);
        if (!user) return;
        setEditingUserId(userId);
        setEditRoleValue(user.roleId);
        setIsEditing(true);
    };

    const changeRole = (newRoleId) => {
        setEditRoleValue(newRoleId);
    };

    const save = async () => {
        if (!editingUserId) return;

        const currentUser = users.find((u) => u.id === editingUserId);
        if (currentUser && editRoleValue === currentUser.roleId) {
            cancel();
            return;
        }

        try {
            const response = await fetchWithSession(`${API_URL}/users/${editingUserId}/role`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: editRoleValue }),
            });

            if (!response.ok) {
                throw new Error('Failed to update role');
            }

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === editingUserId
                        ? { ...user, roleId: editRoleValue }
                        : user
                )
            );

            cancel();
        } catch (err) {
            alert('Error updating role: ' + err.message);
        }
    };

    const cancel = () => {
        setIsEditing(false);
        setEditingUserId(null);
        setEditRoleValue('');
    };

    return { isEditing, editingUserId, editRoleValue, startEdit, changeRole, save, cancel };
};