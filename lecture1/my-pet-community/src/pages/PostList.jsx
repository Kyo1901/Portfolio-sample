import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
} from '@mui/material';
import { Pets, Favorite, Comment, Add, Logout } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

/**
 * PostList 컴포넌트 - 게시물 목록 페이지
 */
function PostList() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchPosts();
  }, [user, navigate]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users:author_id (nickname),
        comments (count)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
  };

  const handleCreatePost = async () => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const { error } = await supabase.from('posts').insert([
      {
        title,
        content,
        author_id: user.id,
      },
    ]);

    if (error) {
      console.error('Error creating post:', error);
      alert('게시글 작성에 실패했습니다.');
    } else {
      setTitle('');
      setContent('');
      setOpen(false);
      fetchPosts();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Pets sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🐱 Pet Community
          </Typography>
          <Chip
            label={user?.nickname || '사용자'}
            sx={{ mr: 2, bgcolor: 'white', color: 'primary.main' }}
          />
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
            게시물 목록
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpen(true)}
          >
            게시글 작성
          </Button>
        </Box>

        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid size={{ xs: 12 }} key={post.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 3 },
                  transition: 'box-shadow 0.3s',
                }}
                onClick={() => navigate(`/posts/${post.id}`)}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {post.content.length > 100
                      ? `${post.content.substring(0, 100)}...`
                      : post.content}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {post.users?.nickname} · {formatDate(post.created_at)}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Favorite fontSize="small" color="error" />
                        <Typography variant="caption">
                          {post.likes_count || 0}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Comment fontSize="small" color="action" />
                        <Typography variant="caption">
                          {post.comments?.[0]?.count || 0}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {posts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="text.secondary">
              아직 게시물이 없습니다. 첫 번째 게시물을 작성해보세요!
            </Typography>
          </Box>
        )}
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>새 게시글 작성</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="제목"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="내용"
            fullWidth
            multiline
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>취소</Button>
          <Button onClick={handleCreatePost} variant="contained">
            작성하기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PostList;
