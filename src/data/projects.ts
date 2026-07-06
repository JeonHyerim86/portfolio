// 콘텐츠 출처(SSOT): prd.md §6.2 포트폴리오 표 + 전혜림_포트폴리오(2)/원티드이력서 PDF
export interface Contribution {
  group: string // 역할 영역 (BackEnd · Infra · Data · Modeling …)
  items: string[]
}

export interface Retrospective {
  tag: string // 회고 태그 (도전 · 문제 해결 · 성장 …)
  body: string
}

// 프로젝트 상세 팝업(ProjectModal) 콘텐츠
export interface ProjectDetail {
  team: string // 인원 구성
  role: string // 내가 맡은 역할 요약
  techStack: string[] // 상세 기술 스택(카드 tech보다 자세히)
  overview: string // 프로젝트 설명
  contributions: Contribution[] // 내 역할 (영역별)
  achievements: string[] // 핵심 성과 (수치 포함)
  retrospective: Retrospective[] // 프로젝트 회고
  // 프로젝트별 GitHub 저장소. 미지정 시 대표 프로필로 폴백.
  repo?: string
}

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
  detail?: ProjectDetail
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
    detail: {
      team: '총 6인 · FE 2 / BE 3 / Infra 1',
      role: 'Backend · Infra',
      repo: 'https://github.com/JeonHyerim86/Athena_Backend',
      techStack: [
        'Java',
        'Spring Boot',
        'MySQL',
        'QueryDSL',
        'JPA',
        'JMeter',
        'IntelliJ Profiler',
        'Signoz',
        'FCM',
        'Docker',
        'GitHub CI/CD',
      ],
      overview:
        'goorm PROFECT 풀스택 개발 2기 과정에서 크라우드 펀딩형 E-commerce 플랫폼을 개발했습니다. ERD 설계부터 상품 도메인 서비스, 이미지 처리, FCM 기반 실시간 알림까지 백엔드 전반을 맡아 구현하고, 실제 WAS 환경에서 부하를 걸어 성능을 개선했습니다.',
      contributions: [
        {
          group: 'Backend',
          items: [
            'ERD 설계 및 핵심 엔티티 도출',
            '상품 서비스 로직 구현',
            '이미지 처리(CRUD·마크다운 이미지 관리) 로직 구현',
            'FCM 실시간 알림 서비스 구현 및 고도화',
            '이미지 처리 서버 분리 아키텍처 개선',
            '핵심 도메인 기준 7만여 개 더미데이터 생성·DB 삽입',
            '백엔드 개발 일정 및 협업 문서 관리',
          ],
        },
        {
          group: 'Infra',
          items: ['GitHub CI/CD 도입 및 개발 환경 자동화 기여'],
        },
      ],
      achievements: [
        '스레드 풀 튜닝 + FCM 전송 비동기·논블로킹 전환으로 실시간 알림 초당 최대 요청 수 250% 증가',
        'CPU 사용률 12% 감소, TPS 50% 향상',
        '실제 WAS 환경에서 JMeter 부하 테스트로 성능 근거 확보',
        'Signoz·JMeter 모니터링 환경 구축으로 병목 지점 식별',
      ],
      retrospective: [
        {
          tag: '성능 최적화',
          body: '스레드 풀 튜닝과 FCM 전송 로직을 비동기·논블로킹으로 전환하며 실시간 알림 초당 최대 요청 수 250% 증가, CPU 12% 감소, TPS 50% 향상을 얻었습니다. 로컬이 아닌 실제 WAS 환경에서 부하를 걸고 수치로 근거를 쌓는 과정이 핵심이었습니다.',
        },
        {
          tag: '문서화 협업',
          body: 'Swagger·Notion으로 API 스펙과 에러 메시지 규칙을 정의해 프론트-백엔드 간 해석 차이를 최소화하고 개발 속도를 높였습니다.',
        },
        {
          tag: 'AI 도구 활용',
          body: 'Gemini·ChatGPT·Grok을 반복 코드 자동완성, 리팩토링 방향 검토, 에러 원인 분석에 활용하며 AI를 실무 개발 흐름에 녹여냈습니다.',
        },
        {
          tag: '아쉬움과 다음 목표',
          body: '다중 알림 발송 지연 문제를 스프링 배치 기반 해결까지 완전히 마무리하지 못했습니다. 다음 기회에는 배치 처리 설계를 초기 단계부터 포함하려 합니다.',
        },
      ],
    },
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
    detail: {
      team: '총 6인 · PM 1 / FE 1 / BE 2 / Infra 1 / AI 1',
      role: 'Backend · Infra',
      repo: 'https://github.com/JeonHyerim86/homecare_BE',
      techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'GitHub CI/CD'],
      overview:
        "제7회 KDT 해커톤에서 '지역 균형 발전'을 주제로, 지방 재가요양 인력 단절 문제를 스케줄 최적화로 해결하는 플랫폼을 기획·개발했습니다. 요양보호사 3인 인터뷰로 수집한 실제 요구사항을 신청→배정→확정→정산 흐름에 반영했습니다.",
      contributions: [
        {
          group: 'Backend',
          items: [
            'ERD 설계 및 핵심 엔티티 도출',
            '센터(대시보드·보호사 등록/조회/말소) 구현',
            '수요자(서비스 신청·일정·메인페이지) 구현',
            '요양보호사(일정 조회) 구현',
            '백엔드–매칭 엔진 연동',
            '백엔드 개발 일정 및 협업 문서 관리',
          ],
        },
        {
          group: 'Infra',
          items: ['GitHub CI/CD 도입 및 개발 환경 자동화 기여'],
        },
      ],
      achievements: [
        '제7회 KDT 해커톤 최우수상 수상',
        '요양보호사 3인 인터뷰로 현장 요구사항을 설계에 반영',
        '복잡한 서비스 구조를 고려한 확장 가능한 ERD 설계',
      ],
      retrospective: [
        {
          tag: '도메인 이해부터',
          body: '요양보호사 인터뷰로 재가요양 기준·급여 방식·국가지원금 등 정책 정보를 수집했습니다. 현장의 목소리 없이는 놓쳤을 세부 요구사항을 구현에 반영하며, 기술보다 먼저 문제를 이해하는 태도의 중요성을 체감했습니다.',
        },
        {
          tag: '우선순위 의사결정',
          body: "제한된 시간 안에 '데모에 꼭 필요한 플로우'를 먼저 정하고, 신청→배정→확정→정산 핵심 플로우가 정상 작동하도록 우선순위를 합의했습니다.",
        },
        {
          tag: '확장 가능한 ERD',
          body: '당장의 기능 확장보다 완성도 높은 핵심 동작에 집중하되, 장기적으로 확장 가능한 ERD 설계에 포커스를 두었습니다.',
        },
        {
          tag: '최우수상 수상',
          body: "실제 운영까지 고려해 기획·설계·구현한 부분에서 좋은 평가를 받아 최우수상을 수상했습니다. '현장 문제를 잘 반영했고, 수기 플로우 자동화 시 우려점을 고려해 기획/설계한 것이 보인다'는 심사 피드백을 받았습니다.",
        },
      ],
    },
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
    detail: {
      team: '총 3인',
      role: 'Data Pipeline · Infra',
      repo: 'https://github.com/JeonHyerim86/de-final-project',
      techStack: [
        'Python',
        'Airflow',
        'AWS EC2',
        'S3',
        'Redshift',
        'Superset',
        'Selenium',
        'Transformer',
        'Docker',
      ],
      overview:
        '주식 초보자를 위한 뉴스레터형 대시보드 프로젝트입니다. 커뮤니티 데이터를 수동으로 수집하던 비효율을 해결하기 위해 수집→정제→적재를 자동화한 ETL 파이프라인을 직접 설계하고, Superset으로 시각화까지 이어지는 전체 흐름을 구축했습니다.',
      contributions: [
        {
          group: 'Data Pipeline',
          items: [
            'ETL 파이프라인 설계 및 구현 (커뮤니티 데이터 키워드 수집)',
            'Airflow DAG 크롤링/적재 태스크 분리 설계',
            'S3·Redshift 연동 수집·처리·저장·시각화 흐름 구축',
          ],
        },
        {
          group: 'Infra',
          items: ['Docker 기반 Airflow·Superset 실행 환경 구성'],
        },
      ],
      achievements: [
        '하루 7천여 건 커뮤니티 데이터를 안정적으로 수집하는 파이프라인 완성',
        'Transformer 라이브러리로 유의미한 키워드 추출 자동화',
        '일 단위 키워드 리포트 제공',
      ],
      retrospective: [
        {
          tag: '배움',
          body: '팀원별로 같은 목표를 다른 방식으로 접근하며 파이프라인 설계의 다양한 관점을 비교하고, 제가 설계한 구조가 어느 부분에 이점이 있는지 근거를 갖출 수 있었습니다.',
        },
        {
          tag: '문제 해결',
          body: 'Celery Executor 기반 구성의 반복 오류, EC2 컨테이너 OOM 등 예상치 못한 장애가 발생했을 때 포기 대신 구조를 단순화하는 방향으로 팀 의사결정을 이끌었습니다. 장애를 데이터로 읽고 최선의 판단을 하는 힘을 키운 경험입니다.',
        },
        {
          tag: '결과',
          body: '정확한 데이터 가공을 위해 수기 보완과 AI 활용으로 도메인 특화·불용어 데이터를 점차 늘려, 하루 7천여 건 커뮤니티 데이터를 안정적으로 수집하는 파이프라인을 완성했습니다.',
        },
        {
          tag: '성장',
          body: '뉴스레터 메일 전송 기능은 인프라 이슈로 마무리하지 못했습니다. 파이프라인 한 단계가 무너지면 전체 흐름이 멈춘다는 것을 체감하며, 전체 타임라인과 우선순위를 더 면밀히 계획해야 한다는 개선점을 도출했습니다.',
        },
      ],
    },
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
    detail: {
      team: '총 5인',
      role: 'Data · Modeling',
      repo: 'https://github.com/JeonHyerim86/spear-pishing-mail-filter-project',
      techStack: [
        'Python',
        'Selenium',
        'BERT',
        'koBERT',
        'Decision Tree',
        'scikit-learn',
        'GridSearchCV',
      ],
      overview:
        '대학 캡스톤 프로젝트로 BERT와 Decision Tree를 결합한 스피어피싱 메일 탐지 모델을 개발했습니다. 한글 메일 공개 데이터셋이 없는 제약 속에서 데이터 수집부터 전처리·토크나이징 자동화까지 직접 구축했습니다.',
      contributions: [
        {
          group: 'Data',
          items: [
            '크롤링 프로그램 작성 및 데이터 수집',
            '전처리·토크나이징 자동화 구축',
            '훈련/검증 데이터 성능 비교 및 과적합 검증',
          ],
        },
        {
          group: 'Modeling',
          items: ['Decision Tree 하이퍼파라미터 튜닝 보조'],
        },
      ],
      achievements: [
        'BERT + Decision Tree 자체 학습 엔진으로 탐지 정확도 약 91.34% 달성',
        '팀원 실제 메일 크롤링으로 약 5천여 건 데이터 확보',
        '전처리·토크나이징 자동화로 반복 작업 제거 및 재현성 향상',
      ],
      retrospective: [
        {
          tag: '도전',
          body: '처음으로 AI·ML을 팀 단위로 적용한 프로젝트였습니다. 한글 메일 공개 데이터셋이 없다는 제약 속에서 팀원들의 실제 메일을 크롤링하는 프로그램을 직접 작성해 약 5천여 건 데이터를 확보했습니다.',
        },
        {
          tag: '문제 해결',
          body: 'Decision Tree 과적합이 발생했을 때 하이퍼파라미터 조정으로 복잡도를 낮추자는 방향을 제안하고, 훈련-검증 성능 격차를 수치로 비교해 근거 있는 의사결정을 이끌었습니다.',
        },
        {
          tag: '성장',
          body: '최종 정확도 91.34%를 달성했지만, 다양한 모델을 실험하며 성능을 검증하지 못한 아쉬움이 남아 초기 타임라인 설계의 중요성을 체감했습니다. 다음엔 교차 검증과 모델 다양화로 더 탄탄한 결과를 내고 싶습니다.',
        },
      ],
    },
  },
]
