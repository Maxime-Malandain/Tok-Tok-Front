import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#49c1ad',
      light: '#82d4c6',
      dark: '#308d7d',
    },
    secondary: {
      main: '#ef6f6c',
    },
    background: {
      default: '#F5F6FA',
    },
    text: {
      secondary: '#A5A5A5',
      disabled: '#888888',
    },
  },
  typography: {
    fontFamily: 'DM Sans, Manrope',
  },
  components: {
    MuiBadge: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
  },
});

export default theme;
