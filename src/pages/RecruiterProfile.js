import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReceuiterProfileMe from '../components/ReceuiterProfileMe';


function RecruiterProfile() {
    return (
        <div>
            <Header></Header>
            <div className="container mx-auto px-4 py-4">
                <div className="max-w-7xl mx-auto flex justify-end">
                    <p className="text-gray-500 text-base mb-0">
                        Logged in as: <strong className="text-gray-700">Katia Ivanova</strong>
                    </p>
                </div>
            </div>
            <ReceuiterProfileMe></ReceuiterProfileMe>
            <Footer></Footer>
        </div>
    );
}

export default RecruiterProfile;