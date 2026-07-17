import React, { useState } from 'react';
import ToolBar from '../common/ToolBar';
import ConfirmModal from '../common/ConfirmModal';
import CreateProjectModal from './CreateProjectModal';
import EditProjectModal from './EditProjectModal';
import { useProjects } from '../../hooks/projects/useProjects';
import { useCreateProject } from '../../hooks/projects/useCreateProject';
import { useUpdateProject } from '../../hooks/projects/useUpdateProject';
import { useDeleteProject } from '../../hooks/projects/useDeleteProject';

function CandidateProfileProjects({ userId, isRecruiter = false }) {
    const { projects, loading, error, refetch } = useProjects(userId);
    const [selectedIds, setSelectedIds] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [pendingDeleteIds, setPendingDeleteIds] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState(null);

    const { createProject, isCreating, createError } = useCreateProject(refetch);
    const { updateProject, isUpdating, updateError } = useUpdateProject(refetch);
    const { deleteProjects, isDeleting, deleteError } = useDeleteProject(refetch);

    const handleToggle = (id) => {
        if (isEditing) return;
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (isEditing) return;
        if (selectedIds.length === projects.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(projects.map((p) => p.id));
        }
    };

    const allSelected = projects.length > 0 && selectedIds.length === projects.length;

    const handleOpenCreate = () => setIsCreateModalOpen(true);
    const handleCloseCreate = () => {
        setIsCreateModalOpen(false);
        setSelectedIds([]);
    };

    const handleCreate = async (data) => {
        await createProject(userId, { ...data, userId });
        handleCloseCreate();
    };

    const handleEdit = () => {
        if (selectedIds.length === 1) {
            const project = projects.find((p) => p.id === selectedIds[0]);
            if (project) {
                setIsEditing(true);
                setEditingProjectId(project.id);
            }
        } else {
            alert('Please select exactly one project to edit.');
        }
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
        setEditingProjectId(null);
        setSelectedIds([]);
    };

    const handleUpdate = async (id, data) => {
        const success = await updateProject(userId, id, data);
        if (success) handleCloseEdit();
    };

    const handleDeleteClick = () => {
        setPendingDeleteIds(selectedIds);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        const success = await deleteProjects(userId, pendingDeleteIds);
        if (success) setSelectedIds([]);
        setDeleteModalOpen(false);
        setPendingDeleteIds([]);
    };

    const handleCancelDelete = () => {
        setDeleteModalOpen(false);
        setPendingDeleteIds([]);
    };

    const getTechnologies = (id) => {
        const techMap = {
            1: ['React', 'Python', 'CSS', 'HTML', 'PostgreSQL'],
            2: ['React', 'Node.js', 'SQL', 'Git'],
        };
        return techMap[id] || ['JavaScript', 'HTML', 'CSS'];
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl w-full transition-colors">
                <div className="text-center text-gray-500 dark:text-gray-400">Loading projects...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl w-full transition-colors">
                <div className="text-center text-red-500 dark:text-red-400">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-xl w-full transition-colors">
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-gray-800 dark:text-gray-100 text-2xl font-bold transition-colors">My Projects</h2>
                    {!isRecruiter && (
                        <ToolBar
                            selectedCount={selectedIds.length}
                            onAdd={handleOpenCreate}
                            onEdit={handleEdit}
                            onDelete={handleDeleteClick}
                            isDeleting={isDeleting}
                            deleteError={deleteError}
                        />
                    )}
                </div>
                {!isRecruiter && projects.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                            checked={allSelected}
                            onChange={handleSelectAll}
                            disabled={isEditing || isDeleting}
                            id="select-all-projects"
                        />
                        <label htmlFor="select-all-projects" className="text-sm text-gray-600 dark:text-gray-400">
                            Select all
                        </label>
                    </div>
                )}

                {projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found</p>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-6">
                        {projects.map((project) => {
                            const technologies = getTechnologies(project.id);
                            return (
                                <div key={project.id} className="border-b border-gray-100 dark:border-gray-600 last:border-b-0 pb-4 last:pb-0 flex items-start gap-3 transition-colors">
                                    {!isRecruiter && (
                                        <div className="pt-1">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-500 rounded focus:ring-blue-500 dark:bg-gray-600"
                                                checked={selectedIds.includes(project.id)}
                                                onChange={() => handleToggle(project.id)}
                                                disabled={isEditing || isDeleting}
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-gray-800 dark:text-gray-100 text-xl font-bold transition-colors">
                                                {project.name}
                                            </h3>
                                            <span className="text-gray-500 dark:text-gray-400 text-base whitespace-nowrap ml-4 transition-colors">
                                                {project.startDate && project.endDate
                                                    ? `${project.startDate} - ${project.endDate}`
                                                    : project.startDate || project.endDate || ''}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-lg text-justify leading-relaxed mb-3 transition-colors">
                                            {project.description || 'No description provided'}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-md text-sm font-medium border border-blue-200 dark:border-blue-700 transition-colors"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={deleteModalOpen}
                title="Delete Projects"
                message={`Are you sure you want to delete ${pendingDeleteIds.length} project(s)?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isLoading={isDeleting}
            />

            <CreateProjectModal
                isOpen={isCreateModalOpen}
                onClose={handleCloseCreate}
                onCreate={handleCreate}
                isCreating={isCreating}
                createError={createError}
            />

            <EditProjectModal
                isOpen={isEditing}
                onClose={handleCloseEdit}
                project={projects.find((p) => p.id === editingProjectId)}
                onUpdate={handleUpdate}
                isUpdating={isUpdating}
                updateError={updateError}
            />
        </div>
    );
}

export default CandidateProfileProjects;