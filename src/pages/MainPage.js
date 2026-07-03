import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div>
      <nav style={{ padding: '20px 0' }}>
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
         Positions
        </Link>
        <Link to="/recruiter-profile" style={{ marginRight: '15px' }}>
          Recruiter Profile
        </Link>
        <Link to="/users-table-page" style={{ marginRight: '15px' }}>
          Users Table
        </Link>
        <Link to="/vacancy-page" style={{ marginRight: '15px' }}>
          Vacancies
        </Link>
      </nav>
    </div>
  );
}

export default MainPage;