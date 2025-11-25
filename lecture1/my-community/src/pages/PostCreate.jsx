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
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { supabase } from '../lib/supabase';
import { getCurrentUser } from '../utils/auth';

/**
 * 게시물 작성 페이지 컴포넌트
 */
function PostCreate() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    content: '',
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

    const { data, error: insertError } = await supabase
      .from('posts')
      .insert([
        {
          title: formData.title,
          genre: formData.genre,
          content: formData.content,
          author_id: currentUser.id,
        },
      ])
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    navigate('/posts');
  };

  return (
    <Box sx={{ minHeight: '100vh', pb: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/posts')}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h1"
            sx={{
              flexGrow: 1,
              textShadow: '0 0 15px rgba(255, 23, 68, 0.5)',
            }}
          >
            🎮 Game Hub
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h4" component="h2" gutterBottom>
            게시글 작성
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="게임 이름"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
              autoFocus
            />

            <TextField
              fullWidth
              label="장르"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              margin="normal"
              required
              helperText="예: RPG, FPS, MOBA, 전략 등"
            />

            <TextField
              fullWidth
              label="내용"
              name="content"
              value={formData.content}
              onChange={handleChange}
              margin="normal"
              required
              multiline
              rows={10}
              helperText="게임의 특징, 플레이 후기 등을 작성해주세요"
            />

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                fullWidth
              >
                {loading ? '작성 중...' : '작성 완료'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/posts')}
                fullWidth
              >
                취소
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default PostCreate;
