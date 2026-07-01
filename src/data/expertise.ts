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
      'Spring Boot 기반 서비스의 성능 개선과 모니터링을 담당합니다. 실시간 알림 처리량과 TPS를 끌어올린 경험이 있습니다.',
  },
  {
    number: '02',
    name: '백엔드 설계·구현 주도',
    description:
      'ERD 설계부터 핵심 서비스 구현까지, 백엔드 전반을 주도적으로 이끌어 온 경험을 갖췄습니다.',
  },
  {
    number: '03',
    name: '문서화·협업',
    description: 'Swagger와 Notion 기반 문서화로 팀의 협업 효율을 높입니다.',
  },
  {
    number: '04',
    name: '폭넓은 언어 경험',
    description:
      'Java·Python·C·C++ 등 다양한 언어 경험으로 새로운 기술 스택도 빠르게 습득합니다.',
  },
  {
    number: '05',
    name: '클라우드·데이터',
    description:
      'AWS·Airflow·Docker를 활용한 데이터 파이프라인과 클라우드 운영 경험을 갖췄습니다.',
  },
]
