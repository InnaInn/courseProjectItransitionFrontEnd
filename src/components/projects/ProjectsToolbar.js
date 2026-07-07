import React from 'react';
import addImg from '../../images/addIcon.png';
import editImg from '../../images/editIcon.png';
import deleteImg from '../../images/deleteIcon.png';

const ProjectsToolbar = ({
  selectedIds,
  onAdd,
  onEdit,
  onDelete,
  isDeleting,
  deleteError,
}) => {
  const isEditDisabled = selectedIds.length !== 1 || isDeleting;
  const isDeleteDisabled = selectedIds.length === 0 || isDeleting;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onAdd}
        className="hover:opacity-70 transition-opacity"
        title="Create new project"
      >
        <img src={addImg} alt="Add" className="w-5 h-5" />
      </button>

      <button
        onClick={onEdit}
        disabled={isEditDisabled}
        className={`hover:opacity-70 transition-opacity ${
          isEditDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title="Edit selected project"
      >
        <img src={editImg} alt="Edit" className="w-5 h-5" />
      </button>

      <button
        onClick={onDelete}
        disabled={isDeleteDisabled}
        className={`hover:opacity-70 transition-opacity ${
          isDeleteDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        title="Delete selected projects"
      >
        <img src={deleteImg} alt="Delete" className="w-5 h-5" />
      </button>

      {deleteError && (
        <span className="text-sm text-red-500 ml-2">{deleteError}</span>
      )}
    </div>
  );
};

export default ProjectsToolbar;