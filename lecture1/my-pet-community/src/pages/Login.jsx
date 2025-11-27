import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { Pets } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

/**
 * Login 컴포넌트 - 로그인 페이지
 */
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      navigate('/posts');
    } else {
      setError(result.error);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Pets sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 'bold', color: 'primary.main' }}
            >
              🐱 Pet Community
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              펫샵 커뮤니티에 오신 것을 환영합니다!
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              로그인
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                계정이 없으신가요?{' '}
                <Link
                  to="/signup"
                  style={{ color: '#FFB6C1', textDecoration: 'none' }}
                >
                  회원가입
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
