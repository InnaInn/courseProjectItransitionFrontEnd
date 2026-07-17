import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ToolBar from '../components/common/ToolBar';
import PositionsApi from '../api/PositionsApi';
import ConfirmModal from '../components/common/ConfirmModal';
import CreatePositionModal from '../components/positions/CreatePositionModal';
import EditPositionModal from '../components/positions/EditPositionModal';
import { usePositions } from '../hooks/positions/usePositions';
import { useCreatePosition } from '../hooks/positions/useCreatePosition';
import { useUpdatePosition } from '../hooks/positions/useUpdatePosition';
import { useDeletePosition } from '../hooks/positions/useDeletePositions';
import { useDuplicatePosition } from '../hooks/positions/useDuplicatePosition';
import { useAuth } from '../hooks/useAuth';

function PositionsTablePage() {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const isCandidate = user?.role === 'CANDIDATE';
  const isHomePage = window.location.pathname === '/';

  const [filterText, setFilterText] = useState('');
  const { positions, loading, error, refetch } = usePositions(isHomePage ? '' : filterText);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editingPositionId, setEditingPositionId] = useState(null);

  const { deletePositions, isDeleting, deleteError } = useDeletePosition(refetch);
  const { createPosition, isCreating, createError } = useCreatePosition(refetch);
  const { updatePosition, isUpdating, updateError } = useUpdatePosition(refetch);
  const { duplicatePosition, isDuplicating, duplicateError } = useDuplicatePosition(refetch);

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

  const handleDuplicate = async () => {
    if (selectedIds.length === 1) {
      const positionId = selectedIds[0];
      const success = await duplicatePosition(positionId);
      if (success) {
        setSelectedIds([]);
      }
    } else {
      alert('Please select exactly one position to duplicate.');
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
    if (success) {
      setSelectedIds([]);
      setDeleteModalOpen(false);
      setPendingDeleteIds([]);
    }
    // Если ошибка - она покажется в тулбаре, модалка закроется
    setDeleteModalOpen(false);
    setPendingDeleteIds([]);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setPendingDeleteIds([]);
  };

  const renderPositionRow = (pos) => (
    <tr key={pos.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-left">
        <Link
          to={`/position/${pos.id}`}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
        >
          {pos.name}
        </Link>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-left">
        {pos.description || '-'}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-left">
        N/A
      </td>
    </tr>
  );

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={isHomePage ? 3 : (isCandidate ? 3 : 4)} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
            Loading...
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={isHomePage ? 3 : (isCandidate ? 3 : 4)} className="px-6 py-4 text-center text-red-500 dark:text-red-400">
            Error: {error}
          </td>
        </tr>
      );
    }

    if (!positions || positions.length === 0) {
      return (
        <tr>
          <td colSpan={isHomePage ? 3 : (isCandidate ? 3 : 4)} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
            No positions found
          </td>
        </tr>
      );
    }

    if (isHomePage) {
      return positions.map(renderPositionRow);
    }

    if (isCandidate) {
      return positions.map(renderPositionRow);
    }

    return (
      <PositionsApi
        positions={positions}
        loading={loading}
        error={error}
        selectedIds={selectedIds}
        onToggle={handleToggle}
        disabled={isEditing}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {isHomePage ? (
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Available Jobs Today
              </h1>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-4">
              {!isCandidate && (
                <ToolBar
                  selectedCount={selectedIds.length}
                  onAdd={handleOpenCreate}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                  onDuplicate={handleDuplicate}
                  showDuplicate={true}
                  isDeleting={isDeleting}
                  isDuplicating={isDuplicating}
                  deleteError={deleteError}
                  duplicateError={duplicateError}
                />
              )}
              <input
                type="text"
                placeholder="Filter positions by name..."
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                disabled={isEditing || isDeleting || isDuplicating}
              />
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    {!isHomePage && !isCandidate && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-12">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                          checked={allSelected}
                          onChange={handleSelectAll}
                          disabled={isEditing || isDuplicating}
                        />
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tags
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