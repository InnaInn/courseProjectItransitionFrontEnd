import React from 'react';

const ConfirmModal = ({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  isLoading,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  showCancel = true,
  isError = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 dark:bg-opacity-60">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md transition-colors">
        <h2 className={`text-lg font-semibold mb-2 ${isError ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-100'}`}>
          {title || 'Confirmation'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 whitespace-pre-line transition-colors">
          {message || 'Are you sure?'}
        </p>
        <div className="flex justify-end gap-3">
          {showCancel && (
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 ${
              isError 
                ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600' 
                : 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
            }`}
          >
            {isLoading ? 'Loading...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;