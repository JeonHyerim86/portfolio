# Jeon Hyerim's Portfolio
 
> 서비스의 겉보다 속을, 더 좋은 서비스를 위해 고민하는 개발자
 
채용 담당자가 **3분 이내**에 핵심 역량·대표 프로젝트·연락처를 파악할 수 있도록 설계한 싱글 페이지 포트폴리오입니다.
다크 테마와 대형 그라디언트 타이포, 스크롤 기반 모션으로 백엔드 역량과 함께 프론트엔드 디테일 감각을 전달합니다.
 
**🔗 Live Demo — [portfolio-hrjeon.vercel.app](portfolio-nine-fawn-n9etd0dwhh.vercel.app)**
 

## 🛠 기술 스택
 
 분류 | 기술 |
|------|------|
| 프레임워크 | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| 스타일 · 애니메이션 | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) |
| 아이콘 · 폰트 | ![Lucide](https://img.shields.io/badge/Lucide_React-F43F5E?style=flat-square&logoColor=white) ![Pretendard](https://img.shields.io/badge/Pretendard-333333?style=flat-square&logo=google-fonts&logoColor=white) ![Kanit](https://img.shields.io/badge/Kanit-555555?style=flat-square&logo=google-fonts&logoColor=white) |


## ✨ 주요 기능
 
| 섹션 | 설명 |
|------|------|
| 히어로 | 대형 그라디언트 헤딩 + 커서를 따라오는 마그네틱 3D 캐릭터 |
| 마퀴 | 스크롤에 연동돼 반대 방향으로 흐르는 프로젝트 스크린샷 · 기술 타일 |
| 자기소개 | 글자가 한 자씩 드러나는 스크롤 애니메이션 + 학력 · 수상 · 자격증 · 스킬 배지 |
| 핵심 역량 | 화이트 섹션에 번호형 리스트로 정리한 5가지 전문 역량 |
| 포트폴리오 | 스크롤 시 카드가 위로 쌓이는 sticky 스택 애니메이션 (대표 프로젝트 4개) |
| 연락처 | 이메일(mailto · 복사 버튼) · GitHub 링크 |
| 공통 | 스크롤 스파이 고정 nav · 스무스 스크롤 · 반응형 · `prefers-reduced-motion` · Open Graph 메타 |


## 🚀 시작하기
 
> Node.js 18+ 권장
 
```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 → http://localhost:5173
npm run build    # 타입체크(tsc --noEmit) + 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 로컬 프리뷰
```


## 📁 프로젝트 구조
 
```
index.html              # Vite 진입점 · meta/OG · 폰트 link
src/
├── components/         # FadeIn · Magnet · AnimatedText · ContactButton · GhostButton · Marquee · Navbar
├── sections/           # Hero · Marquee · About · Expertise · Projects · Contact
├── data/               # 콘텐츠 데이터 (profile · projects · expertise · contact · marquee)
├── styles/index.css    # Tailwind directives + 전역 스타일 (.hero-heading 등)
├── App.tsx
└── main.tsx
public/                 # 이미지 (프로필 캐릭터 · 프로젝트 스크린샷 · OG)
```
 
반복 콘텐츠(프로젝트·역량·연락처 등)는 `src/data/`에 분리해 컴포넌트에서 렌더링합니다.

## 📄 문서 구조
 
이 프로젝트는 **콘텐츠**와 **디자인** 출처를 분리해 관리합니다.
 
| 문서 | 역할 |
|------|------|
| [`prd.md`](prd.md) | 콘텐츠 SSOT — 문구 · 프로젝트 · 성과 · 연락처 · 이력 |
| [`design-ex.md`](design-ex.md) | 디자인 SSOT — 레이아웃 · 애니메이션 · 컴포넌트 구조 |
| [`CLAUDE.md`](CLAUDE.md) | 개발 · 수정 가이드 (AI 코딩 에이전트용) |


## 🌐 배포
  
**Vercel에 배포되어 운영 중입니다 → [portfolio-hrjeon.vercel.app](portfolio-nine-fawn-n9etd0dwhh.vercel.app)**
 
GitHub 저장소(`JeonHyerim86/portfolio`)가 Vercel에 연동되어 있어 `main`에 push하면 자동 배포됩니다.
정적 사이트(`dist/`)로 빌드되고 Vite `base`가 `'./'`로 설정돼 있어 GitHub Pages 등 다른 정적 호스팅에도 별도 설정 없이 배포할 수 있습니다.

