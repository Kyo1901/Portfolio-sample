-- my-portfolio projects 테이블에 프로젝트 2개 추가

-- 프로젝트 1: 게임 정보 커뮤니티 플랫폼
INSERT INTO projects (
  title, 
  description, 
  tech_stack, 
  detail_url, 
  thumbnail_url, 
  is_published, 
  sort_order
)
VALUES (
  '게임 정보 커뮤니티 플랫폼',
  'Supabase와 React로 구현한 실시간 커뮤니티',
  ARRAY['React', 'Supabase', 'PostgreSQL', 'CSS3'],
  'https://game-hub-community-2025.netlify.app/',
  'https://image.thum.io/get/https://game-hub-community-2025.netlify.app/',
  true,
  1
);

-- 프로젝트 2: 맛집 스타일 미니 SNS
INSERT INTO projects (
  title, 
  description, 
  tech_stack, 
  detail_url, 
  thumbnail_url, 
  is_published, 
  sort_order
)
VALUES (
  '맛집 스타일 미니 SNS',
  '모바일 퍼스트 소셜 미디어 웹앱',
  ARRAY['React', 'Supabase', 'Unsplash API', 'MUI'],
  'https://mini-sns-matzip.netlify.app/login',
  'https://image.thum.io/get/https://mini-sns-matzip.netlify.app/login',
  true,
  2
);
