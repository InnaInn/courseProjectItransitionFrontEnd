import React from 'react';
import { useTranslation } from 'react-i18next';

const ConfirmModal = ({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  isLoading,
  confirmText,
  cancelText,
  showCancel = true,
  isError = false
}) => {
  const { t } = useTranslation();
  
  if (!isOpen) return null;

  const defaultConfirmText = confirmText || t('delete');
  const defaultCancelText = cancelText || t('cancel');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 dark:bg-opacity-60 p-3 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto transition-colors">
        <h2 className={`text-base sm:text-lg font-semibold mb-2 ${isError ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-100'}`}>
          {title || t('confirmation') || 'Confirmation'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 whitespace-pre-line transition-colors text-sm sm:text-base">
          {message || t('areYouSure') || 'Are you sure?'}
        </p>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
          {showCancel && (
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              {defaultCancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`w-full sm:w-auto px-4 py-2.5 sm:py-2 text-sm sm:text-base font-medium text-white rounded-md transition-colors disabled:opacity-50 ${
              isError 
                ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600' 
                : 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
            }`}
          >
            {isLoading ? t('loading') || 'Loading...' : defaultConfirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;