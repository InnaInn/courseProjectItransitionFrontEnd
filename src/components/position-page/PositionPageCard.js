import React from 'react';
import editImg from '../../images/editIcon.png';
import deleteImg from '../../images/deleteIcon.png';

function PositionPageCard() {
    const position = {
        title: 'Front-end Developer',
        description: 'Developing user interfaces for web applications using React, TypeScript, and Tailwind CSS. Responsible for creating responsive and accessible components, optimizing performance, and collaborating with designers and backend developers.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit']
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <button className="hover:opacity-70 transition-opacity">
                    <img src={editImg} alt="Edit" className="w-5 h-5" />
                </button>
                <button className="hover:opacity-70 transition-opacity">
                    <img src={deleteImg} alt="Delete" className="w-5 h-5" />
                </button>
            </div>
            <div className="flex flex-col">
                <h2 className="text-gray-800 text-xl font-bold mb-2">
                    {position.title}
                </h2>
                <p className="text-gray-600 text-base text-justify leading-relaxed mb-3">
                    {position.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {position.technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium border border-blue-200"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PositionPageCard;