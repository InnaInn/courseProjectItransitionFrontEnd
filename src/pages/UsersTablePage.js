import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserApi from '../api/UsersApi';
import { useUsers } from '../hooks/users/useUsers';
import { useEditRole } from '../hooks/useEditRole';
import { useDeleteUsers } from '../hooks/users/useDeleteUsers';
import UsersToolbar from '../components/UsersToolBar';
import ConfirmModal from '../components/ConfirmModal';


const ALL_ROLES = [
  { id: 'ADMIN', name: 'Admin' },
  { id: 'RECRUITER', name: 'Recruiter' },
  { id: 'CANDIDATE', name: 'Candidate' },
];

function UsersTablePage() {
  const { users, loading, error, setUsers, refetch } = useUsers();
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterText, setFilterText] = useState('');
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <UsersToolbar
            isEditing={isEditing}
            selectedIds={selectedIds}
            onEdit={() => startEdit(selectedIds[0])}
            onSave={handleSave}
            onCancel={handleCancel}
            filterValue={filterText}
            onFilterChange={setFilterText}
            onDelete={handleDeleteClick}
            isDeleting={isDeleting}
            deleteError={deleteError}
          />

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={allSelected}
                        onChange={handleSelectAll}
                        disabled={isEditing}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      First Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Name
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Users"
        message={`Are you sure you want to delete ${pendingDeleteIds.length} user(s)?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default UsersTablePage;