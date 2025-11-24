import { useState } from 'react';
import { Box, Typography, TextField, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * Section02 - Input (TextField) 컴포넌트 섹션
 *
 * MUI TextField의 다양한 variant를 보여주는 섹션
 * - 3가지 variant: standard, outlined, filled
 * - placeholder와 label 설정
 * - 입력값 실시간 표시
 */
function Section02() {
  const [standardValue, setStandardValue] = useState('');
  const [outlinedValue, setOutlinedValue] = useState('');
  const [filledValue, setFilledValue] = useState('');

  const textFields = [
    {
      variant: 'standard',
      label: 'Standard',
      placeholder: 'Standard 입력 필드',
      value: standardValue,
      onChange: (e) => setStandardValue(e.target.value)
    },
    {
      variant: 'outlined',
      label: 'Outlined',
      placeholder: 'Outlined 입력 필드',
      value: outlinedValue,
      onChange: (e) => setOutlinedValue(e.target.value)
    },
    {
      variant: 'filled',
      label: 'Filled',
      placeholder: 'Filled 입력 필드',
      value: filledValue,
      onChange: (e) => setFilledValue(e.target.value)
    }
  ];

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
          02. Input (TextField) Components
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}
        >
          MUI TextField의 다양한 variant(standard, outlined, filled)를 테스트합니다. 입력값이 실시간으로 표시됩니다.
        </Typography>
      </Box>

      {/* 입력 필드 그리드 */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {textFields.map((field) => (
            <Grid key={field.variant} size={{ xs: 12, md: 4 }}>
              <Box>
                <TextField
                  variant={field.variant}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />

                {/* 입력값 실시간 표시 */}
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                    minHeight: 60
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      mb: 0.5,
                      display: 'block'
                    }}
                  >
                    입력값:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: field.value ? 'text.primary' : 'text.disabled',
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      wordBreak: 'break-word'
                    }}
                  >
                    {field.value || '(입력된 내용이 여기에 표시됩니다)'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 모든 입력값 종합 표시 */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            fontWeight: 600,
            color: 'primary.main',
            mb: 2
          }}
        >
          전체 입력값 요약
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
            <strong>Standard:</strong> {standardValue || '(없음)'}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
            <strong>Outlined:</strong> {outlinedValue || '(없음)'}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
            <strong>Filled:</strong> {filledValue || '(없음)'}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default Section02;
