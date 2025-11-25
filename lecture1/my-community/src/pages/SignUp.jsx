import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { signUp, setCurrentUser } from '../utils/auth';

/**
 * 회원가입 페이지 컴포넌트
 */
function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 비밀번호 확인 검증
    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    // 비밀번호 길이 검증
    if (formData.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      setLoading(false);
      return;
    }

    const { success, data, error: authError } = await signUp(
      formData.username,
      formData.password,
      formData.nickname
    );

    if (success) {
      setCurrentUser(data);
      navigate('/posts');
    } else {
      setError(authError);
    }

    setLoading(false);
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
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              mb: 4,
              textShadow: '0 0 20px rgba(255, 23, 68, 0.5)',
            }}
          >
            🎮 Game Hub
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 4 }}
          >
            회원가입
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="아이디"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
              autoFocus
              helperText="영문, 숫자 조합"
            />

            <TextField
              fullWidth
              label="비밀번호"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              helperText="6자 이상"
            />

            <TextField
              fullWidth
              label="비밀번호 확인"
              name="passwordConfirm"
              type="password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="닉네임"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              margin="normal"
              required
              helperText="게시판에 표시될 이름"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? '가입 중...' : '회원가입 하기'}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{ mt: 1 }}
            >
              로그인으로 돌아가기
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default SignUp;
