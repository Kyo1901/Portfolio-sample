import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Tabs,
  Tab,
  Chip,
  Divider,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  School as SchoolIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * AboutMe 페이지 컴포넌트
 *
 * 기본 정보와 3개의 콘텐츠 섹션을 탭 형태로 표시합니다.
 * Context API를 통해 aboutMeData를 관리하고 홈 탭과 연동합니다.
 * 홈 페이지에서 버튼 클릭 시 해당 섹션으로 스크롤합니다.
 */
function AboutMe() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);
  const basicInfoRef = useRef(null);
  const location = useLocation();

  // Context에서 데이터 가져오기
  const { aboutMeData } = usePortfolio();

  // 홈 페이지에서 이동 시 해당 섹션으로 스크롤
  useEffect(() => {
    if (location.state?.scrollTo) {
      const scrollTo = location.state.scrollTo;
      let targetRef = null;

      if (scrollTo === 'basicInfo') {
        targetRef = basicInfoRef;
      } else if (scrollTo === 'skills') {
        targetRef = skillsRef;
      }

      if (targetRef?.current) {
        setTimeout(() => {
          targetRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // 카테고리별 색상 반환
  const getCategoryColor = (category) => {
    const colors = {
      Frontend: '#FF6B6B',
      Framework: '#4ECDC4',
      Design: '#FFE66D',
      Backend: '#95E1D3',
      Mobile: '#F38181',
      Tools: '#AA96DA'
    };
    return colors[category] || '#999999';
  };

  // 스킬 섹션 애니메이션을 위한 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSkillsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  // 카테고리별로 스킬 그룹화
  const groupedSkills = aboutMeData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 }
      }}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* 기본 정보 섹션 */}
        <Card
          ref={basicInfoRef}
          elevation={3}
          sx={{
            mb: 4,
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={3}>
              {/* 프로필 사진 영역 */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 120, md: 150 },
                      height: { xs: 120, md: 150 },
                      bgcolor: 'primary.main',
                      fontSize: { xs: '3rem', md: '4rem' }
                    }}
                  >
                    <PersonIcon fontSize="inherit" />
                  </Avatar>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      textAlign: 'center'
                    }}
                  >
                    프로필 사진 업로드 영역
                  </Typography>
                </Box>
              </Grid>

              {/* 기본 정보 */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '1.5rem', md: '2rem' }
                    }}
                  >
                    {aboutMeData.basicInfo.name}
                  </Typography>

                  <Divider />

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SchoolIcon color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        학력
                      </Typography>
                      <Typography variant="body1">
                        {aboutMeData.basicInfo.education}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CodeIcon color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        전공
                      </Typography>
                      <Typography variant="body1">
                        {aboutMeData.basicInfo.major}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WorkIcon color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        경력
                      </Typography>
                      <Typography variant="body1">
                        {aboutMeData.basicInfo.experience}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* 콘텐츠 섹션 (탭 형태) */}
        <Card elevation={3} sx={{ borderRadius: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  fontSize: { xs: '0.8rem', md: '1rem' },
                  py: { xs: 2, md: 3 }
                }
              }}
            >
              {aboutMeData.sections.map((section) => (
                <Tab
                  key={section.id}
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <span>{section.title}</span>
                      {section.showInHome && (
                        <Chip
                          label="홈 표시"
                          size="small"
                          color="primary"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            display: { xs: 'none', sm: 'flex' }
                          }}
                        />
                      )}
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Box>

          <CardContent sx={{ p: { xs: 3, md: 4 }, minHeight: 300 }}>
            {aboutMeData.sections.map((section, index) => (
              <Box
                key={section.id}
                role="tabpanel"
                hidden={selectedTab !== index}
              >
                {selectedTab === index && (
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 3,
                        fontWeight: 'bold',
                        fontSize: { xs: '1.25rem', md: '1.5rem' }
                      }}
                    >
                      {section.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.8,
                        color: 'text.secondary',
                        whiteSpace: 'pre-line',
                        fontSize: { xs: '0.95rem', md: '1rem' }
                      }}
                    >
                      {section.content}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* 스킬 섹션 */}
        <Card
          ref={skillsRef}
          elevation={3}
          sx={{
            mt: 4,
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: 'bold',
                fontSize: { xs: '1.5rem', md: '2rem' },
                textAlign: 'center'
              }}
            >
              기술 스택
            </Typography>

            {Object.entries(groupedSkills).map(([category, skills]) => (
              <Box key={category} sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2
                  }}
                >
                  <Box
                    sx={{
                      width: 4,
                      height: 24,
                      bgcolor: getCategoryColor(category),
                      mr: 1.5,
                      borderRadius: 1
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '1rem', md: '1.25rem' },
                      color: getCategoryColor(category)
                    }}
                  >
                    {category}
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  {skills.map((skill) => (
                    <Grid key={skill.id} size={{ xs: 12, sm: 6, md: 4 }}>
                      <Tooltip
                        title={skill.description}
                        placement="top"
                        arrow
                      >
                        <Card
                          elevation={2}
                          sx={{
                            p: 2,
                            height: '100%',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                              transform: 'translateY(-8px)',
                              boxShadow: 6
                            }
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: 1.5
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '2rem',
                                mr: 1.5
                              }}
                            >
                              {skill.icon}
                            </Typography>
                            <Box sx={{ flex: 1 }}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  mb: 0.5
                                }}
                              >
                                <Typography
                                  variant="subtitle1"
                                  sx={{ fontWeight: 'bold' }}
                                >
                                  {skill.name}
                                </Typography>
                                {skill.showInHome && (
                                  <Chip
                                    label="메인"
                                    size="small"
                                    sx={{
                                      height: 18,
                                      fontSize: '0.65rem',
                                      bgcolor: getCategoryColor(category),
                                      color: 'white'
                                    }}
                                  />
                                )}
                              </Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'text.secondary',
                                  fontWeight: 'bold',
                                  mb: 1
                                }}
                              >
                                {skill.level}%
                              </Typography>
                            </Box>
                          </Box>

                          <LinearProgress
                            variant="determinate"
                            value={skillsVisible ? skill.level : 0}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getCategoryColor(category),
                                borderRadius: 4,
                                transition: 'transform 1.5s ease-in-out'
                              }
                            }}
                          />
                        </Card>
                      </Tooltip>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}

            <Box
              sx={{
                mt: 4,
                pt: 3,
                borderTop: 1,
                borderColor: 'divider',
                textAlign: 'center'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                💡 각 스킬에 마우스를 올려보세요!
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                "메인" 표시가 있는 스킬은 홈 페이지에도 표시됩니다
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AboutMe;
