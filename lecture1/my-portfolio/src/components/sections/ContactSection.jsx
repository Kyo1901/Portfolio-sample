import { Box, Typography, Container } from '@mui/material';

function ContactSection() {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 3 }}>
          여기는 Contact 섹션입니다
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default ContactSection;
