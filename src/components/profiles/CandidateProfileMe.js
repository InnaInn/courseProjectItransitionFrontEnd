import React, { useState } from 'react';
import editImg from '../../images/editIcon.png';
import candidatePhoto from '../../images/candidatePfoto.png';
import { useUser } from '../../hooks/users/useUser';
import { useEditProfile } from '../../hooks/useEditProfile';

function CandidateProfileMe({ userId, onUserLoaded, isRecruiter = false }) {
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl w-full overflow-hidden transition-colors">
                <div className="text-gray-600 dark:text-gray-400 text-center text-lg">
                    ID пользователя не указан
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl w-full overflow-hidden transition-colors">
                <div className="flex justify-center items-center h-64">
                    <div className="text-gray-600 dark:text-gray-400">Loading profile...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl w-full overflow-hidden transition-colors">
                <div className="text-center">
                    <div className="text-red-600 dark:text-red-400 text-lg mb-4">
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl w-full overflow-hidden transition-colors">
                <div className="text-gray-600 dark:text-gray-400 text-center text-lg">
                    User not found
                </div>
            </div>
        );
    }

    if (!isEditing) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl w-full relative overflow-hidden transition-colors">
                {!isRecruiter && (
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
                )}
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
                                <span className="text-gray-800 dark:text-gray-100 text-2xl font-bold break-words transition-colors">
                                    {user.firstName || ''} {user.lastName || ''}
                                </span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-gray-600 dark:text-gray-400 font-medium text-lg whitespace-nowrap transition-colors">Location:</span>
                                <span className="text-gray-800 dark:text-gray-100 text-lg break-words transition-colors">{user.address || 'Not given'}</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-gray-600 dark:text-gray-400 font-medium text-lg whitespace-nowrap transition-colors">Email:</span>
                                <span className="text-gray-800 dark:text-gray-100 text-lg break-words transition-colors">{user.email || 'Not given'}</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-gray-600 dark:text-gray-400 font-medium text-lg whitespace-nowrap transition-colors">Position:</span>
                                <span className="text-gray-800 dark:text-gray-100 text-lg break-words transition-colors">{user.position || 'Not given'}</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-gray-600 dark:text-gray-400 font-medium text-lg whitespace-nowrap transition-colors">Phone:</span>
                                <span className="text-gray-800 dark:text-gray-100 text-lg break-words transition-colors">{user.phone || 'Not given'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex gap-3">
                            <span className="text-gray-700 dark:text-gray-300 text-lg text-justify break-words transition-colors">
                                {user.summary || 'No information about yourself has been added.'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl w-full relative overflow-hidden pt-16 transition-colors">
            <div className="absolute top-4 right-4 flex gap-2">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Save
                </button>
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
                            className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm box-border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                        />
                    </div>

                    <div className="flex-grow space-y-3 min-w-0">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={editForm.firstName || ''}
                                onChange={(e) => changeField('firstName', e.target.value)}
                                placeholder="First Name"
                                className="flex-1 min-w-0 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-lg box-border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                            />
                            <input
                                type="text"
                                value={editForm.lastName || ''}
                                onChange={(e) => changeField('lastName', e.target.value)}
                                placeholder="Last Name"
                                className="flex-1 min-w-0 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-lg box-border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                            />
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-gray-600 dark:text-gray-400 font-medium text-lg whitespace-nowrap transition-colors">Location:</span>
                            <input
                                type="text"
                                value={editForm.address || ''}
                                onChange={(e) => changeField('address', e.target.value)}
                                placeholder="Enter location"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-lg box-border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                            />
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-gray-600 dark:text-gray-400 font-medium text-lg whitespace-nowrap transition-colors">Email:</span>
                            <input
                                type="email"
                                value={editForm.email || ''}
                                onChange={(e) => changeField('email', e.target.value)}
                                placeholder="Enter email"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-lg box-border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                            />
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-gray-600 dark:text-gray-400 font-medium text-lg whitespace-nowrap transition-colors">Position:</span>
                            <input
                                type="text"
                                value={editForm.position || ''}
                                onChange={(e) => changeField('position', e.target.value)}
                                placeholder="Enter position"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-lg box-border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                            />
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-gray-600 dark:text-gray-400 font-medium text-lg whitespace-nowrap transition-colors">Phone:</span>
                            <input
                                type="text"
                                value={editForm.phone || ''}
                                onChange={(e) => changeField('phone', e.target.value)}
                                placeholder="Enter phone"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-lg box-border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <textarea
                        value={editForm.summary || ''}
                        onChange={(e) => changeField('summary', e.target.value)}
                        placeholder="Enter summary about yourself"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-lg min-h-[100px] box-border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                        rows={4}
                    />
                </div>
            </div>
        </div>
    );
}

export default CandidateProfileMe;