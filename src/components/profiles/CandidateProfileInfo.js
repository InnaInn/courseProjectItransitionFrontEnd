import React, { useState } from 'react';
import ToolBar from '../common/ToolBar';
import ConfirmModal from '../common/ConfirmModal';
import CreateSkillModal from '../userAttribute/CreateSkillModal';
import EditSkillModal from '../userAttribute/EditSkillModal';
import { useUserAttributes } from '../../hooks/userAttributes/useUserAttributes';
import { useDeleteUserAttribute } from '../../hooks/userAttributes/useDeleteUserAttribute';
import { useCreateUserAttribute } from '../../hooks/userAttributes/useCreateUserAttribute';
import { useUpdateUserAttribute } from '../../hooks/userAttributes/useUpdateUserAttribute';

function CandidateProfileInfo({ userId, isRecruiter = false }) {
  const { attributes, loading, error, refetch } = useUserAttributes(userId);
  const { deleteUserAttributes, isDeleting, deleteError } = useDeleteUserAttribute(refetch);
  const { createUserAttribute, isCreating, createError } = useCreateUserAttribute(refetch);
  const { updateUserAttribute, isUpdating, updateError } = useUpdateUserAttribute(refetch);

  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === attributes.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(attributes.map((skill) => skill.id));
    }
  };

  const allSelected = attributes.length > 0 && selectedIds.length === attributes.length;

  const handleOpenCreate = () => setIsCreateModalOpen(true);
  const handleCloseCreate = () => {
    setIsCreateModalOpen(false);
    setSelectedIds([]);
  };
  const handleCreate = async (data) => {
    const success = await createUserAttribute(userId, data);
    if (success) handleCloseCreate();
  };

  const handleEdit = () => {
    if (selectedIds.length === 1) {
      const skill = attributes.find((s) => s.id === selectedIds[0]);
      if (skill) {
        setEditingSkill(skill);
        setIsEditModalOpen(true);
      }
    } else {
      alert('Please select exactly one skill to edit.');
    }
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setEditingSkill(null);
    setSelectedIds([]);
  };

  const handleUpdate = async (attributeId, value) => {
    const success = await updateUserAttribute(userId, attributeId, value);
    if (success) handleCloseEdit();
  };

  const handleDeleteClick = () => {
    setPendingDeleteIds(selectedIds);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const success = await deleteUserAttributes(userId, pendingDeleteIds);
    if (success) setSelectedIds([]);
    setDeleteModalOpen(false);
    setPendingDeleteIds([]);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setPendingDeleteIds([]);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl relative">
        <div className="text-center text-gray-500">Loading skills...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl relative">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl relative">
    
      {!isRecruiter && (
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <ToolBar
            selectedCount={selectedIds.length}
            onAdd={handleOpenCreate}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            isDeleting={isDeleting}
            deleteError={deleteError}
          />
        </div>
      )}

      <div className="flex flex-col">
        <h2 className="text-gray-800 text-2xl font-bold mb-2 text-left">
          My Skills
        </h2>
        {!isRecruiter && attributes.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={allSelected}
              onChange={handleSelectAll}
              disabled={isDeleting}
            />
            <label className="text-sm text-gray-600">Select all</label>
          </div>
        )}

        {attributes.length === 0 ? (
          <p className="text-gray-500 text-center">No skills added yet</p>
        ) : (
          <div className="flex flex-col space-y-2">
            {attributes.map((skill) => (
              <div key={skill.id} className="flex items-center gap-3">
                {!isRecruiter && (
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={selectedIds.includes(skill.id)}
                    onChange={() => handleToggle(skill.id)}
                    disabled={isDeleting}
                  />
                )}
                <span className="text-gray-700 text-lg">
                  {skill.name}: <span className="text-gray-500 font-bold">{skill.value}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Skills"
        message={`Are you sure you want to delete ${pendingDeleteIds.length} skill(s)?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />

      <CreateSkillModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreate}
        onCreate={handleCreate}
        isCreating={isCreating}
        createError={createError}
      />

      <EditSkillModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEdit}
        skill={editingSkill}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
        updateError={updateError}
      />
    </div>
  );
}

export default CandidateProfileInfo;