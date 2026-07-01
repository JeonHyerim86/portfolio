# CLAUDE.md

전혜림 자기소개·포트폴리오 홈페이지를 **React로 개발**하기 위한 프로젝트 가이드입니다.
Claude Code는 이 문서의 지침을 우선적으로 따릅니다.

## 프로젝트 개요

채용 담당자가 **3분 이내**에 지원자의 핵심 역량·대표 프로젝트·연락처를 파악할 수 있는
싱글 페이지 포트폴리오 사이트. 절제된 모션(스무스 스크롤, 패럴랙스, 마우스 파티클)으로
프론트엔드 감각과 디테일을 함께 전달한다.

- **콘텐츠·요구사항의 단일 출처(SSOT): [prd.md](prd.md)** — 문구·프로젝트·성과 수치·섹션 구성은 반드시 PRD를 근거로 한다. 임의로 지어내지 않는다.
- 섹션 구성: 홈(`#home`) → 포트폴리오(`#portfolio`) → 자기소개(`#about`) → 연락처(`#contact`)
- 언어: **한국어 단일** (영문 미지원)

## 현재 상태 / 마이그레이션 컨텍스트

- `main` / `01-prd`: 정적 HTML/CSS/JS 버전 (`index.html`, `assets/css/style.css`, `assets/js/main.js`).
- **`02-use-react` (현재 작업 브랜치): 위 정적 버전을 React로 재구현**한다.
- 아직 `package.json`이 없다 — React 프로젝트 스캐폴딩이 첫 작업이다.
- 기존 `index.html` / `style.css` / `main.js`는 **디자인·인터랙션 레퍼런스**로 삼아 컴포넌트로 이식한다 (색상·여백·애니메이션 값이 이미 튜닝되어 있음). 삭제는 이식 완료 후 사용자 확인을 받고 진행한다.

## 기술 스택 (작업 기본값 — 변경 가능)

> PRD §9에서 스택은 "구현 단계 확정"으로 열려 있었다. 아래는 합의 전까지의 **작업 기본값**이며, 사용자가 원하면 조정한다. 스택을 바꾸면 이 문서도 함께 갱신할 것.

- **프레임워크/빌드**: Vite + React
- **언어**: TypeScript
- **스타일**: CSS Modules (기존 `style.css`의 디자인 토큰·애니메이션을 컴포넌트별로 이식)
- **애니메이션**: 진입 모션은 Framer Motion, 스무스 스크롤은 Lenis(또는 CSS `scroll-behavior`), 마우스 파티클은 경량 캔버스 직접 구현 또는 tsParticles
- **배포**: GitHub Pages 또는 Vercel (저장소 `JeonHyerim86/portfolio`)

## 명령어

> 스캐폴딩 전이라 아직 동작하지 않는다. `package.json` 생성 후 실제 스크립트에 맞춰 이 섹션을 갱신할 것.

```bash
npm install       # 의존성 설치
npm run dev       # 개발 서버
npm run build     # 프로덕션 빌드
npm run preview   # 빌드 결과 로컬 프리뷰
npm run lint      # 린트 (설정 시)
```

## 프로젝트 구조 (목표)

```
src/
  components/     # 재사용 UI (Header, Nav, Button, Badge, Card …)
  sections/       # 페이지 섹션 (Hero, Portfolio, About, Contact)
  hooks/          # useScrollSpy, useReducedMotion, useParticles …
  data/           # 프로젝트·스킬 등 콘텐츠 데이터 (PRD 기반, 하드코딩 아닌 데이터화)
  styles/         # 전역 스타일·디자인 토큰(변수)
  App.tsx
  main.tsx
public/           # 최적화된 이미지 등 정적 자산
```

- 포트폴리오·스킬·수상 등 **반복 콘텐츠는 `src/data/`에 데이터로 분리**하고 컴포넌트에서 map 렌더링한다.
- 섹션 컴포넌트는 PRD §6의 섹션과 1:1 대응시킨다.

## 자산(이미지) 처리

- `ref/`는 **로컬 전용 참고 자산**(`.gitignore` 처리). 커밋하지 않는다.
- 실제 사용 이미지는 최적화(WebP 변환·리사이즈) 후 `public/`(또는 `src/assets/`)로 복사해 관리한다.
- 이미지 편집 시: 원본과 비교 검증하고, 배경 제거는 테두리 연결 영역만 처리한다(과거 인물 사진 손상 이력 있음).

## 핵심 요구사항 (PRD §7·§8 요약)

구현 시 반드시 지킨다:

- **접근성(A11y)**: 시맨틱 마크업, 키보드 내비게이션, 색 대비 WCAG AA, 모든 이미지 `alt`.
- **모션**: `prefers-reduced-motion` 존중(모션 최소화 모드), 60fps 목표, `transform`/`opacity` 기반 GPU 가속, 메인 스레드 블로킹 금지.
- **모바일/터치**: 마우스 파티클 등 포인터 기반 효과는 터치·모바일에서 비활성화.
- **성능**: LCP ≤ 2.5s, 이미지 lazy load·최적화.
- **반응형**: 모바일(≤768px)·태블릿·데스크톱 대응, GNB는 모바일에서 햄버거로 전환.
- **SEO/공유**: title·description 메타, Open Graph(프로필 썸네일).
- **스크롤 스파이**: GNB가 현재 섹션을 하이라이트하고, 클릭 시 해당 섹션으로 스무스 스크롤.

## 컨벤션

- UI 노출 텍스트는 **한국어**. 코드·주석·커밋 메시지는 상황에 맞게(기존 코드 스타일 준수).
- 컴포넌트 파일은 PascalCase, 훅은 `useXxx`.
- 성과 수치(예: TPS 50%↑)는 시각적으로 강조하되 근거와 함께 표기(PRD 기준).
- 연락처: 이메일 `jshsn0806@naver.com`(mailto + 복사 버튼), GitHub `https://github.com/JeonHyerim86`(새 탭). **전화번호는 노출 금지.**

## 작업 방식

- **git 브랜치는 사용자가 직접 관리**한다 — 브랜치 생성/전환/삭제를 임의로 하지 않는다.
- 커밋/푸시는 사용자가 요청할 때만 수행한다.
- 되돌리기 어렵거나 외부로 나가는 작업(대량 삭제, 배포 등)은 먼저 확인을 받는다.