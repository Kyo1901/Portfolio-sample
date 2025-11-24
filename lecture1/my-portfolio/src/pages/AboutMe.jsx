import { Box, Container, Typography } from '@mui/material';

function AboutMe() {
  return (
    <Box sx={{ minHeight: '80vh', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ mb: 4 }}>
          About Me
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.2rem' }}>
          About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default AboutMe;
