import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PositionPageCard from '../components/PositionPageCard';
import PositionPageCvCondidates from '../components/PositionPageCvCondidates';
import PositionPageAttributesLibraryAdd from '../components/PositionPageAttributesLibraryAdd';

function PositionPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex-grow container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-7xl mx-auto">
                    <div className="flex flex-col space-y-6">
                        <div className="flex-1">
                            <PositionPageCard />
                        </div>
                        <div className="flex-1">
                            <PositionPageCvCondidates />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-6">
                        <div className="flex-1">
                            <PositionPageAttributesLibraryAdd />
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PositionPage;