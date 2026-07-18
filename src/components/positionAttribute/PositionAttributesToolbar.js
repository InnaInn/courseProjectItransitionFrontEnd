import React from 'react';
import { useTranslation } from 'react-i18next';
import addImg from '../../images/addIcon.png';
import deleteImg from '../../images/deleteIcon.png';

const PositionAttributesToolbar = ({
  selectedIds,
  onAdd,
  onDelete,
  isDeleting,
  deleteError,
}) => {
  const { t } = useTranslation();
  const isDeleteDisabled = selectedIds.length === 0 || isDeleting;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onAdd}
        className="hover:opacity-70 transition-opacity"
        title={t('addAttribute') || 'Add attribute'}
      >
        <img src={addImg} alt={t('add') || 'Add'} className="w-5 h-5" />
      </button>

      <button
        onClick={onDelete}
        disabled={isDeleteDisabled}
        className={`hover:opacity-70 transition-opacity ${
          isDeleteDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title={t('deleteSelectedAttributes') || 'Delete selected attributes'}
      >
        <img src={deleteImg} alt={t('delete') || 'Delete'} className="w-5 h-5" />
      </button>

      {deleteError && (
        <span className="text-sm text-red-500 dark:text-red-400 ml-2">{deleteError}</span>
      )}
    </div>
  );
};

export default PositionAttributesToolbar;