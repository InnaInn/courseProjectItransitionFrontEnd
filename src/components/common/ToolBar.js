import React from 'react';
import addImg from '../../images/addIcon.png';
import editImg from '../../images/editIcon.png';
import deleteImg from '../../images/deleteIcon.png';

const ToolBar = ({
 
  isEditing = false,
  onSave,
  onCancel,
  isSaving = false,

 
  showAdd = true,
  showEdit = true,
  showDelete = true,
  onAdd,
  onEdit,
  onDelete,
  isDeleting = false,
  selectedCount = 0,


  deleteError = null,

  
  showFilter = false,
  filterValue = '',
  onFilterChange,
  filterPlaceholder = 'Filter...',
  filterDisabled = false,

  className = '',
}) => {
  const isEditDisabled = selectedCount !== 1 || isEditing || isDeleting;
  const isDeleteDisabled = selectedCount === 0 || isDeleting;

 
  if (isEditing) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        {deleteError && (
          <span className="text-sm text-red-500 ml-2">{deleteError}</span>
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
          title="Add new"
        >
          <img src={addImg} alt="Add" className="w-5 h-5" />
        </button>
      )}

      {showEdit && (
        <button
          onClick={onEdit}
          disabled={isEditDisabled}
          className={`hover:opacity-70 transition-opacity ${
            isEditDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Edit selected"
        >
          <img src={editImg} alt="Edit" className="w-5 h-5" />
        </button>
      )}

      {showDelete && (
        <button
          onClick={onDelete}
          disabled={isDeleteDisabled}
          className={`hover:opacity-70 transition-opacity ${
            isDeleteDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Delete selected"
        >
          <img src={deleteImg} alt="Delete" className="w-5 h-5" />
        </button>
      )}

      {deleteError && (
        <span className="text-sm text-red-500 ml-2">{deleteError}</span>
      )}

      {showFilter && (
        <div className="ml-4">
          <input
            type="text"
            placeholder={filterPlaceholder}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
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