# CLAUDE.md

전혜림 자기소개·포트폴리오 홈페이지를 **React로 개발**하기 위한 프로젝트 가이드입니다.
Claude Code는 이 문서의 지침을 우선적으로 따릅니다.

## 두 개의 단일 출처(SSOT)

이 프로젝트는 **콘텐츠**와 **디자인/구조**의 출처를 분리한다.

| 무엇을 | 어디서 | 규칙 |
|--------|--------|------|
| **콘텐츠** (문구·프로젝트·성과 수치·연락처·이력) | **[prd.md](prd.md)** | 사실을 임의로 지어내지 않는다. 반드시 PRD 근거. |
| **디자인·애니메이션·홈페이지 구조(틀)** | **[design-ex.md](design-ex.md)** | 비주얼 언어, 모션, 섹션 구성은 이 스펙을 따른다. |

> 핵심: **"design-ex.md의 껍데기(디자인/모션/구조)에 prd.md의 알맹이(전혜림의 실제 내용)를 담는다."**
> design-ex.md의 예시 텍스트("Jack", 3D creator, Services 문구 등)와 외부 더미 이미지 URL은 **전혜림의 실제 콘텐츠·자산으로 반드시 교체**한다.

## 프로젝트 개요

채용 담당자가 **3분 이내**에 지원자의 핵심 역량·대표 프로젝트·연락처를 파악할 수 있는
싱글 페이지 포트폴리오. design-ex.md의 다크 테마·대형 그라디언트 타이포·스크롤 기반 모션으로
프론트엔드 감각과 디테일을 함께 전달한다. 언어는 **한국어 단일**.

## 기술 스택 (design-ex.md 기준 — 확정)

- **빌드/프레임워크**: Vite + React
- **언어**: TypeScript
- **스타일**: **Tailwind CSS v3** (design-ex.md 지정). CSS Modules 아님.
- **애니메이션**: **Framer Motion** (진입 FadeIn, 스크롤 기반 변형, 캐릭터 리빌, sticky 스택 카드)
- **아이콘**: **Lucide React**
- **폰트**: 대형 영문 디스플레이·숫자는 **Kanit**(Google Fonts, 300–900), 한글 본문은 **Pretendard**.
  - 한글은 Kanit에 글리프가 없으므로 Pretendard로 렌더한다. 대형 섹션 라벨 등 영문 장식 텍스트에만 Kanit(`font-display`) 사용.
- **배포**: GitHub Pages 또는 Vercel (저장소 `JeonHyerim86/portfolio`). Vite `base`는 정적 호스팅 겸용으로 `'./'`.

## 디자인 시스템 (design-ex.md 요약)

- **배경**: `#0C0C0C` (다크). Services 섹션만 화이트 `#FFFFFF` + 상단 라운드.
- **그라디언트 헤딩** `.hero-heading`: `linear-gradient(180deg, #646973 0%, #BBCCD7 100%)` + `background-clip: text` (투명 텍스트). font-black, uppercase, tracking-tight, leading-none. `clamp()`로 유동 크기.
- **본문 텍스트 컬러**: `#D7E2EA`.
- **포인트(액션) 그라디언트** (ContactButton): `linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)` + inset shadow + 흰색 2px outline.
- **고스트 버튼**(LiveProject 류): 투명 배경 + `border-2 #D7E2EA` + hover 시 `bg-#D7E2EA/10`.
- **라운드**: 카드·섹션 상단은 `rounded-[40px] sm:[50px] md:[60px]` 스케일.
- **반응형**: Tailwind 기본 브레이크포인트(sm 640 / md 768 / lg 1024), 모바일 퍼스트, `clamp()` 유동 타이포.

## 섹션 구조 & 매핑 (design-ex 틀 → 전혜림 콘텐츠)

design-ex.md의 섹션 순서를 유지하되 내용을 PRD로 채운다.

| # | design-ex 섹션 | 전혜림 매핑 | 콘텐츠 출처(PRD) |
|---|----------------|-------------|------------------|
| 1 | HeroSection | **홈** — 상단 중앙 대형 헤딩("HI, I'M HYERIM") + 태그라인("Backend Developer"), 그 아래 마그네틱 캐릭터(커서 추종), 하단 좌 슬로건·키워드 / 우 "Contact me" CTA | §6.1 |
| 2 | MarqueeSection | 스크롤 연동 마퀴 — 프로젝트 스크린샷/기술 키워드 타일 (더미 GIF 대체) | §6.2 자산 |
| 3 | AboutSection | **자기소개** — 개발 철학 캐릭터 리빌 텍스트 + 학력/수상/자격증 카드 + 스킬 배지 | §6.3 |
| 4 | ServicesSection | **핵심 역량 (Expertise)** — 5개 번호 리스트 (화이트 섹션) | §6.3 핵심 역량 5개 |
| 5 | ProjectsSection | **포트폴리오** — sticky 스택 카드 (실제 프로젝트 4개, 다음 카드가 위로 쌓이고 뒤 카드는 축소) | §6.2 표 |
| + | (신규) ContactSection | **연락처** — 이메일(mailto+복사)·GitHub. 전화 비공개 | §6.4 |

- 상단 고정 nav 링크는 한국어: 자기소개 / 역량 / 포트폴리오 / 연락처 (스크롤 스파이 + 스무스 스크롤). **모바일에서도 4개 링크를 인라인 표시**(축약, 햄버거 없음). 브랜드는 "전혜림".
- 히어로 대형 헤딩/태그라인은 영문 디스플레이("HI, I'M HYERIM" / "Backend Developer")로 처리. 프로필 이름 "전혜림"(`profile.name`)은 nav 브랜드·이미지 alt·카피라이트에 사용하고, 히어로 표시 문구는 `profile.heroHeading`/`heroTagline` 필드로 분리.
- ServicesSection의 5개 항목 = PRD §6.3 핵심 역량: ①백엔드 성능 최적화 ②백엔드 설계·구현 주도 ③문서화·협업 ④폭넓은 언어 경험 ⑤클라우드·데이터.
- 포트폴리오 4개: ①크라우드펀딩 E-commerce ②재가요양 인력배정(해커톤 최우수상) ③주식 트렌드 대시보드 ④AI 스피어피싱 탐지(캡스톤).

## 재사용 컴포넌트 (design-ex.md)

`FadeIn`(whileInView 진입, easing `[0.25,0.1,0.25,1]`), `Magnet`(커서 추종 자석), `AnimatedText`(스크롤 캐릭터 리빌), `ContactButton`(포인트 그라디언트 필, uppercase), `GhostButton`(고스트 필), `Marquee`(스크롤 연동 가로 스크롤).

- `Magnet`은 Framer Motion `useMotionValue` + `useSpring` 기반으로 커서를 **부드럽게(관성)** 추종한다. `padding`(반응 반경)·`strength`(이동 감쇠)·`maxOffsetX`/`maxOffsetY`(가로/세로 최대 이동)로 조절하며, 히어로 캐릭터는 가로로 넓게 추종하도록 `maxOffsetX`를 크게 둔다. 센터링(`-translate-x/y`)과 충돌하지 않도록 **위치는 래퍼가, 추종 transform은 Magnet이** 담당한다.
- 포트폴리오 sticky 스택은 각 카드를 `sticky`로 조금씩 낮은 `top`에 고정 + 섹션 스크롤 진행도로 뒤 카드 `scale` 축소.

## 프로젝트 구조 (목표)

```
index.html          # Vite 진입, meta/OG, 폰트 link
src/
  components/        # FadeIn, Magnet, AnimatedText, ContactButton, GhostButton, Marquee, Navbar
  sections/          # Hero, Marquee, About, Expertise, Projects, Contact
  data/              # PRD 기반 콘텐츠 (profile, projects, expertise, contact)
  styles/index.css   # Tailwind directives + 전역(.hero-heading 등)
  App.tsx / main.tsx
public/              # 최적화 이미지 (portrait, project screenshots)
```

- 반복 콘텐츠(프로젝트·역량 등)는 `src/data/`로 분리해 map 렌더링. 컴포넌트에 하드코딩하지 않는다.

## 자산(이미지) 처리

- `ref/`는 **로컬 전용 참고 자산**(`.gitignore`). 커밋하지 않는다. 원본: `3d-profile.png`·`hyerim.png`·`profile.png`(프로필 후보), `이커머스(1~4)`, `해커톤(1~3)`, `de(1~2)`, `wanted-portfolio.pdf`.
- 실제 사용 이미지는 모두 **`public/`**에 둔다: `3d-profile.png`(히어로 캐릭터, 투명 컷아웃), `og-profile.png`(공유용), `ecommerce-1~4`, `hackathon-1~3`, `dashboard-1~2`.
- **프로필 캐릭터**는 `ref/3d-profile.png`(검정 배경 3D 아바타)의 배경을 **테두리 연결 flood-fill로 투명 처리**해 `public/3d-profile.png`(히어로 투명 컷아웃)와 `public/og-profile.png`(다크 합성)로 만들었다. 이 컷아웃은 **다크 배경 전용**으로 최적화됨(밝은 배경에선 머리카락 부분에 구멍이 보일 수 있음).
- 이미지 편집 시 **원본과 비교 검증**하고 배경 제거는 **테두리 연결 영역만** 처리한다(과거 인물 사진 손상 이력).
- 새 이미지는 `public/`으로 복사(필요 시 WebP·리사이즈)해 관리한다. design-ex.md의 외부 URL(figma/motionsites/cloudfront)은 데모용이므로 **사용하지 않고 실제 자산으로 대체**한다.

## 명령어

```bash
npm install       # 의존성 설치
npm run dev       # 개발 서버
npm run build     # 프로덕션 빌드 (tsc --noEmit 타입체크 + vite build)
npm run preview   # 빌드 결과 로컬 프리뷰
```

## 핵심 요구사항 (PRD §7·§8 — 반드시 준수)

- **접근성(A11y)**: 시맨틱 마크업, 키보드 내비게이션, 색 대비 WCAG AA, 모든 이미지 `alt`.
- **모션**: `prefers-reduced-motion` 존중(Framer Motion `useReducedMotion`로 모션 최소화), 60fps 목표, `transform`/`opacity` 기반 GPU 가속.
- **모바일/터치**: Magnet 등 포인터 기반 효과는 터치·모바일에서 비활성화(design-ex 원칙과 동일).
- **성능**: LCP ≤ 2.5s, 이미지 lazy load, 마퀴는 `willChange: transform` + passive 스크롤 리스너.
- **반응형**: 모바일(≤768px)·태블릿·데스크톱. nav는 모바일에서 축약/햄버거.
- **SEO/공유**: title·description 메타, Open Graph(프로필 썸네일).

## 컨벤션

- UI 노출 텍스트는 **한국어**(대형 영문 디스플레이 라벨은 장식 목적 허용). 코드·주석은 기존 스타일 준수.
- 컴포넌트 파일 PascalCase, 훅 `useXxx`.
- 성과 수치(예: TPS 50%↑)는 시각적으로 강조하되 PRD 근거와 함께 표기.
- 연락처: 이메일 `jshsn0806@naver.com`(mailto + 복사 버튼), GitHub `https://github.com/JeonHyerim86`(새 탭). **전화번호 노출 금지.**

## 마이그레이션 컨텍스트

- `main` / `01-prd`: 정적 HTML/CSS/JS 버전(`index.html`, `assets/`). git에 보존됨.
- **`02-use-react`(현재 브랜치): design-ex.md 디자인 시스템으로 React 재구현.**
- 루트 `index.html`은 Vite(React) 진입점으로 교체됨. 구 정적 자산(`assets/css`·`assets/js`·`assets/img`)은 React 이식 완료 후 **삭제**했다(정적 버전은 `main`/`01-prd` 브랜치와 git 이력에 보존).

## 작업 방식

- **git 브랜치는 사용자가 직접 관리**한다 — 브랜치 생성/전환/삭제를 임의로 하지 않는다.
- 커밋/푸시는 사용자가 요청할 때만.
- 되돌리기 어렵거나 외부로 나가는 작업(대량 삭제·배포 등)은 먼저 확인.
