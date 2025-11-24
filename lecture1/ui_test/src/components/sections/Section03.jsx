import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

/**
 * Section03 - Navigation 컴포넌트 섹션
 *
 * MUI AppBar와 Toolbar를 사용한 네비게이션 바
 * - 4개 메뉴: 홈, 소개, 서비스, 연락처
 * - 클릭 시 메뉴명 알림
 * - 모바일 반응형 햄버거 메뉴
 */
function Section03() {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = ['홈', '소개', '서비스', '연락처'];

  /**
   * 모바일 메뉴 열기
   * @param {Event} event - 클릭 이벤트
   */
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * 모바일 메뉴 닫기
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /**
   * 메뉴 클릭 핸들러
   * @param {string} menuName - 클릭된 메뉴명
   */
  const handleMenuClick = (menuName) => {
    alert(`"${menuName}" 메뉴가 클릭되었습니다!`);
    handleMenuClose();
  };

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
          03. Navigation Components
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}
        >
          MUI AppBar와 Toolbar를 사용한 반응형 네비게이션 바입니다. 데스크톱에서는 버튼으로, 모바일에서는 햄버거 메뉴로 표시됩니다.
        </Typography>
      </Box>

      {/* 네비게이션 바 */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ borderRadius: 1 }}>
          <Toolbar>
            {/* 로고/타이틀 */}
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: { xs: '1rem', md: '1.25rem' },
                fontWeight: 600
              }}
            >
              My Website
            </Typography>

            {/* 데스크톱 메뉴 */}
            {!isMobile ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item}
                    color="inherit"
                    onClick={() => handleMenuClick(item)}
                    sx={{
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 500
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
            ) : (
              /* 모바일 햄버거 메뉴 */
              <>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item}
                      onClick={() => handleMenuClick(item)}
                      sx={{ minWidth: 120 }}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      {/* 설명 영역 */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: '#e8f5e9', borderRadius: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            fontWeight: 600,
            color: 'success.dark',
            mb: 2
          }}
        >
          반응형 동작 설명
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                color: 'success.dark'
              }}
            >
              🖥️ 데스크톱 (md 이상):
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: 'text.secondary',
                ml: 2
              }}
            >
              메뉴가 가로로 나열된 버튼으로 표시됩니다.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                color: 'success.dark'
              }}
            >
              📱 모바일 (md 미만):
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: 'text.secondary',
                ml: 2
              }}
            >
              햄버거 아이콘을 클릭하면 드롭다운 메뉴가 표시됩니다.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
                color: 'success.dark'
              }}
            >
              현재 모드:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: 'success.main',
                ml: 2,
                fontWeight: 600
              }}
            >
              {isMobile ? '📱 모바일 모드' : '🖥️ 데스크톱 모드'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default Section03;
