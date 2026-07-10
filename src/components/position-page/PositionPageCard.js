import React from 'react';
import editImg from '../../images/editIcon.png';
import deleteImg from '../../images/deleteIcon.png';

function PositionPageCard({ 
    position, 
    isEditing, 
    editForm, 
    startEdit, 
    changeField, 
    onSave, 
    onCancel 
}) {
    if (!position) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto relative">
                <div className="text-center text-gray-500">Loading position...</div>
            </div>
        );
    }


    let tags = position.tags || position.technologies || [];
    if (typeof tags === 'string') {
        tags = tags.split(',').map(t => t.trim());
    }


    if (isEditing) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto relative">
                <div className="flex flex-col space-y-4">
    
                    <div className="flex items-baseline gap-3">
                        <span className="text-gray-600 font-medium text-lg whitespace-nowrap min-w-[100px]">
                            Name *
                        </span>
                        <input
                            type="text"
                            value={editForm.name || ''}
                            onChange={(e) => changeField('name', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter position name"
                        />
                    </div>

                
                    <div className="flex items-start gap-3">
                        <span className="text-gray-600 font-medium text-lg whitespace-nowrap min-w-[100px] pt-2">
                            Description
                        </span>
                        <textarea
                            value={editForm.description || ''}
                            onChange={(e) => changeField('description', e.target.value)}
                            rows="4"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter description"
                        />
                    </div>
                    <div className="flex items-baseline gap-3">
                        <span className="text-gray-600 font-medium text-lg whitespace-nowrap min-w-[100px]">
                            Tags
                        </span>
                        <input
                            type="text"
                            value={editForm.tags || ''}
                            onChange={(e) => changeField('tags', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter tags separated by commas (e.g. React, TypeScript)"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
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
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <button onClick={startEdit} className="hover:opacity-70 transition-opacity">
                    <img src={editImg} alt="Edit" className="w-5 h-5" />
                </button>
            </div>
            <div className="flex flex-col">
                <h2 className="text-gray-800 text-xl font-bold mb-2">
                    {position.name || 'Untitled Position'}
                </h2>
                <p className="text-gray-600 text-base text-justify leading-relaxed mb-3">
                    {position.description || 'No description provided'}
                </p>
                <div className="flex flex-wrap gap-2">
                    {tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium border border-blue-200"
                            >
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PositionPageCard;