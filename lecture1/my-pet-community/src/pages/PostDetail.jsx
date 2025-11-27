import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ArrowBack,
  Send,
  Pets,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

/**
 * PostDetail 컴포넌트 - 게시물 상세 페이지
 */
function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchPost();
    fetchComments();
    checkLikeStatus();
  }, [id, user, navigate]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('pet_posts')
      .select(`
        *,
        pet_users:author_id (nickname)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
    } else {
      setPost(data);
    }
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('pet_comments')
      .select(`
        *,
        pet_users:author_id (nickname)
      `)
      .eq('post_id', id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data || []);
    }
  };

  const checkLikeStatus = async () => {
    const { data, error } = await supabase
      .from('pet_links')
      .select('*')
      .eq('post_id', id)
      .eq('user_id', user.id)
      .single();

    if (!error && data) {
      setIsLiked(true);
    }
  };

  const handleLike = async () => {
    if (isLiked) {
      const { error } = await supabase
        .from('pet_links')
        .delete()
        .eq('post_id', id)
        .eq('user_id', user.id);

      if (!error) {
        setIsLiked(false);
        await updateLikesCount(-1);
      }
    } else {
      const { error } = await supabase
        .from('pet_links')
        .insert([{ post_id: id, user_id: user.id }]);

      if (!error) {
        setIsLiked(true);
        await updateLikesCount(1);
      }
    }
  };

  const updateLikesCount = async (change) => {
    const newCount = (post.likes_count || 0) + change;
    await supabase
      .from('pet_posts')
      .update({ likes_count: newCount })
      .eq('id', id);
    setPost({ ...post, likes_count: newCount });
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      return;
    }

    const { error } = await supabase.from('pet_comments').insert([
      {
        content: newComment,
        post_id: id,
        author_id: user.id,
      },
    ]);

    if (error) {
      console.error('Error adding comment:', error);
      alert('댓글 작성에 실패했습니다.');
    } else {
      setNewComment('');
      fetchComments();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR');
  };

  if (!post) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>로딩 중...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/posts')}
          >
            <ArrowBack />
          </IconButton>
          <Pets sx={{ ml: 2, mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🐱 Pet Community
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            {post.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {post.pet_users?.nickname} · {formatDate(post.created_at)}
            </Typography>
            <Button
              variant={isLiked ? 'contained' : 'outlined'}
              startIcon={isLiked ? <Favorite /> : <FavoriteBorder />}
              onClick={handleLike}
              color="error"
            >
              좋아요 {post.likes_count || 0}
            </Button>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 4 }}>
            {post.content}
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            댓글 {comments.length}개
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <TextField
              fullWidth
              placeholder="댓글을 입력하세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
              multiline
              maxRows={3}
            />
            <IconButton
              color="primary"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              <Send />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {comments.length === 0 ? (
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
              첫 번째 댓글을 작성해보세요!
            </Typography>
          ) : (
            <List>
              {comments.map((comment, index) => (
                <Box key={comment.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemText
                      primary={comment.content}
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {comment.pet_users?.nickname} ·{' '}
                          {formatDate(comment.created_at)}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < comments.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default PostDetail;
