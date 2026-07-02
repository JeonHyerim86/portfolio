// MarqueeSection 타일 — design-ex.md의 더미 GIF/외부 URL을
// 전혜림의 실제 프로젝트 스크린샷으로 대체. 두 행 모두 사진 타일이며,
// 윗줄/아랫줄은 서로 겹치지 않는 서로 다른 사진들로 채운다.
export interface MarqueeTile {
  src: string
  alt: string
}

// Row 1 (윗줄): 5장 — 아랫줄과 겹치지 않음
export const marqueeImages: MarqueeTile[] = [
  { src: './ecommerce-1.png', alt: '크라우드 펀딩 E-commerce 화면 1' },
  { src: './hackathon-1.png', alt: '재가요양 인력 배정 플랫폼 화면 1' },
  { src: './dashboard-1.jpg', alt: '주식 트렌드 대시보드 화면 1' },
  { src: './ecommerce-2.png', alt: '크라우드 펀딩 E-commerce 화면 2' },
  { src: './ecommerce-3.png', alt: '크라우드 펀딩 E-commerce 화면 3' },
]

// Row 2 (아랫줄): 4장 — 윗줄과 겹치지 않음
export const marqueeImages2: MarqueeTile[] = [
  { src: './hackathon-2.png', alt: '재가요양 인력 배정 플랫폼 화면 2' },
  { src: './dashboard-2.png', alt: '주식 트렌드 대시보드 화면 2' },
  { src: './ecommerce-4.png', alt: '크라우드 펀딩 E-commerce 화면 4' },
  { src: './hackathon-3.png', alt: '재가요양 인력 배정 플랫폼 화면 3' },
]
