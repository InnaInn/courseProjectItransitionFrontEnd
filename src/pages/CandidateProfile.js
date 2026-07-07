import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import CandidateProfileMe from '../components/profiles/CandidateProfileMe';
import Footer from '../components/common/Footer';
import CandidateProfileProjects from '../components/projects/CandidateProfileProjects';
import CandidateProfileCVs from '../components/profiles/CandidateProfileCv';
import CandidateProfileInfo from '../components/profiles/CandidateProfileInfo';
import UserInfo from '../components/common/UserInfo';

function CandidateProfile() {
    const { id } = useParams();
    const [userName, setUserName] = useState({ firstName: '', lastName: '' });

  
    const handleUserLoaded = useCallback((firstName, lastName) => {
        setUserName({ firstName, lastName });
    }, []); 

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="container mx-auto px-4 py-4">
                <UserInfo firstName={userName.firstName} lastName={userName.lastName} />
            </div>

            <div className="flex-grow container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-7xl mx-auto">
                    <div className="flex flex-col space-y-6">
                        <CandidateProfileMe userId={id} onUserLoaded={handleUserLoaded} />
                        <CandidateProfileProjects userId={id} />
                    </div>
                    <div className="flex flex-col space-y-6">
                        <CandidateProfileInfo userId={id} />
                        <CandidateProfileCVs />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CandidateProfile;