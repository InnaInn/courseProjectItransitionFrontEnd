import React from 'react';
import logoImg from '../../images/logo.png';
import { Link } from 'react-router-dom';

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
                            <Link to="/attribute-library-page" style={{ marginRight: '15px' }}>
                                Attribute Library
                            </Link>
                            <Link to="/candidate-profile" style={{ marginRight: '15px' }}>
                                Candidate Profile
                            </Link>
                            <Link to="/cv-generation-page" style={{ marginRight: '15px' }}>
                                CV Generation
                            </Link>
                            <Link to="/position-page" style={{ marginRight: '15px' }}>
                                Position
                            </Link>
                            <Link to="/recruiter-profile" style={{ marginRight: '15px' }}>
                                Recruiter Profile
                            </Link>
                            <Link to="/users-table-page" style={{ marginRight: '15px' }}>
                                Users Table
                            </Link>
                            <Link to="/positions-table-page" style={{ marginRight: '15px' }}>
                                Positions
                            </Link>
                            <Link to="/register" style={{ marginRight: '15px' }}>
                                Register
                            </Link>
                            <Link to="/login" style={{ marginRight: '15px' }}>
                                Login
                            </Link>
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