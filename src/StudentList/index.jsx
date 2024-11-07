import { 
    List,
    useRecordContext,
    SingleFieldList,
} from 'react-admin';
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";

const StudentPanel = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <AccordionDetails>
            
            <Button href={`https://openclassrooms.com/fr/spaces/admin/students/${record.id}`} variant="contained" color="primary">
                Voir le tableau de bord
            </Button><hr />
            <Button href="#" variant="contained" color="secondary">
                Voir le tableau de bord Tuteur
            </Button>
        </AccordionDetails>
    );
};

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

const StudentListItem = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <Accordion 
            sx={{ 
                width: '100%', 
                marginBottom: '10px',
                border: '1px solid #E8EAED',
                borderRadius: '8px !important',
                '&:before': {
                    display: 'none',
                },
                boxShadow: 'none'
            }}
        >
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    '&.MuiAccordionSummary-root': {
                        padding: '16px 24px',
                    }
                }}
            >
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    width: '100%',
                    gap: '20px'
                }}>
                    {/* Première ligne : Photo, Nom et Rôle */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <img 
                            src={record.profilePicture} 
                            alt={record.displayName}
                            style={{ 
                                width: '48px', 
                                height: '48px', 
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }}
                        />
                        <div>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    color: '#101828'
                                }}
                            >
                                {record.displayName}
                            </Typography>
                            <Typography 
                                sx={{ 
                                    color: '#667085',
                                    fontSize: '14px'
                                }}
                            >
                                {record.path?.title}
                            </Typography>
                        </div>
                    </div>

                    {/* Deuxième ligne : Projet en cours */}
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
                                    fontWeight: 500,
                                    flex: 1
                                }}
                            >
                                {record.followedProject?.projectTitle}
                            </Typography>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                minWidth: '200px'
                            }}>
                                <ProgressBar value={record.path?.completion * 100 || 0} />
                                <Typography sx={{ 
                                    minWidth: '45px',
                                    color: '#101828',
                                    fontWeight: 500
                                }}>
                                    {Math.round(record.path?.completion * 100 || 0)}%
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </AccordionSummary>
            <StudentPanel />
        </Accordion>
    );
};

const StudentList = () => (
    <List 
        component="div"
        sx={{ 
            '& .RaList-main': { 
                margin: 0,
                boxShadow: 'none',
            },
            '& .RaSingleFieldList-link': {
                width: '90%',
                margin: '0 auto',
                display: 'block'  
            }
        }}

    >
        <Card sx={{ 
            boxShadow: 'none',
            backgroundColor: 'transparent',
            width: '90%',
            margin: '0 auto'
        }}>
            <CardContent sx={{ 
                padding: '20px 0',
                '&:last-child': { 
                    paddingBottom: '20px' 
                }
            }}>
                <SingleFieldList>
                    <StudentListItem />
                </SingleFieldList>
            </CardContent>
        </Card>
    </List>
);

export default StudentList;