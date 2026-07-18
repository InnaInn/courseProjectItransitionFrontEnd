import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ToolBar from '../components/common/ToolBar';
import editImg from '../images/editIcon.png';
import candidatePhoto from '../images/candidatePfoto.png';
import { useUser } from '../hooks/users/useUser';
import { useUserAttributes } from '../hooks/userAttributes/useUserAttributes';
import { useProjects } from '../hooks/projects/useProjects';
import { useEditProfile } from '../hooks/useEditProfile';
import { useUpdateUserAttribute } from '../hooks/userAttributes/useUpdateUserAttribute';
import { useUpdateProject } from '../hooks/projects/useUpdateProject';
import { usePosition } from '../hooks/positions/usePosition';
import { usePositionAttributes } from '../hooks/positionAttributes/usePositionAttributes';
import EditSkillModal from '../components/userAttribute/EditSkillModal';
import EditProjectModal from '../components/projects/EditProjectModal';

function CvGenerationPage() {
    const { t } = useTranslation();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const positionId = searchParams.get('positionId');

    const { user: currentUser } = useAuth();
    const isRecruiter = currentUser?.role === 'RECRUITER';

    const { user, loading: userLoading, setUser, refetch } = useUser(id);
    const { attributes: userAttributes, loading: userSkillsLoading, refetch: refetchUserSkills } = useUserAttributes(id);
    const { projects, loading: projectsLoading, refetch: refetchProjects } = useProjects(id);

    const { position, loading: positionLoading } = usePosition(positionId);
    const { attributes: positionAttributes, loading: positionAttributesLoading } = usePositionAttributes(positionId);

    const { isEditing, editForm, startEdit, changeField, save, cancel } = useEditProfile(user, setUser);
    const { updateUserAttribute, isUpdating, updateError } = useUpdateUserAttribute(refetchUserSkills);
    const { updateProject, isUpdating: isUpdatingProject, updateError: updateProjectError } = useUpdateProject(refetchProjects);

    const [selectedSkillIds, setSelectedSkillIds] = useState([]);
    const [isEditSkillModalOpen, setIsEditSkillModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);

    const [selectedProjectIds, setSelectedProjectIds] = useState([]);
    const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState(null);

    const [showInviteMessage, setShowInviteMessage] = useState(false);

    const handleToggleSkill = (id) => {
        if (isRecruiter) return;
        setSelectedSkillIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSelectAllSkills = () => {
        if (isRecruiter) return;
        if (selectedSkillIds.length === positionAttributes.length) {
            setSelectedSkillIds([]);
        } else {
            setSelectedSkillIds(positionAttributes.map((s) => s.id));
        }
    };

    const allSkillsSelected = positionAttributes.length > 0 && selectedSkillIds.length === positionAttributes.length;

    const handleEditSkill = () => {
        if (isRecruiter) return;
        if (selectedSkillIds.length === 1) {
            const positionAttr = positionAttributes.find((s) => s.id === selectedSkillIds[0]);
            if (positionAttr) {
                const userSkill = userAttributes.find(s => s.id === positionAttr.id);
                const skillForEdit = {
                    ...positionAttr,
                    value: userSkill ? userSkill.value : '',
                };
                setEditingSkill(skillForEdit);
                setIsEditSkillModalOpen(true);
            }
        } else {
            alert(t('selectExactlyOne') || 'Please select exactly one skill to edit.');
        }
    };

    const handleCloseEditSkill = () => {
        setIsEditSkillModalOpen(false);
        setEditingSkill(null);
        setSelectedSkillIds([]);
    };

    const handleUpdateSkill = async (attributeId, value) => {
        const success = await updateUserAttribute(id, attributeId, value);
        if (success) {
            handleCloseEditSkill();
            refetchUserSkills();
        }
    };

    const handleToggleProject = (id) => {
        if (isRecruiter) return;
        setSelectedProjectIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSelectAllProjects = () => {
        if (isRecruiter) return;
        if (selectedProjectIds.length === projects.length) {
            setSelectedProjectIds([]);
        } else {
            setSelectedProjectIds(projects.map((p) => p.id));
        }
    };

    const allProjectsSelected = projects.length > 0 && selectedProjectIds.length === projects.length;

    const handleEditProject = () => {
        if (isRecruiter) return;
        if (selectedProjectIds.length === 1) {
            const project = projects.find((p) => p.id === selectedProjectIds[0]);
            if (project) {
                setEditingProjectId(project.id);
                setIsEditProjectModalOpen(true);
            }
        } else {
            alert(t('selectExactlyOne') || 'Please select exactly one project to edit.');
        }
    };

    const handleCloseEditProject = () => {
        setIsEditProjectModalOpen(false);
        setEditingProjectId(null);
        setSelectedProjectIds([]);
    };

    const handleUpdateProject = async (projectId, data) => {
        const success = await updateProject(id, projectId, data);
        if (success) {
            handleCloseEditProject();
            refetchProjects();
        }
    };

    const handleSaveProfile = async () => {
        const success = await save(id);
        if (success) {
            refetch(id);
        }
    };

    const handleCancelProfile = () => {
        cancel();
    };

    const handleInvite = () => {
        setShowInviteMessage(true);
        setTimeout(() => {
            setShowInviteMessage(false);
        }, 3000);
    };

    const getUserSkillValue = (attributeId) => {
        const skill = userAttributes.find(s => s.id === attributeId);
        return skill ? skill.value : null;
    };

    const loading = userLoading || userSkillsLoading || projectsLoading || 
                    (positionId ? positionLoading : false) || 
                    (positionId ? positionAttributesLoading : false);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors">
                <Header />
                <div className="flex-grow container mx-auto px-4 py-6">
                    <div className="text-center text-gray-500 dark:text-gray-400">{t('loading')}</div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors">
                <Header />
                <div className="flex-grow container mx-auto px-4 py-6">
                    <div className="text-center text-red-500 dark:text-red-400">{t('userNotFound') || 'User not found'}</div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors">
            <Header />

            <div className="flex-grow container mx-auto px-4 py-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative transition-colors">
                        {!isRecruiter && isEditing && (
                            <div className="absolute top-4 right-4 z-20 flex gap-2">
                                <button
                                    onClick={handleCancelProfile}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-md border border-gray-200 dark:border-gray-600"
                                >
                                    {t('cancel')}
                                </button>
                                <button
                                    onClick={handleSaveProfile}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-md"
                                >
                                    {t('save')}
                                </button>
                            </div>
                        )}

                        {isRecruiter && (
                            <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
                                <button
                                    onClick={handleInvite}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors shadow-md"
                                >
                                    {t('inviteToInterview') || 'Invite to interview'}
                                </button>
                                {showInviteMessage && (
                                    <span className="text-sm text-green-600 dark:text-green-400 font-medium animate-pulse">
                                        {t('invitationSent') || 'Invitation sent!'}
                                    </span>
                                )}
                            </div>
                        )}

                        {!isRecruiter && isEditing ? (
                            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-10">
                                <div className="flex flex-col items-center text-center gap-4">
                                    <div>
                                        <img
                                            src={editForm.photoUrl || candidatePhoto}
                                            alt="Candidate"
                                            className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-white/30"
                                            onError={(e) => { e.target.onerror = null; e.target.src = candidatePhoto; }}
                                        />
                                        <input
                                            type="text"
                                            value={editForm.photoUrl || ''}
                                            onChange={(e) => changeField('photoUrl', e.target.value)}
                                            className="mt-2 w-full px-3 py-1 border border-white/30 rounded-md bg-white/20 text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                                            placeholder={t('photoUrl') || 'Photo URL'}
                                        />
                                    </div>
                                    <div className="text-white w-full max-w-lg space-y-3">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={editForm.firstName || ''}
                                                onChange={(e) => changeField('firstName', e.target.value)}
                                                placeholder={t('firstName')}
                                                className="flex-1 px-3 py-2 border border-white/30 rounded-md bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                                            />
                                            <input
                                                type="text"
                                                value={editForm.lastName || ''}
                                                onChange={(e) => changeField('lastName', e.target.value)}
                                                placeholder={t('lastName')}
                                                className="flex-1 px-3 py-2 border border-white/30 rounded-md bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            value={editForm.position || ''}
                                            onChange={(e) => changeField('position', e.target.value)}
                                            placeholder={t('position')}
                                            className="w-full px-3 py-2 border border-white/30 rounded-md bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                                        />
                                        <input
                                            type="email"
                                            value={editForm.email || ''}
                                            onChange={(e) => changeField('email', e.target.value)}
                                            placeholder={t('email')}
                                            className="w-full px-3 py-2 border border-white/30 rounded-md bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                                        />
                                        <input
                                            type="text"
                                            value={editForm.phone || ''}
                                            onChange={(e) => changeField('phone', e.target.value)}
                                            placeholder={t('phone') || 'Phone'}
                                            className="w-full px-3 py-2 border border-white/30 rounded-md bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                                        />
                                        <input
                                            type="text"
                                            value={editForm.address || ''}
                                            onChange={(e) => changeField('address', e.target.value)}
                                            placeholder={t('address') || 'Address'}
                                            className="w-full px-3 py-2 border border-white/30 rounded-md bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                                        />
                                    </div>
                                    <div className="mt-4 w-full">
                                        <textarea
                                            value={editForm.summary || ''}
                                            onChange={(e) => changeField('summary', e.target.value)}
                                            rows="4"
                                            className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                                            placeholder={t('tellAboutYourself') || 'Tell about yourself...'}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 relative">
                                    {!isRecruiter && (
                                        <button
                                            onClick={startEdit}
                                            className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-700 rounded-full p-2.5 shadow-md hover:shadow-lg hover:scale-105 transition-all border border-gray-200 dark:border-gray-600"
                                        >
                                            <img src={editImg} alt={t('edit')} className="w-5 h-5" />
                                        </button>
                                    )}
                                    <div className="flex flex-col items-center text-center gap-6">
                                        <img
                                            src={user.photoUrl || candidatePhoto}
                                            alt="Candidate"
                                            className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-white/30"
                                            onError={(e) => { e.target.onerror = null; e.target.src = candidatePhoto; }}
                                        />
                                        <div className="text-white">
                                            <h1 className="text-5xl font-bold mb-2 tracking-tight">
                                                {user.firstName} {user.lastName}
                                            </h1>
                                            <p className="text-xl text-blue-100 mb-4">
                                                {user.position || 'Web Developer'}
                                            </p>
                                            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-white/90">
                                                <span className="flex items-center gap-2">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    {user.email}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    {user.phone || t('notProvided') || 'Not provided'}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {user.address || t('notProvided') || 'Not provided'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-10">
                                    {position && (
                                        <div className="mb-8">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="w-1 h-8 bg-purple-600 rounded-full"></span>
                                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('appliedPosition') || 'Applied Position'}</h2>
                                            </div>
                                            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-100 dark:border-purple-800">
                                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{position.name}</h3>
                                                <p className="text-gray-600 dark:text-gray-400 mt-2 text-base">{position.description}</p>
                                                {positionAttributes.length > 0 && (
                                                    <div className="mt-3">
                                                        <p className="text-base font-medium text-gray-700 dark:text-gray-300 text-left">{t('requirements')}:</p>
                                                        <div className="flex flex-col space-y-1 mt-1 text-left">
                                                            {positionAttributes.map((attr) => (
                                                                <div key={attr.id} className="text-gray-700 dark:text-gray-400 text-sm text-left">
                                                                    {attr.name}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="w-1 h-8 bg-blue-600 rounded-full"></span>
                                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('aboutMe') || 'About Me'}</h2>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-100 dark:border-gray-600">
                                            {user.summary || t('noInfo') || 'No information about yourself has been added.'}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-1 h-8 bg-blue-600 rounded-full"></span>
                                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('positionRequirements') || 'Position Requirements'}</h2>
                                                </div>
                                                {!isRecruiter && (
                                                    <ToolBar
                                                        selectedCount={selectedSkillIds.length}
                                                        onEdit={handleEditSkill}
                                                        showAdd={false}
                                                        showDelete={false}
                                                    />
                                                )}
                                            </div>

                                            {!isRecruiter && positionAttributes.length > 0 && (
                                                <div className="flex items-center gap-2 mb-4">
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                                                        checked={allSkillsSelected}
                                                        onChange={handleSelectAllSkills}
                                                    />
                                                    <label className="text-sm text-gray-600 dark:text-gray-400">{t('selectAll')}</label>
                                                </div>
                                            )}

                                            {positionAttributes.length === 0 ? (
                                                <p className="text-gray-500 dark:text-gray-400 text-center py-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600">{t('noRequirements') || 'No requirements for this position'}</p>
                                            ) : (
                                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-100 dark:border-gray-600 space-y-2">
                                                    {positionAttributes.map((attr) => {
                                                        const userValue = getUserSkillValue(attr.id);
                                                        const hasSkill = userValue !== null && userValue !== undefined && userValue !== '';

                                                        return (
                                                            <div key={attr.id} className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-600 last:border-0">
                                                                <div className="flex items-center gap-2">
                                                                    {!isRecruiter && (
                                                                        <input
                                                                            type="checkbox"
                                                                            className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                                                                            checked={selectedSkillIds.includes(attr.id)}
                                                                            onChange={() => handleToggleSkill(attr.id)}
                                                                        />
                                                                    )}
                                                                    <span className={`text-base font-medium ${!hasSkill ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                                                        {attr.name}
                                                                    </span>
                                                                    {!hasSkill && (
                                                                        <span className="text-xs text-red-500 dark:text-red-400 ml-1">{t('missing') || '(missing)'}</span>
                                                                    )}
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    {hasSkill ? (
                                                                        <span className="text-sm bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full border border-green-200 dark:border-green-700">
                                                                            {userValue}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-sm text-gray-400 dark:text-gray-500 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600">
                                                                            {t('notAdded') || 'Not added'}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-1 h-8 bg-blue-600 rounded-full"></span>
                                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('projects')}</h2>
                                                </div>
                                                {!isRecruiter && (
                                                    <ToolBar
                                                        selectedCount={selectedProjectIds.length}
                                                        onEdit={handleEditProject}
                                                        showAdd={false}
                                                        showDelete={false}
                                                    />
                                                )}
                                            </div>

                                            {!isRecruiter && projects.length > 0 && (
                                                <div className="flex items-center gap-2 mb-4">
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                                                        checked={allProjectsSelected}
                                                        onChange={handleSelectAllProjects}
                                                    />
                                                    <label className="text-sm text-gray-600 dark:text-gray-400">{t('selectAll')}</label>
                                                </div>
                                            )}

                                            {projects.length === 0 ? (
                                                <p className="text-gray-500 dark:text-gray-400 text-center py-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600">{t('noProjects')}</p>
                                            ) : (
                                                <div className="space-y-4">
                                                    {projects.map((project) => (
                                                        <div key={project.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow">
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex items-center gap-2">
                                                                    {!isRecruiter && (
                                                                        <input
                                                                            type="checkbox"
                                                                            className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                                                                            checked={selectedProjectIds.includes(project.id)}
                                                                            onChange={() => handleToggleProject(project.id)}
                                                                        />
                                                                    )}
                                                                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">{project.name}</h3>
                                                                </div>
                                                                {project.startDate && project.endDate && (
                                                                    <span className="text-xs text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600 whitespace-nowrap ml-2">
                                                                        {project.startDate} — {project.endDate}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 leading-relaxed ml-6">
                                                                {project.description || t('noDescription')}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Footer />

            {!isRecruiter && (
                <>
                    <EditSkillModal
                        isOpen={isEditSkillModalOpen}
                        onClose={handleCloseEditSkill}
                        skill={editingSkill}
                        onUpdate={handleUpdateSkill}
                        isUpdating={isUpdating}
                        updateError={updateError}
                    />
                    <EditProjectModal
                        isOpen={isEditProjectModalOpen}
                        onClose={handleCloseEditProject}
                        project={projects.find((p) => p.id === editingProjectId)}
                        onUpdate={handleUpdateProject}
                        isUpdating={isUpdatingProject}
                        updateError={updateProjectError}
                    />
                </>
            )}
        </div>
    );
}

export default CvGenerationPage;