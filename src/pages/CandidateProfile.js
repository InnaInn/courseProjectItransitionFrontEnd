import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import CandidateProfileMe from '../components/CandidateProfileMe';
import Footer from '../components/Footer';
import CandidateProfileProjects from '../components/CandidateProfileProjects';
import CandidateProfileCVs from '../components/CandidateProfileCv';
import CandidateProfileInfo from '../components/CandidateProfileInfo';

function CandidateProfile() {
    const { id } = useParams();
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="container mx-auto px-4 py-4">
                <div className="max-w-7xl mx-auto flex justify-end">
                    <p className="text-gray-500 text-base mb-0">
                        Logged in as: <strong className="text-gray-700">Ivan Ivanov</strong>
                    </p>
                </div>
            </div>

            <div className="flex-grow container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-7xl mx-auto">
                    <div className="flex flex-col space-y-6">
                        <CandidateProfileMe userId={id} />
                        <CandidateProfileProjects />
                    </div>
                    <div className="flex flex-col space-y-6">
                        <CandidateProfileInfo />
                        <CandidateProfileCVs />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CandidateProfile;