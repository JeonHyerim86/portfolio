// 콘텐츠 출처(SSOT): prd.md §6.1 / §6.3
export interface HighlightGroup {
  icon: string // 카드 라벨 앞 이모지 (학력/수상/자격증 구분용)
  label: string
  items: string[]
}

export const profile = {
  name: '전혜림', // 네비 브랜드 · 이미지 alt · 카피라이트 등에서 사용
  heroHeading: "HI, I'M HYERIM", // 히어로 대형 헤딩 (영문 디스플레이)
  heroTagline: 'Backend Developer', // 히어로 헤딩 하단 라벨
  slogan: '서비스의 겉보다 속을, 더 좋은 서비스를 위해 고민하는 개발자',
  keywords: ['Spring Boot', '백엔드 성능 최적화', '데이터 파이프라인', 'Docker/CI·CD'],
  portrait: './3d-profile.png',
  // 개발 철학 / 소개문 (PRD §6.3 소개문 · 슬로건 · 핵심 역량 기반)
  intro:
    '겉으로 보이는 기능보다, 그 안에서 서비스를 단단하게 만드는 일에 집중합니다. Spring Boot 기반의 백엔드 성능 개선과 모니터링, ERD 설계부터 핵심 서비스 구현까지 백엔드 전반을 주도해 왔습니다. 더 좋은 서비스를 위해 끊임없이 고민하는 개발자입니다.',
  skills: ['Java', 'Spring Boot', 'Python', 'MySQL', 'Git', 'RESTful API', 'Docker'],
  highlights: [
    {
      icon: '🎓',
      label: '학력',
      items: ['광운대학교 컴퓨터정보공학부', '정보통신학전공', '2020.03 – 2025.02 졸업'],
    },
    { icon: '🏆', label: '수상', items: ['제7회 KDT 해커톤 최우수상 (2025.09)'] },
    { icon: '📜', label: '자격증', items: ['정보처리기사 (2025.09)', 'SQLD (2025.04)', 'ADsP (2025.11)'] },
  ] as HighlightGroup[],
}
