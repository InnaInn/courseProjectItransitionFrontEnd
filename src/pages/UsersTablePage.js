import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ToolBar from '../components/common/ToolBar';
import UserApi from '../api/UsersApi';
import { useUsers } from '../hooks/users/useUsers';
import { useEditRole } from '../hooks/useEditRole';
import { useDeleteUsers } from '../hooks/users/useDeleteUsers';
import ConfirmModal from '../components/common/ConfirmModal';
import { useAuth } from '../hooks/useAuth';

const ALL_ROLES = [
  { id: 'ADMIN', name: 'Admin' },
  { id: 'RECRUITER', name: 'Recruiter' },
  { id: 'CANDIDATE', name: 'Candidate' },
];

function UsersTablePage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const isRecruiter = user?.role === 'RECRUITER';
  const [filterText, setFilterText] = useState('');
  const { users, loading, error, setUsers, refetch } = useUsers(filterText);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState([]);

  const {
    isEditing,
    editingUserId,
    editRoleValue,
    startEdit,
    changeRole,
    save,
    cancel: cancelEdit,
  } = useEditRole(users, setUsers);

  const { deleteUsers, isDeleting, deleteError } = useDeleteUsers(refetch);

  const handleCancel = () => {
    cancelEdit();
    setSelectedIds([]);
  };

  const handleSave = async () => {
    await save();
    setSelectedIds([]);
  };

  const handleDeleteClick = () => {
    setPendingDeleteIds(selectedIds);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const success = await deleteUsers(pendingDeleteIds);
    if (success) {
      setSelectedIds([]);
    }
    setDeleteModalOpen(false);
    setPendingDeleteIds([]);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setPendingDeleteIds([]);
  };

  const handleToggleUser = (id) => {
    if (isEditing) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (isEditing) return;
    if (selectedIds.length === users.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(users.map((u) => u.id));
    }
  };

  const allSelected = users.length > 0 && selectedIds.length === users.length;

  const handleEditClick = () => {
    if (selectedIds.length === 1) {
      startEdit(selectedIds[0]);
    } else {
      alert(t('selectExactlyOneUser') || 'Please select exactly one user to edit.');
    }
  };

  const renderUserRow = (user) => (
    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-left">
        <Link
          to={`/candidate-profile/${user.id}`}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
        >
          {user.email}
        </Link>
      </td>
      <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-left">
        {ALL_ROLES.find((r) => r.id === user.roleId)?.name || user.roleId}
      </td>
      <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-left">
        {user.firstName}
      </td>
      <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-left">
        {user.lastName}
      </td>
    </tr>
  );

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={isRecruiter ? 4 : 5} className="px-3 sm:px-6 py-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            {t('loading')}
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={isRecruiter ? 4 : 5} className="px-3 sm:px-6 py-4 text-center text-red-500 dark:text-red-400 text-sm">
            {t('error')}: {error}
          </td>
        </tr>
      );
    }

    if (!users || users.length === 0) {
      return (
        <tr>
          <td colSpan={isRecruiter ? 4 : 5} className="px-3 sm:px-6 py-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            {t('noUsers') || 'No users found'}
          </td>
        </tr>
      );
    }

    if (isRecruiter) {
      return users.map(renderUserRow);
    }

    return (
      <UserApi
        users={users}
        selectedIds={selectedIds}
        onToggleUser={handleToggleUser}
        loading={loading}
        error={error}
        roles={ALL_ROLES}
        isEditing={isEditing}
        editingUserId={editingUserId}
        editRoleValue={editRoleValue}
        onRoleChange={changeRole}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors">
      <Header />
      <div className="flex-grow container mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
            {!isRecruiter && (
              <ToolBar
                isEditing={isEditing}
                onSave={handleSave}
                onCancel={handleCancel}
                isSaving={false}
                showAdd={false}
                showEdit={!isEditing}
                showDelete={!isEditing}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                isDeleting={isDeleting}
                selectedCount={selectedIds.length}
                deleteError={deleteError}
                className="flex-wrap"
              />
            )}
            <input
              type="text"
              placeholder={t('filterUsers') || 'Filter users by last name...'}
              className="w-full sm:w-64 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              disabled={isEditing || isDeleting}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    {!isRecruiter && (
                      <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-10 sm:w-12">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                          checked={allSelected}
                          onChange={handleSelectAll}
                          disabled={isEditing}
                        />
                      </th>
                    )}
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('email')}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('role') || 'Role'}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('firstName')}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('lastName')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {renderTableBody()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <ConfirmModal
        isOpen={deleteModalOpen}
        title={t('deleteUsers') || 'Delete Users'}
        message={`${t('confirmDelete') || 'Are you sure you want to delete'} ${pendingDeleteIds.length} ${t('userPlural') || 'user(s)'}?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default UsersTablePage;