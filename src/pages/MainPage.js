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
        <Link to="/positions-table-page" style={{ marginRight: '15px' }}>
          Positions
        </Link>
        <Link to="/register" style={{ marginRight: '15px' }}>
          Register
        </Link>
        <Link to="/login" style={{ marginRight: '15px' }}>
          Login
        </Link>
      </nav>
    </div>
  );
}

export default MainPage;