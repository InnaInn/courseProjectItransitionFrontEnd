import React, { useState } from 'react';
import PositionAttributesToolbar from '../positionAttribute/PositionAttributesToolbar';
import ConfirmModal from '../common/ConfirmModal';
import AddAttributeModal from '../positionAttribute/AddAttributeModal';
import { usePositionAttributes } from '../../hooks/positionAttributes/usePositionAttributes';
import { useAddPositionAttribute } from '../../hooks/positionAttributes/useAddPositionAttribute';
import { useRemovePositionAttribute } from '../../hooks/positionAttributes/useRemovePositionAttribute';

function PositionPageAttributesLibraryAdd({ positionId, isCandidate = false }) {
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
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto relative">
                <div className="text-center text-gray-500">Loading attributes...</div>
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
            {!isCandidate && (
                <div className="absolute top-4 right-4 flex items-center gap-2">
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
                <h2 className="text-gray-800 text-2xl font-bold mb-2 text-left">
                    Requirements:
                </h2>

                {!isCandidate && (
                    <div className="flex items-center gap-2 mb-4">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked={allSelected}
                            onChange={handleSelectAll}
                            disabled={isRemoving}
                        />
                        <label className="text-sm text-gray-600">Select all</label>
                    </div>
                )}

                {attributes.length === 0 ? (
                    <p className="text-gray-500 text-center">No attributes assigned</p>
                ) : (
                    <div className="flex flex-col space-y-2">
                        {attributes.map((attr) => (
                            <div key={attr.id} className="flex items-center gap-3">
                                {!isCandidate && (
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        checked={selectedIds.includes(attr.id)}
                                        onChange={() => handleToggle(attr.id)}
                                        disabled={isRemoving}
                                    />
                                )}
                                <span className="text-gray-700 text-lg">
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
            />

            <ConfirmModal
                isOpen={deleteModalOpen}
                title="Remove Attributes"
                message={`Are you sure you want to remove ${pendingDeleteIds.length} attribute(s) from this position?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isLoading={isRemoving}
            />
        </div>
    );
}

export default PositionPageAttributesLibraryAdd;