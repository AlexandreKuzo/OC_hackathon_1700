import { Box } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useState, useEffect } from 'react';
import apiFetch from '../services/apiFetch';
import Button from '@mui/material/Button';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useRedirect } from 'react-admin';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ChecklistView = () => {
  const [checklist, setChecklist] = useState();
  const redirect = useRedirect();

  const goToBoard = () => {
    redirect('/items');
  };
  useEffect(() => {
    if (!checklist) {
      apiFetch(`checklists?token=${window.localStorage.getItem('token')}`, {
        method: 'GET',
      }).then(async (data) => {
        data.json().then((data) => setChecklist(data));
      });
    }
  }, [checklist]);

  const onCheck = (event) => {
    const { value, checked } = event.target;
    apiFetch(`checklists?token=${window.localStorage.getItem('token')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [value]: checked }),
    }).then(async (data) => {
      setChecklist({ ...checklist, [value.replace('_', '')]: checked });
    });
  };

  return (
    <Box sx={{ paddingY: 5, paddingX: 5 }}>
      <Typography variant="h2">Avant de postuler</Typography>
      <Typography variant="body" sx={{ mb: 4, display: 'block' }}>
        Avant d’envoyer vos premières candidatures, il est nécessaire de mettre
        à jour votre dossier de candidature pour optimiser vos chances de vous
        démarquer auprès des entreprises.
      </Typography>

      {checklist && (
        <Box sx={{ pr: 4 }}>
          <FormGroup sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormControlLabel
                    checked={checklist?.question1 === true}
                    control={
                      <Checkbox
                        value="question_1"
                        onChange={onCheck}
                        inputProps={{ style: { zIndex: -1 } }}
                      />
                    }
                    label="Je mets à jour mon CV"
                  />
                  <Typography
                    variant="helper"
                    sx={{ color: 'form.label.helper', paddingLeft: 4 }}
                  >
                    Il va vous servir de passeport pour expliquer qui vous êtes,
                    votre vécu professionnel, vos réalisations, vos ambitions...
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="h5" gutterBottom>
                  Comment faire son CV? Comment trouvez une entreprise?
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Suivez ces cours pour multiplier vos chances de trouver votre
                  entreprise d'accueil.
                </Typography>
                <List>
                  <ListItem>
                    <Link href="https://openclassrooms.com/fr/courses/5218221-elaborez-votre-strategie-de-recherche-demploi">
                      Elaborez votre stratégie de recherche d'emploi
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://openclassrooms.com/fr/courses/5754261-developpez-votre-reseau-professionnel">
                      Développez votre réseau professionnel
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://openclassrooms.com/fr/courses/4698761-developpez-votre-personal-branding">
                      Développez votre personal branding
                    </Link>
                  </ListItem>
                </List>

                {/* Section 2 */}
                <Typography variant="h5" gutterBottom>
                  Nos conseils pour "Trouvez votre premier emploi"
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Suivez ces cours pour construire votre projet professionnel et
                  mieux préparer votre recherche d'alternance
                </Typography>
                <List>
                  <ListItem>
                    <Link href="https://openclassrooms.com/fr/courses/5218141-construisez-votre-projet-professionnel">
                      Construisez votre projet professionnel
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://openclassrooms.com/fr/courses/8106476-trouvez-votre-premier-emploi-en-data">
                      Trouvez mon premier emploi en data
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link href="https://openclassrooms.com/fr/courses/8033446-trouvez-votre-premier-emploi-en-tant-que-developpeur">
                      Trouvez mon premier emploi en tant que développeur
                    </Link>
                  </ListItem>
                </List>

                {/* Section 3 */}
                <Typography variant="h5" gutterBottom>
                  Créer son CV à partir des templates OpenClassrooms
                </Typography>
                <Typography variant="subtitle1">
                  OpenClassrooms vous met à disposition des modèles de CV aux
                  couleurs de notre école. Utilisez ces templates en créant une
                  copie de ce document afin d'y ajouter vos informations
                  personnelles.
                </Typography>
                {/* Link to templates (assuming a URL would be provided) */}
                <Link href="#" variant="body2">
                  Accédez aux templates de CV
                </Link>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormControlLabel
                    checked={checklist?.question2 === true}
                    control={
                      <Checkbox
                        value="question_2"
                        onChange={onCheck}
                        inputProps={{ style: { zIndex: -1 } }}
                      />
                    }
                    label="Je mets à jour mon LinkedIn et j’élargis mon réseau à 250 contacts"
                  />
                  <Typography
                    variant="helper"
                    sx={{ color: 'form.label.helper', paddingLeft: 4 }}
                  >
                    Il est essentiel d’utiliser les réseaux sociaux
                    professionnels tels que LinkedIn. Les recruteurs y sont
                    présents, ils le consultent en permanence à la fois pour
                    s'informer, échanger avec des collègues et professionnels de
                    leur métier
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Suivez ces cours pour multiplier vos chances de trouver votre
                  entreprise d’accueil.
                  <List>
                    <ListItem>
                      <Link>
                        Elaborez votre stratégie de recherche d’emploi{' '}
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link>Développez votre réseau professionnel</Link>
                    </ListItem>
                    <ListItem>
                      <Link>Développez votre personal branding</Link>
                    </ListItem>
                  </List>
                  Ajoutez vos formations précédentes, et les diplômes certifiés
                  associés.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormControlLabel
                    checked={checklist?.question3 === true}
                    control={
                      <Checkbox
                        value="question_3"
                        onChange={onCheck}
                        inputProps={{ style: { zIndex: -1 } }}
                      />
                    }
                    label="Je m’inscris au wébinaire “Décrochez votre alternance”"
                  />
                  <Typography
                    variant="helper"
                    sx={{ color: 'form.label.helper', paddingLeft: 4 }}
                  >
                    Le wébinaire répondra à vos questions et vous donnera de
                    nombreux conseils pour démarrer votre recherche en
                    alternance
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Inscrivez-vous à la prochaine session</Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormControlLabel
                    checked={checklist?.question4 === true}
                    control={
                      <Checkbox
                        value="question_4"
                        onChange={onCheck}
                        inputProps={{ style: { zIndex: -1 } }}
                      />
                    }
                    label="Je rédige un mail de candidature pour présenter mon projet professionnel et mes compétences"
                  />
                  <Typography
                    variant="helper"
                    sx={{ color: 'form.label.helper', paddingLeft: 4 }}
                  >
                    Apprendre à se présenter et à postuler à des candidatures
                    spontanées est clé dans votre recherche d’alternance.
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Rédigez quelques lignes de présentation à ajouter à vos
                  candidatures, en remplacement des lettres de motivation.
                </Typography>
                <Typography>
                  Utilisez Hunter.io pour faire ressortir les mots-clés d’une
                  offre d’alternance ou de votre CV et les utilisez dans votre
                  texte
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                sx={{ mt: 2 }}
                onClick={goToBoard}
                variant="contained"
                endIcon={<ArrowForward />}
                disabled={
                  !(
                    checklist?.question1 &&
                    checklist?.question2 &&
                    checklist?.question3 &&
                    checklist?.question4
                  )
                }
              >
                Suivre mes candidatures
              </Button>
            </Box>
          </FormGroup>
        </Box>
      )}
    </Box>
  );
};

export default ChecklistView;
