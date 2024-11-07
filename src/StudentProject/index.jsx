import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Chip } from '@mui/material';
import { useStudentData } from '../hooks/useStudentData';
import CurrentProject from '../CurrentProject';
import ProjectTabs from '../ProjectTabs';
const StudentProject = () => {
  const { id } = useParams();
  const { student, loading, error } = useStudentData(id);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!student) return <div>Étudiant non trouvé</div>;

  const currentProject = student.path?.currentProject;
  const completion = student.path?.completion || 0;
  const allProjects = student.path?.projects || [];

  return (
    <Box sx={{ p: 3 }}>
      <ProjectTabs projects={allProjects} />

      {/* Projet en cours */}
      <Box sx={{ mb: 4 }}>
        <CurrentProject 
          project={currentProject}
          completion={completion}
        />
      </Box>

      {/* Liste des compétences */}
      {currentProject?.competencies && currentProject.competencies.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Compétences du projet
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {currentProject.competencies.map((skill) => (
              <Chip 
                key={skill.id}
                label={skill.title || skill.name}
                variant="outlined"
                sx={{ margin: '4px' }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default StudentProject;