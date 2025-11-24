import { Box, Typography, Paper } from '@mui/material';

/**
 * Section07 - Flex Navigation 컴포넌트 섹션
 *
 * Flexbox를 사용한 네비게이션 바 구현
 * - 양 끝 정렬 (justifyContent: space-between)
 * - 로고와 메뉴 항목 배치
 * - 호버 효과
 */
function Section07() {
  const menuItems = ['홈', '소개', '상품', '연락처', '설정'];

  /**
   * 메뉴 클릭 핸들러
   * @param {string} menu - 클릭된 메뉴명
   */
  const handleMenuClick = (menu) => {
    alert(`"${menu}" 메뉴가 클릭되었습니다!`);
  };

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
          07. Flex Navigation
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}
        >
          Flexbox를 사용한 네비게이션 바입니다. justifyContent: space-between으로 로고와 메뉴를 양 끝에 배치했습니다.
        </Typography>
      </Box>

      {/* Flexbox 네비게이션 바 */}
      <Box
        sx={{
          width: '100%',
          height: '60px',
          backgroundColor: '#2d3748',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3
        }}
      >
        {/* 로고 박스 (왼쪽) */}
        <Box>
          <Typography
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '20px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            onClick={() => handleMenuClick('로고')}
          >
            MyWebsite
          </Typography>
        </Box>

        {/* 메뉴들 박스 (오른쪽) */}
        <Box
          sx={{
            display: 'flex',
            gap: '15px',
            alignItems: 'center'
          }}
        >
          {menuItems.map((menu) => (
            <Typography
              key={menu}
              sx={{
                color: '#cbd5e0',
                fontSize: '16px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: '#ffffff'
                }
              }}
              onClick={() => handleMenuClick(menu)}
            >
              {menu}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* 코드 설명 영역 */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: '#f7fafc', borderRadius: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            fontWeight: 600,
            color: '#2d3748',
            mb: 2
          }}
        >
          Flexbox 속성 설명
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                color: '#2d3748'
              }}
            >
              📦 display: flex
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: 'text.secondary',
                ml: 2,
                fontFamily: 'monospace'
              }}
            >
              네비게이션 박스를 Flexbox 컨테이너로 만듭니다.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                color: '#2d3748'
              }}
            >
              ↔️ justifyContent: space-between
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: 'text.secondary',
                ml: 2,
                fontFamily: 'monospace'
              }}
            >
              로고와 메뉴를 양 끝에 배치합니다.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                color: '#2d3748'
              }}
            >
              ↕️ alignItems: center
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: 'text.secondary',
                ml: 2,
                fontFamily: 'monospace'
              }}
            >
              수직 중앙 정렬합니다.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                color: '#2d3748'
              }}
            >
              📏 gap: 15px
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: 'text.secondary',
                ml: 2,
                fontFamily: 'monospace'
              }}
            >
              메뉴 항목들 사이에 15px 간격을 줍니다.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 스타일 가이드 */}
      <Box sx={{ mt: 3, p: 3, backgroundColor: '#edf2f7', borderRadius: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            fontWeight: 600,
            color: '#2d3748',
            mb: 2
          }}
        >
          스타일 가이드
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
            <strong>배경색:</strong> #2d3748 (어두운 회색)
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
            <strong>로고:</strong> 흰색 (#ffffff), 굵게 (700), 20px
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
            <strong>메뉴 항목:</strong> 연한 회색 (#cbd5e0), 16px
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
            <strong>호버 효과:</strong> 흰색 (#ffffff)으로 변경, 0.2s 전환
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
            <strong>간격:</strong> 메뉴 항목들 사이 15px
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default Section07;
