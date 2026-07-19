import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PositionAttributesToolbar from '../positionAttribute/PositionAttributesToolbar';
import ConfirmModal from '../common/ConfirmModal';
import AddAttributeModal from '../positionAttribute/AddAttributeModal';
import { usePositionAttributes } from '../../hooks/positionAttributes/usePositionAttributes';
import { useAddPositionAttribute } from '../../hooks/positionAttributes/useAddPositionAttribute';
import { useRemovePositionAttribute } from '../../hooks/positionAttributes/useRemovePositionAttribute';
import { useAuth } from '../../hooks/useAuth';

function PositionPageAttributesLibraryAdd({ positionId, isCandidate = false }) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const isAuthenticated = !!user;
    
    const { attributes, loading, error, refetch } = usePositionAttributes(positionId);
    const { addPositionAttribute, isAdding, addError } = useAddPositionAttribute(refetch);
    const { removePositionAttribute, isRemoving, removeError } = useRemovePositionAttribute(refetch);

    const [selectedIds, setSelectedIds] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [pendingDeleteIds, setPendingDeleteIds] = useState([]);

    const handleToggle = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === attributes.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(attributes.map((attr) => attr.id));
        }
    };

    const allSelected = attributes.length > 0 && selectedIds.length === attributes.length;

    const handleOpenAddModal = () => setIsAddModalOpen(true);
    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
        setSelectedIds([]);
    };

    const handleAdd = async (attributeId) => {
        const success = await addPositionAttribute(positionId, attributeId);
        if (success) {
            handleCloseAddModal();
        }
    };

    const handleDeleteClick = () => {
        setPendingDeleteIds(selectedIds);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        let success = true;
        for (const id of pendingDeleteIds) {
            const result = await removePositionAttribute(positionId, id);
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 max-w-xl mx-auto relative transition-colors">
                <div className="text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base">{t('loading')}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 max-w-xl mx-auto relative transition-colors">
                <div className="text-center text-red-500 dark:text-red-400 text-sm sm:text-base">{t('error')}: {error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 max-w-xl mx-auto relative transition-colors">
            {isAuthenticated && !isCandidate && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-2">
                    <PositionAttributesToolbar
                        selectedIds={selectedIds}
                        onAdd={handleOpenAddModal}
                        onDelete={handleDeleteClick}
                        isDeleting={isRemoving}
                        deleteError={removeError}
                    />
                </div>
            )}

            <div className="flex flex-col">
                <h2 className="text-gray-800 dark:text-gray-100 text-xl sm:text-2xl font-bold mb-2 text-left transition-colors">
                    {t('requirements')}:
                </h2>
                {isAuthenticated && !isCandidate && attributes.length > 0 && (
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                            checked={allSelected}
                            onChange={handleSelectAll}
                            disabled={isRemoving}
                        />
                        <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t('selectAll')}</label>
                    </div>
                )}

                {attributes.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center text-sm sm:text-base">{t('noAttributesAssigned') || 'No attributes assigned'}</p>
                ) : (
                    <div className="flex flex-col space-y-2 sm:space-y-3">
                        {attributes.map((attr) => (
                            <div key={attr.id} className="flex items-center gap-3">
                                {isAuthenticated && !isCandidate && (
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                                        checked={selectedIds.includes(attr.id)}
                                        onChange={() => handleToggle(attr.id)}
                                        disabled={isRemoving}
                                    />
                                )}
                                <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-lg transition-colors">
                                    {attr.name}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AddAttributeModal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                onAdd={handleAdd}
                isAdding={isAdding}
                addError={addError}
                existingAttributes={attributes} 
            />

            <ConfirmModal
                isOpen={deleteModalOpen}
                title={t('removeAttributes') || 'Remove Attributes'}
                message={`${t('confirmRemoveAttributes') || 'Are you sure you want to remove'} ${pendingDeleteIds.length} ${t('attributePlural') || 'attribute(s)'} ${t('fromPosition') || 'from this position'}?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isLoading={isRemoving}
            />
        </div>
    );
}

export default PositionPageAttributesLibraryAdd;