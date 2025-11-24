import { Box, Typography, Container, Button } from '@mui/material';

function ProjectsSection() {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 3 }}>
          여기는 Projects 섹션입니다
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
        </Typography>
        <Button variant="outlined" color="primary">
          더 보기
        </Button>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
