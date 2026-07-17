import React from 'react';
import addImg from '../../images/addIcon.png';
import deleteImg from '../../images/deleteIcon.png';

const PositionAttributesToolbar = ({
  selectedIds,
  onAdd,
  onDelete,
  isDeleting,
  deleteError,
}) => {
  const isDeleteDisabled = selectedIds.length === 0 || isDeleting;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onAdd}
        className="hover:opacity-70 transition-opacity"
        title="Add attribute"
      >
        <img src={addImg} alt="Add" className="w-5 h-5" />
      </button>

      <button
        onClick={onDelete}
        disabled={isDeleteDisabled}
        className={`hover:opacity-70 transition-opacity ${
          isDeleteDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title="Delete selected attributes"
      >
        <img src={deleteImg} alt="Delete" className="w-5 h-5" />
      </button>

      {deleteError && (
        <span className="text-sm text-red-500 dark:text-red-400 ml-2">{deleteError}</span>
      )}
    </div>
  );
};

export default PositionAttributesToolbar;