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
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function CreatePost() {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [priceRange, setPriceRange] = useState('');
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
      const userData = localStorage.getItem('sns_user');
      if (!userData) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      const user = JSON.parse(userData);

      const { error } = await supabase
        .from('restaurant_posts')
        .insert([
          {
            restaurant_name: restaurantName,
            caption,
            location,
            food_category: foodCategory,
            rating: rating || null,
            price_range: priceRange || null,
            image_url: imageUrl,
            user_id: user.id
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/')}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            게시물 작성
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 3, md: 4 } }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="맛집 이름"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="위치/주소"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="예: 서울 강남구 테헤란로"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>음식 카테고리</InputLabel>
                <Select
                  value={foodCategory}
                  onChange={(e) => setFoodCategory(e.target.value)}
                  label="음식 카테고리"
                >
                  <MenuItem value="">선택 안함</MenuItem>
                  <MenuItem value="한식">한식</MenuItem>
                  <MenuItem value="중식">중식</MenuItem>
                  <MenuItem value="일식">일식</MenuItem>
                  <MenuItem value="양식">양식</MenuItem>
                  <MenuItem value="분식">분식</MenuItem>
                  <MenuItem value="디저트">디저트</MenuItem>
                  <MenuItem value="카페">카페</MenuItem>
                  <MenuItem value="기타">기타</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>가격대</InputLabel>
                <Select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  label="가격대"
                >
                  <MenuItem value="">선택 안함</MenuItem>
                  <MenuItem value="$">$ (1만원 이하)</MenuItem>
                  <MenuItem value="$$">$$ (1-2만원)</MenuItem>
                  <MenuItem value="$$$">$$$ (2-3만원)</MenuItem>
                  <MenuItem value="$$$$">$$$$ (3-5만원)</MenuItem>
                  <MenuItem value="$$$$$">$$$$$ (5만원 이상)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography component="legend" sx={{ mb: 1 }}>
                별점
              </Typography>
              <Rating
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                size="large"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="리뷰 내용"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
                multiline
                rows={{ xs: 4, md: 6 }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="outlined"
                onClick={handleRandomImage}
                fullWidth
                size="large"
              >
                랜덤 음식 이미지 선택
              </Button>
            </Grid>

            {imageUrl && (
              <Grid size={{ xs: 12 }}>
                <Card sx={{ maxWidth: { xs: '100%', md: '600px' }, mx: 'auto' }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={imageUrl}
                    alt="선택된 이미지"
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
              </Grid>
            )}

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading || !imageUrl}
                sx={{ py: { xs: 1.5, md: 2 } }}
              >
                {loading ? '작성 중...' : '게시물 작성'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default CreatePost;
