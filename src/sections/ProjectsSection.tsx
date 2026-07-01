import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import GhostButton from '../components/GhostButton'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

// design-ex.md ProjectsSection: 다크 배경 + 상단 라운드, 위 섹션 위로 겹치기(-mt),
// sticky 스택 카드가 스크롤에 따라 축소된다.
function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // 뒤 카드일수록 더 작게 스케일다운되어 아래에 쌓인다.
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  const imgs = project.images
  const col1 = imgs.length >= 3 ? [imgs[0], imgs[1]] : imgs.length === 2 ? [imgs[0]] : []
  const col2 = imgs.length >= 3 ? imgs[2] : imgs.length >= 1 ? imgs[imgs.length - 1] : undefined

  return (
    <div ref={ref} className="h-[85vh]">
      <motion.div
        style={{
          scale: reduce ? 1 : scale,
          top: `calc(6rem + ${index * 28}px)`,
        }}
        className="sticky mx-auto w-full max-w-6xl origin-top rounded-[32px] border-2 border-mist bg-ink p-4 sm:rounded-[44px] sm:p-6 md:rounded-[56px] md:p-8"
      >
        {/* 상단 행 */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 md:mb-7">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-display font-black leading-none text-mist"
              style={{ fontSize: 'clamp(2.25rem, 6vw, 84px)' }}
            >
              {project.number}
            </span>
            <div>
              <p className="text-xs uppercase tracking-widest text-mist/50 sm:text-sm">
                {project.category} · {project.period}
              </p>
              <h3
                className="font-medium text-mist"
                style={{ fontSize: 'clamp(1.15rem, 2.6vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          {project.link ? (
            <GhostButton label="Live Project" href={project.link} external />
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

        {/* 이미지 그리드 또는 텍스트 패널 */}
        {imgs.length > 0 ? (
          <div className="flex gap-3 sm:gap-4">
            {col1.length > 0 && (
              <div className="flex w-2/5 flex-col gap-3 sm:gap-4">
                {col1.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${project.alt} ${i + 1}`}
                    loading="lazy"
                    className="w-full rounded-[20px] object-cover sm:rounded-[28px]"
                    style={{ height: 'clamp(110px, 15vw, 210px)' }}
                  />
                ))}
              </div>
            )}
            {col2 && (
              <div className={col1.length > 0 ? 'w-3/5' : 'w-full'}>
                <img
                  src={col2}
                  alt={`${project.alt} 대표`}
                  loading="lazy"
                  className="w-full rounded-[20px] object-cover sm:rounded-[28px]"
                  style={{ height: 'clamp(180px, 32vw, 440px)' }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-[20px] border border-mist/20 bg-white/[0.02] p-6 sm:rounded-[28px] sm:p-8">
            <p className="max-w-2xl leading-relaxed text-mist/80">{project.summary}</p>
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
  return (
    <section
      id="portfolio"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-ink px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading mb-8 text-center font-display font-black uppercase leading-none tracking-tight md:mb-12"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Portfolio
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-6xl">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={projects.length}
          />
        ))}
      </div>
    </section>
  )
}
