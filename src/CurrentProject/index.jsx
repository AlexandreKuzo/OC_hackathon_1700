import React from 'react';
import { Typography, Box } from '@mui/material';


const ProgressBar = ({ value }) => (
    <div style={{ 
        width: '100%',
        height: '8px',
        backgroundColor: '#E8EAED',
        borderRadius: '4px',
        overflow: 'hidden'
    }}>
        <div style={{
            width: `${value}%`,
            height: '100%',
            backgroundColor: '#7F56D9',
            borderRadius: '4px',
            transition: 'width 0.3s ease'
        }} />
    </div>
);

const CurrentProject = ({ project, completion }) => {
    return (
        <div>
            <Typography 
                sx={{ 
                    fontSize: '14px',
                    color: 'green',
                    marginBottom: '8px'
                }}
            >
                PROJET EN COURS
            </Typography>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap'
            }}>
                <Typography 
                    sx={{ 
                        fontSize: '16px',
                        color: '#101828',
                        fontWeight: 900,
                        flex: 1
                    }}
                >
                    {project?.projectTitle}
                </Typography>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    minWidth: '200px'
                }}>
                    <ProgressBar value={completion * 100 || 0} />
                    <Typography sx={{ 
                        minWidth: '45px',
                        color: '#101828',
                        fontWeight: 500
                    }}>
                        {Math.round(completion * 100 || 0)}%
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default CurrentProject;