import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  Stack,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Divider,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { supabase } from '../lib/supabase';
import { getCurrentUser } from '../utils/auth';

/**
 * 게시물 상세 페이지 컴포넌트
 */
function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }
    fetchPostDetail();
    fetchComments();
    checkLikeStatus();
  }, [id]);

  const fetchPostDetail = async () => {
    const { data: postData, error: postError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (postError) {
      console.error('게시물 조회 오류:', postError);
      setLoading(false);
      return;
    }

    // 작성자 정보 가져오기
    const { data: author } = await supabase
      .from('users')
      .select('nickname')
      .eq('id', postData.author_id)
      .single();

    setPost({
      ...postData,
      author_nickname: author?.nickname || '알 수 없음',
    });
    setLikesCount(postData.likes_count || 0);
    setLoading(false);
  };

  const fetchComments = async () => {
    const { data: commentsData, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true });

    if (commentsError) {
      console.error('댓글 조회 오류:', commentsError);
      return;
    }

    // 각 댓글의 작성자 정보 가져오기
    const commentsWithAuthor = await Promise.all(
      commentsData.map(async (comment) => {
        const { data: author } = await supabase
          .from('users')
          .select('nickname')
          .eq('id', comment.author_id)
          .single();

        return {
          ...comment,
          author_nickname: author?.nickname || '알 수 없음',
        };
      })
    );

    setComments(commentsWithAuthor);
  };

  const checkLikeStatus = async () => {
    const { data } = await supabase
      .from('likes')
      .select('*')
      .eq('post_id', id)
      .eq('user_id', currentUser.id)
      .single();

    setIsLiked(!!data);
  };

  const handleLike = async () => {
    if (isLiked) {
      // 좋아요 취소
      await supabase
        .from('likes')
        .delete()
        .eq('post_id', id)
        .eq('user_id', currentUser.id);

      await supabase
        .from('posts')
        .update({ likes_count: likesCount - 1 })
        .eq('id', id);

      setIsLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      // 좋아요 추가
      await supabase.from('likes').insert([
        {
          post_id: id,
          user_id: currentUser.id,
        },
      ]);

      await supabase
        .from('posts')
        .update({ likes_count: likesCount + 1 })
        .eq('id', id);

      setIsLiked(true);
      setLikesCount(likesCount + 1);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!commentContent.trim()) {
      setError('댓글 내용을 입력해주세요.');
      return;
    }

    const { data, error: insertError } = await supabase
      .from('comments')
      .insert([
        {
          content: commentContent,
          author_id: currentUser.id,
          post_id: id,
        },
      ])
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setCommentContent('');
    fetchComments();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h6">게시물을 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

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
            {post.title}
          </Typography>

          {post.genre && (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Chip label={post.genre} variant="outlined" />
            </Stack>
          )}

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mb: 3, color: 'text.secondary' }}
          >
            <Typography variant="body2">{post.author_nickname}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">{formatDate(post.created_at)}</Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8,
            }}
          >
            {post.content}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button
              variant={isLiked ? 'contained' : 'outlined'}
              startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={handleLike}
            >
              좋아요 {likesCount}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            댓글 ({comments.length})
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="댓글을 입력하세요"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth>
              댓글 작성
            </Button>
          </Box>

          <Stack spacing={2}>
            {comments.map((comment) => (
              <Paper
                key={comment.id}
                elevation={1}
                sx={{
                  p: 2,
                  backgroundColor: 'background.default',
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    {comment.author_nickname}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(comment.created_at)}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {comment.content}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default PostDetail;
