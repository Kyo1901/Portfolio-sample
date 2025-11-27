-- Pet Community 데이터베이스 테이블 생성 스크립트

-- 1. pet_users 테이블 생성
CREATE TABLE IF NOT EXISTS pet_users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. pet_posts 테이블 생성
CREATE TABLE IF NOT EXISTS pet_posts (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id BIGINT NOT NULL REFERENCES pet_users(id) ON DELETE CASCADE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. pet_comments 테이블 생성
CREATE TABLE IF NOT EXISTS pet_comments (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  post_id BIGINT NOT NULL REFERENCES pet_posts(id) ON DELETE CASCADE,
  author_id BIGINT NOT NULL REFERENCES pet_users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. pet_links 테이블 생성 (좋아요)
CREATE TABLE IF NOT EXISTS pet_links (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT NOT NULL REFERENCES pet_posts(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES pet_users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(post_id, user_id) -- 한 사용자가 같은 게시글에 중복 좋아요 방지
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_pet_posts_author_id ON pet_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_pet_posts_created_at ON pet_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pet_comments_post_id ON pet_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_pet_comments_author_id ON pet_comments(author_id);
CREATE INDEX IF NOT EXISTS idx_pet_links_post_id ON pet_links(post_id);
CREATE INDEX IF NOT EXISTS idx_pet_links_user_id ON pet_links(user_id);

-- RLS (Row Level Security) 활성화
ALTER TABLE pet_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pet_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pet_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE pet_links ENABLE ROW LEVEL SECURITY;

-- RLS 정책 생성 (모든 사용자가 읽기 가능)
CREATE POLICY "Enable read access for all users" ON pet_users FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON pet_posts FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON pet_comments FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON pet_links FOR SELECT USING (true);

-- RLS 정책 생성 (모든 사용자가 쓰기 가능 - 실제 프로덕션에서는 더 엄격하게 설정 필요)
CREATE POLICY "Enable insert for all users" ON pet_users FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON pet_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON pet_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON pet_links FOR INSERT WITH CHECK (true);

-- RLS 정책 생성 (삭제 허용)
CREATE POLICY "Enable delete for all users" ON pet_links FOR DELETE USING (true);

-- RLS 정책 생성 (업데이트 허용)
CREATE POLICY "Enable update for all users" ON pet_posts FOR UPDATE USING (true);

-- 완료 메시지
COMMENT ON TABLE pet_users IS 'Pet Community 사용자 테이블';
COMMENT ON TABLE pet_posts IS 'Pet Community 게시글 테이블';
COMMENT ON TABLE pet_comments IS 'Pet Community 댓글 테이블';
COMMENT ON TABLE pet_links IS 'Pet Community 좋아요 테이블';
