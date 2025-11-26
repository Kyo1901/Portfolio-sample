import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Stack,
  Chip,
  Grid,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { OpenInNew, ArrowForward } from '@mui/icons-material';
import { supabase } from '../../lib/supabase';

/**
 * ProjectsSection 컴포넌트
 * 홈페이지에 표시되는 프로젝트 미리보기 섹션 (상위 3개 표시)
 */
function ProjectsSection() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 반응형 디자인을 위한 미디어 쿼리
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 0-599px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600-899px

  useEffect(() => {
    fetchProjects();
  }, []);

  /**
   * Supabase에서 상위 3개 프로젝트 가져오기
   */
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .limit(3);

      if (error) throw error;

      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          py: { xs: 6, sm: 7, md: 8 },
          backgroundColor: '#f8f9fa'
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: { xs: 3, sm: 4 }
            }}
          >
            <CircularProgress />
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      id="projects"
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
        {/* 섹션 제목 */}
        <Typography
          variant="h3"
          component="h2"
          sx={{
            mb: { xs: 1.5, sm: 2 },
            fontSize: {
              xs: '1.75rem',  // 모바일: 28px
              sm: '2rem',     // 태블릿 소: 32px
              md: '2.5rem',   // 태블릿: 40px
              lg: '3rem'      // 데스크톱: 48px
            },
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.2
          }}
        >
          Featured Projects
        </Typography>

        {/* 섹션 설명 */}
        <Typography
          variant="body1"
          sx={{
            mb: { xs: 4, sm: 5, md: 6 },
            color: 'text.secondary',
            fontSize: {
              xs: '0.95rem',  // 모바일: 15.2px
              sm: '1rem',     // 태블릿 소: 16px
              md: '1.1rem',   // 태블릿: 17.6px
              lg: '1.15rem'   // 데스크톱: 18.4px
            },
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6,
            px: { xs: 2, sm: 3 }
          }}
        >
          최근 진행한 주요 프로젝트를 소개합니다.
        </Typography>

        {/* 프로젝트 카드 그리드 */}
        <Grid
          container
          spacing={{ xs: 2, sm: 2.5, md: 3 }}
          sx={{
            px: { xs: 0, sm: 1, md: 2 }
          }}
        >
          {projects.map((project) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              key={project.id}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  borderRadius: { xs: 2, md: 3 },
                  '&:hover': {
                    transform: { xs: 'scale(1.02)', md: 'scale(1.05)' },
                    boxShadow: { xs: 4, md: 6 },
                  },
                }}
              >
                {/* 프로젝트 썸네일 */}
                <CardMedia
                  component="img"
                  height={isMobile ? '180' : isTablet ? '200' : '220'}
                  image={project.thumbnail_url}
                  alt={project.title}
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/600x337.5?text=Project+Image';
                  }}
                  sx={{
                    objectFit: 'cover'
                  }}
                />

                {/* 카드 내용 */}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 2.5, md: 3 }
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h4"
                    sx={{
                      mb: { xs: 1, md: 1.5 },
                      fontWeight: 700,
                      fontSize: {
                        xs: '1.1rem',  // 모바일: 17.6px
                        sm: '1.2rem',  // 태블릿 소: 19.2px
                        md: '1.25rem'  // 태블릿+: 20px
                      },
                      lineHeight: 1.3
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: { xs: 1.5, md: 2 },
                      color: 'text.secondary',
                      fontSize: {
                        xs: '0.875rem',  // 모바일: 14px
                        sm: '0.9rem',    // 태블릿 소: 14.4px
                        md: '0.95rem'    // 태블릿+: 15.2px
                      },
                      lineHeight: 1.6
                    }}
                  >
                    {project.description}
                  </Typography>

                  {/* 기술 스택 태그 */}
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    gap={{ xs: 0.75, sm: 1 }}
                  >
                    {project.tech_stack.slice(0, 3).map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        sx={{
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          height: { xs: '24px', sm: '26px' }
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>

                {/* 카드 액션 버튼 */}
                <CardActions
                  sx={{
                    p: { xs: 2, sm: 2.5, md: 3 },
                    pt: 0
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={!isMobile && <OpenInNew />}
                    href={project.detail_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      minHeight: { xs: '40px', sm: '44px' },  // 터치 영역 확보
                      px: { xs: 2.5, sm: 3 },
                      fontSize: {
                        xs: '0.85rem',  // 모바일: 13.6px
                        sm: '0.9rem'    // 태블릿+: 14.4px
                      },
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      }
                    }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 모든 프로젝트 보기 버튼 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: { xs: 4, sm: 5, md: 6 },
            px: { xs: 2, sm: 3 }
          }}
        >
          <Button
            variant="outlined"
            size="large"
            endIcon={!isMobile && <ArrowForward />}
            onClick={() => navigate('/projects')}
            sx={{
              minWidth: { xs: '100%', sm: 'auto' },
              minHeight: { xs: '48px', sm: '52px', md: '56px' }, // 터치 영역 확보
              px: { xs: 4, sm: 4.5, md: 5 },
              py: { xs: 1.5, sm: 1.75, md: 2 },
              fontSize: {
                xs: '1rem',    // 모바일: 16px
                sm: '1.05rem', // 태블릿 소: 16.8px
                md: '1.1rem'   // 태블릿+: 17.6px
              },
              fontWeight: 600,
              borderWidth: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderWidth: 2,
                transform: { xs: 'translateY(-2px)', md: 'translateX(8px)' },
              },
              '&:active': {
                transform: 'translateY(0)',
              }
            }}
          >
            모든 프로젝트 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
