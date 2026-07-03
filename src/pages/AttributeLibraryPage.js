import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AttributeToolbar from '../components/AttributeToolbar';
import AttributesApi from '../api/AttributesApi';
import ConfirmModal from '../components/ConfirmModal';
import CreateAttributeModal from '../components/CreateAttributeModal';
import EditAttributeModal from '../components/EditAttributeModal';
import { useAttributes } from '../hooks/attributes/useAttributes';
import { useDeleteAttributes } from '../hooks/attributes/useDeleteAttributes';
import { useCreateAttribute } from '../hooks/attributes/useCreateAttribute';
import { useUpdateAttribute } from '../hooks/attributes/useUpdateAttribute';

function AttributeLibraryPage() {
  const { attributes, loading, error, refetch } = useAttributes();
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterText, setFilterText] = useState(''); 
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
      alert('Please select exactly one attribute to edit.');
    }
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setEditingAttributeId(null);
    setSelectedIds([]);
  };

  const handleUpdate = async (id, data) => {
    const success = await updateAttribute(id, data);
    if (success) {
      handleCloseEdit();
    }
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

  const allSelected =
    attributes.length > 0 && selectedIds.length === attributes.length;

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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <AttributeToolbar
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
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Field Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Possible Values
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <AttributesApi
                    attributes={attributes} // напрямую, без фильтрации
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
        title="Delete Attributes"
        message={`Are you sure you want to delete ${pendingDeleteIds.length} attribute(s)?`}
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