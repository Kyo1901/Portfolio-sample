# AI VIBE WEB SAMPLE

포트폴리오 프로젝트 모음집

## 📁 프로젝트 구조

```
my_ai_web/
├── lecture1/
│   └── my-community/    # React + Supabase 커뮤니티 앱
├── .mcp.json           # MCP 서버 설정 (로컬 전용, Git 제외)
└── .mcp.json.example   # MCP 설정 템플릿
```

## 🚀 시작하기

### 1. 프로젝트 클론

```bash
git clone https://github.com/Kyo1901/Portfolio-sample.git
cd my_ai_web
```

### 2. MCP 설정 (필수)

이 프로젝트는 **Netlify**와 **Supabase** MCP 서버를 사용합니다.

#### 2-1. `.mcp.json` 파일 생성

```bash
# .mcp.json.example을 복사하여 .mcp.json 생성
copy .mcp.json.example .mcp.json
```

#### 2-2. API 토큰 발급 및 설정

**Netlify 토큰 발급:**
1. [Netlify](https://app.netlify.com) 로그인
2. User Settings → Applications → Personal access tokens
3. "New access token" 클릭
4. 생성된 토큰을 `.mcp.json`의 `NETLIFY_PERSONAL_ACCESS_TOKEN`에 입력

**Supabase 토큰 발급:**
1. [Supabase](https://supabase.com) 로그인
2. Account Settings → Access Tokens
3. "Generate new token" 클릭
4. 생성된 토큰을 `.mcp.json`의 `SUPABASE_ACCESS_TOKEN`에 입력
5. 프로젝트 대시보드에서 Project Settings → General → Reference ID 복사
6. `.mcp.json`의 `--project-ref=` 뒤에 입력

#### 2-3. `.mcp.json` 파일 예시

```json
{
  "mcpServers": {
    "netlify": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@netlify/mcp"],
      "env": {
        "NETLIFY_PERSONAL_ACCESS_TOKEN": "nfp_xxxxxxxxxx"
      }
    },
    "supabase": {
      "type": "stdio",
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--project-ref=your-project-ref"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "sbp_xxxxxxxxxx"
      }
    }
  }
}
```

### 3. Claude Code에서 MCP 서버 활성화

`.claude/settings.local.json`에서 MCP 서버를 활성화합니다:

```json
{
  "enabledMcpjsonServers": ["netlify", "supabase"]
}
```

## ⚠️ 보안 주의사항

- **절대로 `.mcp.json` 파일을 Git에 커밋하지 마세요!**
- 이미 `.gitignore`에 추가되어 있습니다
- API 토큰이 노출되면 즉시 재발급하세요

## 🛠️ 개별 프로젝트

### lecture1/my-community

React + Supabase 기반 커뮤니티 게시판 앱

자세한 내용은 [lecture1/my-community/README.md](./lecture1/my-community/README.md) 참조

## 📝 라이선스

MIT License
