import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolBar from '../common/ToolBar';
import ConfirmModal from '../common/ConfirmModal';
import { usePositionUsers } from '../../hooks/userPositions/usePositionUsers';
import { useDeleteUserPosition } from '../../hooks/userPositions/useDeleteUserPosition';

function PositionPageCvCondidates({ positionId }) {
  const { candidates, loading, error, refetch } = usePositionUsers(positionId);
  const { deleteUserPosition, isDeleting, deleteError } = useDeleteUserPosition(refetch);

  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState([]);

  const handleToggle = (userId) => {
    setSelectedIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === candidates.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(candidates.map((c) => c.userId));
    }
  };

  const allSelected = candidates.length > 0 && selectedIds.length === candidates.length;

  const handleDeleteClick = () => {
    if (selectedIds.length === 0) return;
    setPendingDeleteIds([...selectedIds]);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    let success = true;
    for (const userId of pendingDeleteIds) {
      const result = await deleteUserPosition(userId, positionId);
      if (!result) {
        success = false;
        break;
      }
    }
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

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto relative">
        <div className="text-center text-gray-500">Loading candidates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto relative">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto relative">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ToolBar
          selectedCount={selectedIds.length}
          onDelete={handleDeleteClick}
          isDeleting={isDeleting}
          deleteError={deleteError}
          showAdd={false}
          showEdit={false}
        />
      </div>

      <div className="flex flex-col">
        <h2 className="text-gray-800 text-2xl font-bold mb-4 text-left">
          Candidate responses
        </h2>

        {candidates.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={allSelected}
              onChange={handleSelectAll}
              disabled={isDeleting}
              id="select-all-candidates"
            />
            <label htmlFor="select-all-candidates" className="text-sm text-gray-600">
              Select all
            </label>
          </div>
        )}

        {candidates.length === 0 ? (
          <p className="text-gray-500 text-center">No candidates yet</p>
        ) : (
          <div className="flex flex-col space-y-2">
            {candidates.map((candidate) => (
              <div key={candidate.userId} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={selectedIds.includes(candidate.userId)}
                  onChange={() => handleToggle(candidate.userId)}
                  disabled={isDeleting}
                />
                <Link
                  to={`/cv-generation-page/${candidate.userId}?positionId=${positionId}`}
                  className="text-gray-700 text-lg hover:text-blue-600 hover:underline transition-colors"
                >
                  {candidate.userFirstName} {candidate.userLastName}
                </Link>
              </div>
            ))}
          </div>
        )}
        {deleteError && (
          <div className="mt-2 text-sm text-red-600">{deleteError}</div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Remove Candidates"
        message={`Are you sure you want to remove ${pendingDeleteIds.length} candidate(s) from this position?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default PositionPageCvCondidates;