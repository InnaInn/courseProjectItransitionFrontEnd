import React, { useState } from 'react';
import editImg from '../../images/editIcon.png';
import deleteImg from '../../images/deleteIcon.png';
import { useApplyToPosition } from '../../hooks/userPositions/useApplyToPosition';
import { useAuth } from '../../hooks/useAuth';

function PositionPageCard({
    position,
    isEditing,
    editForm,
    startEdit,
    changeField,
    onSave,
    onCancel,
    isCandidate = false,
    hasApplied = false,
    refetchUserPositions = () => {},
}) {
    const { user } = useAuth();
    const { applyToPosition, isApplying, applyError } = useApplyToPosition(refetchUserPositions);
    const [localApplied, setLocalApplied] = useState(false);
    
    const isAuthenticated = !!user;

    if (!position) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl mx-auto relative transition-colors">
                <div className="text-center text-gray-500 dark:text-gray-400">Loading position...</div>
            </div>
        );
    }

    let tags = position.tags || position.technologies || [];
    if (typeof tags === 'string') {
        tags = tags.split(',').map(t => t.trim());
    }

    const handleApply = async () => {
        if (!user || hasApplied || localApplied) return;
        const success = await applyToPosition(user.id, position.id);
        if (success) {
            setLocalApplied(true);
        }
    };

    const isApplied = hasApplied || localApplied;

    if (isEditing) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl mx-auto relative transition-colors">
                <div className="flex flex-col space-y-4">
                    <div className="flex items-baseline gap-3">
                        <span className="text-gray-600 dark:text-gray-400 font-medium text-lg whitespace-nowrap min-w-[100px]">
                            Name *
                        </span>
                        <input
                            type="text"
                            value={editForm.name || ''}
                            onChange={(e) => changeField('name', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                            placeholder="Enter position name"
                        />
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-gray-600 dark:text-gray-400 font-medium text-lg whitespace-nowrap min-w-[100px] pt-2">
                            Description
                        </span>
                        <textarea
                            value={editForm.description || ''}
                            onChange={(e) => changeField('description', e.target.value)}
                            rows="4"
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                            placeholder="Enter description"
                        />
                    </div>
                    <div className="flex items-baseline gap-3">
                        <span className="text-gray-600 dark:text-gray-400 font-medium text-lg whitespace-nowrap min-w-[100px]">
                            Tags
                        </span>
                        <input
                            type="text"
                            value={editForm.tags || ''}
                            onChange={(e) => changeField('tags', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                            placeholder="Enter tags separated by commas"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onSave}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl mx-auto relative transition-colors">
            {isAuthenticated && (
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    {isCandidate ? (
                        <button
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                isApplied || isApplying
                                    ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                            onClick={handleApply}
                            disabled={isApplied || isApplying}
                        >
                            {isApplying ? 'Applying...' : isApplied ? 'Applied' : 'Apply'}
                        </button>
                    ) : (
                        <button onClick={startEdit} className="hover:opacity-70 transition-opacity">
                            <img src={editImg} alt="Edit" className="w-5 h-5" />
                        </button>
                    )}
                </div>
            )}
            <div className="flex flex-col">
                <h2 className="text-gray-800 dark:text-gray-100 text-2xl font-bold mb-2 transition-colors">
                    {position.name || 'Untitled Position'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg text-justify leading-relaxed mb-3 transition-colors">
                    {position.description || 'No description provided'}
                </p>
                <div className="flex flex-wrap gap-2">
                    {tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-md text-sm font-medium border border-blue-200 dark:border-blue-700 transition-colors"
                            >
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-sm">N/A</span>
                    )}
                </div>
                {applyError && (
                    <div className="mt-2 text-sm text-red-600 dark:text-red-400">{applyError}</div>
                )}
            </div>
        </div>
    );
}

export default PositionPageCard;