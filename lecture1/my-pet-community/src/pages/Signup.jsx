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
 * Signup 컴포넌트 - 회원가입 페이지
 */
function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!username || !password || !nickname) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (password.length < 4) {
      setError('비밀번호는 최소 4자 이상이어야 합니다.');
      return;
    }

    const result = await signup(username, password, nickname);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
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
              회원가입
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              펫샵 커뮤니티에 가입하세요!
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              회원가입이 완료되었습니다! 로그인 페이지로 이동합니다...
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
              helperText="로그인 시 사용할 아이디를 입력하세요"
            />
            <TextField
              fullWidth
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              helperText="최소 4자 이상 입력하세요"
            />
            <TextField
              fullWidth
              label="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              margin="normal"
              required
              helperText="커뮤니티에서 사용할 닉네임을 입력하세요"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              회원가입 하기
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                이미 계정이 있으신가요?{' '}
                <Link
                  to="/login"
                  style={{ color: '#FFB6C1', textDecoration: 'none' }}
                >
                  로그인
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Signup;
