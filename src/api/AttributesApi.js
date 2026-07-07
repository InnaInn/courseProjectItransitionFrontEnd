import React from 'react';

function AttributesApi({
  attributes,
  loading,
  error,
  selectedIds,
  onToggle,
  disabled = false,
}) {

  const renderValues = (values) => {
    if (!values || !Array.isArray(values) || values.length === 0) {
      return '—';
    }
    return values.map(v => typeof v === 'string' ? v.trim() : v).join(' ');
  };

  if (loading) {
    return (
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
          Loading...
        </td>
      </tr>
    );
  }

  if (error) {
    return (
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center text-red-500">
          Error: {error}
        </td>
      </tr>
    );
  }

  if (!attributes || attributes.length === 0) {
    return (
      <tr>
        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
          No attributes found
        </td>
      </tr>
    );
  }

  return (
    <>
      {attributes.map((attr) => (
        <tr key={attr.id} className="hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4 text-sm text-gray-700 text-left">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={selectedIds.includes(attr.id)}
              onChange={() => onToggle(attr.id)}
              disabled={disabled}
            />
          </td>
          <td className="px-6 py-4 text-sm text-gray-700 text-left">
            {attr.categoryValue || '—'}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700 text-left">
            {attr.type || '—'}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700 text-left">
            {renderValues(attr.values)}
          </td>
          <td className="px-6 py-4 text-sm text-gray-700 text-left">
            {attr.name || '—'}
          </td>
        </tr>
      ))}
    </>
  );
}

export default AttributesApi;