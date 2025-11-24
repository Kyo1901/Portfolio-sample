import { Box, Typography, Container, Button } from '@mui/material';

function AboutMeSection() {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 3 }}>
          여기는 About Me 섹션입니다
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
        </Typography>
        <Button variant="contained" color="primary">
          더 알아보기
        </Button>
      </Container>
    </Box>
  );
}

export default AboutMeSection;
