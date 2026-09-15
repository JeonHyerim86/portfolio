// 콘텐츠 출처(SSOT): prd.md §6.3 핵심 역량
// design-ex.md ServicesSection(5개 번호 리스트) 구조에 매핑
export interface ExpertiseItem {
  number: string
  name: string
  description: string
}

export const expertise: ExpertiseItem[] = [
  {
    number: '01',
    name: '백엔드 성능 최적화',
    description:
      'Spring Boot 기반 서비스의 병목을 부하 테스트로 검증하며 개선합니다. 실시간 알림 초당 처리량 250% 향상, CPU 사용률 12% 감소, TPS 50% 향상을 수치로 증명했습니다.',
  },
  {
    number: '02',
    name: '서비스 기획·문제 해결',
    description:
      '현장 인터뷰로 요구사항을 도출하고, 이를 확장 가능한 ERD와 서비스 흐름으로 설계해 구현까지 이어갑니다. 이 접근으로 KDT 해커톤과 블레이버스 MVP 해커톤에서 최우수상을 받았습니다.',
  },
  {
    number: '03',
    name: '인프라·배포 자동화',
    description:
      'AWS EC2·RDS·S3 인프라와 GitHub Actions CI/CD를 직접 구축해, merge 즉시 배포되는 개발 환경을 만듭니다.',
  },
  {
    number: '04',
    name: 'AI 활용 개발',
    description:
      'Claude Code로 기획부터 배포까지 개발 과정을 이끌고, Claude API 기반 LLM 기능을 직접 서비스에 구현합니다.',
  },
  {
    number: '05',
    name: '문서화·협업',
    description:
      'Swagger·Notion 기반 문서화와 브랜치 전략·PR 리뷰로 팀의 협업 효율을 높입니다.',
  },
]
