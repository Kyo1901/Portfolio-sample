import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';

/**
 * 게시물 카드 컴포넌트
 *
 * Props:
 * @param {object} post - 게시물 데이터 [Required]
 * @param {string} post.id - 게시물 ID
 * @param {string} post.title - 게시물 제목
 * @param {string} post.genre - 게임 장르
 * @param {string} post.author_nickname - 작성자 닉네임
 * @param {string} post.created_at - 작성 시간
 * @param {number} post.likes_count - 좋아요 수
 * @param {number} post.comments_count - 댓글 수
 *
 * Example usage:
 * <PostCard post={postData} />
 */
function PostCard({ post }) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;

    return date.toLocaleDateString('ko-KR');
  };

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/posts/${post.id}`)}>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              {post.title}
            </Typography>
            <Chip
              label={post.genre}
              size="small"
              variant="outlined"
              sx={{ mt: 1 }}
            />
          </Box>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2">{post.author_nickname}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">{formatDate(post.created_at)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CommentIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">{post.comments_count || 0}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <FavoriteIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">{post.likes_count || 0}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PostCard;
