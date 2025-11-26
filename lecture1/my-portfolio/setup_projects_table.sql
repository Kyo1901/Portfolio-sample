-- =============================================
-- my-portfolio projects 테이블 생성 및 데이터 추가
-- =============================================

-- 1. projects 테이블 생성
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  detail_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. RLS (Row Level Security) 활성화
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 3. 읽기 권한 정책 (모든 사용자가 published 프로젝트 읽기 가능)
CREATE POLICY "Anyone can view published projects"
  ON projects
  FOR SELECT
  USING (is_published = true);

-- 4. 기존 데이터 삭제 (선택사항 - 초기화하려면 주석 해제)
-- DELETE FROM projects;

-- 5. 프로젝트 데이터 추가
INSERT INTO projects (
  title, 
  description, 
  tech_stack, 
  detail_url, 
  thumbnail_url, 
  is_published, 
  sort_order
)
VALUES 
  -- 프로젝트 1: 게임 정보 커뮤니티 플랫폼
  (
    '게임 정보 커뮤니티 플랫폼',
    'Supabase와 React로 구현한 실시간 커뮤니티',
    ARRAY['React', 'Supabase', 'PostgreSQL', 'CSS3'],
    'https://game-hub-community-2025.netlify.app/',
    'https://image.thum.io/get/https://game-hub-community-2025.netlify.app/',
    true,
    1
  ),
  -- 프로젝트 2: 맛집 스타일 미니 SNS
  (
    '맛집 스타일 미니 SNS',
    '모바일 퍼스트 소셜 미디어 웹앱',
    ARRAY['React', 'Supabase', 'Unsplash API', 'MUI'],
    'https://mini-sns-matzip.netlify.app/login',
    'https://image.thum.io/get/https://mini-sns-matzip.netlify.app/login',
    true,
    2
  )
ON CONFLICT DO NOTHING;

-- 6. 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_projects_is_published ON projects(is_published);
