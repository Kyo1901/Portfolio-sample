import { Box, Container, Typography } from '@mui/material';

function Projects() {
  return (
    <Box sx={{ minHeight: '80vh', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ mb: 4 }}>
          Projects
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.2rem' }}>
          Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default Projects;
