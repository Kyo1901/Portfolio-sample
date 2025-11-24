import { createTheme } from '@mui/material/styles';

/**
 * Apple-inspired Color Palette Theme
 * 출처: 컬러 팔레트 디자인 시스템.md
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#0071E3', // Apple Blue
      light: '#0077ED',
      dark: '#0066CC',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#1D1D1F', // Dark Gray
      light: '#2C2C2E',
      dark: '#000000',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#FF3B30'
    },
    warning: {
      main: '#FF9500' // Accent Orange
    },
    info: {
      main: '#0071E3'
    },
    success: {
      main: '#34C759'
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F7'
    },
    text: {
      primary: '#1D1D1F',
      secondary: '#6E6E73',
      disabled: '#86868B'
    },
    divider: '#E8E8ED'
  },
  typography: {
    fontFamily: '"Roboto", "SF Pro Display", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#1D1D1F',
      letterSpacing: '-0.02em'
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#1D1D1F',
      letterSpacing: '-0.01em'
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1D1D1F'
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#1D1D1F'
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#1D1D1F'
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#1D1D1F'
    },
    body1: {
      fontSize: '1rem',
      color: '#1D1D1F',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      color: '#6E6E73',
      lineHeight: 1.5
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  spacing: 8,
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0, 0, 0, 0.08)',
    '0 4px 12px rgba(0, 0, 0, 0.12)',
    '0 6px 16px rgba(0, 0, 0, 0.16)',
    '0 8px 24px rgba(0, 0, 0, 0.16)',
    '0 12px 32px rgba(0, 0, 0, 0.16)',
    '0 16px 40px rgba(0, 0, 0, 0.16)',
    '0 20px 48px rgba(0, 0, 0, 0.16)',
    '0 24px 56px rgba(0, 0, 0, 0.16)',
    '0 28px 64px rgba(0, 0, 0, 0.16)',
    '0 32px 72px rgba(0, 0, 0, 0.16)',
    '0 36px 80px rgba(0, 0, 0, 0.16)',
    '0 40px 88px rgba(0, 0, 0, 0.16)',
    '0 44px 96px rgba(0, 0, 0, 0.16)',
    '0 48px 104px rgba(0, 0, 0, 0.16)',
    '0 52px 112px rgba(0, 0, 0, 0.16)',
    '0 56px 120px rgba(0, 0, 0, 0.16)',
    '0 60px 128px rgba(0, 0, 0, 0.16)',
    '0 64px 136px rgba(0, 0, 0, 0.16)',
    '0 68px 144px rgba(0, 0, 0, 0.16)',
    '0 72px 152px rgba(0, 0, 0, 0.16)',
    '0 76px 160px rgba(0, 0, 0, 0.16)',
    '0 80px 168px rgba(0, 0, 0, 0.16)',
    '0 84px 176px rgba(0, 0, 0, 0.16)',
    '0 88px 184px rgba(0, 0, 0, 0.16)'
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        },
        contained: {
          '&:hover': {
            backgroundColor: '#0077ED'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          border: '1px solid #E8E8ED'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  }
});

export default theme;
