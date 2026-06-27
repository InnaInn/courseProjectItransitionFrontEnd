import React from 'react';
import deleteImg from '../images/deleteIcon.png';

function PositionPageCvCondidates() {
    const candidates = [
        { id: 1, name: 'Иванов Иван', link: '/cv/ivanov-ivan' },
        { id: 2, name: 'Петров Семен', link: '/cv/petrov-semen' }
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <button className="hover:opacity-70 transition-opacity">
                    <img src={deleteImg} alt="Delete" className="w-6 h-6" />
                </button>
            </div>
            <div className="flex flex-col">
                <h2 className="text-gray-800 text-2xl font-bold mb-4 text-left">
                    CV Кандидатов
                </h2>
                <div className="flex flex-col space-y-2">
                    {candidates.map((candidate) => (
                        <div key={candidate.id} className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                            <a 
                                href={candidate.link}
                                className="text-gray-700 text-lg hover:text-blue-600 hover:underline transition-colors"
                            >
                                {candidate.name}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PositionPageCvCondidates;