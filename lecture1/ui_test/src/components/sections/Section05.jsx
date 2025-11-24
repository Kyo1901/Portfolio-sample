import { useState } from 'react';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * Section05 - Scroll 컴포넌트 섹션
 *
 * 고정 높이 스크롤 컨테이너와 스크롤 이벤트 처리
 * - 고정 높이 스크롤 컨테이너
 * - 긴 콘텐츠로 스크롤 테스트
 * - 스크롤 이벤트 처리
 * - 스크롤 위치 표시
 */
function Section05() {
  const [scrollTop1, setScrollTop1] = useState(0);
  const [scrollTop2, setScrollTop2] = useState(0);
  const [scrollTop3, setScrollTop3] = useState(0);

  /**
   * 스크롤 이벤트 핸들러
   * @param {Event} event - 스크롤 이벤트
   * @param {Function} setter - 상태 변경 함수
   */
  const handleScroll = (event, setter) => {
    const target = event.target;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setter(scrollPercentage);
  };

  /**
   * 샘플 콘텐츠 생성
   * @param {number} count - 생성할 아이템 개수
   * @param {string} type - 콘텐츠 타입
   */
  const generateContent = (count, type) => {
    return Array.from({ length: count }, (_, index) => (
      <Box
        key={index}
        sx={{
          p: 2,
          mb: 1,
          backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#e0e0e0',
          borderRadius: 1,
          borderLeft: '4px solid',
          borderColor: 'primary.main'
        }}
      >
        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
          {type} 아이템 {index + 1}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: '0.75rem'
          }}
        >
          이것은 스크롤 테스트를 위한 샘플 콘텐츠입니다.
        </Typography>
      </Box>
    ));
  };

  const scrollContainers = [
    {
      id: 'scroll1',
      title: '리스트 스크롤',
      scrollTop: scrollTop1,
      setter: setScrollTop1,
      content: generateContent(20, '리스트'),
      height: 300
    },
    {
      id: 'scroll2',
      title: '텍스트 스크롤',
      scrollTop: scrollTop2,
      setter: setScrollTop2,
      content: (
        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      ),
      height: 200
    },
    {
      id: 'scroll3',
      title: '카드 스크롤',
      scrollTop: scrollTop3,
      setter: setScrollTop3,
      content: generateContent(15, '카드'),
      height: 250
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
          05. Scroll Components
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}
        >
          고정 높이 스크롤 컨테이너입니다. 스크롤 이벤트를 처리하고 스크롤 위치를 실시간으로 표시합니다.
        </Typography>
      </Box>

      {/* 스크롤 컨테이너 그리드 */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {scrollContainers.map((container) => (
            <Grid key={container.id} size={{ xs: 12, md: 4 }}>
              <Box>
                {/* 컨테이너 제목 */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: 600,
                    mb: 1
                  }}
                >
                  {container.title}
                </Typography>

                {/* 스크롤 위치 표시 */}
                <Box sx={{ mb: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 0.5
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.75rem'
                      }}
                    >
                      스크롤 진행률
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'primary.main',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      {container.scrollTop.toFixed(1)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={container.scrollTop}
                    sx={{ height: 6, borderRadius: 1 }}
                  />
                </Box>

                {/* 스크롤 가능한 컨테이너 */}
                <Box
                  onScroll={(e) => handleScroll(e, container.setter)}
                  sx={{
                    height: container.height,
                    overflow: 'auto',
                    border: '2px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                    backgroundColor: '#fafafa',
                    '&::-webkit-scrollbar': {
                      width: '8px'
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: '#f1f1f1',
                      borderRadius: '4px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#888',
                      borderRadius: '4px',
                      '&:hover': {
                        backgroundColor: '#555'
                      }
                    }
                  }}
                >
                  {container.content}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 설명 영역 */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: '#e1f5fe', borderRadius: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            fontWeight: 600,
            color: 'info.dark',
            mb: 2
          }}
        >
          스크롤 기능 설명
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                color: 'info.dark'
              }}
            >
              📏 고정 높이 컨테이너:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: 'text.secondary',
                ml: 2
              }}
            >
              각 컨테이너는 고정된 높이를 가지며, 콘텐츠가 넘칠 경우 스크롤이 생성됩니다.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                color: 'info.dark'
              }}
            >
              📊 실시간 스크롤 위치 표시:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: 'text.secondary',
                ml: 2
              }}
            >
              스크롤 이벤트를 감지하여 현재 스크롤 위치를 퍼센트로 표시합니다.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                color: 'info.dark'
              }}
            >
              🎨 커스텀 스크롤바:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: 'text.secondary',
                ml: 2
              }}
            >
              스크롤바의 색상과 스타일이 커스터마이징되어 있습니다.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default Section05;
