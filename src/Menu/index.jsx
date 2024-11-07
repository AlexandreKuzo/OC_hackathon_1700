import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChecklistIcon from '@mui/icons-material/CheckBoxOutlined';
import AnalyticsIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People'; 

const CustomMenu = () => {
  
  
  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      width: '240px',
      backgroundColor: 'white',
      color: 'black',
      zIndex: 1000,
      paddingTop: '64px',
      borderRight: '1px solid #ddd'
    }}>
      <List>
        <ListItem 
          component={Link} 
          to="/"
          style={{ 
            color: 'black', 
            marginBottom: '8px',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#e3f2fd'
            }
          }}
        >
          <ListItemIcon>
            <DashboardIcon style={{ color: 'black' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Accueil" 
            style={{ color: 'black' }}
          />
        </ListItem>

        <ListItem 
          component={Link} 
          to="https://openclassrooms.com/fr/"
          style={{ 
            color: 'black', 
            marginBottom: '8px',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#e3f2fd'
            }
          }}
        >
          <ListItemIcon>
            <DashboardIcon style={{ color: 'black' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Mon profil" 
            style={{ color: 'black' }}
          />
        </ListItem>

        <ListItem 
          component={Link} 
          to="https://businesshelp-openclassrooms.zendesk.com/hc/fr"
          style={{ 
            color: '#000000',
            backgroundColor: '#FFFFFF',
            marginBottom: '8px',
            borderRadius: '4px'
          }}
        >
          <ListItemIcon>
            <PeopleIcon style={{ color: '#000000' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Centre d'aide tuteurs/tutrices" 
            style={{ color: '#000000' }}
          />
        </ListItem>
        <ListItem 
          component={Link} 
          to="/students"
          style={{ 
            color: '#000000',
            backgroundColor: '#FFFFFF',
            marginBottom: '8px',
            borderRadius: '4px'
          }}
        >
          <ListItemIcon>
            <PeopleIcon style={{ color: '#000000' }} />
          </ListItemIcon>
          <ListItemText 
            primary="MES ALTERNANTS" 
            style={{ color: '#000000' }}
          />
        </ListItem>
      </List>
    </div>
  );
};

export default CustomMenu;