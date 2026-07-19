import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAttributes } from '../../hooks/attributes/useAttributes';

const AddAttributeModal = ({
  isOpen,
  onClose,
  onAdd,
  isAdding,
  addError,
  existingAttributes = [], 
}) => {
  const { t } = useTranslation();
  const { attributes, loading: attributesLoading } = useAttributes();
  const [selectedAttributeId, setSelectedAttributeId] = useState('');


  const existingIds = existingAttributes.map(attr => String(attr.id));
  const availableAttributes = attributes.filter(
    attr => !existingIds.includes(String(attr.id))
  );

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

  const hasAvailableAttributes = availableAttributes.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 dark:bg-opacity-60 p-3 sm:p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto transition-colors">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4 text-center">
          {t('addAttributeToPosition') || 'Add Attribute to Position'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 sm:mb-4">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('selectAttribute') || 'Select Attribute'} *
            </label>
            {attributesLoading ? (
              <div className="text-gray-500 dark:text-gray-400 text-sm">{t('loading')}</div>
            ) : !hasAvailableAttributes ? (
              <div className="text-gray-500 dark:text-gray-400 text-sm italic">
                {t('allAttributesAdded') || 'All attributes are already added'}
              </div>
            ) : (
              <select
                value={selectedAttributeId}
                onChange={(e) => setSelectedAttributeId(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              >
                <option value="">{t('selectAttribute') || 'Select attribute'}</option>
                {availableAttributes.map((attr) => (
                  <option key={attr.id} value={attr.id}>
                    {attr.name} {attr.categoryValue ? `(${attr.categoryValue})` : ''}
                  </option>
                ))}
              </select>
            )}
            {!attributesLoading && hasAvailableAttributes && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {availableAttributes.length} {t('attributePlural') || 'attribute(s)'} {t('available') || 'available'}
              </p>
            )}
          </div>

          {addError && (
            <div className="mb-3 sm:mb-4 text-sm text-red-600 dark:text-red-400">{addError}</div>
          )}

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isAdding}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={isAdding || !selectedAttributeId || !hasAvailableAttributes}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isAdding ? t('adding') || 'Adding...' : t('add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAttributeModal;