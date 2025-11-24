import { Box, Typography, Button, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * Section01 - Button 컴포넌트 섹션
 *
 * MUI Button의 다양한 variant와 color를 보여주는 섹션
 * - 3가지 variant: contained, outlined, text
 * - 3가지 color: primary, secondary, error
 * - 클릭 시 알림창 표시
 */
function Section01() {
  /**
   * 버튼 클릭 핸들러
   * @param {string} variant - 버튼 variant (contained, outlined, text)
   * @param {string} color - 버튼 color (primary, secondary, error)
   */
  const handleClick = (variant, color) => {
    alert(`${variant} - ${color} 버튼이 클릭되었습니다!`);
  };

  const variants = ['contained', 'outlined', 'text'];
  const colors = ['primary', 'secondary', 'error'];

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 2
      }}
    >
      {/* 섹션 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 600,
            color: 'primary.main',
            mb: 1
          }}
        >
          01. Button Components
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}
        >
          MUI Button의 다양한 variant(contained, outlined, text)와 color(primary, secondary, error)를 테스트합니다.
        </Typography>
      </Box>

      {/* 버튼 그리드 */}
      <Box sx={{ flexGrow: 1 }}>
        {variants.map((variant) => (
          <Box key={variant} sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                fontWeight: 500,
                mb: 2,
                textTransform: 'capitalize'
              }}
            >
              {variant}
            </Typography>
            <Grid container spacing={2}>
              {colors.map((color) => (
                <Grid key={`${variant}-${color}`} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Button
                    variant={variant}
                    color={color}
                    onClick={() => handleClick(variant, color)}
                    fullWidth
                    sx={{
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: { xs: '0.9rem', md: '1rem' }
                    }}
                  >
                    {color} Button
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default Section01;
