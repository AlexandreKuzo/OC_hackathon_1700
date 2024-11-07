import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Card, LinearProgress, Chip } from '@mui/material';

// Composant pour afficher un projet individuel
const ProjectCard = ({ project }) => {
    const progress = project.completion ? project.completion * 100 : 0;
    
    return (
        <Card sx={{ 
            p: 2, 
            mb: 2,
            boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1)',
            border: '1px solid #EAECF0',
            borderRadius: '8px'
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ 
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#101828'
                }}>
                    {project.title}
                </Typography>
                <Typography sx={{ 
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#101828'
                }}>
                    {Math.round(progress)}%
                </Typography>
            </Box>
            <LinearProgress 
                variant="determinate" 
                value={progress}
                sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#F2F4F7',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#7F56D9',
                        borderRadius: 4,
                    },
                    mb: 2
                }}
            />
            
            {/* Affichage des compétences */}
            {project.competencies && project.competencies.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography sx={{ 
                        fontSize: '12px',
                        color: '#667085',
                        mb: 1
                    }}>
                        Compétences :
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {project.competencies.map((comp) => (
                            <Chip
                                key={comp.id}
                                label={comp.name}
                                size="small"
                                sx={{
                                    fontSize: '12px',
                                    backgroundColor: '#F9F5FF',
                                    color: '#7F56D9',
                                    borderRadius: '16px',
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Card>
    );
};

const ProjectTabs = ({ projects }) => {
    const [currentTab, setCurrentTab] = useState('inProgress');

    // Filtrage des projets
    const completedProjects = projects
        ?.filter(p => p.completion === 1)
        .sort((a, b) => {
            // Tri par date de completion (du plus récent au plus ancien)
            const dateA = a.reviewedAt ? new Date(a.reviewedAt) : new Date(0);
            const dateB = b.reviewedAt ? new Date(b.reviewedAt) : new Date(0);
            return dateB - dateA;
        }) || [];

    const inProgressProjects = projects?.filter(p => p.learningActivityStatus === 'in progress') || [];
    const upcomingProjects = projects?.filter(p => p.completion === null && p.learningActivityStatus === 'not started') || [];

    // Ajout de la définition de totalProjects ici
    const totalProjects = projects?.length || 0;

    // Fonction pour afficher les projets selon l'onglet actif
    const renderProjects = () => {
        let projectsToShow = [];
        switch (currentTab) {
            case 'inProgress':
                projectsToShow = inProgressProjects;
                break;
            case 'upcoming':
                projectsToShow = upcomingProjects;
                break;
            case 'completed':
                projectsToShow = completedProjects;
                break;
            default:
                projectsToShow = [];
        }

        return (
            <Box sx={{ mt: 2 }}>
                {projectsToShow.map((project) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project}
                    />
                ))}
                {projectsToShow.length === 0 && (
                    <Typography sx={{ color: '#667085', textAlign: 'center', py: 4 }}>
                        Aucun projet dans cette catégorie
                    </Typography>
                )}
            </Box>
        );
    };

    return (
        <Box sx={{ width: '100%', mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Projets
            </Typography>
            
            <Tabs
                value={currentTab}
                onChange={(e, newValue) => setCurrentTab(newValue)}
                sx={{ 
                    mb: 2,
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#7F56D9',
                    }
                }}
            >
                <Tab 
                    label={`En cours (${inProgressProjects.length})`}
                    value="inProgress"
                    sx={{ 
                        textTransform: 'none',
                        fontWeight: 500,
                        color: currentTab === 'inProgress' ? '#7F56D9' : '#667085',
                        '&.Mui-selected': { color: '#7F56D9' }
                    }}
                />
                <Tab 
                    label={`À venir (${upcomingProjects.length}/${totalProjects})`}
                    value="upcoming"
                    sx={{ 
                        textTransform: 'none',
                        fontWeight: 500,
                        color: currentTab === 'upcoming' ? '#7F56D9' : '#667085',
                        '&.Mui-selected': { color: '#7F56D9' }
                    }}
                />
                <Tab 
                    label={`Complété (${completedProjects.length}/${totalProjects})`}
                    value="completed"
                    sx={{ 
                        textTransform: 'none',
                        fontWeight: 500,
                        color: currentTab === 'completed' ? '#7F56D9' : '#667085',
                        '&.Mui-selected': { color: '#7F56D9' }
                    }}
                />
            </Tabs>

            {/* Affichage des projets */}
            {renderProjects()}
        </Box>
    );
};

export default ProjectTabs;