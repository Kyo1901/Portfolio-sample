import { memo, useCallback } from 'react';
import { Box, Typography, Container, Button, Stack, Fade, Zoom, IconButton, useMediaQuery, useTheme } from '@mui/material';
import {
  ArrowForward,
  Email,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon
} from '@mui/icons-material';
import { usePortfolio } from '../../context/PortfolioContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/**
 * HeroSection 컴포넌트 (리뉴얼)
 *
 * 차별화된 브랜딩 전략: "EDUCATOR | DEVELOPER"
 * - Context에서 heroData를 가져와 표시
 * - 스크롤 기반 애니메이션
 * - 섹션 네비게이션 CTA 버튼
 * - 그라데이션 배경과 강화된 타이포그래피
 */
const HeroSection = memo(() => {
  const { aboutMeData } = usePortfolio();
  const { heroData, socialLinks } = aboutMeData;
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  // 반응형 디자인을 위한 미디어 쿼리
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 0-599px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600-899px
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // 1200px+

  // 스크롤 네비게이션 함수
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // 아이콘 매핑 함수
  const getIconComponent = useCallback((iconName) => {
    const iconMap = {
      GitHubIcon: GitHubIcon,
      LinkedInIcon: LinkedInIcon,
      InstagramIcon: InstagramIcon,
      TwitterIcon: TwitterIcon
    };
    return iconMap[iconName] || GitHubIcon;
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      aria-label="Hero 섹션"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 4, sm: 6, md: 8 }
        }}
      >
        {/* 메인 헤드라인 */}
        <Fade in={isVisible} timeout={800}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: {
                xs: '2rem',    // 모바일: 32px
                sm: '2.75rem', // 태블릿 소: 44px
                md: '3.5rem',  // 태블릿: 56px
                lg: '4.5rem'   // 데스크톱: 72px
              },
              fontWeight: 800,
              mb: { xs: 1.5, sm: 2, md: 2.5 },
              letterSpacing: { xs: '0.03em', sm: '0.05em', md: '0.08em', lg: '0.1em' },
              textAlign: 'center',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              lineHeight: { xs: 1.3, sm: 1.25, md: 1.2 },
              px: { xs: 1, sm: 2 },
              whiteSpace: { xs: 'normal', md: 'nowrap' } // 데스크톱에서 한 줄로 표시
            }}
          >
            {heroData.mainTitle}
          </Typography>
        </Fade>

        {/* 서브 헤드라인 */}
        <Fade in={isVisible} timeout={1000}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: {
                xs: '1.1rem',  // 모바일: 17.6px
                sm: '1.3rem',  // 태블릿 소: 20.8px
                md: '1.6rem',  // 태블릿: 25.6px
                lg: '2rem'     // 데스크톱: 32px
              },
              fontWeight: 600,
              mb: { xs: 2, sm: 2.5, md: 3 },
              textAlign: 'center',
              color: 'rgba(255,255,255,0.95)',
              textShadow: '0 1px 5px rgba(0,0,0,0.1)',
              lineHeight: { xs: 1.5, sm: 1.4, md: 1.3 },
              px: { xs: 2, sm: 3 }
            }}
          >
            {heroData.subTitle}
          </Typography>
        </Fade>

        {/* 설명 텍스트 */}
        <Fade in={isVisible} timeout={1200}>
          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: '0.95rem', // 모바일: 15.2px
                sm: '1.05rem', // 태블릿 소: 16.8px
                md: '1.15rem', // 태블릿: 18.4px
                lg: '1.25rem'  // 데스크톱: 20px
              },
              mb: { xs: 4, sm: 5, md: 6 },
              textAlign: 'center',
              maxWidth: { xs: '100%', sm: '600px', md: '800px' },
              mx: 'auto',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: { xs: 1.7, sm: 1.75, md: 1.8 },
              px: { xs: 2, sm: 3, md: 4 }
            }}
          >
            {heroData.description}
          </Typography>
        </Fade>

        {/* CTA 버튼 */}
        <Zoom in={isVisible} timeout={1400}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 2.5, md: 3 }}
            justifyContent="center"
            alignItems="center"
            sx={{
              px: { xs: 2, sm: 3 }
            }}
          >
            {/* Primary CTA */}
            <Button
              variant="contained"
              size="large"
              endIcon={!isMobile && <ArrowForward />}
              onClick={() => scrollToSection(heroData.primaryCTA.target)}
              aria-label={`${heroData.primaryCTA.text} 섹션으로 이동`}
              sx={{
                minWidth: { xs: '100%', sm: '200px', md: '220px' },
                minHeight: { xs: '48px', sm: '52px', md: '56px' }, // 터치 영역 최소 44px 이상
                px: { xs: 4, sm: 4.5, md: 5 },
                py: { xs: 1.5, sm: 1.75, md: 2 },
                fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' },
                fontWeight: 700,
                borderRadius: { xs: 2, md: 3 },
                backgroundColor: 'white',
                color: '#667eea',
                textTransform: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
                },
                '&:active': {
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {heroData.primaryCTA.text}
            </Button>

            {/* Secondary CTA */}
            <Button
              variant="outlined"
              size="large"
              startIcon={!isMobile && <Email />}
              onClick={() => scrollToSection(heroData.secondaryCTA.target)}
              aria-label={`${heroData.secondaryCTA.text} 섹션으로 이동`}
              sx={{
                minWidth: { xs: '100%', sm: '200px', md: '220px' },
                minHeight: { xs: '48px', sm: '52px', md: '56px' }, // 터치 영역 최소 44px 이상
                px: { xs: 4, sm: 4.5, md: 5 },
                py: { xs: 1.5, sm: 1.75, md: 2 },
                fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' },
                fontWeight: 700,
                borderRadius: { xs: 2, md: 3 },
                borderColor: 'white',
                borderWidth: 2,
                color: 'white',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderWidth: 2,
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-4px)'
                },
                '&:active': {
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {heroData.secondaryCTA.text}
            </Button>
          </Stack>
        </Zoom>

        {/* 소셜 링크 */}
        <Fade in={isVisible} timeout={1500}>
          <Box
            sx={{
              mt: { xs: 4, sm: 5, md: 6 },
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 1.5, sm: 2, md: 2.5 },
              flexWrap: 'wrap',
              px: { xs: 2, sm: 3 }
            }}
          >
            {socialLinks.map((social) => {
              const IconComponent = getIconComponent(social.icon);
              return (
                <IconButton
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} 페이지로 이동`}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    width: { xs: 48, sm: 52, md: 56 },  // 터치 영역 최소 44px 이상
                    height: { xs: 48, sm: 52, md: 56 }, // 터치 영역 최소 44px 이상
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'white',
                      color: '#667eea',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                    },
                    '&:active': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <IconComponent fontSize={isMobile ? 'medium' : 'large'} />
                </IconButton>
              );
            })}
          </Box>
        </Fade>

        {/* 스킬 아이콘 미리보기 (선택적) */}
        <Fade in={isVisible} timeout={1600}>
          <Box
            sx={{
              mt: { xs: 6, sm: 8, md: 10 },
              pt: { xs: 3, sm: 3.5, md: 4 },
              borderTop: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center',
              px: { xs: 2, sm: 3 }
            }}
          >
            <Typography
              variant="body2"
              sx={{
                mb: { xs: 2.5, sm: 3 },
                color: 'rgba(255,255,255,0.8)',
                fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
                letterSpacing: { xs: '0.08em', md: '0.1em' },
                textTransform: 'uppercase',
                fontWeight: 600
              }}
            >
              주요 기술 스택
            </Typography>
            <Stack
              direction="row"
              spacing={{ xs: 2, sm: 3, md: 5 }}
              justifyContent="center"
              flexWrap="wrap"
              sx={{
                gap: { xs: 2, sm: 3, md: 0 }
              }}
            >
              {aboutMeData.skills
                .filter(skill => skill.showInHome)
                .slice(0, isMobile ? 4 : 5)
                .map((skill) => (
                  <Box
                    key={skill.id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: { xs: 0.75, sm: 1 },
                      minWidth: { xs: '60px', sm: '70px', md: '80px' },
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)'
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '2rem', sm: '2.25rem', md: '2.5rem' }
                      }}
                    >
                      {skill.icon}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: 600,
                        fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
                      }}
                    >
                      {skill.name}
                    </Typography>
                  </Box>
                ))}
            </Stack>
          </Box>
        </Fade>

        {/* 스크롤 다운 힌트 */}
        <Fade in={isVisible} timeout={2000}>
          <Box
            sx={{
              mt: { xs: 4, sm: 5, md: 6 },
              mb: { xs: 2, sm: 3, md: 4 },
              textAlign: 'center',
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 20%, 50%, 80%, 100%': {
                  transform: 'translateY(0)'
                },
                '40%': {
                  transform: 'translateY(-10px)'
                },
                '60%': {
                  transform: 'translateY(-5px)'
                }
              }
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                fontWeight: 500
              }}
            >
              ↓ Scroll Down
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
