import React from 'react';
import { Link } from 'react-router-dom';

function PositionsApi({
  positions,
  loading,
  error,
  selectedIds,
  onToggle,
  disabled = false,
}) {
  if (loading) {
    return (
      <tr>
        <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
          Loading...
        </td>
      </tr>
    );
  }

  if (error) {
    return (
      <tr>
        <td colSpan="4" className="px-6 py-4 text-center text-red-500 dark:text-red-400">
          Error: {error}
        </td>
      </tr>
    );
  }

  if (!positions || positions.length === 0) {
    return (
      <tr>
        <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
          No positions found
        </td>
      </tr>
    );
  }

  return (
    <>
      {positions.map((pos) => (
        <tr key={pos.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-left">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
              checked={selectedIds.includes(pos.id)}
              onChange={() => onToggle(pos.id)}
              disabled={disabled}
            />
          </td>
          <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-left">
            <Link
              to={`/position/${pos.id}`}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
            >
              {pos.name}
            </Link>
          </td>
          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-left">
            {pos.description || '-'}
          </td>
          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-left">
            N/A
          </td>
        </tr>
      ))}
    </>
  );
}

export default PositionsApi;