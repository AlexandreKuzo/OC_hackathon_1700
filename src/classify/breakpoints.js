import { Breakpoints, Breakpoint } from '@mui/material/styles';
import { createBreakpoints } from '@mui/system';

const breakpoints: Breakpoints = createBreakpoints({
  values: {
    xs: 0,
    sm: 768,
    md: 1024,
    lg: 1440,
    xl: 1920,
  },
});

export const breakpointsOrdered: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export default breakpoints;
