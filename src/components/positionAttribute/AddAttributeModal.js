import React, { useState, useEffect } from 'react';
import { useAttributes } from '../../hooks/attributes/useAttributes';

const AddAttributeModal = ({
  isOpen,
  onClose,
  onAdd,
  isAdding,
  addError,
}) => {
  const { attributes, loading: attributesLoading } = useAttributes();
  const [selectedAttributeId, setSelectedAttributeId] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedAttributeId('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAttributeId) {
      onAdd(selectedAttributeId);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Add Attribute to Position
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Attribute *
            </label>
            {attributesLoading ? (
              <div className="text-gray-500 text-sm">Loading attributes...</div>
            ) : (
              <select
                value={selectedAttributeId}
                onChange={(e) => setSelectedAttributeId(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select attribute</option>
                {attributes.map((attr) => (
                  <option key={attr.id} value={attr.id}>
                    {attr.name} {attr.categoryValue ? `(${attr.categoryValue})` : ''}
                  </option>
                ))}
              </select>
            )}
          </div>

          {addError && (
            <div className="mb-4 text-sm text-red-600">{addError}</div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isAdding}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdding || !selectedAttributeId}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isAdding ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAttributeModal;