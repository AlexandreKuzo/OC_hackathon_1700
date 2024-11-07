import colorDecisions from './colorDecisions';
import colorOptions from './colorOptions';

const MUIRequiredPalette = {
  primary: {
    main: colorDecisions.brand.primary,
    light: colorDecisions.brand.primary,
    dark: colorDecisions.brand.primary,
  },
  secondary: {
    main: colorOptions.dimGrey,
    light: colorOptions.dimGrey,
    dark: colorOptions.dimGrey,
  },
};

const palette = { ...colorDecisions, ...MUIRequiredPalette };

export default palette;
