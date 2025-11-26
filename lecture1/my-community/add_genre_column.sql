-- posts 테이블에 genre 컬럼 추가
ALTER TABLE posts ADD COLUMN IF NOT EXISTS genre TEXT;

-- image_url 컬럼 삭제
ALTER TABLE posts DROP COLUMN IF EXISTS image_url;
