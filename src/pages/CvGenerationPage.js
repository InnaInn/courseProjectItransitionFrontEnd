import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import editImg from '../images/editIcon.png';
import candidatePhoto from '../images/candidatePfoto.png';

function CvGenerationPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />

            <div className="flex-grow container mx-auto px-4 py-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
                        <button className="absolute top-4 right-4 z-10 bg-white rounded-full p-2.5 shadow-md hover:shadow-lg hover:scale-105 transition-all border border-gray-200">
                            <img
                                src={editImg}
                                alt="Edit"
                                className="w-5 h-5"
                            />
                        </button>
                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-10">
                            <div className="flex items-center gap-8">
                                <div className="flex-shrink-0">
                                    <img
                                        src={candidatePhoto}
                                        alt="Candidate"
                                        className="w-32 h-32 rounded-full object-cover shadow-lg"
                                    />
                                </div>
                                <div className="text-white">
                                    <h1 className="text-4xl font-bold mb-2">Ivan Ivanov</h1>
                                    <div className="flex flex-wrap gap-6 text-white/90">
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            ivan.ivanov@email.com
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            +375 29 123-45-67
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Vitebsk, Belarus
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                                    About Me
                                </h2>
                                <p className="text-gray-600 text-base leading-relaxed">
                                    I'm beginner web developer with solid knowledge of frontend development, eager to learn and develop my practical
                                    skills and theoretical knowledge. I have several pet projects, each of them helped me to try on practice new things I've
                                    recently learned, because I believe that only practical tasks help me to understand the topic completely.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <div className="mb-6">
                                        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                            <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                                            Skills
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {['JavaScript', 'React', 'TypeScript', 'HTML 5', 'CSS 3', 'Git', 'npm', 'Tailwind CSS', 'Redux Toolkit'].map((skill) => (
                                                <span key={skill} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-200">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                            <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                                            My CV
                                        </h2>
                                        <div className="flex flex-col space-y-2">
                                            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                                                Frontend Developer CV
                                            </a>
                                            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                                                Backend Developer CV
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-6">
                                        <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                            <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                                            Projects
                                        </h2>
                                        <div className="space-y-3">
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <h3 className="font-semibold text-gray-800">AI-Powered RAG System</h3>
                                                <p className="text-sm text-gray-600 mt-1">Built with React, Python FastAPI, and Docker</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <h3 className="font-semibold text-gray-800">E-Commerce Platform</h3>
                                                <p className="text-sm text-gray-600 mt-1">React, Node.js, MongoDB, Stripe API</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <h3 className="font-semibold text-gray-800">Portfolio Website</h3>
                                                <p className="text-sm text-gray-600 mt-1">React, Tailwind CSS, Framer Motion</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default CvGenerationPage;