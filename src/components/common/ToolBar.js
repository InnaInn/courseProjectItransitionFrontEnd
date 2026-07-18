import React from 'react';
import { useTranslation } from 'react-i18next';
import addImg from '../../images/addIcon.png';
import editImg from '../../images/editIcon.png';
import deleteImg from '../../images/deleteIcon.png';
import duplicateImg from '../../images/duplicate.png';

const ToolBar = ({
  isEditing = false,
  onSave,
  onCancel,
  isSaving = false,

  showAdd = true,
  showEdit = true,
  showDelete = true,
  showDuplicate = false,
  onAdd,
  onEdit,
  onDelete,
  onDuplicate,
  isDeleting = false,
  isDuplicating = false,
  selectedCount = 0,

  deleteError = null,
  duplicateError = null,

  showFilter = false,
  filterValue = '',
  onFilterChange,
  filterPlaceholder = 'Filter...',
  filterDisabled = false,

  className = '',
}) => {
  const { t } = useTranslation();
  const isEditDisabled = selectedCount !== 1 || isEditing || isDeleting || isDuplicating;
  const isDeleteDisabled = selectedCount === 0 || isDeleting || isDuplicating;
  const isDuplicateDisabled = selectedCount !== 1 || isEditing || isDeleting || isDuplicating;

  if (isEditing) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? t('saving') || 'Saving...' : t('save')}
        </button>
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          {t('cancel')}
        </button>
        {deleteError && (
          <span className="text-sm text-red-500 dark:text-red-400 ml-2">{deleteError}</span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showAdd && (
        <button
          onClick={onAdd}
          className="hover:opacity-70 transition-opacity"
          title={t('add') || 'Add new'}
        >
          <img src={addImg} alt={t('add') || 'Add'} className="w-5 h-5" />
        </button>
      )}

      {showEdit && (
        <button
          onClick={onEdit}
          disabled={isEditDisabled}
          className={`hover:opacity-70 transition-opacity ${
            isEditDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title={t('edit') || 'Edit selected'}
        >
          <img src={editImg} alt={t('edit') || 'Edit'} className="w-5 h-5" />
        </button>
      )}

      {showDuplicate && (
        <button
          onClick={onDuplicate}
          disabled={isDuplicateDisabled}
          className={`hover:opacity-70 transition-opacity ${
            isDuplicateDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title={t('duplicate') || 'Duplicate selected'}
        >
          <img src={duplicateImg} alt={t('duplicate') || 'Duplicate'} className="w-5 h-5" />
        </button>
      )}

      {showDelete && (
        <button
          onClick={onDelete}
          disabled={isDeleteDisabled}
          className={`hover:opacity-70 transition-opacity ${
            isDeleteDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title={t('delete') || 'Delete selected'}
        >
          <img src={deleteImg} alt={t('delete') || 'Delete'} className="w-5 h-5" />
        </button>
      )}
      
      {deleteError && (
        <span className="text-sm text-red-500 dark:text-red-400 ml-2">{deleteError}</span>
      )}

      {duplicateError && (
        <span className="text-sm text-red-500 dark:text-red-400 ml-2">{duplicateError}</span>
      )}

      {showFilter && (
        <div className="ml-4">
          <input
            type="text"
            placeholder={filterPlaceholder}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            disabled={filterDisabled}
          />
        </div>
      )}
    </div>
  );
};

export default ToolBar;