# 🚀 Netlify 자동 배포 가이드

lecture1의 모든 React 프로젝트를 Netlify에 자동 배포하는 완벽 가이드입니다.

---

## 📋 목차
1. [자동 배포란?](#자동-배포란)
2. [준비 상태](#준비-상태)
3. [프로젝트별 배포 설정](#프로젝트별-배포-설정)
4. [자동 배포 동작 방식](#자동-배포-동작-방식)
5. [문제 해결](#문제-해결)

---

## 🤔 자동 배포란?

### Git 연동 자동 배포 흐름
```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  개발자 PC   │ ──▶  │   GitHub    │ ──▶  │   Netlify   │
│  (로컬 코드) │ push │ (원격 저장소)│ 감지 │  (자동 배포) │
└─────────────┘      └─────────────┘      └─────────────┘
```

**단계별 설명:**
1. **로컬에서 코드 수정** - 내 PC에서 파일 변경
2. **Git 커밋** - 변경사항을 Git으로 저장
3. **GitHub에 푸시** - 원격 저장소에 업로드
4. **Netlify가 자동 감지** - GitHub Webhook으로 새 커밋 감지
5. **자동 빌드 & 배포** - `npm run build` 실행 후 배포

**장점:**
- ✨ 코드 푸시만 하면 자동으로 배포
- 🔄 매번 수동 배포 필요 없음
- 📝 배포 이력이 Git 커밋과 연동
- 🎯 변경된 프로젝트만 재배포 (효율적!)

---

## ✅ 준비 상태

### GitHub 저장소
- **저장소 URL**: https://github.com/Kyo1901/Portfolio-sample
- **브랜치**: main
- **상태**: ✅ 모든 프로젝트 코드 푸시 완료

### lecture1 프로젝트 목록

| 프로젝트 | 설명 | netlify.toml | Supabase 연동 |
|---------|------|--------------|--------------|
| **mini_sns** | 맛ZIP SNS 플랫폼 | ✅ | ✅ |
| **my-portfolio** | 포트폴리오 사이트 | ✅ | ✅ |
| **my-community** | 커뮤니티 게시판 | ✅ | ✅ |
| **my-react-app** | React 기본 앱 | ✅ | ❌ |
| **ui_test** | UI 테스트 앱 | ✅ | ❌ |

---

## 🔧 프로젝트별 배포 설정

### 1️⃣ mini_sns (맛ZIP)

**프로젝트 정보:**
- 맛집 리뷰 SNS 플랫폼
- Supabase 데이터베이스 연동
- 로그인, 피드, 게시물 작성 기능

**Netlify 설정:**
```
Site name: mini-sns-matzip
Branch: main
Base directory: lecture1/mini_sns
Build command: npm run build
Publish directory: lecture1/mini_sns/dist
```

**환경변수 (필수):**
```
VITE_SUPABASE_URL = https://hrwvtwrxghmrfsahmfll.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhyd3Z0d3J4Z2htcmZzYWhtZmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzg1MTUsImV4cCI6MjA3OTYxNDUxNX0.bZ5jr9ab7ti4XrUW-jyNCJMzstXl3-t7JBKtHfH5Q40
```

---

### 2️⃣ my-portfolio (포트폴리오)

**프로젝트 정보:**
- 개인 포트폴리오 사이트
- Contact 섹션, 방명록 기능
- Supabase 연동

**Netlify 설정:**
```
Site name: my-portfolio-sample (이미 배포됨)
Branch: main
Base directory: lecture1/my-portfolio
Build command: npm run build
Publish directory: lecture1/my-portfolio/dist
```

**환경변수 (필수):**
```
VITE_SUPABASE_URL = https://hrwvtwrxghmrfsahmfll.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhyd3Z0d3J4Z2htcmZzYWhtZmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzg1MTUsImV4cCI6MjA3OTYxNDUxNX0.bZ5jr9ab7ti4XrUW-jyNCJMzstXl3-t7JBKtHfH5Q40
```

**현재 배포 URL**: https://my-portfolio-sample-2025.netlify.app

---

### 3️⃣ my-community (커뮤니티)

**프로젝트 정보:**
- 커뮤니티 게시판
- Supabase 데이터베이스 연동
- 게시물 CRUD 기능

**Netlify 설정:**
```
Site name: my-community-board
Branch: main
Base directory: lecture1/my-community
Build command: npm run build
Publish directory: lecture1/my-community/dist
```

**환경변수 (필수):**
```
VITE_SUPABASE_URL = https://hrwvtwrxghmrfsahmfll.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhyd3Z0d3J4Z2htcmZzYWhtZmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzg1MTUsImV4cCI6MjA3OTYxNDUxNX0.bZ5jr9ab7ti4XrUW-jyNCJMzstXl3-t7JBKtHfH5Q40
```

---

### 4️⃣ my-react-app (기본 앱)

**프로젝트 정보:**
- React 기본 템플릿
- MUI 적용

**Netlify 설정:**
```
Site name: my-react-app-basic
Branch: main
Base directory: lecture1/my-react-app
Build command: npm run build
Publish directory: lecture1/my-react-app/dist
```

**환경변수**: 불필요 ❌

---

### 5️⃣ ui_test (UI 테스트)

**프로젝트 정보:**
- UI 컴포넌트 테스트

**Netlify 설정:**
```
Site name: ui-test-app
Branch: main
Base directory: lecture1/ui_test
Build command: npm run build
Publish directory: lecture1/ui_test/dist
```

**환경변수**: 불필요 ❌

---

## 📝 Netlify 연결 단계 (상세)

### Step 1: Netlify 접속
1. https://app.netlify.com 접속
2. GitHub 계정으로 로그인

### Step 2: 새 사이트 추가
1. 왼쪽 메뉴에서 **"Sites"** 클릭
2. 오른쪽 상단 **"Add new site"** 버튼 클릭
3. **"Import an existing project"** 선택

### Step 3: GitHub 저장소 연결
1. **"Deploy with GitHub"** 선택
2. GitHub 인증 (처음 한 번만)
3. 저장소 검색창에서 **"Portfolio-sample"** 검색
4. **`Kyo1901/Portfolio-sample`** 클릭

### Step 4: 빌드 설정 입력
```
예시: mini_sns의 경우

┌─────────────────────────────────────┐
│ Branch to deploy                    │
│ [main                           ▼]  │
├─────────────────────────────────────┤
│ Base directory                      │
│ [lecture1/mini_sns              ]   │
├─────────────────────────────────────┤
│ Build command                       │
│ [npm run build                  ]   │
├─────────────────────────────────────┤
│ Publish directory                   │
│ [lecture1/mini_sns/dist         ]   │
└─────────────────────────────────────┘
```

**⚠️ 주의사항:**
- **Base directory**가 가장 중요합니다!
- 반드시 `lecture1/프로젝트명` 형태로 입력
- Publish directory는 `lecture1/프로젝트명/dist`

### Step 5: 환경변수 설정 (Supabase 프로젝트만)

**설정 위치:**
1. 사이트 생성 후 **"Site settings"** 클릭
2. 왼쪽 메뉴 **"Environment variables"** 클릭
3. **"Add a variable"** 버튼 클릭

**추가할 변수:**
```
Key: VITE_SUPABASE_URL
Value: https://hrwvtwrxghmrfsahmfll.supabase.co
Scopes: [✓] Production [✓] Deploy previews [✓] Branch deploys

Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhyd3Z0d3J4Z2htcmZzYWhtZmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzg1MTUsImV4cCI6MjA3OTYxNDUxNX0.bZ5jr9ab7ti4XrUW-jyNCJMzstXl3-t7JBKtHfH5Q40
Scopes: [✓] Production [✓] Deploy previews [✓] Branch deploys
```

### Step 6: 배포 시작
1. **"Deploy site"** 버튼 클릭
2. 배포 진행 상황 확인 (약 2-3분 소요)
3. 완료되면 사이트 URL 생성됨

---

## 🎯 자동 배포 동작 방식

### 코드 수정 → 자동 배포 흐름

```bash
# 1. 프로젝트 선택 및 코드 수정
cd lecture1/mini_sns/src/pages
# Login.jsx 파일 수정...

# 2. 변경사항 확인
cd ../../..  # 루트 디렉토리로 이동
git status

# 3. Git에 커밋
git add lecture1/mini_sns/
git commit -m "mini_sns: 로그인 UI 개선"

# 4. GitHub에 푸시
git push origin main

# 5. 자동으로 Netlify가 감지하고 배포 시작! 🎉
```

**Netlify가 자동으로:**
1. ✅ GitHub에서 새 커밋 감지 (Webhook)
2. ✅ 변경된 파일 경로 확인 (`lecture1/mini_sns`)
3. ✅ mini_sns 사이트만 재빌드
4. ✅ 자동 배포 완료

**다른 프로젝트는 영향 없음!**

---

## 🔍 Netlify가 프로젝트를 구분하는 방법

### Base Directory 기반 분리 배포

```
GitHub 저장소 (Kyo1901/Portfolio-sample)
├── lecture1/
│   ├── mini_sns/          ─▶ Netlify Site A
│   ├── my-portfolio/      ─▶ Netlify Site B
│   ├── my-community/      ─▶ Netlify Site C
│   ├── my-react-app/      ─▶ Netlify Site D
│   └── ui_test/           ─▶ Netlify Site E
```

**동작 원리:**
- 각 Netlify 사이트는 **Base Directory**를 감시
- 해당 디렉토리 내 파일이 변경되면 **해당 사이트만 재배포**
- 다른 디렉토리 변경은 무시

**예시:**
```bash
# mini_sns만 수정
git add lecture1/mini_sns/
git commit -m "mini_sns 업데이트"
git push

→ Netlify: mini_sns 사이트만 재배포 ✅
→ 다른 4개 사이트는 재배포 안 됨 ⏸️
```

---

## 💡 자주 묻는 질문 (FAQ)

### Q1. 모든 프로젝트를 한 번에 배포할 수 있나요?
**A:** 아니요. 각 프로젝트마다 별도의 Netlify 사이트를 만들어야 합니다.
- 이유: 각 프로젝트가 독립적인 URL과 배포 설정을 가지기 때문
- 총 5개 프로젝트 = 5개 Netlify 사이트 필요

### Q2. 하나의 프로젝트를 수정하면 다른 프로젝트도 재배포되나요?
**A:** 아니요. Base Directory 설정으로 변경된 프로젝트만 재배포됩니다.

### Q3. 환경변수는 어디에 설정하나요?
**A:** Netlify 사이트 설정에서:
- Site settings → Environment variables → Add a variable
- `.env` 파일은 Git에 올라가지 않으므로 Netlify에 직접 설정 필요

### Q4. 배포 실패 시 어떻게 하나요?
**A:** Netlify 배포 로그 확인:
1. Netlify 사이트 → Deploys 탭
2. 실패한 배포 클릭
3. Deploy log 확인
4. 오류 메시지 해결 후 다시 푸시

### Q5. Base Directory를 잘못 설정했어요!
**A:** Netlify 사이트 설정에서 수정:
1. Site settings → Build & deploy → Build settings
2. Base directory 수정
3. Save → Trigger deploy

---

## 🛠️ 문제 해결

### 문제 1: 빌드 실패 - "Cannot find module"
**원인:** node_modules가 설치되지 않음
**해결:**
```bash
cd lecture1/프로젝트명
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### 문제 2: 환경변수가 작동하지 않음
**원인:** 환경변수 이름 오타 또는 미설정
**해결:**
1. Netlify Site settings → Environment variables 확인
2. 변수 이름이 정확히 `VITE_`로 시작하는지 확인
3. 수정 후 **Trigger deploy** 클릭

### 문제 3: 404 페이지 에러 (React Router)
**원인:** netlify.toml의 redirect 설정 누락
**해결:** netlify.toml 파일 확인
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 문제 4: Supabase 연결 실패
**원인:** 환경변수 미설정 또는 잘못된 값
**해결:**
1. 콘솔에서 에러 메시지 확인
2. Netlify 환경변수 재확인
3. Supabase URL과 Key 정확성 확인

---

## 📊 배포 체크리스트

### 배포 전 확인사항
- [ ] 로컬에서 `npm run build` 성공
- [ ] netlify.toml 파일 존재
- [ ] package.json에 build 스크립트 있음
- [ ] .gitignore에 node_modules, dist, .env 포함
- [ ] GitHub에 최신 코드 푸시됨

### Netlify 설정 확인사항
- [ ] Base directory 정확히 입력
- [ ] Build command: `npm run build`
- [ ] Publish directory: `프로젝트명/dist`
- [ ] 환경변수 설정 (Supabase 프로젝트만)
- [ ] Branch: main

### 배포 후 확인사항
- [ ] 배포 성공 (초록색 체크)
- [ ] 사이트 URL 접속 가능
- [ ] 페이지 정상 작동
- [ ] 라우팅 작동 (React Router)
- [ ] API 연결 정상 (Supabase)

---

## 🎓 추가 학습 자료

### Netlify 공식 문서
- [Monorepo 배포 가이드](https://docs.netlify.com/configure-builds/monorepos/)
- [환경변수 설정](https://docs.netlify.com/environment-variables/overview/)
- [빌드 설정](https://docs.netlify.com/configure-builds/overview/)

### Git & GitHub
- [Git 기본 명령어](https://git-scm.com/docs)
- [GitHub Workflow](https://guides.github.com/introduction/flow/)

---

## 📝 버전 히스토리

| 버전 | 날짜 | 작성자 | 변경사항 |
|------|------|--------|----------|
| 1.0 | 2025-01-25 | 로키 | 초안 작성 |

---

<div align="center">

**🚀 lecture1 프로젝트 자동 배포 가이드**

*Made with ❤️ by 로키*

모든 프로젝트가 자동 배포되는 그날까지! 🎉

</div>
