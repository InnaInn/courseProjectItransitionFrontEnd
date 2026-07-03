import React from 'react';
import addImg from '../images/addIcon.png';
import editImg from '../images/editIcon.png';
import deleteImg from '../images/deleteIcon.png';

const AttributeToolbar = ({
  selectedIds,
  onAdd,
  onEdit,
  onDelete,
  isDeleting,
  deleteError,
  filterValue,
  onFilterChange,
}) => {
  const isEditDisabled = selectedIds.length !== 1 || isDeleting;
  const isDeleteDisabled = selectedIds.length === 0 || isDeleting;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onAdd}
          className="hover:opacity-70 transition-opacity"
          title="Create new attribute"
        >
          <img src={addImg} alt="Add" className="w-5 h-5" />
        </button>

        <button
          onClick={onEdit}
          disabled={isEditDisabled}
          className={`hover:opacity-70 transition-opacity ${isEditDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          title="Edit selected attribute"
        >
          <img src={editImg} alt="Edit" className="w-5 h-5" />
        </button>

        <button
          onClick={onDelete}
          disabled={isDeleteDisabled}
          className={`hover:opacity-70 transition-opacity ${isDeleteDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          title="Delete selected attributes"
        >
          <img src={deleteImg} alt="Delete" className="w-5 h-5" />
        </button>

        {deleteError && (
          <span className="text-sm text-red-500 ml-2">{deleteError}</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Filter..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          disabled={isDeleting}
        />
      </div>
    </div>
  );
};

export default AttributeToolbar;