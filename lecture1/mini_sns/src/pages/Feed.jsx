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
  Toolbar,
  Grid
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

  const checkUser = () => {
    const userData = localStorage.getItem('sns_user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('restaurant_posts')
      .select(`
        *,
        sns_users:user_id (username, nickname)
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
      .from('restaurant_posts')
      .update({ likes_count: currentLikes + 1 })
      .eq('id', postId);

    if (!error) {
      fetchPosts();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sns_user');
    navigate('/login');
  };

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            🍽️ 맛ZIP
          </Typography>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={() => navigate('/create')}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            작성
          </Button>
          <IconButton
            color="inherit"
            onClick={() => navigate('/create')}
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <AddIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            mb: { xs: 2, md: 3 }
          }}
        >
          오늘의 맛집
        </Typography>

        {posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: { xs: 4, md: 8 } }}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: { xs: '1rem', md: '1.125rem' } }}
            >
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
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {posts.map((post) => (
              <Grid size={{ xs: 12 }} key={post.id}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  {post.image_url && (
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: '100%', sm: 240, md: 300 },
                        height: { xs: 200, sm: 'auto' },
                        objectFit: 'cover'
                      }}
                      image={post.image_url}
                      alt={post.restaurant_name || '맛집'}
                    />
                  )}
                  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontSize: { xs: '1.125rem', md: '1.25rem' },
                          fontWeight: 600
                        }}
                      >
                        {post.restaurant_name || '맛집 이름 미등록'}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                      >
                        @{post.sns_users?.username || '익명'} · {post.sns_users?.nickname}
                      </Typography>
                      {post.location && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                          sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                        >
                          📍 {post.location}
                        </Typography>
                      )}
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                        {post.food_category && (
                          <Typography
                            variant="body2"
                            color="primary"
                            sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                          >
                            🍽️ {post.food_category}
                          </Typography>
                        )}
                        {post.rating && (
                          <Typography
                            variant="body2"
                            color="warning.main"
                            sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                          >
                            ⭐ {post.rating}/5
                          </Typography>
                        )}
                        {post.price_range && (
                          <Typography
                            variant="body2"
                            color="success.main"
                            sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                          >
                            💰 {post.price_range}
                          </Typography>
                        )}
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          mt: 2,
                          fontSize: { xs: '0.875rem', md: '1rem' },
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: { xs: 3, sm: 4 },
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {post.caption}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ px: 2, pb: 2 }}>
                      <IconButton
                        onClick={() => handleLike(post.id, post.likes_count)}
                        color="primary"
                        size="small"
                      >
                        {post.likes_count > 0 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                      >
                        {post.likes_count}
                      </Typography>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default Feed;
