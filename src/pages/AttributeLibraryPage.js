import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ToolBar from '../components/common/ToolBar';
import AttributesApi from '../api/AttributesApi';
import ConfirmModal from '../components/common/ConfirmModal';
import CreateAttributeModal from '../components/attributes/CreateAttributeModal';
import EditAttributeModal from '../components/attributes/EditAttributeModal';
import { useAttributes } from '../hooks/attributes/useAttributes';
import { useDeleteAttributes } from '../hooks/attributes/useDeleteAttributes';
import { useCreateAttribute } from '../hooks/attributes/useCreateAttribute';
import { useUpdateAttribute } from '../hooks/attributes/useUpdateAttribute';

function AttributeLibraryPage() {
  const { t } = useTranslation();
  const [filterText, setFilterText] = useState('');
  const { attributes, loading, error, refetch } = useAttributes(filterText);
  
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAttributeId, setEditingAttributeId] = useState(null);

  const { deleteAttributes, isDeleting, deleteError } = useDeleteAttributes(refetch);
  const { createAttribute, isCreating, createError } = useCreateAttribute(refetch);
  const { updateAttribute, isUpdating, updateError } = useUpdateAttribute(refetch);

  const handleEdit = () => {
    if (selectedIds.length === 1) {
      const attr = attributes.find((a) => a.id === selectedIds[0]);
      if (attr) {
        setIsEditing(true);
        setEditingAttributeId(attr.id);
      }
    } else {
      alert(t('selectExactlyOne') || 'Please select exactly one attribute to edit.');
    }
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setEditingAttributeId(null);
    setSelectedIds([]);
  };

  const handleUpdate = async (id, data) => {
    const success = await updateAttribute(id, data);
    if (success) handleCloseEdit();
  };

  const handleOpenCreate = () => setIsCreateModalOpen(true);
  const handleCloseCreate = () => {
    setIsCreateModalOpen(false);
    setSelectedIds([]);
  };

  const handleCreate = async (payload) => {
    await createAttribute(payload);
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
    if (selectedIds.length === attributes.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(attributes.map((a) => a.id));
    }
  };

  const allSelected = attributes.length > 0 && selectedIds.length === attributes.length;

  const handleDeleteClick = () => {
    setPendingDeleteIds(selectedIds);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const success = await deleteAttributes(pendingDeleteIds);
    if (success) setSelectedIds([]);
    setDeleteModalOpen(false);
    setPendingDeleteIds([]);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setPendingDeleteIds([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <ToolBar
              selectedCount={selectedIds.length}
              onAdd={handleOpenCreate}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              isDeleting={isDeleting}
              deleteError={deleteError}
              showDuplicate={false}
            />
            <input
              type="text"
              placeholder={t('filterAttributes') || 'Filter attributes...'}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              disabled={isEditing || isDeleting}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-12">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                        checked={allSelected}
                        onChange={handleSelectAll}
                        disabled={isEditing}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('category') || 'Category'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('fieldType') || 'Field Type'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('possibleValues') || 'Possible Values'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('name')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <AttributesApi
                    attributes={attributes}
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
        title={t('deleteAttributes') || 'Delete Attributes'}
        message={`${t('confirmDelete') || 'Are you sure you want to delete'} ${pendingDeleteIds.length} ${t('attributePlural') || 'attribute(s)'}?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />

      <CreateAttributeModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreate}
        onCreate={handleCreate}
        isCreating={isCreating}
        createError={createError}
      />

      <EditAttributeModal
        isOpen={isEditing}
        onClose={handleCloseEdit}
        attribute={attributes.find((a) => a.id === editingAttributeId)}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
        updateError={updateError}
      />
    </div>
  );
}

export default AttributeLibraryPage;