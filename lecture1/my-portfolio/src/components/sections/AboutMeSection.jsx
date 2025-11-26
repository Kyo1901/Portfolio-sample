import { memo, useCallback, useMemo } from 'react';
import { Box, Typography, Container, Button, Card, CardContent, Grid, Avatar, Fade, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  School as SchoolIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  Person as PersonIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { usePortfolio } from '../../context/PortfolioContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/**
 * AboutMeSection 컴포넌트 (최적화됨)
 *
 * 홈 페이지의 About Me 섹션
 * Context에서 데이터를 가져와 표시하고 About Me 페이지로 연결
 * - React.memo로 최적화
 * - 접근성 개선 (aria-label, role)
 * - 스크롤 기반 Zoom-in 애니메이션
 */
const AboutMeSection = memo(() => {
  const navigate = useNavigate();
  const { getHomeData } = usePortfolio();
  const homeData = useMemo(() => getHomeData(), [getHomeData]);

  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const handleLearnMore = useCallback(() => {
    navigate('/about', { state: { scrollTo: 'basicInfo' } });
  }, [navigate]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      aria-label="About Me 섹션"
      sx={{
        py: { xs: 6, sm: 7, md: 8, lg: 10 },
        backgroundColor: '#f8f9fa'
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Fade in={isVisible} timeout={600}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              mb: { xs: 4, sm: 5, md: 6 },
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: {
                xs: '1.75rem',  // 모바일: 28px
                sm: '2rem',     // 태블릿 소: 32px
                md: '2.5rem',   // 태블릿: 40px
                lg: '3rem'      // 데스크톱: 48px
              },
              lineHeight: 1.2
            }}
          >
            About Me
          </Typography>
        </Fade>

        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          sx={{
            justifyContent: 'center'
          }}
        >
          {/* 왼쪽: 프로필 카드 */}
          <Grid item xs={12} md={4}>
            <Zoom in={isVisible} timeout={800}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: { xs: 2.5, sm: 3, md: 3.5 },
                  borderRadius: { xs: 2, md: 3 }
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 100, sm: 110, md: 120 },
                    height: { xs: 100, sm: 110, md: 120 },
                    bgcolor: 'primary.main',
                    fontSize: { xs: '2.5rem', sm: '2.75rem', md: '3rem' },
                    mb: { xs: 1.5, md: 2 }
                  }}
                >
                  <PersonIcon fontSize="inherit" />
                </Avatar>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    mb: { xs: 2, md: 3 },
                    textAlign: 'center',
                    fontSize: {
                      xs: '1.25rem',  // 모바일: 20px
                      sm: '1.35rem',  // 태블릿 소: 21.6px
                      md: '1.5rem'    // 태블릿+: 24px
                    }
                  }}
                >
                  {homeData.basicInfo.name}
                </Typography>

                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 1.5, md: 2 }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SchoolIcon color="primary" fontSize="small" />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.875rem', sm: '0.9rem' },
                        lineHeight: 1.5
                      }}
                    >
                      {homeData.basicInfo.education}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CodeIcon color="primary" fontSize="small" />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.875rem', sm: '0.9rem' },
                        lineHeight: 1.5
                      }}
                    >
                      {homeData.basicInfo.major}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WorkIcon color="primary" fontSize="small" />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.875rem', sm: '0.9rem' },
                        lineHeight: 1.5
                      }}
                    >
                      {homeData.basicInfo.experience}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Zoom>
          </Grid>

          {/* 오른쪽: 콘텐츠 */}
          <Grid item xs={12} md={8}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {homeData.content.map((section, index) => (
                <Zoom key={section.id} in={isVisible} timeout={1000 + index * 200}>
                  <Card
                    elevation={2}
                    sx={{
                      mb: { xs: 2.5, md: 3 },
                      borderRadius: { xs: 2, md: 3 },
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: { xs: 'translateY(-2px)', md: 'translateY(-4px)' },
                        boxShadow: 4
                      }
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 2.5, sm: 3, md: 3.5 }
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          mb: { xs: 1.5, md: 2 },
                          color: 'primary.main',
                          fontSize: {
                            xs: '1.1rem',   // 모바일: 17.6px
                            sm: '1.2rem',   // 태블릿 소: 19.2px
                            md: '1.25rem'   // 태블릿+: 20px
                          }
                        }}
                      >
                        {section.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: { xs: 1.7, md: 1.8 },
                          fontSize: {
                            xs: '0.95rem',  // 모바일: 15.2px
                            sm: '1rem',     // 태블릿 소: 16px
                            md: '1.05rem'   // 태블릿+: 16.8px
                          }
                        }}
                      >
                        {section.summary}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              ))}

              <Box
                sx={{
                  mt: { xs: 2, md: 'auto' },
                  textAlign: 'center'
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleLearnMore}
                  aria-label="About Me 페이지로 이동하여 전체 정보 보기"
                  sx={{
                    minWidth: { xs: '100%', sm: 'auto' },
                    minHeight: { xs: '48px', sm: '52px', md: '56px' },
                    px: { xs: 4, sm: 4.5, md: 5 },
                    py: { xs: 1.5, sm: 1.75, md: 2 },
                    fontSize: {
                      xs: '1rem',      // 모바일: 16px
                      sm: '1.05rem',   // 태블릿 소: 16.8px
                      md: '1.1rem'     // 태블릿+: 17.6px
                    },
                    fontWeight: 'bold',
                    borderRadius: { xs: 2, md: 3 },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: { xs: 'translateY(-2px)', md: 'scale(1.05)' }
                    }
                  }}
                >
                  더 알아보기
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* 주요 스킬 아이콘 표시 */}
        <Box
          sx={{
            mt: { xs: 5, sm: 6, md: 7 },
            pt: { xs: 3, sm: 4 },
            borderTop: 1,
            borderColor: 'divider',
            px: { xs: 1, sm: 2 }
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: { xs: 2.5, sm: 3, md: 4 },
              textAlign: 'center',
              color: 'text.secondary',
              fontSize: {
                xs: '1.1rem',   // 모바일: 17.6px
                sm: '1.2rem',   // 태블릿 소: 19.2px
                md: '1.25rem'   // 태블릿+: 20px
              },
              fontWeight: 600
            }}
          >
            주요 기술
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 2.5, sm: 3, md: 5 },
              flexWrap: 'wrap'
            }}
          >
            {homeData.topSkills.map((skill) => (
              <Box
                key={skill.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: { xs: 0.75, sm: 1 },
                  minWidth: { xs: '70px', sm: '80px', md: '90px' },
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '2.75rem', md: '3rem' }
                  }}
                >
                  {skill.icon}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.primary',
                    fontSize: {
                      xs: '0.875rem',  // 모바일: 14px
                      sm: '0.9rem',    // 태블릿 소: 14.4px
                      md: '0.95rem'    // 태블릿+: 15.2px
                    }
                  }}
                >
                  {skill.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: {
                      xs: '0.75rem',   // 모바일: 12px
                      sm: '0.8rem'     // 태블릿+: 12.8px
                    }
                  }}
                >
                  {skill.level}%
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
});

AboutMeSection.displayName = 'AboutMeSection';

export default AboutMeSection;
