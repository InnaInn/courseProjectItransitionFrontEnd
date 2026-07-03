import React from 'react';
import editImg from '../images/editIcon.png';
import deleteImg from '../images/deleteIcon.png';

const UsersToolbar = ({
  isEditing,
  selectedIds,
  onEdit,
  onSave,
  onCancel,
  filterValue,
  onFilterChange,
  onDelete,
  isDeleting,
  deleteError,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {!isEditing ? (
          <>
            <button
              className={`hover:opacity-70 transition-opacity ${selectedIds.length !== 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              onClick={onEdit}
              disabled={selectedIds.length !== 1}
            >
              <img src={editImg} alt="Edit" className="w-5 h-5" />
            </button>
            <button
              className={`hover:opacity-70 transition-opacity ${selectedIds.length === 0 || isDeleting
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
                }`}
              onClick={onDelete}
              disabled={selectedIds.length === 0 || isDeleting}
            >
              <img src={deleteImg} alt="Delete" className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </>
        )}
      </div>
      {deleteError && (
        <div className="text-red-600 text-sm ml-4">{deleteError}</div>
      )}

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Filter..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          disabled={isEditing || isDeleting}
        />
      </div>
    </div>
  );
};

export default UsersToolbar;