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
        // 회원가입: sns_users 테이블에 직접 저장
        // 1. 중복 확인 (이메일)
        const { data: existingEmail } = await supabase
          .from('sns_users')
          .select('id')
          .eq('email', email)
          .single();

        if (existingEmail) {
          alert('이미 등록된 이메일입니다.');
          return;
        }

        // 2. 중복 확인 (사용자명)
        const { data: existingUsername } = await supabase
          .from('sns_users')
          .select('id')
          .eq('username', username)
          .single();

        if (existingUsername) {
          alert('이미 사용 중인 사용자명입니다.');
          return;
        }

        // 3. sns_users 테이블에 사용자 정보 저장
        const { data, error } = await supabase
          .from('sns_users')
          .insert([
            {
              email: email,
              username: username,
              nickname: displayName,
              password: password // 실제 프로덕션에서는 해싱 필요
            }
          ])
          .select()
          .single();

        if (error) throw error;

        alert('회원가입 성공! 로그인해주세요.');
        setIsSignUp(false);
        setPassword('');
      } else {
        // 로그인: sns_users 테이블에서 검증
        const { data: user, error } = await supabase
          .from('sns_users')
          .select('*')
          .eq('email', email)
          .eq('password', password)
          .single();

        if (error || !user) {
          alert('이메일 또는 비밀번호가 일치하지 않습니다.');
          return;
        }

        // 로그인 성공: localStorage에 사용자 정보 저장
        localStorage.setItem('sns_user', JSON.stringify(user));
        navigate('/');
      }
    } catch (error) {
      alert(error.message || '오류가 발생했습니다.');
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
        py: { xs: 2, md: 4 }
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ boxShadow: { xs: 2, md: 8 } }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              🍽️ 맛ZIP
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{
                mb: { xs: 3, md: 4 },
                fontSize: { xs: '0.875rem', md: '1rem' }
              }}
            >
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
                sx={{ mb: { xs: 1.5, md: 2 } }}
                size={window.innerWidth < 600 ? 'small' : 'medium'}
              />
              <TextField
                fullWidth
                label="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: { xs: 1.5, md: 2 } }}
                size={window.innerWidth < 600 ? 'small' : 'medium'}
              />

              {isSignUp && (
                <>
                  <TextField
                    fullWidth
                    label="사용자명"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    sx={{ mb: { xs: 1.5, md: 2 } }}
                    size={window.innerWidth < 600 ? 'small' : 'medium'}
                  />
                  <TextField
                    fullWidth
                    label="표시 이름"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    sx={{ mb: { xs: 1.5, md: 2 } }}
                    size={window.innerWidth < 600 ? 'small' : 'medium'}
                  />
                </>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mb: { xs: 1.5, md: 2 },
                  py: { xs: 1.2, md: 1.5 },
                  fontSize: { xs: '0.9375rem', md: '1rem' }
                }}
              >
                {isSignUp ? '회원가입' : '로그인'}
              </Button>

              <Button
                fullWidth
                variant="text"
                onClick={() => setIsSignUp(!isSignUp)}
                sx={{ fontSize: { xs: '0.875rem', md: '0.9375rem' } }}
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
