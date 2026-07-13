import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { fetchWithSession } from '../../hooks/useAuth';
import { config } from '../../config';
import logoImg from '../../images/logo.png';


const API_URL = config.beURL + '/api';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicPage = ['/', '/login', '/register'].includes(location.pathname);

  const handleLogout = async () => {
    try {
      await fetchWithSession(`${API_URL}/auth/logout`, {
        method: 'POST',
      });
    } catch (err) {
      console.error('Logout request error:', err);
    } finally {
      logout();
      navigate('/login');
    }
  };

  const isActive = (path) => {
    if (path === '/candidate-profile') {
      return location.pathname.startsWith('/candidate-profile/');
    }
    return location.pathname === path;
  };

  const renderLink = (to, label) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        className={`hover:text-blue-600 transition-colors ${
          active ? 'text-blue-600 font-semibold' : 'text-gray-700'
        }`}
      >
        {label}
      </Link>
    );
  };

  if (isPublicPage) {
    return (
      <nav className="bg-white shadow-sm py-5">
        <div className="container mx-auto px-7">
          <div className="flex items-center justify-between">
            <a href="/" className="flex-shrink-0">
              <img src={logoImg} alt="Logo" className="inline-block align-top" style={{ height: '60px' }} />
            </a>
          </div>
        </div>
      </nav>
    );
  }

  if (!user) {
    return null;
  }

  const renderMenu = () => {
    if (user.role === 'CANDIDATE') {
      return (
        <>
          {renderLink(`/candidate-profile/${user.id}`, 'My Profile')}
          {renderLink('/positions-table-page', 'Positions')}
        </>
      );
    }

    if (user.role === 'RECRUITER') {
      return (
        <>
          {renderLink('/attribute-library-page', 'Attribute Library')}
          {renderLink('/users-table-page', 'Users Table')}
          {renderLink('/positions-table-page', 'Positions')}
  
        </>
      );
    }

    return (
      <>
        {renderLink('/users-table-page', 'Users Table')}
        {renderLink('/attribute-library-page', 'Attribute Library')}
        {renderLink('/positions-table-page', 'Positions')}
      </>
    );
  };

  return (
    <nav className="bg-white shadow-sm py-5">
      <div className="container mx-auto px-7">
        <div className="flex items-center justify-between flex-wrap">
          <a href="/" className="flex-shrink-0">
            <img src={logoImg} alt="Logo" className="inline-block align-top" style={{ height: '60px' }} />
          </a>

          <div className="flex-grow flex justify-center">
            <div className="flex items-center gap-10">
              {renderMenu()}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user.firstName} {user.lastName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-5 py-2.5 rounded-md text-base font-medium hover:bg-red-700 transition-colors"
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