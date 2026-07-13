import React from 'react';
import ToolBar from '../common/ToolBar';
import { useUserPositions } from '../../hooks/userPositions/useUserPositions';
import { useAuth } from '../../hooks/useAuth';

function CandidateCVs() {
    const { user } = useAuth();
    const { positions, loading, error } = useUserPositions(user?.id);

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl relative">
                <div className="text-center text-gray-500">Loading applied positions...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl relative">
                <div className="text-center text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <ToolBar />
            </div>
            <div className="flex flex-col">
                <h2 className="text-gray-800 text-2xl font-bold mb-4 text-left">
                    My Applications
                </h2>
                {positions.length === 0 ? (
                    <p className="text-gray-500 text-center">No applications yet</p>
                ) : (
                    <div className="flex flex-col space-y-2">
                        {positions.map((pos) => (
                            <div key={pos.positionId} className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                <span className="text-gray-700 text-lg">
                                    {pos.positionName || 'Untitled position'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CandidateCVs;