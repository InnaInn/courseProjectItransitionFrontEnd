import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logoImg from '../../images/logo.png';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicPage = ['/', '/login', '/register'].includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

 
  if (isPublicPage) {
    return (
      <nav className="bg-white shadow-sm py-5">
        <div className="container mx-auto px-7">
          <div className="flex items-center justify-between">
            <a href="/" className="flex-shrink-0">
              <img
                src={logoImg}
                alt="Logo"
                className="inline-block align-top"
                style={{ height: '60px' }}
              />
            </a>
          </div>
        </div>
      </nav>
    );
  }

 
  return (
    <nav className="bg-white shadow-sm py-5">
      <div className="container mx-auto px-7">
        <div className="flex items-center justify-between flex-wrap">
          <a href="/" className="flex-shrink-0">
            <img
              src={logoImg}
              alt="Logo"
              className="inline-block align-top"
              style={{ height: '60px' }}
            />
          </a>

          <div className="flex-grow flex justify-center">
            <div className="flex items-center gap-10">
              {user && (
                <>
                  <Link to="/attribute-library-page">Attribute Library</Link>
                  <Link to="/candidate-profile">Candidate Profile</Link>
                  <Link to="/cv-generation-page">CV Generation</Link>
                  <Link to="/position-page">Position</Link>
                  <Link to="/recruiter-profile">Recruiter Profile</Link>
                  <Link to="/users-table-page">Users Table</Link>
                  <Link to="/positions-table-page">Positions</Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  {user.firstName} {user.lastName}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-5 py-2.5 rounded-md text-base font-medium hover:bg-red-700 transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="bg-blue-600 text-white px-5 py-2.5 rounded-md text-base font-medium hover:bg-blue-700 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-md text-base font-medium hover:bg-gray-300 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;