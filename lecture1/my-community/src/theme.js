import { createTheme } from '@mui/material/styles';

/**
 * Game Hub 테마
 * - 어둡고 붉은 네온 느낌
 * - 전문적이고 체계적인 분위기
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff1744',
      light: '#ff5983',
      dark: '#c4001d',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff0844',
      light: '#ff5983',
      dark: '#c4001d',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans KR", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '0.04em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: '0 0 10px rgba(255, 23, 68, 0.3)',
          '&:hover': {
            boxShadow: '0 0 20px rgba(255, 23, 68, 0.5)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #ff1744 30%, #ff5983 90%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          borderRadius: 12,
          border: '1px solid rgba(255, 23, 68, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          '&:hover': {
            borderColor: 'rgba(255, 23, 68, 0.5)',
            boxShadow: '0 0 25px rgba(255, 23, 68, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 23, 68, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 23, 68, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ff1744',
              boxShadow: '0 0 10px rgba(255, 23, 68, 0.3)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 23, 68, 0.1)',
          borderColor: 'rgba(255, 23, 68, 0.3)',
          color: '#ff5983',
        },
      },
    },
  },
});

export default theme;
