import { Box, Typography, Container, Card, CardContent, Button, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Guestbook from '../ui/Guestbook';

/**
 * Contact 섹션 컴포넌트
 * Apple 스타일의 간결한 디자인으로 연락처와 방명록을 표시
 */
function ContactSection() {
  const contactInfo = [
    { icon: <EmailIcon />, label: '이메일', value: 'skadnjs153@naver.com' },
    { icon: <PhoneIcon />, label: '전화', value: '010-8905-1901' }
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, label: 'GitHub', url: 'https://github.com' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: <InstagramIcon />, label: 'Instagram', url: 'https://instagram.com' },
    { icon: <TwitterIcon />, label: 'Twitter', url: 'https://twitter.com' }
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: '#f5f5f7',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        {/* 섹션 제목 */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 600,
            textAlign: 'center',
            mb: 2,
            color: '#1d1d1f'
          }}
        >
          Get in touch.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: '#86868b',
            fontSize: { xs: '1rem', md: '1.2rem' },
            mb: 8
          }}
        >
          언제든지 편하게 연락주세요
        </Typography>

        {/* 연락처 정보 카드 */}
        <Card
          sx={{
            mb: 4,
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: 'none'
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={3}>
              {contactInfo.map((contact, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        color: '#0071e3',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {contact.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#86868b',
                          fontSize: '0.875rem'
                        }}
                      >
                        {contact.label}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#1d1d1f',
                          fontWeight: 500,
                          fontSize: '1rem'
                        }}
                      >
                        {contact.value}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* SNS 링크 버튼 */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: '#1d1d1f',
              textAlign: 'center'
            }}
          >
            Social
          </Typography>
          <Grid container spacing={2}>
            {socialLinks.map((social, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    py: 2,
                    borderRadius: 2,
                    borderColor: '#d2d2d7',
                    color: '#0071e3',
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    '&:hover': {
                      borderColor: '#0071e3',
                      backgroundColor: 'rgba(0, 113, 227, 0.04)'
                    }
                  }}
                >
                  {social.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 방명록 섹션 */}
        <Guestbook />
      </Container>
    </Box>
  );
}

export default ContactSection;
