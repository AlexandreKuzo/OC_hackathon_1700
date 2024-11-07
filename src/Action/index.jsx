import React from 'react';
import {
  Accordion,
  AccordionSummary,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Action = ({ label, onCheck, checked, description, details, value }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControlLabel
            checked={checked}
            control={
              <Checkbox
                value={value}
                onChange={onCheck}
                inputProps={{ style: { zIndex: -1 } }}
              />
            }
            label={label}
          />
          {description && (
            <Typography
              variant="helper"
              sx={{ color: 'form.label.helper', paddingLeft: 4 }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>{details}</AccordionDetails>
    </Accordion>
  );
};

export default Action;
