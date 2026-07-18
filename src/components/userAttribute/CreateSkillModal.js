import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { useAttributes } from '../../hooks/attributes/useAttributes';

const CreateSkillModal = ({
  isOpen,
  onClose,
  onCreate,
  isCreating,
  createError,
  existingAttributes = [], 
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const { attributes, loading: attributesLoading } = useAttributes(searchTerm);
  
  const [formData, setFormData] = useState({
    attributeId: '',
    value: '',
  });
  
  const [selectedAttribute, setSelectedAttribute] = useState(null);

 
  const existingIds = existingAttributes.map(attr => String(attr.id));
  const availableAttributes = attributes.filter(
    attr => !existingIds.includes(String(attr.id))
  );

  const options = availableAttributes.map((attr) => ({
    value: String(attr.id),
    label: `${attr.name}${attr.categoryValue ? ` (${attr.categoryValue})` : ''}`,
  }));

  const selectedOption = options.find(opt => opt.value === String(formData.attributeId));

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
      setSearchTerm('');
      setSelectedAttribute(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (formData.attributeId && availableAttributes.length > 0) {
      const found = availableAttributes.find(attr => String(attr.id) === String(formData.attributeId));
      if (found) {
        setSelectedAttribute(found);
      }
    }
  }, [availableAttributes, formData.attributeId]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected) => {
    if (selected) {
      const found = availableAttributes.find(attr => String(attr.id) === String(selected.value));
      if (found) {
        setSelectedAttribute(found);
      }
      setFormData((prev) => ({
        ...prev,
        attributeId: String(selected.value),
        value: '',
      }));
      setSearchTerm(selected.label);
    } else {
      setSelectedAttribute(null);
      setFormData((prev) => ({
        ...prev,
        attributeId: '',
        value: '',
      }));
    }
  };

  const handleInputChange = (inputValue) => {
    setSearchTerm(inputValue);
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
        <div className="text-gray-400 dark:text-gray-500 text-sm italic">
          {t('pleaseSelectSkill') || 'Please select a skill first'}
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
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
            />
            <label className="text-sm text-gray-600 dark:text-gray-400">{t('enableSkill') || 'Enable this skill'}</label>
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            placeholder={t('enterNumber') || 'Enter number'}
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
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
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              placeholder={t('startDate') || 'Start date'}
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
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              placeholder={t('endDate') || 'End date'}
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
          >
            <option value="">{t('selectOption') || 'Select option'}</option>
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            placeholder={t('enterImageUrl') || 'Enter image URL'}
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            placeholder={t('enterText') || 'Enter text'}
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            placeholder={t('enterValue') || 'Enter value'}
          />
        );
    }
  };

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      '&:hover': { borderColor: '#3b82f6' },
      boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none',
      backgroundColor: '#ffffff',
      minHeight: '42px',
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      backgroundColor: '#ffffff',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#e5e7eb' : '#ffffff',
      color: '#1f2937',
      cursor: 'pointer',
      padding: '8px 12px',
    }),
    singleValue: (base) => ({
      ...base,
      color: '#1f2937',
    }),
    input: (base) => ({
      ...base,
      color: '#1f2937',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#9ca3af',
    }),
    clearIndicator: (base) => ({
      ...base,
      color: '#9ca3af',
      cursor: 'pointer',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#9ca3af',
      cursor: 'pointer',
    }),
  };

  const darkSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? '#3b82f6' : '#4b5563',
      '&:hover': { borderColor: '#3b82f6' },
      boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none',
      backgroundColor: '#374151',
      minHeight: '42px',
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      backgroundColor: '#1f2937',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#374151' : '#1f2937',
      color: '#f3f4f6',
      cursor: 'pointer',
      padding: '8px 12px',
      '&:active': {
        backgroundColor: '#374151',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: '#f3f4f6',
    }),
    input: (base) => ({
      ...base,
      color: '#f3f4f6',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#9ca3af',
    }),
    clearIndicator: (base) => ({
      ...base,
      color: '#9ca3af',
      cursor: 'pointer',
      '&:hover': {
        color: '#f3f4f6',
      },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#9ca3af',
      cursor: 'pointer',
      '&:hover': {
        color: '#f3f4f6',
      },
    }),
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 dark:bg-opacity-60"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md transition-colors">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
          {t('addNewSkill') || 'Add New Skill'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('skill') || 'Skill'} *
            </label>
            <Select
              options={options}
              value={selectedOption}
              onChange={handleSelectChange}
              onInputChange={handleInputChange}
              placeholder={t('typeToSearch') || 'Type to search skill...'}
              isClearable
              isLoading={attributesLoading}
              noOptionsMessage={() => t('noSkillsAvailable') || 'No skills available'}
              styles={typeof window !== 'undefined' && document.documentElement.classList.contains('dark') 
                ? darkSelectStyles 
                : customSelectStyles
              }
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {options.length} {t('skillPlural') || 'skill(s)'} {t('available') || 'available'}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('value') || 'Value'} {selectedAttribute ? `(${selectedAttribute.type})` : ''}
            </label>
            {renderValueInput()}
          </div>

          {createError && (
            <div className="mb-4 text-sm text-red-600 dark:text-red-400">{createError}</div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isCreating}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isCreating ? t('adding') || 'Adding...' : t('addSkill') || 'Add Skill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSkillModal;