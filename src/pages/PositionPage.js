import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PositionPageCard from '../components/position-page/PositionPageCard';
import PositionPageCvCondidates from '../components/position-page/PositionPageCvCondidates';
import PositionPageAttributesLibraryAdd from '../components/position-page/PositionPageAttributesLibraryAdd';
import { usePosition } from '../hooks/positions/usePosition';
import { useEditPosition } from '../hooks/useEditPosition';

function PositionPage() {
    const { id } = useParams();
    const { position, loading, error, setPosition, refetch } = usePosition(id);
    const {
        isEditing,
        editForm,
        startEdit,
        changeField,
        save,
        cancel,
    } = useEditPosition(position, setPosition);

    const handleSave = async () => {
        const success = await save(id);
        if (success) {
            refetch(id);
        }
    };

    const handleCancel = () => {
        cancel();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <Header />
                <div className="flex-grow container mx-auto px-4 py-6">
                    <div className="text-center text-gray-500">Loading position...</div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <Header />
                <div className="flex-grow container mx-auto px-4 py-6">
                    <div className="text-center text-red-500">Error: {error}</div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!position) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <Header />
                <div className="flex-grow container mx-auto px-4 py-6">
                    <div className="text-center text-gray-500">Position not found</div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex-grow container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-7xl mx-auto">
                    <div className="flex flex-col space-y-6">
                        <div className="flex-1">
                            <PositionPageCard
                                position={position}
                                isEditing={isEditing}
                                editForm={editForm}
                                startEdit={startEdit}
                                changeField={changeField}
                                onSave={handleSave}
                                onCancel={handleCancel}
                            />
                        </div>
                        <div className="flex-1">
                            <PositionPageCvCondidates positionId={id} />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-6">
                        <div className="flex-1">
                            <PositionPageAttributesLibraryAdd positionId={id}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PositionPage;