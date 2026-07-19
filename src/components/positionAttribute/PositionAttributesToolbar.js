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
    <div className="flex items-center gap-2 sm:gap-3">
      <button
        onClick={onAdd}
        className="hover:opacity-70 transition-opacity p-1"
        title={t('addAttribute') || 'Add attribute'}
      >
        <img src={addImg} alt={t('add') || 'Add'} className="w-6 h-6" />
      </button>

      <button
        onClick={onDelete}
        disabled={isDeleteDisabled}
        className={`hover:opacity-70 transition-opacity p-1 ${
          isDeleteDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title={t('deleteSelectedAttributes') || 'Delete selected attributes'}
      >
        <img src={deleteImg} alt={t('delete') || 'Delete'} className="w-6 h-6" />
      </button>

      {deleteError && (
        <span className="text-xs sm:text-sm text-red-500 dark:text-red-400 ml-1 sm:ml-2">{deleteError}</span>
      )}
    </div>
  );
};

export default PositionAttributesToolbar;