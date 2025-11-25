import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              display_name: displayName
            }
          }
        });
        if (error) throw error;
        alert('회원가입 성공! 로그인해주세요.');
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        navigate('/');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FF6B35 0%, #FFB84D 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
              🍽️ 맛ZIP
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
              오늘 뭐 먹지? 당신의 맛집 가이드
            </Typography>

            <Box component="form" onSubmit={handleAuth}>
              <TextField
                fullWidth
                label="이메일"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: 2 }}
              />

              {isSignUp && (
                <>
                  <TextField
                    fullWidth
                    label="사용자명"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="표시 이름"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                  />
                </>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mb: 2 }}
              >
                {isSignUp ? '회원가입' : '로그인'}
              </Button>

              <Button
                fullWidth
                variant="text"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;
