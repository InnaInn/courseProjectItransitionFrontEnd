import './App.css';
import MainPage from './pages/MainPage';
import AttributeLibraryPage from './pages/AttributeLibraryPage';
import CandidateProfile from './pages/CandidateProfile';
import CvGenerationPage from './pages/CvGenerationPage';
import PositionPage from './pages/PositionPage';
import RecruiterProfile from './pages/RecruiterProfile';
import UsersTablePage from './pages/UsersTablePage';
import VacancyPage from './pages/VacancyPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/attribute-library-page" element={<AttributeLibraryPage />} />
          <Route path="/candidate-profile/:id" element={<CandidateProfile />} />
          <Route path="/cv-generation-page" element={<CvGenerationPage />} />
          <Route path="/position-page" element={<PositionPage />} />
          <Route path="/recruiter-profile" element={<RecruiterProfile />} />
          <Route path="/users-table-page" element={<UsersTablePage />} />
          <Route path="/vacancy-page" element={<VacancyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;