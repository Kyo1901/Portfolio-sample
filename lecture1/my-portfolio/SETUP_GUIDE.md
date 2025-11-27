# My Portfolio 프로젝트 설정 가이드

다른 컴퓨터에서 이 프로젝트를 실행하기 위한 가이드입니다.

## 📋 사전 준비사항

### 1. Node.js 설치 확인
```bash
node --version
npm --version
```
- Node.js가 설치되어 있지 않다면: https://nodejs.org/ 에서 LTS 버전 다운로드

## 🚀 프로젝트 실행 방법

### 1단계: 프로젝트 디렉토리로 이동
```bash
cd my-portfolio
```

### 2단계: .env 파일 생성
프로젝트 루트에 `.env` 파일이 없다면 생성해야 합니다.

#### 방법 A: .env.example 파일 복사 (권장)
```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# macOS/Linux
cp .env.example .env
```

#### 방법 B: 수동으로 생성
프로젝트 루트에 `.env` 파일을 만들고 다음 내용을 입력:

```env
VITE_SUPABASE_URL=https://hrwvtwrxghmrfsahmfll.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhyd3Z0d3J4Z2htcmZzYWhtZmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzg1MTUsImV4cCI6MjA3OTYxNDUxNX0.bZ5jr9ab7ti4XrUW-jyNCJMzstXl3-t7JBKtHfH5Q40
```

### 3단계: 의존성 패키지 설치
```bash
npm install
```
- 첫 실행 시 약 5-10분 소요됩니다.
- 229개의 패키지가 설치됩니다.

### 4단계: 개발 서버 실행
```bash
npm run dev
```
- 브라우저가 자동으로 열리거나
- 터미널에 표시된 URL (예: http://localhost:5173)을 브라우저에 입력

## ⚠️ 문제 해결

### 문제 1: "supabaseUrl is required" 오류
- **.env 파일이 없거나 값이 잘못됨**
- 해결: 위의 2단계를 다시 확인하고 .env 파일을 생성하세요.

### 문제 2: "node_modules not found" 또는 패키지 오류
- **의존성 패키지가 설치되지 않음**
- 해결: `npm install` 실행

### 문제 3: 포트 충돌 (Port already in use)
- **다른 프로그램이 같은 포트를 사용 중**
- 해결:
  - 기존 프로세스 종료 또는
  - vite.config.js에서 다른 포트로 변경

## 📁 프로젝트 구조

```
my-portfolio/
├── .env                  # 환경 변수 (수동으로 생성 필요)
├── .env.example          # 환경 변수 템플릿
├── package.json          # 프로젝트 설정
├── src/                  # 소스 코드
│   ├── components/       # 컴포넌트
│   ├── pages/            # 페이지
│   └── lib/              # 라이브러리
└── SETUP_GUIDE.md        # 이 파일
```

## 🔒 보안 참고사항

- `.env` 파일은 Git에 커밋하지 마세요
- 외장 하드에 보관할 때는 `.env` 파일을 포함시켜도 됩니다
- 공개 저장소에 올릴 때는 `.env` 파일을 제외하세요
