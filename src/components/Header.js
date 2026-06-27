import React from 'react';
import logoImg from '../images/logo.png';

function Header() {
    return (
        <nav className="bg-white shadow-sm py-5">
            <div className="container mx-auto px-7">
                <div className="flex items-center justify-between flex-wrap">
                    <a href="/" className="flex-shrink-0">
                        <img
                            src={logoImg}
                            alt="Logo"
                            height="60"
                            className="inline-block align-top"
                            style={{ height: '60px' }}
                        />
                    </a>
                    <div className="flex-grow flex justify-center">
                        <div className="flex items-center gap-10">
                            <a href="#test1" className="text-gray-800 hover:text-gray-600 no-underline text-base font-medium transition-colors"
                            >
                                Main Page
                            </a>
                            <a
                                href="#test2"
                                className="text-gray-800 hover:text-gray-600 no-underline text-base font-medium transition-colors"
                            >
                                Profiles
                            </a>
                            <a
                                href="#test3"
                                className="text-gray-800 hover:text-gray-600 no-underline text-base font-medium transition-colors"
                            >
                                Positions
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;