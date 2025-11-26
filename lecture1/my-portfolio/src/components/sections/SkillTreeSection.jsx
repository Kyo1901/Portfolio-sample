import { memo, useCallback, useMemo } from 'react';
import { Box, Typography, Container, Button, Card, Grid, Fade, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { usePortfolio } from '../../context/PortfolioContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/**
 * SkillTreeSection 컴포넌트 (최적화됨)
 *
 * 홈 페이지의 스킬 섹션
 * 상위 4개 스킬을 간단하게 표시하고 About Me 페이지로 연결
 * - React.memo로 최적화
 * - 접근성 개선 (aria-label, role)
 * - 스크롤 기반 Fade/Zoom 애니메이션
 */
const SkillTreeSection = memo(() => {
  const navigate = useNavigate();
  const { getHomeData } = usePortfolio();
  const homeData = useMemo(() => getHomeData(), [getHomeData]);

  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const handleViewAllSkills = useCallback(() => {
    navigate('/about', { state: { scrollTo: 'skills' } });
  }, [navigate]);

  // 카테고리별 색상 (useMemo로 최적화)
  const getCategoryColor = useCallback((category) => {
    const colors = {
      Frontend: '#FF6B6B',
      Framework: '#4ECDC4',
      Design: '#FFE66D',
      Backend: '#95E1D3',
      Mobile: '#F38181',
      Tools: '#AA96DA'
    };
    return colors[category] || '#999999';
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      aria-label="스킬 섹션"
      sx={{
        py: { xs: 6, sm: 7, md: 8, lg: 10 },
        backgroundColor: '#ffffff'
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
              mb: { xs: 1.5, sm: 2 },
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
            Skills
          </Typography>
        </Fade>
        <Fade in={isVisible} timeout={800}>
          <Typography
            variant="body1"
            sx={{
              mb: { xs: 4, sm: 5, md: 6 },
              textAlign: 'center',
              color: 'text.secondary',
              fontSize: {
                xs: '0.95rem',  // 모바일: 15.2px
                sm: '1rem',     // 태블릿 소: 16px
                md: '1.1rem'    // 태블릿+: 17.6px
              },
              px: { xs: 2, sm: 3 }
            }}
          >
            주요 기술 스택 상위 4개를 소개합니다
          </Typography>
        </Fade>

        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            justifyContent: 'center',
            alignItems: 'stretch'
          }}
        >
          {homeData.topSkills.map((skill, index) => (
            <Grid
              item
              key={skill.id}
              xs={12}
              sm={6}
              md={3}
              sx={{
                display: 'flex'
              }}
            >
              <Zoom in={isVisible} timeout={1000 + index * 200} style={{ width: '100%' }}>
                <Card
                  elevation={3}
                  sx={{
                    width: '100%',
                    minHeight: { xs: 'auto', md: 280 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: { xs: 3, sm: 3.5, md: 4 },
                    borderRadius: { xs: 2, md: 3 },
                    transition: 'all 0.3s ease',
                    borderTop: 3,
                    borderColor: getCategoryColor(skill.category),
                    '&:hover': {
                      transform: { xs: 'translateY(-4px)', md: 'translateY(-8px)' },
                      boxShadow: 6
                    }
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '3.5rem', sm: '4rem', md: '4.5rem' },
                      mb: { xs: 2, md: 2.5 }
                    }}
                  >
                    {skill.icon}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      mb: { xs: 2, md: 3 },
                      textAlign: 'center',
                      fontSize: {
                        xs: '1.2rem',   // 모바일: 19.2px
                        sm: '1.3rem',   // 태블릿 소: 20.8px
                        md: '1.4rem'    // 태블릿+: 22.4px
                      }
                    }}
                  >
                    {skill.name}
                  </Typography>

                  <Box
                    sx={{
                      width: '100%'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 'bold',
                          fontSize: {
                            xs: '0.75rem',   // 모바일: 12px
                            sm: '0.8rem'     // 태블릿+: 12.8px
                          }
                        }}
                      >
                        {skill.category}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 'bold',
                          color: getCategoryColor(skill.category),
                          fontSize: {
                            xs: '0.95rem',   // 모바일: 15.2px
                            sm: '1rem'       // 태블릿+: 16px
                          }
                        }}
                      >
                        {skill.level}%
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: '100%',
                        height: { xs: 6, md: 8 },
                        bgcolor: 'grey.200',
                        borderRadius: 4,
                        overflow: 'hidden'
                      }}
                    >
                      <Box
                        sx={{
                          width: `${skill.level}%`,
                          height: '100%',
                          bgcolor: getCategoryColor(skill.category),
                          borderRadius: 4,
                          transition: 'width 1s ease-in-out'
                        }}
                      />
                    </Box>
                  </Box>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>

        <Fade in={isVisible} timeout={1600}>
          <Box
            sx={{
              mt: { xs: 4, sm: 5, md: 6 },
              textAlign: 'center',
              px: { xs: 2, sm: 3 }
            }}
          >
            <Button
              variant="outlined"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={handleViewAllSkills}
              aria-label="About Me 페이지로 이동하여 전체 스킬 보기"
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
                borderWidth: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderWidth: 2,
                  transform: { xs: 'translateY(-2px)', md: 'scale(1.05)' }
                }
              }}
            >
              전체 스킬 보기
            </Button>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
});

SkillTreeSection.displayName = 'SkillTreeSection';

export default SkillTreeSection;
