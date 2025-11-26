import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import { OpenInNew, Visibility } from '@mui/icons-material';
import { supabase } from '../lib/supabase';

/**
 * Projects 페이지 컴포넌트
 * Supabase에서 프로젝트 목록을 가져와 리스트 형태로 표시
 */
function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  /**
   * Supabase에서 프로젝트 목록 가져오기
   */
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('프로젝트를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '80vh', py: 8 }}>
        <Container maxWidth="lg">
          <Alert severity="error">{error}</Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 700,
          }}
        >
          Projects
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 6,
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.2rem' },
          }}
        >
          제가 개발한 프로젝트들을 소개합니다.
        </Typography>

        <Stack spacing={4}>
          {projects.map((project) => (
            <Card
              key={project.id}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: '100%', md: 600 },
                  height: { xs: 250, md: 337.5 },
                  objectFit: 'cover',
                }}
                image={project.thumbnail_url}
                alt={project.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x337.5?text=Project+Image';
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      mb: 1,
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', md: '1.8rem' },
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      color: 'text.secondary',
                      fontSize: { xs: '0.9rem', md: '1rem' },
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: 'text.secondary',
                      }}
                    >
                      기술 스택:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      {project.tech_stack.map((tech, index) => (
                        <Chip
                          key={index}
                          label={tech}
                          size="small"
                          sx={{
                            backgroundColor: 'primary.light',
                            color: 'primary.contrastText',
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
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
                    Live Demo
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Visibility />}
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
                    View Details
                  </Button>
                </CardActions>
              </Box>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default Projects;
