import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolBar from '../common/ToolBar';
import ConfirmModal from '../common/ConfirmModal';
import { useUserPositions } from '../../hooks/userPositions/useUserPositions';
import { useDeleteUserPosition } from '../../hooks/userPositions/useDeleteUserPosition';
import { useAuth } from '../../hooks/useAuth';

function CandidateProfileCv() {
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl relative transition-colors">
                <div className="text-center text-gray-500 dark:text-gray-400">Loading applied positions...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl relative transition-colors">
                <div className="text-center text-red-500 dark:text-red-400">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl relative transition-colors">
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
                    My Applications
                </h2>

                {positions.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                            checked={allSelected}
                            onChange={handleSelectAll}
                            disabled={isDeleting}
                            id="select-all-applications"
                        />
                        <label htmlFor="select-all-applications" className="text-sm text-gray-600 dark:text-gray-400">
                            Select all
                        </label>
                    </div>
                )}

                {positions.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center">No applications yet</p>
                ) : (
                    <div className="flex flex-col space-y-2">
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
                                    className="text-gray-700 dark:text-gray-300 text-lg hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                                >
                                    {pos.positionName || 'Untitled position'}
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
                title="Delete Applications"
                message={`Are you sure you want to withdraw ${pendingDeleteIds.length} application(s)?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isLoading={isDeleting}
            />
        </div>
    );
}

export default CandidateProfileCv;