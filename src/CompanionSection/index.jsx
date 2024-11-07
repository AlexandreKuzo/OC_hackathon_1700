import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const CompanionSection = ({ studentName }) => {
  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <PersonIcon sx={{ mr: 1 }} />
        <Typography variant="h6">Companion</Typography>
      </Box>
      <Typography>
        {studentName} vient de commencer son projet. Le projet va lui permettre d'acquérir les
        compétences suivantes. Ce projet devrait lui permettre de créer dans
        votre entreprise des parcours utilisateurs ainsi que des interviews utilisateurs !
        Comment puis-je vous aider dans son accompagnement ?
      </Typography>
    </Paper>
  );
};

export default CompanionSection;