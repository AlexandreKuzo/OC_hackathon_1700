import { createTheme } from '@mui/material/styles';
import palette from './palette';
import getTypography from './getTypography';
import breakpoints from './breakpoints';

const theme = createTheme({
  palette,
  typography: getTypography({ breakpoints }),
});

export default theme;
