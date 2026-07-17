import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AttributeLibraryPage from './pages/AttributeLibraryPage';
import CandidateProfile from './pages/CandidateProfile';
import CvGenerationPage from './pages/CvGenerationPage';
import PositionPage from './pages/PositionPage';
import UsersTablePage from './pages/UsersTablePage';
import PositionsTablePage from './pages/PositionsTablePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<PositionsTablePage />} />
            <Route path="/position/:id" element={<PositionPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />


            <Route path="/attribute-library-page" element={<AttributeLibraryPage />} />
            <Route path="/candidate-profile/:id" element={<CandidateProfile />} />
            <Route path="/cv-generation-page/:id" element={<CvGenerationPage />} />
            <Route path="/users-table-page" element={<UsersTablePage />} />
            <Route path="/positions-table-page" element={<PositionsTablePage />} />


            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );

}

export default App;