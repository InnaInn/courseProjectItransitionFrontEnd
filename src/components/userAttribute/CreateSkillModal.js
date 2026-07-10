import React, { useState, useEffect } from 'react';
import { useAttributes } from '../../hooks/attributes/useAttributes';

const CreateSkillModal = ({
  isOpen,
  onClose,
  onCreate,
  isCreating,
  createError,
}) => {
  const { attributes, loading: attributesLoading } = useAttributes();
  const [formData, setFormData] = useState({
    attributeId: '',
    value: '',
  });

  const selectedAttribute = attributes.find(
    (attr) => String(attr.id) === String(formData.attributeId)
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({ attributeId: '', value: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttributeChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      attributeId: value,
      value: '',
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      value: e.target.checked ? 'true' : 'false',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      attributeId: formData.attributeId,
      value: formData.value,
    };
    onCreate(payload);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const renderValueInput = () => {
    if (!selectedAttribute) {
      return (
        <div className="text-gray-400 text-sm italic">
          Please select a skill first
        </div>
      );
    }

    const type = selectedAttribute.type;

    switch (type) {
      case 'Boolean':
        return (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.value === 'true'}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-600">Enable this skill</label>
          </div>
        );

      case 'Numeric':
        return (
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number"
          />
        );

      case 'Date':
        return (
          <input
            type="date"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );

      case 'Period':
        const [startDate, endDate] = formData.value.split(' - ');
        return (
          <div className="flex gap-2">
            <input
              type="date"
              value={startDate || ''}
              onChange={(e) => {
                const start = e.target.value;
                const end = endDate || '';
                setFormData((prev) => ({
                  ...prev,
                  value: start ? `${start} - ${end}` : '',
                }));
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Start date"
            />
            <input
              type="date"
              value={endDate || ''}
              onChange={(e) => {
                const end = e.target.value;
                const start = startDate || '';
                setFormData((prev) => ({
                  ...prev,
                  value: start ? `${start} - ${end}` : '',
                }));
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="End date"
            />
          </div>
        );

      case 'One of many':
        let options = [];
        if (Array.isArray(selectedAttribute.values)) {
          options = selectedAttribute.values;
        } else if (typeof selectedAttribute.values === 'string') {
          options = selectedAttribute.values.split(',').map(v => v.trim());
        }

        return (
          <select
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select option</option>
            {options.map((opt, i) => (
              <option key={i} value={typeof opt === 'string' ? opt.trim() : opt}>
                {typeof opt === 'string' ? opt.trim() : opt}
              </option>
            ))}
          </select>
        );

      case 'Image':
        return (
          <input
            type="url"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image URL"
          />
        );

      case 'Text':
        return (
          <textarea
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter text"
          />
        );

      default:
        return (
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter value"
          />
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Add New Skill
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill *
            </label>
            {attributesLoading ? (
              <div className="text-gray-500 text-sm">Loading skills...</div>
            ) : (
              <select
                value={formData.attributeId}
                onChange={handleAttributeChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select skill</option>
                {attributes.map((attr) => (
                  <option key={attr.id} value={attr.id}>
                    {attr.name} {attr.categoryValue ? `(${attr.categoryValue})` : ''}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Value {selectedAttribute ? `(${selectedAttribute.type})` : ''}
            </label>
            {renderValueInput()}
          </div>

          {createError && (
            <div className="mb-4 text-sm text-red-600">{createError}</div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isCreating}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isCreating ? 'Adding...' : 'Add Skill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSkillModal;