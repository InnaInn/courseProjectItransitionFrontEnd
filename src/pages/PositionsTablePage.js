import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PositionsToolbar from '../components/positions/PositionsToolbar';
import PositionsApi from '../api/PositionsApi';
import ConfirmModal from '../components/common/ConfirmModal';
import CreatePositionModal from '../components/positions/CreatePositionModal';
import EditPositionModal from '../components/positions/EditPositionModal';
import { usePositions } from '../hooks/positions/usePositions';
import { useCreatePosition } from '../hooks/positions/useCreatePosition';
import { useUpdatePosition } from '../hooks/positions/useUpdatePosition';
import { useDeletePosition } from '../hooks/positions/useDeletePositions';

function PositionsTablePage() {
  const { positions, loading, error, refetch } = usePositions();
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editingPositionId, setEditingPositionId] = useState(null);

  const { deletePositions, isDeleting, deleteError } = useDeletePosition(refetch);
  const { createPosition, isCreating, createError } = useCreatePosition(refetch);
  const { updatePosition, isUpdating, updateError } = useUpdatePosition(refetch);

  const handleEdit = () => {
    if (selectedIds.length === 1) {
      const pos = positions.find((p) => p.id === selectedIds[0]);
      if (pos) {
        setIsEditing(true);
        setEditingPositionId(pos.id);
      }
    } else {
      alert('Please select exactly one position to edit.');
    }
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setEditingPositionId(null);
    setSelectedIds([]);
  };

  const handleUpdate = async (id, data) => {
    const success = await updatePosition(id, data);
    if (success) handleCloseEdit();
  };

  const handleOpenCreate = () => setIsCreateModalOpen(true);
  const handleCloseCreate = () => {
    setIsCreateModalOpen(false);
    setSelectedIds([]);
  };

  const handleCreate = async (data) => {
    await createPosition(data);
    handleCloseCreate();
  };

  const handleToggle = (id) => {
    if (isEditing) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (isEditing) return;
    if (selectedIds.length === positions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(positions.map((p) => p.id));
    }
  };

  const allSelected = positions.length > 0 && selectedIds.length === positions.length;

  const handleDeleteClick = () => {
    setPendingDeleteIds(selectedIds);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const success = await deletePositions(pendingDeleteIds);
    if (success) setSelectedIds([]);
    setDeleteModalOpen(false);
    setPendingDeleteIds([]);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setPendingDeleteIds([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <PositionsToolbar
            selectedIds={selectedIds}
            onAdd={handleOpenCreate}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            isDeleting={isDeleting}
            deleteError={deleteError}
            filterValue={filterText}
            onFilterChange={setFilterText}
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
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tags
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <PositionsApi
                    positions={positions}
                    loading={loading}
                    error={error}
                    selectedIds={selectedIds}
                    onToggle={handleToggle}
                    disabled={isEditing}
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
        title="Delete Positions"
        message={`Are you sure you want to delete ${pendingDeleteIds.length} position(s)?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />

      <CreatePositionModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreate}
        onCreate={handleCreate}
        isCreating={isCreating}
        createError={createError}
      />

      <EditPositionModal
        isOpen={isEditing}
        onClose={handleCloseEdit}
        position={positions.find((p) => p.id === editingPositionId)}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
        updateError={updateError}
      />
    </div>
  );
}

export default PositionsTablePage;