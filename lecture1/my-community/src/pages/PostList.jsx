import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { supabase } from '../lib/supabase';
import { getCurrentUser, signOut } from '../utils/auth';
import PostCard from '../components/ui/PostCard';

/**
 * 게시물 목록 페이지 컴포넌트
 */
function PostList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);

    // 게시물과 작성자 정보를 함께 가져오기
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (postsError) {
      console.error('게시물 조회 오류:', postsError);
      setLoading(false);
      return;
    }

    // 각 게시물에 대한 작성자 정보와 댓글 수 가져오기
    const postsWithDetails = await Promise.all(
      postsData.map(async (post) => {
        // 작성자 정보
        const { data: author } = await supabase
          .from('users')
          .select('nickname')
          .eq('id', post.author_id)
          .single();

        // 댓글 수
        const { count: commentsCount } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', post.id);

        return {
          ...post,
          author_nickname: author?.nickname || '알 수 없음',
          comments_count: commentsCount || 0,
        };
      })
    );

    setPosts(postsWithDetails);
    setLoading(false);
  };

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  const handleCreatePost = () => {
    navigate('/posts/new');
  };

  return (
    <Box sx={{ minHeight: '100vh', pb: 4 }}>
      <AppBar position="static">
        <Toolbar>
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
          <Typography variant="body1" sx={{ mr: 2 }}>
            {currentUser?.nickname}님
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography variant="h4" component="h2">
            게시물 목록
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreatePost}
          >
            게시글 작성
          </Button>
        </Stack>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <CircularProgress />
          </Box>
        ) : posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h6" color="text.secondary">
              아직 게시물이 없습니다.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              첫 번째 게시물을 작성해보세요!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid size={{ xs: 12, md: 6 }} key={post.id}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default PostList;
