import {
  CreateButton,
  DatagridConfigurable,
  ExportButton,
  FilterButton,
  List,
  SelectColumnsButton,
  TopToolbar,
  SearchInput,
  useRedirect,
  useRefresh,
} from "react-admin";
import React, { useState } from "react";
import IconEvent from "@mui/icons-material/Event";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import ItemCreate from "../ItemCreate";

const BoardAction = () => {
  const [isCreatedOpen, setIsCreatedOpen] = useState(false);
  const redirect = useRedirect();

  return (
    <TopToolbar>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Button
          sx={{
            alignSelf: "flex-start",
            textTransform: "none",
            marginLeft: "-8px",
          }}
          onClick={() => setIsCreatedOpen(true)}
          startIcon={<AddIcon />}
        >
          Ajouter une candidature
        </Button>
        {isCreatedOpen && (
          <ItemCreate
            onClose={() => {
              redirect("/items");

              return setIsCreatedOpen(false);
            }}
          />
        )}
      </Box>
    </TopToolbar>
  );
};

export default BoardAction;
