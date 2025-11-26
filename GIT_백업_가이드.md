# Git 백업 가이드

## 📚 Git 기본 개념

Git은 프로젝트의 변경 이력을 관리하는 버전 관리 시스템입니다.
- **로컬 저장소**: 내 컴퓨터에 있는 프로젝트
- **원격 저장소**: GitHub/GitLab 등에 있는 프로젝트 (백업 및 공유용)

---

## 🔄 Git 백업 기본 3단계

### 1단계: 변경사항 확인
```bash
git status
```
**설명**: 현재 수정된 파일들을 확인합니다.
- 빨간색: 아직 스테이징되지 않은 변경사항
- 초록색: 커밋 준비가 된 변경사항

---

### 2단계: 변경사항 스테이징 (커밋 준비)

#### 방법 1: 모든 파일 추가
```bash
git add .
```
**설명**: 현재 디렉토리의 모든 변경사항을 커밋 준비 상태로 만듭니다.

#### 방법 2: 특정 파일만 추가
```bash
git add 파일명
```
**예시**:
```bash
git add src/App.jsx
git add src/components/Header.jsx
```

---

### 3단계: 커밋 (변경사항 저장)
```bash
git commit -m "커밋 메시지"
```
**설명**: 스테이징된 변경사항을 로컬 저장소에 저장합니다.

**커밋 메시지 작성 팁**:
- 무엇을 변경했는지 명확하게 작성
- 한글 또는 영어 모두 가능
- 예시: "로그인 기능 추가", "버그 수정: 회원가입 오류"

---

### 4단계: 원격 저장소에 백업 (Push)
```bash
git push origin main
```
**설명**: 로컬의 커밋들을 GitHub 등의 원격 저장소에 업로드합니다.
- `origin`: 원격 저장소의 기본 이름
- `main`: 기본 브랜치 이름 (프로젝트에 따라 `master`일 수도 있음)

---

## 📋 전체 과정 한 번에 실행

```bash
# 1. 현재 상태 확인
git status

# 2. 모든 변경사항 추가
git add .

# 3. 커밋
git commit -m "프로젝트 변경사항 백업"

# 4. 원격 저장소에 업로드
git push origin main
```

---

## 🔍 유용한 추가 명령어

### 변경사항 자세히 보기
```bash
git diff
```
**설명**: 수정된 내용을 라인별로 확인할 수 있습니다.

### 커밋 히스토리 보기
```bash
git log
```
**설명**: 이전 커밋들의 목록을 확인합니다.
- `q` 키를 눌러 종료

### 간단한 로그 보기
```bash
git log --oneline
```

### 원격 저장소 최신 상태 가져오기
```bash
git pull origin main
```
**설명**: 다른 곳(다른 PC, 팀원)에서 작업한 내용을 내 로컬로 가져옵니다.

---

## ⚠️ 주의사항

### 1. 커밋하면 안 되는 파일들
다음 파일들은 `.gitignore`에 추가하여 커밋하지 않도록 합니다:
- `node_modules/` - 패키지 설치 폴더 (용량이 너무 큼)
- `.env` - 환경 변수 (API 키 등 민감한 정보)
- `dist/`, `build/` - 빌드 결과물
- `.vscode/` - 에디터 설정 파일

### 2. 커밋 전 확인사항
- [ ] 코드가 정상 작동하는지 확인
- [ ] 불필요한 console.log 제거
- [ ] 주석 처리된 불필요한 코드 정리

### 3. 충돌(Conflict) 발생 시
```bash
# pull 시 충돌이 발생하면
git pull origin main

# 충돌 파일을 수동으로 수정한 후
git add .
git commit -m "충돌 해결"
git push origin main
```

---

## 🎯 실전 시나리오

### 시나리오 1: 새 기능 추가 후 백업
```bash
# 1. 작업한 내용 확인
git status

# 2. 모든 파일 추가
git add .

# 3. 커밋 (의미있는 메시지 작성)
git commit -m "사용자 프로필 기능 추가"

# 4. 원격 저장소에 업로드
git push origin main
```

### 시나리오 2: 특정 파일만 백업
```bash
# 1. 특정 파일만 추가
git add src/components/Profile.jsx
git add src/styles/profile.css

# 2. 커밋
git commit -m "프로필 UI 개선"

# 3. 푸시
git push origin main
```

### 시나리오 3: 급한 버그 수정
```bash
# 1. 최신 코드 가져오기
git pull origin main

# 2. 버그 수정 후
git add .
git commit -m "긴급 수정: 로그인 버그 해결"
git push origin main
```

---

## 🆘 문제 해결

### "Please commit your changes or stash them" 오류
```bash
# 현재 작업 임시 저장
git stash

# 원격 저장소에서 최신 코드 가져오기
git pull origin main

# 임시 저장한 작업 복원
git stash pop
```

### "Your branch is ahead of 'origin/main'" 메시지
```bash
# 로컬 커밋이 원격보다 앞서 있다는 의미
# 푸시하면 해결됩니다
git push origin main
```

### 마지막 커밋 메시지 수정
```bash
git commit --amend -m "새로운 커밋 메시지"
```

---

## 📱 GUI 도구 추천

명령어가 어렵다면 GUI 프로그램을 사용해보세요:
1. **GitHub Desktop** - 초보자에게 가장 추천
2. **GitKraken** - 시각적으로 이쁨
3. **Sourcetree** - 기능이 많음
4. **VS Code 내장 Git** - 에디터에서 바로 사용

---

## ✅ 백업 체크리스트

매번 백업할 때 확인하세요:
- [ ] `git status`로 변경사항 확인
- [ ] 민감한 정보(.env 등)가 포함되지 않았는지 확인
- [ ] 의미있는 커밋 메시지 작성
- [ ] 코드가 정상 작동하는지 테스트
- [ ] `git push`로 원격 저장소에 업로드

---

## 💡 팁

1. **자주 커밋하세요**: 작은 단위로 자주 커밋하는 것이 좋습니다.
2. **의미있는 메시지**: "수정", "업데이트" 같은 모호한 메시지 대신 구체적으로 작성하세요.
3. **하루 마무리**: 작업을 마칠 때는 꼭 push까지 완료하세요.
4. **브랜치 활용**: 새로운 기능은 별도 브랜치에서 작업하면 안전합니다.

```bash
# 새 브랜치 만들고 이동
git checkout -b feature/new-feature

# 작업 후 메인에 합치기
git checkout main
git merge feature/new-feature
```

---

**작성일**: 2025-11-26
**버전**: 1.0
