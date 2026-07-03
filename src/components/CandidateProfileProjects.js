import React from 'react';
import ToolBar from './ToolBar';

function CandidateProfileProjects() {
    const projects = [
        {
            id: 1,
            title: 'Project 1',
            period: 'Jan 2025 - Mar 2025',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            technologies: ['React', 'Python', 'CSS', 'HTML', 'PostgreSQL']
        },
        {
            id: 2,
            title: 'Project 2',
            period: 'Sep 2024 - Dec 2024',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            technologies: ['React', 'Node.js', 'SQL', 'Git']
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-7xl mx-auto relative"> {/* ← max-w-2xl → max-w-3xl */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <ToolBar></ToolBar>
            </div>
            <div className="flex flex-col">
                <h2 className="text-gray-800 text-2xl font-bold mb-4 text-left">
                    My Projects
                </h2>
                <div className="flex flex-col space-y-6">
                    {projects.map((project) => (
                        <div key={project.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-gray-800 text-xl font-bold">
                                    {project.title}
                                </h3>
                                <span className="text-gray-500 text-base whitespace-nowrap ml-4">
                                    {project.period}
                                </span>
                            </div>
                            <p className="text-gray-600 text-lg text-justify leading-relaxed mb-3">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium border border-blue-200"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CandidateProfileProjects;