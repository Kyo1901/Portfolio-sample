import { Box, Typography, Container } from '@mui/material';

function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'secondary.main',
        color: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ mb: 3, color: 'white' }}>
          여기는 Hero 섹션입니다
        </Typography>
        <Typography variant="h5" sx={{ color: '#F5F5F7' }}>
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default HeroSection;
