import React from 'react';
import { useTranslation } from 'react-i18next';

function AttributesApi({
  attributes,
  loading,
  error,
  selectedIds,
  onToggle,
  disabled = false,
}) {
  const { t } = useTranslation();

  const renderValues = (values) => {
    if (!values || !Array.isArray(values) || values.length === 0) {
      return '—';
    }
    return values.map(v => typeof v === 'string' ? v.trim() : v).join(' ');
  };

  if (loading) {
    return (
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
          {t('loading')}
        </td>
      </tr>
    );
  }

  if (error) {
    return (
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center text-red-500 dark:text-red-400">
          {t('error')}: {error}
        </td>
      </tr>
    );
  }

  if (!attributes || attributes.length === 0) {
    return (
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
          {t('noAttributes') || 'No attributes found'}
        </td>
      </tr>
    );
  }

  return (
    <>
      {attributes.map((attr) => (
        <tr key={attr.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-left">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
              checked={selectedIds.includes(attr.id)}
              onChange={() => onToggle(attr.id)}
              disabled={disabled}
            />
          </td>
          <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-left">
            {attr.categoryValue || '—'}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-left">
            {attr.type || '—'}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-left">
            {renderValues(attr.values)}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-left">
            {attr.name || '—'}
          </td>
        </tr>
      ))}
    </>
  );
}

export default AttributesApi;