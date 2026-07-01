// 콘텐츠 출처(SSOT): prd.md §6.2 포트폴리오 표
export interface Project {
  number: string
  name: string
  category: string
  period: string
  summary: string
  highlights: string[]
  tech: string[]
  images: string[]
  alt: string
  link?: string
}

export const projects: Project[] = [
  {
    number: '01',
    name: '크라우드 펀딩 E-commerce 플랫폼',
    category: 'goorm PROFECT 2기',
    period: '2025.04 – 2025.06',
    summary:
      '크라우드 펀딩형 이커머스 플랫폼의 백엔드 성능 최적화와 실시간 알림 처리를 담당했습니다.',
    highlights: ['실시간 알림 처리량 250%↑', 'CPU 12%↓', 'TPS 50%↑'],
    tech: ['Java', 'Spring Boot', 'MySQL', 'QueryDSL', 'FCM', 'JMeter', 'GitHub Actions'],
    images: ['./ecommerce-1.png', './ecommerce-2.png', './ecommerce-3.png'],
    alt: '크라우드 펀딩 E-commerce 플랫폼 화면',
  },
  {
    number: '02',
    name: '재가요양 자동 인력 배정 플랫폼',
    category: '제7회 KDT 해커톤 · 최우수상',
    period: '2025.06 – 2025.09',
    summary:
      '현장 인터뷰 기반 설계로 확장 가능한 ERD를 구축한 재가요양 인력 자동 배정 플랫폼입니다.',
    highlights: ['심사 최우수상 수상', '확장 가능한 ERD 설계'],
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    images: ['./hackathon-1.png', './hackathon-2.png', './hackathon-3.png'],
    alt: '재가요양 자동 인력 배정 플랫폼 화면',
  },
  {
    number: '03',
    name: '주식 시장 트렌드 분석 대시보드',
    category: 'Data Engineering',
    period: '2024.12 – 2025.01',
    summary:
      'Airflow 기반으로 수집→정제→적재를 자동화하고 일 단위 키워드 리포트를 제공하는 대시보드입니다.',
    highlights: ['수집→정제→적재 자동화', '일 단위 키워드 리포트'],
    tech: ['Python', 'Airflow', 'Docker', 'AWS (EC2·S3·Redshift)', 'Superset'],
    images: ['./dashboard-1.jpg', './dashboard-2.png'],
    alt: '주식 시장 트렌드 분석 대시보드 화면',
  },
  {
    number: '04',
    name: 'AI 스피어피싱 메일 탐지',
    category: '대학 캡스톤',
    period: '2022.07 – 2023.02',
    summary:
      'BERT와 Decision Tree를 활용해 스피어피싱 메일을 탐지하고, 데이터 전처리 파이프라인을 자동화했습니다.',
    highlights: ['탐지 정확도 약 91.34%', '전처리 파이프라인 자동화'],
    tech: ['Python', 'BERT', 'Decision Tree', '데이터 크롤링·전처리'],
    images: [],
    alt: 'AI 스피어피싱 메일 탐지 프로젝트',
  },
]
