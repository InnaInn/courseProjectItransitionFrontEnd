import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function UsersApi({
  users,
  selectedIds,
  onToggleUser,
  loading,
  error,
  roles,
  isEditing,
  editingUserId,
  editRoleValue,
  onRoleChange,
}) {
  const { t } = useTranslation();

  const getRoleName = (roleId) => {
    if (!roles || roles.length === 0) return roleId;
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : roleId;
  };

  if (loading) {
    return (
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
          {t('loading')}
        </td>
      </tr>
    );
  }

  if (error) {
    return (
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center text-red-500 dark:text-red-400">
          {t('error')}: {error}
        </td>
      </tr>
    );
  }

  if (users.length === 0) {
    return (
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
          {t('noUsers') || 'No users found'}
        </td>
      </tr>
    );
  }

  return (
    <>
      {users.map((user) => {
        const isUserEditing = isEditing && editingUserId === user.id;
        return (
          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-left">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                checked={selectedIds.includes(user.id)}
                onChange={() => onToggleUser(user.id)}
                disabled={isEditing}
              />
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-left">
              <Link
                to={`/candidate-profile/${user.id}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
              >
                {user.email}
              </Link>
            </td>
            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-left">
              {isUserEditing ? (
                <select
                  value={editRoleValue}
                  onChange={(e) => onRoleChange(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              ) : (
                getRoleName(user.roleId)
              )}
            </td>
            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-left">
              {user.firstName}
            </td>
            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-left">
              {user.lastName}
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default UsersApi;