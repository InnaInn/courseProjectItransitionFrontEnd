import React from 'react';
import ToolBar from './ToolBar';

function CandidateAttributes() {
    const attributes = [
        'Английский',
        'Java Script',
        'React',
        'CSS'
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <ToolBar></ToolBar>
            </div>
            <div className="flex flex-col">
                <h2 className="text-gray-800 text-2xl font-bold mb-4 text-left">
                    Атрибуты
                </h2>
                <div className="flex flex-col space-y-2">
                    {attributes.map((attribute, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                            <span className="text-gray-700 text-lg">
                                {attribute}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CandidateAttributes;