import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';

/**
 * Section06 - Card 컴포넌트 섹션
 *
 * MUI Card 컴포넌트를 사용한 다양한 카드 레이아웃
 * - CardContent와 CardActions 구조
 * - 3개 예시 카드
 * - 호버 효과 및 그림자
 */
function Section06() {
  /**
   * 카드 액션 핸들러
   * @param {string} cardName - 카드 이름
   * @param {string} action - 액션 이름
   */
  const handleAction = (cardName, action) => {
    alert(`${cardName} 카드의 "${action}" 버튼이 클릭되었습니다!`);
  };

  const cards = [
    {
      id: 'product',
      title: '제품 카드',
      subtitle: 'Product Card',
      description: '이것은 제품을 소개하는 카드입니다. 제품 이미지, 설명, 가격 정보를 포함할 수 있습니다.',
      icon: ShoppingCartIcon,
      iconColor: '#1976d2',
      price: '₩49,900',
      actions: [
        { label: '장바구니', variant: 'outlined' },
        { label: '구매하기', variant: 'contained' }
      ]
    },
    {
      id: 'profile',
      title: '프로필 카드',
      subtitle: 'Profile Card',
      description: '사용자 프로필 정보를 표시하는 카드입니다. 이름, 직책, 소개 등을 담을 수 있습니다.',
      icon: PersonIcon,
      iconColor: '#dc004e',
      info: '프론트엔드 개발자',
      actions: [
        { label: '팔로우', variant: 'outlined' },
        { label: '메시지', variant: 'contained' }
      ]
    },
    {
      id: 'blog',
      title: '블로그 카드',
      subtitle: 'Blog Card',
      description: '블로그 포스트를 미리보기로 보여주는 카드입니다. 제목, 요약, 날짜 정보를 표시합니다.',
      icon: ArticleIcon,
      iconColor: '#ff9800',
      date: '2025.11.24',
      actions: [
        { label: '북마크', variant: 'outlined' },
        { label: '읽기', variant: 'contained' }
      ]
    }
  ];

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 2
      }}
    >
      {/* 섹션 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 600,
            color: 'primary.main',
            mb: 1
          }}
        >
          06. Card Components
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}
        >
          MUI Card 컴포넌트를 사용한 다양한 카드 레이아웃입니다. CardContent와 CardActions로 구조화되어 있으며, 호버 효과와 그림자가 적용되어 있습니다.
        </Typography>
      </Box>

      {/* 카드 그리드 */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Grid key={card.id} size={{ xs: 12, md: 4 }}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  {/* 카드 헤더 아이콘 */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      py: 3,
                      backgroundColor: '#fafafa'
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        backgroundColor: card.iconColor
                      }}
                    >
                      <IconComponent sx={{ fontSize: 40, color: 'white' }} />
                    </Avatar>
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                        fontWeight: 600,
                        mb: 0.5
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        mb: 2,
                        display: 'block'
                      }}
                    >
                      {card.subtitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        mb: 2,
                        lineHeight: 1.6
                      }}
                    >
                      {card.description}
                    </Typography>

                    {/* 추가 정보 */}
                    {card.price && (
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'primary.main',
                          fontSize: { xs: '1.25rem', md: '1.5rem' },
                          fontWeight: 700
                        }}
                      >
                        {card.price}
                      </Typography>
                    )}
                    {card.info && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'success.main',
                          fontSize: '0.875rem',
                          fontWeight: 500
                        }}
                      >
                        {card.info}
                      </Typography>
                    )}
                    {card.date && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.875rem'
                        }}
                      >
                        작성일: {card.date}
                      </Typography>
                    )}
                  </CardContent>

                  <CardActions
                    sx={{
                      p: 2,
                      pt: 0,
                      display: 'flex',
                      gap: 1,
                      justifyContent: 'flex-end'
                    }}
                  >
                    {card.actions.map((action, index) => (
                      <Button
                        key={index}
                        variant={action.variant}
                        color="primary"
                        size="small"
                        onClick={() => handleAction(card.title, action.label)}
                        sx={{
                          textTransform: 'none',
                          fontSize: { xs: '0.875rem', md: '1rem' }
                        }}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* 설명 영역 */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: '#f3e5f5', borderRadius: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            fontWeight: 600,
            color: 'secondary.dark',
            mb: 2
          }}
        >
          카드 컴포넌트 특징
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                color: 'secondary.dark'
              }}
            >
              🎨 호버 효과:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: 'text.secondary',
                ml: 2
              }}
            >
              마우스를 카드 위에 올리면 살짝 위로 올라가고 그림자가 진해집니다.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                color: 'secondary.dark'
              }}
            >
              📦 구조화된 레이아웃:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: 'text.secondary',
                ml: 2
              }}
            >
              CardContent로 콘텐츠를 담고, CardActions로 액션 버튼을 배치합니다.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                color: 'secondary.dark'
              }}
            >
              🎯 다양한 용도:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: 'text.secondary',
                ml: 2
              }}
            >
              제품, 프로필, 블로그 등 다양한 콘텐츠를 카드 형태로 표현할 수 있습니다.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default Section06;
