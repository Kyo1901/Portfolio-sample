import { createTheme } from '@mui/material/styles';

// 맛ZIP 디자인 시스템
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B35', // 활기찬 오렌지
      light: '#FF8C61',
      dark: '#E55A2A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFB84D', // 따뜻한 옐로우
      light: '#FFC870',
      dark: '#F5A838',
      contrastText: '#212529',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA',
    },
    text: {
      primary: '#212529',
      secondary: '#6C757D',
    },
  },
  typography: {
    fontFamily: '"Pretendard", "Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12, // 부드러운 느낌
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 2px 8px rgba(255, 107, 53, 0.24)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.32)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

export default theme;
