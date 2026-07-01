// MarqueeSection 타일 — design-ex.md의 더미 GIF/외부 URL을
// 전혜림의 실제 프로젝트 스크린샷 + 기술 스택 키워드로 대체.
export interface MarqueeTile {
  type: 'image' | 'text'
  src?: string
  alt?: string
  label?: string
}

// Row 1: 실제 프로젝트 스크린샷
export const marqueeImages: MarqueeTile[] = [
  { type: 'image', src: './ecommerce-1.png', alt: '크라우드 펀딩 E-commerce 화면 1' },
  { type: 'image', src: './ecommerce-2.png', alt: '크라우드 펀딩 E-commerce 화면 2' },
  { type: 'image', src: './hackathon-1.png', alt: '재가요양 인력 배정 플랫폼 화면 1' },
  { type: 'image', src: './hackathon-2.png', alt: '재가요양 인력 배정 플랫폼 화면 2' },
  { type: 'image', src: './dashboard-1.jpg', alt: '주식 트렌드 대시보드 화면 1' },
  { type: 'image', src: './ecommerce-3.png', alt: '크라우드 펀딩 E-commerce 화면 3' },
  { type: 'image', src: './hackathon-3.png', alt: '재가요양 인력 배정 플랫폼 화면 3' },
]

// Row 2: 기술 스택 키워드 타일
export const marqueeTech: MarqueeTile[] = [
  'Spring Boot',
  'Java',
  'MySQL',
  'QueryDSL',
  'Python',
  'Airflow',
  'Docker',
  'AWS',
  'PostgreSQL',
  'GitHub Actions',
  'RESTful API',
  'Superset',
].map((label) => ({ type: 'text', label }))
