import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Collapse,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { supabase } from '../../lib/supabase';

/**
 * Guestbook 컴포넌트
 *
 * Props:
 * 없음 (독립적으로 동작)
 *
 * Example usage:
 * <Guestbook />
 */
function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    author_name: '',
    message: '',
    email: '',
    phone: '',
    sns_account: '',
    region: '',
    age_group: '',
    hobby: '',
    keyword: ''
  });

  // 방명록 불러오기
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('방명록 불러오기 실패:', error);
      showAlert('방명록을 불러오는데 실패했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      showAlert('메시지를 입력해주세요.', 'error');
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('guestbook')
        .insert([{
          author_name: formData.author_name.trim() || '익명',
          message: formData.message.trim(),
          email: formData.email.trim() || null,
          phone: formData.phone.trim() || null,
          sns_account: formData.sns_account.trim() || null,
          region: formData.region.trim() || null,
          age_group: formData.age_group.trim() || null,
          hobby: formData.hobby.trim() || null,
          keyword: formData.keyword.trim() || null
        }]);

      if (error) throw error;

      showAlert('방명록이 등록되었습니다!', 'success');

      // 폼 초기화
      setFormData({
        author_name: '',
        message: '',
        email: '',
        phone: '',
        sns_account: '',
        region: '',
        age_group: '',
        hobby: '',
        keyword: ''
      });
      setShowAdvanced(false);

      // 목록 새로고침
      fetchEntries();
    } catch (error) {
      console.error('방명록 등록 실패:', error);
      showAlert('방명록 등록에 실패했습니다.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const showAlert = (message, severity) => {
    setAlert({ show: true, message, severity });
    setTimeout(() => {
      setAlert({ show: false, message: '', severity: 'success' });
    }, 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box>
      {/* 방명록 제목 */}
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: '#1d1d1f',
          textAlign: 'center'
        }}
      >
        Guestbook
      </Typography>

      {/* 알림 메시지 */}
      {alert.show && (
        <Alert severity={alert.severity} sx={{ mb: 3, borderRadius: 2 }}>
          {alert.message}
        </Alert>
      )}

      {/* 방명록 작성 폼 */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: 'none'
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography
            variant="h6"
            sx={{ mb: 3, fontWeight: 600, color: '#1d1d1f' }}
          >
            방명록 남기기
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  name="author_name"
                  label="이름"
                  placeholder="익명"
                  value={formData.author_name}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#0071e3'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0071e3'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  name="email"
                  label="이메일"
                  placeholder="your@email.com"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#0071e3'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0071e3'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  name="message"
                  label="메시지"
                  placeholder="메시지를 남겨주세요"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#0071e3'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0071e3'
                      }
                    }
                  }}
                />
              </Grid>

              {/* 추가 정보 입력 토글 */}
              <Grid size={{ xs: 12 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    endIcon={
                      <ExpandMoreIcon
                        sx={{
                          transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: '0.3s'
                        }}
                      />
                    }
                    sx={{
                      color: '#0071e3',
                      textTransform: 'none',
                      fontSize: '0.875rem'
                    }}
                  >
                    {showAdvanced ? '간단하게 작성하기' : '더 많은 정보 입력하기'}
                  </Button>
                </Box>
              </Grid>

              {/* 추가 정보 입력 필드 */}
              <Grid size={{ xs: 12 }}>
                <Collapse in={showAdvanced}>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        name="phone"
                        label="전화번호"
                        placeholder="010-1234-5678"
                        value={formData.phone}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': { borderColor: '#0071e3' },
                            '&.Mui-focused fieldset': { borderColor: '#0071e3' }
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        name="sns_account"
                        label="SNS 계정"
                        placeholder="@username"
                        value={formData.sns_account}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': { borderColor: '#0071e3' },
                            '&.Mui-focused fieldset': { borderColor: '#0071e3' }
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        name="region"
                        label="거주 지역"
                        placeholder="서울"
                        value={formData.region}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': { borderColor: '#0071e3' },
                            '&.Mui-focused fieldset': { borderColor: '#0071e3' }
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        name="age_group"
                        label="나이대"
                        placeholder="20대"
                        value={formData.age_group}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': { borderColor: '#0071e3' },
                            '&.Mui-focused fieldset': { borderColor: '#0071e3' }
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        name="hobby"
                        label="취미"
                        placeholder="독서, 운동"
                        value={formData.hobby}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': { borderColor: '#0071e3' },
                            '&.Mui-focused fieldset': { borderColor: '#0071e3' }
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        name="keyword"
                        label="한마디 키워드"
                        placeholder="열정적인"
                        value={formData.keyword}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': { borderColor: '#0071e3' },
                            '&.Mui-focused fieldset': { borderColor: '#0071e3' }
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Collapse>
              </Grid>

              {/* 제출 버튼 */}
              <Grid size={{ xs: 12 }}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={submitting}
                  sx={{
                    py: 1.5,
                    mt: 2,
                    borderRadius: 2,
                    backgroundColor: '#0071e3',
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#0077ed'
                    }
                  }}
                >
                  {submitting ? <CircularProgress size={24} color="inherit" /> : '등록하기'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* 방명록 리스트 */}
      <Box>
        <Typography
          variant="h6"
          sx={{ mb: 3, fontWeight: 600, color: '#1d1d1f' }}
        >
          방명록 ({entries.length})
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#0071e3' }} />
          </Box>
        ) : entries.length === 0 ? (
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: 'none'
            }}
          >
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Typography sx={{ color: '#86868b' }}>
                아직 방명록이 없습니다. 첫 번째 방명록을 남겨주세요!
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={2}>
            {entries.map((entry) => (
              <Grid size={{ xs: 12 }} key={entry.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: 'none',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 25px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: '#1d1d1f' }}
                      >
                        {entry.author_name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#86868b' }}>
                        {formatDate(entry.created_at)}
                      </Typography>
                    </Box>
                    {entry.keyword && (
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 2,
                          py: 0.5,
                          mb: 2,
                          borderRadius: 2,
                          backgroundColor: 'rgba(0, 113, 227, 0.1)',
                          color: '#0071e3',
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      >
                        #{entry.keyword}
                      </Box>
                    )}
                    <Typography
                      variant="body1"
                      sx={{ color: '#1d1d1f', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}
                    >
                      {entry.message}
                    </Typography>
                    {(entry.region || entry.age_group || entry.hobby) && (
                      <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {entry.region && (
                          <Typography variant="caption" sx={{ color: '#86868b' }}>
                            📍 {entry.region}
                          </Typography>
                        )}
                        {entry.age_group && (
                          <Typography variant="caption" sx={{ color: '#86868b' }}>
                            🎂 {entry.age_group}
                          </Typography>
                        )}
                        {entry.hobby && (
                          <Typography variant="caption" sx={{ color: '#86868b' }}>
                            🎯 {entry.hobby}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default Guestbook;
