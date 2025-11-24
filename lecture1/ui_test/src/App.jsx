import { Box, Container, Typography } from '@mui/material';
import Section01 from './components/sections/Section01';
import Section02 from './components/sections/Section02';
import Section03 from './components/sections/Section03';
import Section04 from './components/sections/Section04';
import Section05 from './components/sections/Section05';
import Section06 from './components/sections/Section06';
import Section07 from './components/sections/Section07';

/**
 * App 컴포넌트
 *
 * 16개 UI 요소를 순차적으로 섹션 단위로 추가할 수 있는 메인 레이아웃
 * - 네비게이션 없는 깔끔한 구조
 * - 중앙 정렬 레이아웃
 * - 섹션별 컴포넌트를 import하여 추가 가능
 */
function App() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
        backgroundColor: '#f5f5f5'
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* 헤더 영역 */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: 'primary.main',
              mb: 2
            }}
          >
            UI Test Project
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: 'text.secondary'
            }}
          >
            16개 UI 요소 테스트 프로젝트
          </Typography>
        </Box>

        {/* 섹션 영역 - 여기에 순차적으로 섹션 컴포넌트를 추가합니다 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Section01 />
          <Section02 />
          <Section03 />
          <Section04 />
          <Section05 />
          <Section06 />
          <Section07 />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
