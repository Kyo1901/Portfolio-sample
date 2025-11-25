import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardMedia
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRandomImage = () => {
    // Unsplash 랜덤 음식 이미지
    const randomImages = [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
      'https://images.unsplash.com/photo-1576402187878-974f70c890a5?w=800',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    ];
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    setImageUrl(randomImages[randomIndex]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      const { error } = await supabase
        .from('posts')
        .insert([
          {
            title,
            content,
            image_url: imageUrl,
            author_id: user.id
          }
        ]);

      if (error) throw error;

      alert('게시물이 작성되었습니다!');
      navigate('/');
    } catch (error) {
      alert('게시물 작성 실패: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/')}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            게시물 작성
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="맛집 이름"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="리뷰 내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              onClick={handleRandomImage}
              fullWidth
              sx={{ mb: 2 }}
            >
              랜덤 음식 이미지 선택
            </Button>

            {imageUrl && (
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={imageUrl}
                  alt="선택된 이미지"
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading || !imageUrl}
          >
            {loading ? '작성 중...' : '게시물 작성'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default CreatePost;
