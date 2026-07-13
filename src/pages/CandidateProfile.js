import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/common/Header';
import CandidateProfileMe from '../components/profiles/CandidateProfileMe';
import Footer from '../components/common/Footer';
import CandidateProfileProjects from '../components/projects/CandidateProfileProjects';
import CandidateProfileCVs from '../components/profiles/CandidateProfileCv';
import CandidateProfileInfo from '../components/profiles/CandidateProfileInfo';

function CandidateProfile() {
    const { id } = useParams();
    const { user } = useAuth();
    const isRecruiter = user?.role === 'RECRUITER';

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex-grow container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-7xl mx-auto">
                    <div className="flex flex-col space-y-6">
                        <CandidateProfileMe
                            userId={id}
                            isRecruiter={isRecruiter}
                        />
                        <CandidateProfileProjects
                            userId={id}
                            isRecruiter={isRecruiter}
                        />
                    </div>
                    <div className="flex flex-col space-y-6">
                        <CandidateProfileInfo
                            userId={id}
                            isRecruiter={isRecruiter}
                        />
                        <CandidateProfileCVs />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CandidateProfile;