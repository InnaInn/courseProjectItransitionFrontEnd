import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToolBar from '../components/ToolBar';

function VacanciesPage() {
    const vacancies = [
        {
            id: 1,
            title: 'Frontend Developer',
            tags: ['React', 'TypeScript', 'Tailwind CSS'],
            description: 'Developing user interfaces for web applications using React, TypeScript, and Tailwind CSS. Responsible for creating responsive and accessible components.'
        },
        {
            id: 2,
            title: 'Backend Developer',
            tags: ['Node.js', 'Express', 'PostgreSQL'],
            description: 'Building scalable REST APIs and microservices using Node.js and Express. Working with PostgreSQL databases and implementing authentication.'
        },
        {
            id: 3,
            title: 'Full Stack Developer',
            tags: ['React', 'Node.js', 'MongoDB'],
            description: 'Developing full-stack web applications using React for frontend and Node.js for backend. Experience with MongoDB and REST APIs.'
        },
        {
            id: 4,
            title: 'DevOps Engineer',
            tags: ['Docker', 'Kubernetes', 'AWS'],
            description: 'Managing cloud infrastructure on AWS, containerization with Docker, and orchestration with Kubernetes. Implementing CI/CD pipelines.'
        },
        {
            id: 5,
            title: 'UI/UX Designer',
            tags: ['Figma', 'Adobe XD', 'Prototyping'],
            description: 'Designing user interfaces and experiences using Figma and Adobe XD. Creating wireframes, prototypes, and conducting user research.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex-grow container mx-auto px-4 py-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <ToolBar></ToolBar>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                placeholder="Filter..."
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                            />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <tbody className="divide-y divide-gray-200">
                                    {vacancies.map((vacancy) => (
                                        <tr key={vacancy.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-700 text-left w-12">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col space-y-2">
                                                    <a
                                                        href={`/vacancy/${vacancy.id}`}
                                                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-base"
                                                    >
                                                        {vacancy.title}
                                                    </a>
                                                    <div className="flex flex-wrap gap-2">
                                                        {vacancy.tags.map((tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-xs font-medium border border-blue-200"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 text-justify leading-relaxed">
                                                {vacancy.description}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default VacanciesPage;