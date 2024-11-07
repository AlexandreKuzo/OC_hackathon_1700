import React from "react";
import { Title } from "react-admin";
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
const Home = () => {
  return (
    <div style={{ padding: '20px', display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
      <Link to="https://openclassrooms.com/fr/" style={{ textDecoration: 'none' }}>
        <Card>
          <CardContent>
            <Typography variant="h5">Mon profil</Typography>
            <Typography variant="body2">Accéder au profil</Typography>
          </CardContent>
        </Card>
      </Link>

      <Link to="/students" style={{ textDecoration: 'none' }}>
        <Card>
          <CardContent>
            <Typography variant="h5">Les alternants</Typography>
            <Typography variant="body2">Accéder à la liste d'apprenants</Typography>
          </CardContent>
        </Card>
      </Link>

      <Link to="https://businesshelp-openclassrooms.zendesk.com/hc/fr" style={{ textDecoration: 'none' }}>
        <Card>
          <CardContent>
            <Typography variant="h5">Centre d'aide</Typography>
            <Typography variant="body2">Nous contacter, récupérer des ressources...</Typography>
          </CardContent>
        </Card>
      </Link>
      <Link to="#" style={{ textDecoration: 'none' }}>
        <Card>
          <CardContent>
            <Typography variant="h5">Recrutez un alternant</Typography>
            <Typography variant="body2">Consulter les candidatures</Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default Home;
