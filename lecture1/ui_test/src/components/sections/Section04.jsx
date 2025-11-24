import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import Grid from '@mui/material/Grid';

/**
 * Section04 - Dropdown (Select) 컴포넌트 섹션
 *
 * MUI Select와 MenuItem을 사용한 드롭다운 메뉴
 * - FormControl과 InputLabel 적용
 * - 3-5개 옵션 제공
 * - 선택값 실시간 표시
 */
function Section04() {
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');

  /**
   * 선택값 변경 핸들러
   * @param {Event} event - 선택 이벤트
   * @param {Function} setter - 상태 변경 함수
   */
  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const dropdownData = [
    {
      id: 'country',
      label: '국가 선택',
      value: country,
      setter: setCountry,
      options: [
        { value: 'korea', label: '대한민국' },
        { value: 'usa', label: '미국' },
        { value: 'japan', label: '일본' },
        { value: 'china', label: '중국' },
        { value: 'uk', label: '영국' }
      ]
    },
    {
      id: 'language',
      label: '프로그래밍 언어 선택',
      value: language,
      setter: setLanguage,
      options: [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'cpp', label: 'C++' }
      ]
    },
    {
      id: 'level',
      label: '레벨 선택',
      value: level,
      setter: setLevel,
      options: [
        { value: 'beginner', label: '초급' },
        { value: 'intermediate', label: '중급' },
        { value: 'advanced', label: '고급' }
      ]
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
          04. Dropdown (Select) Components
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}
        >
          MUI Select와 MenuItem을 사용한 드롭다운 메뉴입니다. FormControl과 InputLabel이 적용되어 있습니다.
        </Typography>
      </Box>

      {/* 드롭다운 그리드 */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {dropdownData.map((dropdown) => (
            <Grid key={dropdown.id} size={{ xs: 12, md: 4 }}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel id={`${dropdown.id}-label`}>
                    {dropdown.label}
                  </InputLabel>
                  <Select
                    labelId={`${dropdown.id}-label`}
                    id={dropdown.id}
                    value={dropdown.value}
                    label={dropdown.label}
                    onChange={(e) => handleChange(e, dropdown.setter)}
                  >
                    {dropdown.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* 선택값 실시간 표시 */}
                <Box
                  sx={{
                    mt: 2,
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
                    선택값:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: dropdown.value ? 'text.primary' : 'text.disabled',
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      fontWeight: dropdown.value ? 600 : 400
                    }}
                  >
                    {dropdown.value
                      ? dropdown.options.find((opt) => opt.value === dropdown.value)?.label
                      : '(선택된 항목이 없습니다)'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 모든 선택값 종합 표시 */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: '#fff3e0', borderRadius: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            fontWeight: 600,
            color: 'warning.dark',
            mb: 2
          }}
        >
          전체 선택값 요약
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
            <strong>국가:</strong>{' '}
            {country
              ? dropdownData[0].options.find((opt) => opt.value === country)?.label
              : '선택 안 함'}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
            <strong>프로그래밍 언어:</strong>{' '}
            {language
              ? dropdownData[1].options.find((opt) => opt.value === language)?.label
              : '선택 안 함'}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
            <strong>레벨:</strong>{' '}
            {level
              ? dropdownData[2].options.find((opt) => opt.value === level)?.label
              : '선택 안 함'}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default Section04;
