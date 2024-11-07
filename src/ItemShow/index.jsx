import React, { useState, useEffect } from "react";
import { Show, SimpleShowLayout, DateField, RichTextField } from "react-admin";
import apiFetch from "../services/apiFetch";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { statusNames } from "../helpers/statuses";

import {
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  FormControlLabel,
  Checkbox,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import SuccessSteps from "../SuccessSteps";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function formatDate(date) {
  if (!date) return "";

  const d = new Date(date);
  let month = "" + (d.getMonth() + 1); // Les mois sont indexés à partir de 0
  let day = "" + d.getDate();
  const year = d.getFullYear();

  // Ajoute un 0 devant pour les mois et les jours inférieurs à 10
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const initialFormData = {
  jobTitle: "",
  companyName: "",
  linkOffer: "",
  jobSource: "",
  townName: "",
  remotePreference: "",
  contractType: "",
  motivationLetter: "",
  content: "",
  companyWebsiteLink: "",
  createdAt: new Date().toISOString().slice(0, 10), // format YYYY-MM-DD
  actionWriteLetter: false,
  actionFillApplication: false,
  actionRemindContact: false,
  actionGatherCompanyInfo: false,
  actionStalkContact: false,
  actionSendThanksMail: false,
  actionFillEmployerDashboard: false,
  // Add other boolean fields' initial values here
};

const jobSources = [
  { id: "ALUMNFORCE", name: "AlumnForce" },
  { id: "APEC", name: "APEC" },
  { id: "OTHER", name: "Autre" },
  { id: "BEYOND_JOBS", name: "Beyond Jobs" },
  { id: "WORK_AGENCY", name: "Cabinet de recrutement" },
  { id: "SPECULATIVE_APPLICATION", name: "Candidature spontanée" },
  { id: "HELLO_WORK", name: "Hello Work" },
  { id: "INDEED", name: "Indeed" },
  // Assuming you want to keep only one 'INTERIM' entry
  { id: "INTERIM", name: "Interim" },
  { id: "JOB_MAKE_SENSE", name: "Job Make Sense" },
  { id: "JOBTEASER", name: "Jobteaser" },
  { id: "LA_BONNE_ALTERNANCE", name: "La bonne alternance" },
  { id: "LINKEDIN", name: "LinkedIn" },
  { id: "MY_NETWORK", name: "Mon réseau" },
  { id: "MONSTER", name: "Monster" },
  { id: "JOB_BOARD", name: "Offres Grimp" },
  { id: "OUEST_FRANCE_EMPLOI", name: "Ouest France Emploi" },
  { id: "JOB_CENTER", name: "Pôle Emploi" },
  { id: "SCHOOL_NETWORK", name: "Réseau École" },
  { id: "WEBSITE", name: "Site web" },
  { id: "SPORTY_JOB", name: "Sportyjob" },
  { id: "WELCOME_TO_THE_JUNGLE", name: "Welcome to the Jungle" },
];

const remotePreferences = [
  { id: "noRemote", name: "Pas de télétravail (présentiel)" },
  { id: "partialRemote", name: "Télétravail partiel" },
  { id: "fullRemote", name: "Télétravail uniquement" },
];

const contractTypes = [
  { id: "alternance", name: "Contrat alternance" },
  { id: "cdd", name: "CDD" },
  { id: "cdi", name: "CDI" },
  { id: "internship", name: "Stage" },
  { id: "professionalContract", name: "Contrat pro" },
  // Add other contract types here
];

export const ItemShow = () => {
  const [formData, setFormData] = useState();
  const params = useParams();

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    saveData(name, type === "checkbox" ? checked : value);
  };

  const saveData = (fieldName, value) => {
    // Add your logic to save data
    console.log(`Saving ${fieldName}: ${value}`);
    apiFetch(
      `applications/${params.id}?token=${window.localStorage.getItem("token")}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [fieldName]: value,
        }),
      }
    ).then(async (data) => {});
  };

  useEffect(() => {
    if (!formData) {
      apiFetch(`applications?token=${window.localStorage.getItem("token")}`, {
        method: "GET",
      }).then(async (data) => {
        data.json().then((data) => {
          setFormData(
            data.filter((item) => item.id === parseInt(params.id))[0]
          );
        });
      });
    }
  }, [formData]);

  return (
    <Box
      sx={{
        "& .MuiInputBase-root": {
          backgroundColor: "white !important",
        },
      }}
    >
      {formData && (
        <form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "content.highlight.thirdLevel.background",
              padding: 8,
              gap: 2,
            }}
          >
            <Button
              startIcon={<KeyboardBackspaceIcon />}
              sx={{
                alignSelf: "flex-start",
                textTransform: "none",
                color: "interaction.navigationEnabled",
              }}
              onClick={() => window.history.back()}
            >
              Retour
            </Button>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h1" sx={{ marginBottom: 2 }}>
                {formData.jobTitle}
              </Typography>
              <Chip
                color="primary"
                sx={{ fontSize: "16px" }}
                label={statusNames[formData.status]}
              />
            </Box>
            <TextField
              name="companyName"
              label="Nom de l’entreprise"
              value={formData.companyName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="createdAt"
              label="Date de candidature"
              type="date"
              value={formatDate(formData?.createdAt)}
              onChange={() => handleInputChange}
              fullWidth
            />
          </Box>
          {!["refusal"].includes(formData.status) && (
            <SuccessSteps item={formData} />
          )}
          <Box sx={{ padding: 8 }}>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box
                sx={{
                  flexGrow: 1,
                  backgroundColor: "layout.background.dashboard",
                  padding: 2,
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h3" sx={{ marginBottom: 2 }}>
                  Ma candidature
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <TextField
                    name="jobTitle"
                    label="Intitulé du poste"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    name="linkOffer"
                    label="Lien URL de l’offre"
                    value={formData.linkOffer}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    select
                    name="jobSource"
                    value={formData.jobSource}
                    onChange={handleInputChange}
                    label="Source"
                  >
                    {jobSources.map((source) => (
                      <MenuItem key={source.id} value={source.id}>
                        {source.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    name="townName"
                    label="Localisation de l’offre (ville)"
                    value={formData.townName}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    select
                    name="remotePreference"
                    value={formData.remotePreference}
                    onChange={handleInputChange}
                    label="Préférence de télétravail"
                  >
                    {remotePreferences.map((preference) => (
                      <MenuItem key={preference.id} value={preference.id}>
                        {preference.name}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    name="contractType"
                    value={formData.contractType}
                    onChange={handleInputChange}
                    label="Type de contrat"
                  >
                    {contractTypes.map((type) => (
                      <MenuItem key={type.id} value={type.name}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    multiline
                    name="motivationLetter"
                    value={formData.motivationLetter}
                    onChange={handleInputChange}
                    minRows={3}
                    label="Mail de motivation"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "layout.background.dashboard",
                    padding: 2,
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="h3" sx={{ marginBottom: 2 }}>
                    L’entreprise
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <TextField
                      name="companyName"
                      label="Nom de l’entreprise"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      name="companyWebsiteLink"
                      label="Site web de l’entreprise"
                      value={formData.companyWebsiteLink}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      name="contactName"
                      multiline
                      value={formData.contactName}
                      onChange={handleInputChange}
                      minRows={3}
                      label="Contacts"
                      style={{ width: "100%", margin: "8px 0" }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "layout.background.dashboard",
                    padding: 2,
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="h3">Notes</Typography>
                  <TextField
                    name="content"
                    multiline
                    value={formData.content}
                    onChange={handleInputChange}
                    minRows={3}
                    style={{ width: "100%", margin: "8px 0" }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 3,
            }}
          ></Box>
        </form>
      )}
    </Box>
  );
};
