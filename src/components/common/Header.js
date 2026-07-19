import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { fetchWithSession } from '../../hooks/useAuth';
import { config } from '../../config';
import logoImg from '../../images/logo.png';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';

const API_URL = config.beURL + '/api';

function Header() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicPage = ['/', '/login', '/register'].includes(location.pathname) || location.pathname.startsWith('/position/');
  const isHomePage = location.pathname === '/';

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
        className={`hover:text-blue-600 transition-colors text-sm sm:text-base ${active ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-300'
          }`}
      >
        {label}
      </Link>
    );
  };

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );

  const LanguageToggle = () => (
    <button
      onClick={toggleLanguage}
      className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
      title={language === 'en' ? 'Switch to Russian' : 'Switch to English'}
    >
      {language === 'en' ? 'RU' : 'EN'}
    </button>
  );

  if (isPublicPage && !user) {
    return (
      <nav className="bg-gray-50 dark:bg-gray-800 shadow-sm py-3 sm:py-5 transition-colors border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-7">
          <div className="flex items-center justify-between">
            <a href="/" className="flex-shrink-0 hidden sm:block">
              <img src={logoImg} alt="Logo" className="inline-block align-top" style={{ height: '50px' }} />
            </a>
            
            <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
              {!isHomePage && (
                <Link 
                  to="/" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-sm sm:text-base"
                >
                  {t('positions')}
                </Link>
              )}
              <LanguageToggle />
              <ThemeToggle />
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-md text-sm sm:text-base font-medium hover:bg-blue-700 transition-colors"
              >
                {t('login')}
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (user) {
    const renderMenu = () => {
      if (user.role === 'CANDIDATE') {
        return (
          <>
            {renderLink(`/candidate-profile/${user.id}`, t('myProfile'))}
            {renderLink('/positions-table-page', t('positions'))}
          </>
        );
      }

      if (user.role === 'RECRUITER') {
        return (
          <>
            {renderLink('/attribute-library-page', t('attributeLibrary'))}
            {renderLink('/users-table-page', t('usersTable'))}
            {renderLink('/positions-table-page', t('positions'))}
          </>
        );
      }

      return (
        <>
          {renderLink('/users-table-page', t('usersTable'))}
          {renderLink('/attribute-library-page', t('attributeLibrary'))}
          {renderLink('/positions-table-page', t('positions'))}
        </>
      );
    };

    return (
      <nav className="bg-gray-50 dark:bg-gray-800 shadow-sm py-3 sm:py-5 transition-colors border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-7">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <a href="/" className="flex-shrink-0 hidden sm:block">
              <img src={logoImg} alt="Logo" className="inline-block align-top" style={{ height: '50px' }} />
            </a>

            <div className="flex-grow flex justify-center">
              <div className="flex items-center gap-4 sm:gap-10 flex-wrap justify-center">
                {renderMenu()}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-end">
              <LanguageToggle />
              <ThemeToggle />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
                {user.firstName} {user.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-md text-sm sm:text-base font-medium hover:bg-red-700 transition-colors"
              >
                {t('logOut')}
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return null;
}

export default Header;