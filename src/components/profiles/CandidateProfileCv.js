import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ToolBar from '../common/ToolBar';
import ConfirmModal from '../common/ConfirmModal';
import { useUserPositions } from '../../hooks/userPositions/useUserPositions';
import { useDeleteUserPosition } from '../../hooks/userPositions/useDeleteUserPosition';
import { useAuth } from '../../hooks/useAuth';

function CandidateProfileCv() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { positions, loading, error, refetch } = useUserPositions(user?.id);
    const { deleteUserPosition, isDeleting, deleteError } = useDeleteUserPosition(refetch);

    const [selectedIds, setSelectedIds] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [pendingDeleteIds, setPendingDeleteIds] = useState([]);

    const handleToggle = (positionId) => {
        setSelectedIds((prev) =>
            prev.includes(positionId)
                ? prev.filter((id) => id !== positionId)
                : [...prev, positionId]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === positions.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(positions.map((p) => p.positionId));
        }
    };

    const allSelected = positions.length > 0 && selectedIds.length === positions.length;

    const handleDeleteClick = () => {
        if (selectedIds.length === 0) return;
        setPendingDeleteIds([...selectedIds]);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        let success = true;
        const userId = user?.id;

        for (const positionId of pendingDeleteIds) {
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 max-w-xl relative transition-colors">
                <div className="text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base">{t('loading')}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 max-w-xl relative transition-colors">
                <div className="text-center text-red-500 dark:text-red-400 text-sm sm:text-base">{t('error')}: {error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 max-w-xl relative transition-colors">
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-2">
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
                <h2 className="text-gray-800 dark:text-gray-100 text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-left transition-colors">
                    {t('myApplications')}
                </h2>

                {positions.length > 0 && (
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                            checked={allSelected}
                            onChange={handleSelectAll}
                            disabled={isDeleting}
                            id="select-all-applications"
                        />
                        <label htmlFor="select-all-applications" className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            {t('selectAll')}
                        </label>
                    </div>
                )}

                {positions.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center text-sm sm:text-base">{t('noApplications')}</p>
                ) : (
                    <div className="flex flex-col space-y-1.5 sm:space-y-2">
                        {positions.map((pos) => (
                            <div key={pos.positionId} className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                                    checked={selectedIds.includes(pos.positionId)}
                                    onChange={() => handleToggle(pos.positionId)}
                                    disabled={isDeleting}
                                />
                                <Link
                                    to={`/cv-generation-page/${user?.id}?positionId=${pos.positionId}`}
                                    className="text-gray-700 dark:text-gray-300 text-base sm:text-lg hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                                >
                                    {pos.positionName || 'Untitled position'}
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
                {deleteError && (
                    <div className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400">{deleteError}</div>
                )}
            </div>

            <ConfirmModal
                isOpen={deleteModalOpen}
                title={t('deleteApplications') || 'Delete Applications'}
                message={`${t('confirmWithdraw') || 'Are you sure you want to withdraw'} ${pendingDeleteIds.length} ${t('applicationPlural') || 'application(s)'}?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isLoading={isDeleting}
            />
        </div>
    );
}

export default CandidateProfileCv;