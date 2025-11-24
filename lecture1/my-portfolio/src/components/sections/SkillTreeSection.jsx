import { Box, Typography, Container } from '@mui/material';

function SkillTreeSection() {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 3 }}>
          여기는 Skill Tree 섹션입니다
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default SkillTreeSection;
