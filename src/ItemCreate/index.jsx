import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import apiFetch from "../services/apiFetch";
import { Typography } from "@mui/material";

const ItemCreate = ({ onClose }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [linkOffer, setLinkOffer] = useState("");
  const [jobSource, setJobSource] = useState("");

  const onCancel = () => {
    console.log("cancel");
    onClose();
  };
  const onSave = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
      companyName,
      jobTitle,
      linkOffer,
      jobSource,
      status: "to_do",
    };

    apiFetch(`applications?token=${window.localStorage.getItem("token")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(async (data) => {
      console.log(data);
      onClose();
    });
  };

  return (
    <Dialog
      open={true}
      onClose={onCancel}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "500px", // Set your width here
          },
        },
      }}
    >
      <form onSubmit={onSave}>
        <DialogTitle>
          <Typography variant="h3" sx={{ paddingY: 2 }}>
            Ajouter une candidature
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <TextField
              autoFocus
              id="company_name"
              label="Nom de l'entreprise"
              type="text"
              fullWidth
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <TextField
              autoFocus
              id="job_title"
              label="Intitulé du poste"
              type="text"
              fullWidth
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <TextField
              autoFocus
              id="link_offer"
              label="Lien de l'offre"
              type="text"
              fullWidth
              value={linkOffer}
              onChange={(e) => setLinkOffer(e.target.value)}
            />
            <TextField
              autoFocus
              id="job_source"
              label="Source de l'offre"
              type="text"
              fullWidth
              value={jobSource}
              onChange={(e) => setJobSource(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Annuler</Button>
          <Button type="submit">Ajouter</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ItemCreate;
