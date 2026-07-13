import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AttributeLibraryPage from './pages/AttributeLibraryPage';
import CandidateProfile from './pages/CandidateProfile';
import CvGenerationPage from './pages/CvGenerationPage';
import PositionPage from './pages/PositionPage';
import UsersTablePage from './pages/UsersTablePage';
import PositionsTablePage from './pages/PositionsTablePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/attribute-library-page" element={<AttributeLibraryPage />} />
          <Route path="/candidate-profile/:id" element={<CandidateProfile />} />
          <Route path="/cv-generation-page" element={<CvGenerationPage />} />
          <Route path="/position/:id" element={<PositionPage />} />
          <Route path="/users-table-page" element={<UsersTablePage />} />
          <Route path="/positions-table-page" element={<PositionsTablePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;