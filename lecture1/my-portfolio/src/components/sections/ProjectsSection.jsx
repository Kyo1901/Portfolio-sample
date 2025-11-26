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
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            mb: 2,
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
          }}
        >
          Featured Projects
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 6,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.1rem' },
          }}
        >
          최근 진행한 주요 프로젝트를 소개합니다.
        </Typography>

        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={project.thumbnail_url}
                  alt={project.title}
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/600x337.5?text=Project+Image';
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="h4"
                    sx={{ mb: 1, fontWeight: 700 }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, color: 'text.secondary' }}
                  >
                    {project.description}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {project.tech_stack.slice(0, 3).map((tech, index) => (
                      <Chip key={index} label={tech} size="small" />
                    ))}
                  </Stack>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<OpenInNew />}
                    href={project.detail_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate('/projects')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateX(8px)',
              },
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
