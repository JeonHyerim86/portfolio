# 전혜림 · 백엔드 개발자 포트폴리오

채용 담당자가 **3분 이내**에 핵심 역량·대표 프로젝트·연락처를 파악할 수 있도록 만든
싱글 페이지 포트폴리오입니다. 다크 테마와 대형 그라디언트 타이포, 스크롤 기반 모션으로
백엔드 역량과 함께 프론트엔드 디테일 감각을 전달합니다.

> **슬로건** — 서비스의 겉보다 속을, 더 좋은 서비스를 위해 고민하는 개발자

## 기술 스택

- **Vite + React 18 + TypeScript**
- **Tailwind CSS v3** — 스타일
- **Framer Motion** — 진입/스크롤 애니메이션
- **Lucide React** — 아이콘
- **폰트** — Pretendard(한글 본문) · Kanit(영문 대형 디스플레이)

## 주요 기능

- **히어로** — 상단 중앙 대형 그라디언트 헤딩 + 커서를 부드럽게 따라오는 마그네틱 3D 캐릭터
- **마퀴** — 스크롤에 연동돼 반대 방향으로 흐르는 프로젝트 스크린샷 / 기술 스택 타일
- **자기소개** — 스크롤에 따라 글자가 한 자씩 드러나는 소개문 + 학력·수상·자격증 + 스킬 배지
- **핵심 역량(Expertise)** — 화이트 섹션의 5개 번호 리스트
- **포트폴리오** — 스크롤 시 카드가 위로 쌓이는 sticky 스택 애니메이션 (대표 프로젝트 4개)
- **연락처** — 이메일(mailto + 복사 버튼) · GitHub 링크
- **공통** — 상단 고정 nav(스크롤 스파이 + 스무스 스크롤), 반응형, `prefers-reduced-motion` 대응, Open Graph 메타

## 시작하기

```bash
npm install     # 의존성 설치
npm run dev     # 개발 서버 (http://localhost:5173)
npm run build   # 타입체크(tsc --noEmit) + 프로덕션 빌드 → dist/
npm run preview # 빌드 결과 로컬 프리뷰
```

> 요구 사항: Node.js 18+ 권장.

## 프로젝트 구조

```
index.html            # Vite 진입점 · meta/OG · 폰트 link
src/
  components/         # FadeIn, Magnet, AnimatedText, ContactButton, GhostButton, Marquee, Navbar
  sections/          # Hero, Marquee, About, Expertise, Projects, Contact
  data/              # 콘텐츠 데이터 (profile, projects, expertise, contact, marquee)
  styles/index.css   # Tailwind directives + 전역 스타일(.hero-heading 등)
  App.tsx / main.tsx
public/              # 이미지 (프로필 캐릭터, 프로젝트 스크린샷, OG)
```

반복 콘텐츠(프로젝트·역량·연락처 등)는 `src/data/`에 분리해 컴포넌트에서 렌더링합니다.

## 콘텐츠 · 디자인 출처

이 프로젝트는 두 개의 단일 출처(SSOT)를 분리합니다.

| 대상 | 출처 |
|------|------|
| 콘텐츠(문구·프로젝트·성과·연락처·이력) | [`prd.md`](prd.md) |
| 디자인·애니메이션·구조 | [`design-ex.md`](design-ex.md) |

개발/수정 가이드는 [`CLAUDE.md`](CLAUDE.md)를 참고하세요.

## 배포

정적 사이트로 빌드되며(`dist/`), Vite `base`가 `'./'`로 설정돼 있어
**GitHub Pages / Vercel** 등 정적 호스팅에 그대로 올릴 수 있습니다.

