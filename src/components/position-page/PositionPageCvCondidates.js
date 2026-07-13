import React from 'react';
import { Link } from 'react-router-dom';
import { usePositionUsers } from '../../hooks/userPositions/usePositionUsers';

function PositionPageCvCondidates({ positionId }) {
  const { candidates, loading, error } = usePositionUsers(positionId);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto relative">
        <div className="text-center text-gray-500">Loading candidates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto relative">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto relative">
      <div className="flex flex-col">
        <h2 className="text-gray-800 text-2xl font-bold mb-4 text-left">
          CV Кандидатов
        </h2>
        {candidates.length === 0 ? (
          <p className="text-gray-500 text-center">No candidates yet</p>
        ) : (
          <div className="flex flex-col space-y-2">
            {candidates.map((candidate) => (
              <div key={candidate.userId} className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                <Link
                  to={`/candidate-profile/${candidate.userId}`}
                  className="text-gray-700 text-lg hover:text-blue-600 hover:underline transition-colors"
                >
                  {candidate.userFirstName} {candidate.userLastName}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PositionPageCvCondidates;