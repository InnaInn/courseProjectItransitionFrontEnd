import React from 'react';
import editImg from '../images/editIcon.png';
import addImg from '../images/addIcon.png';
import deleteImg from '../images/deleteIcon.png';

function CandidateProfileInfo() {
    const skills = [
        { name: 'JavaScript', years: '5 years' },
        { name: 'HTML 5', years: '4 years' },
        { name: 'CSS 3', years: '4 years' },
        { name: 'React 19', years: '2 years' },
        { name: 'Git', years: '3 years' },
        { name: 'npm', years: '3 years' },
        { name: 'WordPress', years: '2 years' },
        { name: 'Pixel Perfect', years: '3 years' }
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl relative gap-2"> 
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <button className="hover:opacity-70 transition-opacity">
                    <img src={addImg} alt="Add" className="w-6 h-6" />
                </button>
                <button className="hover:opacity-70 transition-opacity">
                    <img src={editImg} alt="Edit" className="w-6 h-6" />
                </button>
                <button className="hover:opacity-70 transition-opacity">
                    <img src={deleteImg} alt="Delete" className="w-6 h-6" />
                </button>
            </div>
            <div className="flex flex-col">
                <h2 className="text-gray-800 text-2xl font-bold mb-4 text-left">
                    My Skills
                </h2>
                <div className="flex flex-col space-y-2">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                            <span className="text-gray-700 text-lg">
                                {skill.name}: <span className="text-gray-500 font-bold">{skill.years}</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CandidateProfileInfo;