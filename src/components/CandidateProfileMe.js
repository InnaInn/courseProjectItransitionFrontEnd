import React, { useState } from 'react';
import editImg from '../images/editIcon.png';
import candidatePhoto from '../images/candidatePfoto.png';
import { useUser } from '../hooks/users/useUser';
import { useEditProfile } from '../hooks/useEditProfile';

function CandidateProfileMe({ userId, onUserLoaded }) {
    const { user, loading, error, refetch, setUser } = useUser(userId);
    const {
        isEditing,
        editForm,
        startEdit,
        changeField,
        save,
        cancel,
    } = useEditProfile(user, setUser);

    React.useEffect(() => {
        if (user && onUserLoaded) {
            onUserLoaded(user.firstName, user.lastName);
        }
    }, [user, onUserLoaded]);

    const handleSave = async () => {
        const success = await save(userId);
        if (success) {
            refetch(userId);
        }
    };

    const handleCancel = () => {
        cancel();
    };

    if (!userId) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto overflow-hidden">
                <div className="text-gray-600 text-center text-lg">
                    ID пользователя не указан
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto overflow-hidden">
                <div className="flex justify-center items-center h-64">
                    <div className="text-gray-600">Loading profile...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto overflow-hidden">
                <div className="text-center">
                    <div className="text-red-600 text-lg mb-4">
                        Error: {error}
                    </div>
                    <button
                        onClick={() => refetch(userId)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto overflow-hidden">
                <div className="text-gray-600 text-center text-lg">
                    User not found
                </div>
            </div>
        );
    }

    if (!isEditing) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto relative overflow-hidden">
                <button
                    onClick={startEdit}
                    className="absolute top-4 right-4 hover:opacity-70 transition-opacity"
                >
                    <img
                        src={editImg}
                        alt="Редактировать"
                        className="w-5 h-5"
                    />
                </button>
                <div className="flex flex-col">
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                            <img
                                src={user.photoUrl || candidatePhoto}
                                alt="Candidate's photo"
                                className="w-40 h-40 object-cover rounded-full"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = candidatePhoto;
                                }}
                            />
                        </div>
                        <div className="flex-grow space-y-3 min-w-0">
                            <div className="flex justify-center">
                                <span className="text-gray-800 text-2xl font-bold break-words">
                                    {user.firstName || ''} {user.lastName || ''}
                                </span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-gray-600 font-medium text-lg whitespace-nowrap">Location:</span>
                                <span className="text-gray-800 text-lg break-words">{user.address || 'Not given'}</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-gray-600 font-medium text-lg whitespace-nowrap">Email:</span>
                                <span className="text-gray-800 text-lg break-words">{user.email || 'Not given'}</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-gray-600 font-medium text-lg whitespace-nowrap">Position:</span>
                                <span className="text-gray-800 text-lg break-words">{user.position || 'Not given'}</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-gray-600 font-medium text-lg whitespace-nowrap">Phone:</span>
                                <span className="text-gray-800 text-lg break-words">{user.phone || 'Not given'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex gap-3">
                            <span className="text-gray-700 text-lg text-justify break-words">
                                {user.summary || 'No information about yourself has been added.'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto relative overflow-hidden pt-16">
            <div className="absolute top-4 right-4 flex gap-2">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Save
                </button>
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </button>
            </div>

            <div className="flex flex-col">
                <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                        <img
                            src={editForm.photoUrl || candidatePhoto}
                            alt="Candidate's photo"
                            className="w-40 h-40 object-cover rounded-full"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = candidatePhoto;
                            }}
                        />
                        <input
                            type="text"
                            value={editForm.photoUrl || ''}
                            onChange={(e) => changeField('photoUrl', e.target.value)}
                            placeholder="Photo URL"
                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md text-sm box-border"
                        />
                    </div>

                    <div className="flex-grow space-y-3 min-w-0">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={editForm.firstName || ''}
                                onChange={(e) => changeField('firstName', e.target.value)}
                                placeholder="First Name"
                                className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md text-lg box-border"
                            />
                            <input
                                type="text"
                                value={editForm.lastName || ''}
                                onChange={(e) => changeField('lastName', e.target.value)}
                                placeholder="Last Name"
                                className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md text-lg box-border"
                            />
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-gray-600 font-medium text-lg whitespace-nowrap">Location:</span>
                            <input
                                type="text"
                                value={editForm.address || ''}
                                onChange={(e) => changeField('address', e.target.value)}
                                placeholder="Enter location"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg box-border"
                            />
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-gray-600 font-medium text-lg whitespace-nowrap">Email:</span>
                            <input
                                type="email"
                                value={editForm.email || ''}
                                onChange={(e) => changeField('email', e.target.value)}
                                placeholder="Enter email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg box-border"
                            />
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-gray-600 font-medium text-lg whitespace-nowrap">Position:</span>
                            <input
                                type="text"
                                value={editForm.position || ''}
                                onChange={(e) => changeField('position', e.target.value)}
                                placeholder="Enter position"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg box-border"
                            />
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-gray-600 font-medium text-lg whitespace-nowrap">Phone:</span>
                            <input
                                type="text"
                                value={editForm.phone || ''}
                                onChange={(e) => changeField('phone', e.target.value)}
                                placeholder="Enter phone"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg box-border"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <textarea
                        value={editForm.summary || ''}
                        onChange={(e) => changeField('summary', e.target.value)}
                        placeholder="Enter summary about yourself"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg min-h-[100px] box-border"
                        rows={4}
                    />
                </div>
            </div>
        </div>
    );
}

export default CandidateProfileMe;