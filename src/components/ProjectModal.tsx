import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, ArrowUpRight, X } from 'lucide-react'
import type { Project } from '../data/projects'

// 프로젝트 상세 팝업(도시에·dossier). 포트폴리오 카드를 클릭하면 열린다.
// 사이트 DNA 재사용: 대형 넘버 + 그라디언트 타이틀(.hero-heading). 유일한 강조 지점은
// 맨 아래 GitHub 배너로, 사이트 시그니처 포인트 그라디언트(123deg)를 쓴다.
// 접근성: role=dialog·aria-modal, 스크롤 잠금, Esc 닫기, 포커스 트랩, 모션 최소화 존중.

const PROFILE_REPO = 'https://github.com/JeonHyerim86'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

// 섹션 소제목 — 카드 eyebrow와 같은 톤(대문자 트래킹·mist/50)
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-3 text-xs font-medium uppercase tracking-widest text-mist/45 sm:text-sm">
      {children}
    </h4>
  )
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const d = project.detail

  const repoUrl = d?.repo ?? PROFILE_REPO
  const titleId = `project-modal-${project.number}`

  // 스크롤 잠금 + Esc 닫기 + 포커스 트랩 + 초기 포커스
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // 포털로 body에 렌더 → 섹션의 stacking context(relative z-10)를 벗어나 최상단에 뜬다.
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
      onClick={onClose}
      aria-hidden={false}
    >
      {/* 스크림 */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" aria-hidden="true" />

      {/* 패널 */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative my-auto w-full max-w-3xl rounded-[28px] border border-mist/15 bg-[#0e0e11] shadow-[0_30px_80px_rgba(0,0,0,0.6)] sm:rounded-[36px]"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 12 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="상세 닫기"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-mist/20 bg-ink/60 text-mist/70 transition-colors hover:bg-mist/10 hover:text-mist sm:right-6 sm:top-6"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="px-6 pb-6 pt-8 sm:px-9 sm:pb-9 sm:pt-10">
          {/* 헤더: 대형 넘버 + eyebrow + 그라디언트 타이틀 (포트폴리오 카드와 연속성) */}
          <header className="flex items-start gap-4 pr-10 sm:gap-6">
            <span
              className="hero-heading shrink-0 font-display font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 7vw, 4.25rem)' }}
              aria-hidden="true"
            >
              {project.number}
            </span>
            <div className="min-w-0 pt-1">
              <p className="text-xs uppercase tracking-widest text-mist/50 sm:text-sm">
                {project.category}
              </p>
              <h3
                id={titleId}
                className="mt-1 break-keep font-medium text-mist"
                style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </header>

          {/* 스펙 시트: 기간 · 인원 · 역할 */}
          <dl className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-mist/12 bg-mist/[0.06] sm:grid-cols-3">
            {[
              { k: '기간', v: project.period },
              { k: '인원', v: d?.team ?? '—' },
              { k: '역할', v: d?.role ?? '—' },
            ].map((row) => (
              <div key={row.k} className="bg-[#0e0e11] px-5 py-4">
                <dt className="text-[0.7rem] uppercase tracking-widest text-mist/40">{row.k}</dt>
                <dd className="mt-1.5 text-sm text-mist sm:text-[0.95rem]">{row.v}</dd>
              </div>
            ))}
          </dl>

          {d ? (
            <div className="mt-9 space-y-9">
              {/* 기술 스택 */}
              <section>
                <SectionLabel>기술 스택</SectionLabel>
                <ul className="flex flex-wrap gap-2">
                  {d.techStack.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-mist/20 px-3 py-1 text-xs text-mist/80 sm:text-sm"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </section>

              {/* 프로젝트 설명 */}
              <section>
                <SectionLabel>프로젝트 설명</SectionLabel>
                <p className="max-w-[62ch] break-keep leading-relaxed text-mist/85">
                  {d.overview}
                </p>
              </section>

              {/* 내 역할 및 성과 */}
              <section>
                <SectionLabel>내 역할 및 성과</SectionLabel>

                {/* 역할 (영역별) */}
                <div className="space-y-5">
                  {d.contributions.map((c) => (
                    <div key={c.group}>
                      <p className="mb-2 font-display text-sm font-semibold tracking-wide text-mist sm:text-base">
                        {c.group}
                      </p>
                      <ul className="space-y-1.5">
                        {c.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2.5 break-keep text-sm leading-relaxed text-mist/75 sm:text-[0.95rem]"
                          >
                            <span aria-hidden="true" className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-mist/40" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* 핵심 성과 (수치 강조) */}
                <div className="mt-6 rounded-2xl border border-mist/12 bg-mist/[0.03] p-5">
                  <p className="mb-3 text-[0.7rem] uppercase tracking-widest text-mist/40">
                    핵심 성과
                  </p>
                  <ul className="space-y-2.5">
                    {d.achievements.map((a) => (
                      <li
                        key={a}
                        className="flex gap-2.5 break-keep text-sm font-medium leading-relaxed text-mist sm:text-[0.95rem]"
                      >
                        <ArrowUpRight
                          size={16}
                          aria-hidden="true"
                          className="mt-[0.15em] shrink-0 text-mist/50"
                        />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 프로젝트 회고 */}
              <section>
                <SectionLabel>프로젝트 회고</SectionLabel>
                <div className="space-y-4">
                  {d.retrospective.map((r) => (
                    <div
                      key={r.tag}
                      className="border-l-2 border-mist/15 pl-4 sm:pl-5"
                    >
                      <span className="mb-1.5 inline-block rounded-full border border-mist/20 px-2.5 py-0.5 text-xs text-mist/70">
                        {r.tag}
                      </span>
                      <p className="max-w-[62ch] break-keep text-sm leading-relaxed text-mist/70 sm:text-[0.95rem]">
                        {r.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <p className="mt-8 text-mist/70">{project.summary}</p>
          )}

          {/* GitHub 배너 — 가운데 정렬 흰색 pill (프로젝트별 저장소로 이동) */}
          <div className="mt-10 flex justify-center">
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.name} GitHub 저장소 (새 탭에서 열기)`}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-9 py-4 text-sm font-bold tracking-wide text-ink transition-colors duration-200 hover:bg-mist sm:px-11 sm:text-base"
            >
              <Github size={20} aria-hidden="true" className="shrink-0" />
              <span>GitHub 저장소</span>
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
