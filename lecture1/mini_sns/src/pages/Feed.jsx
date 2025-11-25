import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  AppBar,
  Toolbar
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
    fetchPosts();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
    } else {
      setUser(user);
    }
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users:author_id (username, nickname)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
  };

  const handleLike = async (postId, currentLikes) => {
    const { error } = await supabase
      .from('posts')
      .update({ likes_count: currentLikes + 1 })
      .eq('id', postId);

    if (!error) {
      fetchPosts();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            🍽️ 맛ZIP
          </Typography>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={() => navigate('/create')}
          >
            작성
          </Button>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          오늘의 맛집
        </Typography>

        {posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              아직 게시물이 없습니다.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/create')}
              sx={{ mt: 2 }}
            >
              첫 번째 게시물 작성하기
            </Button>
          </Box>
        ) : (
          posts.map((post) => (
            <Card key={post.id} sx={{ mb: 3 }}>
              {post.image_url && (
                <CardMedia
                  component="img"
                  height="300"
                  image={post.image_url}
                  alt={post.title}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  @{post.users?.username || '익명'} · {post.users?.nickname}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {post.content}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() => handleLike(post.id, post.likes_count)}
                  color="primary"
                >
                  {post.likes_count > 0 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {post.likes_count}
                </Typography>
              </CardActions>
            </Card>
          ))
        )}
      </Container>
    </Box>
  );
}

export default Feed;
