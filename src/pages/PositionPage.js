import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PositionPageCard from '../components/position-page/PositionPageCard';
import PositionPageCvCondidates from '../components/position-page/PositionPageCvCondidates';
import PositionPageAttributesLibraryAdd from '../components/position-page/PositionPageAttributesLibraryAdd';
import { usePosition } from '../hooks/positions/usePosition';
import { useEditPosition } from '../hooks/useEditPosition';
import { useUserPositions } from '../hooks/userPositions/useUserPositions';

function PositionPage() {
    const { t } = useTranslation();
    const { id } = useParams();
    const { user } = useAuth();
    const isCandidate = user?.role === 'CANDIDATE';
    const isRecruiter = user?.role === 'RECRUITER';
    const isAdmin = user?.role === 'ADMIN';
    const userId = user?.id;
    const isAuthenticated = !!user;

    const showCandidatesList = isRecruiter || isAdmin;

    const { position, loading, error, setPosition, refetch } = usePosition(id);
    const { positions: userPositions, refetch: refetchUserPositions } = useUserPositions(userId);

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

    const hasApplied = isCandidate && userId && userPositions.some(p => p.positionId === id);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors">
                <Header />
                <div className="flex-grow container mx-auto px-2 sm:px-4 py-3 sm:py-6">
                    <div className="text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base">{t('loading')}</div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors">
                <Header />
                <div className="flex-grow container mx-auto px-2 sm:px-4 py-3 sm:py-6">
                    <div className="text-center text-red-500 dark:text-red-400 text-sm sm:text-base">{t('error')}: {error}</div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!position) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors">
                <Header />
                <div className="flex-grow container mx-auto px-2 sm:px-4 py-3 sm:py-6">
                    <div className="text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base">{t('positionNotFound') || 'Position not found'}</div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors">
            <Header />
            <div className="flex-grow container mx-auto px-2 sm:px-4 py-3 sm:py-6">
                {showCandidatesList ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 max-w-7xl mx-auto">
                        <div className="flex flex-col space-y-4 sm:space-y-6">
                            <div className="flex-1">
                                <PositionPageCard
                                    position={position}
                                    isEditing={isEditing}
                                    editForm={editForm}
                                    startEdit={startEdit}
                                    changeField={changeField}
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                    isCandidate={isCandidate}
                                    hasApplied={false}
                                    refetchUserPositions={refetchUserPositions}
                                />
                            </div>
                            <div className="flex-1">
                                <PositionPageAttributesLibraryAdd
                                    positionId={id}
                                    isCandidate={isCandidate}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4 sm:space-y-6">
                            <div className="flex-1">
                                <PositionPageCvCondidates positionId={id} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto flex flex-col items-center space-y-4 sm:space-y-6">
                        {!isAuthenticated && (
                            <div className="w-full max-w-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3 sm:p-4 text-center transition-colors">
                                <p className="text-blue-700 dark:text-blue-300 text-sm sm:text-base">
                                    {t('toApply')}{' '}
                                    <Link to="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                                        {t('register')}
                                    </Link>
                                    {' '}{t('or')}{' '}
                                    <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                                        {t('personalAccount')}
                                    </Link>
                                    .
                                </p>
                            </div>
                        )}
                        
                        <div className="w-full max-w-xl">
                            <PositionPageCard
                                position={position}
                                isEditing={isEditing}
                                editForm={editForm}
                                startEdit={startEdit}
                                changeField={changeField}
                                onSave={handleSave}
                                onCancel={handleCancel}
                                isCandidate={isCandidate}
                                hasApplied={hasApplied}
                                refetchUserPositions={refetchUserPositions}
                            />
                        </div>
                        <div className="w-full max-w-xl">
                            <PositionPageAttributesLibraryAdd
                                positionId={id}
                                isCandidate={isCandidate}
                            />
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default PositionPage;