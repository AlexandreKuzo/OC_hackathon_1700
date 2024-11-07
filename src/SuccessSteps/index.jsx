import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Typography,
  List,
  ListItem,
  Link,
  Checkbox,
  Box,
} from "@mui/material";
import Action from "../Action";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import apiFetch from "../services/apiFetch";

const SuccessSteps = ({ item }) => {
  const [items, setItems] = useState({});

  useEffect(() => {
    setItems(item);
  }, []);

  const onCheck = (event) => {
    event.stopPropagation();
    const { value, checked } = event.target;
    apiFetch(
      `applications/${item.id}?token=${window.localStorage.getItem("token")}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [value]: checked }),
      }
    ).then(async (data) => {
      setItems({ ...items, [value]: checked });
    });
  };

  return (
    <Box sx={{ paddingX: 8, paddingTop: 4 }}>
      <Typography variant="h3">Pour réussir cette étape</Typography>
      <Typography>
        Suivez les étapes et conseils ci-dessous pour maximiser vos chances de
        réussite à cette étape.
      </Typography>
      <p>
        The following steps are required to successfully complete this tutorial:
      </p>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.status === "to_do" && (
          <Action
            label={
              <>
                J’adapte mon mail de motivation par rapport aux compétences
                demandées dans l’offre -
                <strong> Avant le 21 novembre 2023</strong>
              </>
            }
            onCheck={onCheck}
            value="actionWriteLetter"
            checked={items.actionWriteLetter}
          />
        )}
        {items.status === "to_do" && (
          <Action
            label={
              <>
                J’envoie ma candidature -
                <strong> Avant le 21 novembre 2023</strong>{" "}
              </>
            }
            onCheck={onCheck}
            value="actionFillApplication"
            checked={items.actionFillApplication}
          />
        )}
        {items.status === "application_in_progress" && (
          <Action
            label={
              <>
                Je trouve les contacts pour relancer ma candidature -{" "}
                <strong>Avant le 18 novembre 2023</strong>
              </>
            }
            details={
              <>
                Je relance ma candidature -
                <strong> Avant le 18 novembre 2023</strong>
              </>
            }
            onCheck={onCheck}
            value="actionRemindContact"
            checked={items.actionRemindContact}
          />
        )}
        {items.status === "application_in_progress" && (
          <Action
            label={
              <>
                Je relance ma candidature -
                <strong> Avant le 18 novembre 2023</strong>
              </>
            }
            onCheck={onCheck}
            value="actionFindGoodContact"
            checked={items.actionFindGoodContact}
          />
        )}
        {items.status === "application_in_progress" && (
          <Action
            label="Je remplis le champs “Dernier contact avec l’entreprise” en haut de page dès que j’ai une réponse de l’entreprise"
            onCheck={onCheck}
            value="actionRemindInterview"
            checked={items.actionRemindInterview}
          />
        )}
        {items.status === "interview_in_progress" && (
          <Action
            label={
              <>
                Je renseigne la date de l’entretien dans le champs “Prochain
                contact avec l’entreprise” en haut de page -{" "}
                <strong>Avant le 26 novembre 2023</strong>
              </>
            }
            onCheck={onCheck}
            value="actionGatherCompanyInfo"
            checked={items.actionGatherCompanyInfo}
          />
        )}
        {items.status === "interview_in_progress" && (
          <Action
            label={
              <>
                Je prépare mon entretien -{" "}
                <strong>Avant le 1er décembre 2023</strong>
              </>
            }
            details={
              <>
                Renseignez-vous sur l’entreprise, son secteur et le parcours des
                personnes que je vais rencontrer. Relisez bien l’offre et
                travaillez votre présentation pour mettre en avant les
                compétences et les soft skills les plus recherchées par
                l’entreprise.
              </>
            }
            onCheck={onCheck}
            value="actionSendThanksMail"
            checked={items.actionSendThanksMail}
          />
        )}
        {items.status === "interview_in_progress" && (
          <Action
            label={
              <>
                J’envoie un mail de remerciement après l’entretien -{" "}
                <strong>Avant le 2 décembre 2023</strong>
              </>
            }
            onCheck={onCheck}
            details={
              <>
                Reprenez les points principaux de vos échanges lors de votre
                entretien et renouvellez votre motivation pour rejoindre
                l’entreprise
              </>
            }
            value="actionFillEmployerDashboard"
            checked={items.actionFillEmployerDashboard}
          />
        )}

        {items.status === "interview_in_progress" && (
          <Action
            label={
              <>
                Je relance ma candidature -{" "}
                <strong>Avant le 2 décembre 2023</strong>
              </>
            }
            onCheck={onCheck}
            value="actionNextInterviewDate"
            checked={items.actionNextInterviewDate}
          />
        )}

        {items.status === "contract_finalization" && (
          <Action
            label={
              <>
                Je renseigne les informations de mon employeur sur{" "}
                <Link href="question_4">ce formulaire</Link>.
                <br /> Vous recevrez un lien pour signer votre contrat par email
                dans les prochains jours.
              </>
            }
            onCheck={onCheck}
            value="actionFillEmployerDashboard"
            checked={items.actionFillEmployerDashboard}
          />
        )}
        {items.status === "contract_signed" && (
          <Action
            label={
              <>
                Remplissez ce formulaire pour indiquer votre changement de
                situation
              </>
            }
            onCheck={onCheck}
            value="actionFillEmployerDashboard"
            checked={items.actionFillEmployerDashboard}
          />
        )}
      </Box>
    </Box>
  );
};

export default SuccessSteps;
