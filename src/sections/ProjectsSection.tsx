import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import ProjectModal from '../components/ProjectModal'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

// design-ex.md ProjectsSection: 다크 배경 + 상단 라운드, 위 섹션 위로 겹치기(-mt).
// 애니메이션: sticky 스택 — 각 카드가 이전 카드 위로 올라와 쌓이며(뒤 카드는 살짝 축소).
function ProjectCard({
  project,
  index,
  progress,
  range,
  targetScale,
  onOpen,
}: {
  project: Project
  index: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
  onOpen: (project: Project) => void
}) {
  const reduce = useReducedMotion()
  // 섹션 전체 스크롤 진행도에 따라 아래(먼저 쌓인) 카드일수록 더 작아진다.
  const scale = useTransform(progress, range, [1, targetScale])

  const imgs = project.images
  const hasDetail = Boolean(project.detail)

  return (
    // 카드마다 조금씩 낮은 위치에 sticky로 고정 → 위로 쌓이며 이전 카드가 상단에 살짝 보임.
    <div className="sticky" style={{ top: `calc(5.5rem + ${index * 34}px)` }}>
      <motion.div
        style={{ scale: reduce ? 1 : scale }}
        onClick={hasDetail ? () => onOpen(project) : undefined}
        className={`group mx-auto mb-6 w-full max-w-6xl origin-top rounded-[32px] border-2 border-mist bg-ink p-4 transition-colors sm:mb-8 sm:rounded-[44px] sm:p-6 md:rounded-[56px] md:p-8 ${
          hasDetail ? 'cursor-pointer hover:border-white hover:bg-[#151518]' : ''
        }`}
      >
        {/* 상단 행 */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 md:mb-7">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-display font-black leading-none text-mist"
              style={{ fontSize: 'clamp(1.6rem, 4.6vw, 3.75rem)' }}
            >
              {project.number}
            </span>
            <div>
              <p className="text-xs uppercase tracking-widest text-mist/50 sm:text-sm">
                {project.category} · {project.period}
              </p>
              <h3
                className="font-medium text-mist"
                style={{ fontSize: 'clamp(1.15rem, 1.9vw, 1.6rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          {hasDetail ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onOpen(project)
              }}
              aria-haspopup="dialog"
              aria-label={`${project.name} 상세 보기`}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-mist px-5 py-2.5 text-sm font-medium tracking-wide text-mist transition-colors duration-200 hover:bg-mist/10 sm:px-6"
            >
              자세히 보기
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          ) : null}
        </div>

        {/* 핵심 성과 배지 */}
        <ul className="mb-5 flex flex-wrap gap-2 md:mb-6">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full border border-mist/30 px-3 py-1 text-xs text-mist sm:text-sm"
            >
              {h}
            </li>
          ))}
        </ul>

        {/* 이미지 레이아웃 — 장수에 맞춰 배치. 없으면 텍스트 패널. */}
        {imgs.length >= 3 ? (
          // 3장 이상: 왼쪽 2단 스택 + 오른쪽 대표 1장
          <div className="flex gap-3 sm:gap-4">
            <div className="flex w-2/5 flex-col gap-3 sm:gap-4">
              {[imgs[0], imgs[1]].map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.alt} ${i + 1}`}
                  loading="lazy"
                  className="aspect-[16/10] w-full rounded-[20px] object-cover sm:rounded-[28px]"
                />
              ))}
            </div>
            <div className="w-3/5">
              <img
                src={imgs[2]}
                alt={`${project.alt} 대표`}
                loading="lazy"
                className="aspect-[4/3.4] w-full rounded-[20px] object-cover sm:rounded-[28px]"
              />
            </div>
          </div>
        ) : imgs.length === 2 ? (
          // 2장: 동일 너비·높이 2열
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {imgs.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${project.alt} ${i + 1}`}
                loading="lazy"
                className="aspect-[16/10] w-full rounded-[20px] object-cover sm:rounded-[28px]"
              />
            ))}
          </div>
        ) : imgs.length === 1 ? (
          // 1장: 전체 너비 단일 이미지
          <img
            src={imgs[0]}
            alt={`${project.alt} 대표`}
            loading="lazy"
            className="aspect-[16/7] w-full rounded-[20px] object-cover sm:rounded-[28px]"
          />
        ) : (
          <div className="rounded-[20px] border border-mist/20 bg-white/[0.02] p-6 sm:rounded-[28px] sm:p-8">
            <p className="max-w-[52ch] break-keep leading-relaxed text-mist/80">{project.summary}</p>
          </div>
        )}

        {/* 기술 스택 */}
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 md:mt-6">
          {project.tech.map((t) => (
            <li key={t} className="text-xs text-mist/50 sm:text-sm">
              {t}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })
  const total = projects.length
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section
      id="portfolio"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-ink px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading mb-10 text-center font-display font-black uppercase leading-none tracking-tight md:mb-14"
          style={{ fontSize: 'clamp(2.5rem, 8.4vw, 7rem)' }}
        >
          Portfolio
        </h2>
      </FadeIn>

      {/* pb로 마지막 카드가 쌓인 뒤에도 스크롤 여유를 둔다 */}
      <div ref={container} className="relative mx-auto max-w-6xl pb-[35vh]">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            progress={scrollYProgress}
            range={[i / total, 1]}
            targetScale={1 - (total - 1 - i) * 0.05}
            onOpen={setActive}
          />
        ))}
      </div>

      <AnimatePresence>
        {active ? (
          <ProjectModal key={active.number} project={active} onClose={() => setActive(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  )
}
