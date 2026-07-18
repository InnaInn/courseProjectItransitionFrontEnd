import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ToolBar from '../common/ToolBar';
import ConfirmModal from '../common/ConfirmModal';
import { usePositionUsers } from '../../hooks/userPositions/usePositionUsers';
import { useDeleteUserPosition } from '../../hooks/userPositions/useDeleteUserPosition';

function PositionPageCvCondidates({ positionId }) {
  const { t } = useTranslation();
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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl mx-auto relative transition-colors">
        <div className="text-center text-gray-500 dark:text-gray-400">{t('loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl mx-auto relative transition-colors">
        <div className="text-center text-red-500 dark:text-red-400">{t('error')}: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl mx-auto relative transition-colors">
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
        <h2 className="text-gray-800 dark:text-gray-100 text-2xl font-bold mb-4 text-left transition-colors">
          {t('candidateResponses') || 'Candidate responses'}
        </h2>

        {candidates.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
              checked={allSelected}
              onChange={handleSelectAll}
              disabled={isDeleting}
              id="select-all-candidates"
            />
            <label htmlFor="select-all-candidates" className="text-sm text-gray-600 dark:text-gray-400">
              {t('selectAll')}
            </label>
          </div>
        )}

        {candidates.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">{t('noCandidatesYet') || 'No candidates yet'}</p>
        ) : (
          <div className="flex flex-col space-y-2">
            {candidates.map((candidate) => (
              <div key={candidate.userId} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                  checked={selectedIds.includes(candidate.userId)}
                  onChange={() => handleToggle(candidate.userId)}
                  disabled={isDeleting}
                />
                <Link
                  to={`/cv-generation-page/${candidate.userId}?positionId=${positionId}`}
                  className="text-gray-700 dark:text-gray-300 text-lg hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                >
                  {candidate.userFirstName} {candidate.userLastName}
                </Link>
              </div>
            ))}
          </div>
        )}
        {deleteError && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400">{deleteError}</div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title={t('removeCandidates') || 'Remove Candidates'}
        message={`${t('confirmRemoveCandidates') || 'Are you sure you want to remove'} ${pendingDeleteIds.length} ${t('candidatePlural') || 'candidate(s)'} ${t('fromPosition') || 'from this position'}?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default PositionPageCvCondidates;