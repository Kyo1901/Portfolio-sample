import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFB6C1',
    },
    secondary: {
      main: '#FFD700',
    },
    background: {
      default: '#FFF0F5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans KR", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Box
            sx={{
              width: '100%',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/posts" element={<PostList />} />
              <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
