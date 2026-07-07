import React from 'react';
import editImg from '../../images/editIcon.png';
import candidatePfoto from '../../images/candidatePfoto.png'

function ReceuiterProfileMe() {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto relative"> 
            <button className="absolute top-4 right-4 hover:opacity-70 transition-opacity">
                <img
                    src={editImg}
                    alt="Edit"
                    className="w-5 h-5"
                />
            </button>
            <div className="flex flex-col">
                <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                        <img
                            src={candidatePfoto}
                            alt="Candidate photo"
                            className="w-40 h-40 object-cover"
                        />
                    </div>
                    <div className="flex-grow space-y-3">
                        <div className="flex justify-center">
                            <span className="text-gray-800 text-2xl font-bold">
                                Katia Ivanova
                            </span>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-gray-600 font-medium text-lg">Location:</span>
                            <span className="text-gray-800 text-lg">Vitebsk</span>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-gray-600 font-medium text-lg">Phone:</span>
                            <span className="text-gray-800 text-lg">+375 0000000000</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex gap-3">
                        <span className="text-gray-700 text-lg text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReceuiterProfileMe;