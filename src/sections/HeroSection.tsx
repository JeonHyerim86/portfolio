import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'
import ContactButton from '../components/ContactButton'
import ParticleTrail from '../components/ParticleTrail'
import CodeBackdrop from '../components/CodeBackdrop'
import { profile } from '../data/profile'

// design-ex.md HeroSection 구조: 풀뷰포트, 대형 그라디언트 헤딩(상단 중앙),
// 글자 아래 마그네틱 포트레이트, 하단 좌(문구) 바.
export default function HeroSection() {
  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const charRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLImageElement>(null)
  const contactRef = useRef<HTMLSpanElement>(null)

  // 캐릭터 이동 범위를 상수가 아니라 레이아웃에 맞춰 반응형으로 계산한다.
  // - 위로: 캐릭터 상단이 헤딩/태그라인 "바로 아래"까지 올라가는 거리
  // - 좌우: 캐릭터 중심에서 Contact 버튼까지의 가로 거리
  const [range, setRange] = useState({ x: 130, up: 200, down: 60 })

  useLayoutEffect(() => {
    const measure = () => {
      const wrapEl = charRef.current
      const headEl = headerRef.current
      if (!wrapEl || !headEl) return
      const wrap = wrapEl.getBoundingClientRect()
      const head = headEl.getBoundingClientRect()

      const GAP = 12 // 글씨 바로 아래에서 멈추도록 남기는 여유
      const up = Math.max(40, wrap.top - head.bottom - GAP)
      const down = 64 // 아래로는 살짝만 (하단 밖으로 흘러내리지 않게)

      // 좌우: Contact 버튼 중심까지. 못 구하면 화면 절반에서 가장자리 여백만 뺀 값.
      const charCenterX = wrap.left + wrap.width / 2
      let x: number
      const btnEl = contactRef.current
      if (btnEl) {
        const btn = btnEl.getBoundingClientRect()
        x = Math.abs(btn.left + btn.width / 2 - charCenterX)
      } else {
        x = window.innerWidth / 2 - 48
      }
      x = Math.max(80, x)

      setRange({ x, up, down })
    }

    measure()
    window.addEventListener('resize', measure)
    // 이미지 로드 등으로 캐릭터 박스 크기가 바뀔 때도 다시 측정
    const ro = new ResizeObserver(measure)
    if (charRef.current) ro.observe(charRef.current)
    if (headerRef.current) ro.observe(headerRef.current)
    return () => {
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex h-screen flex-col"
      style={{ overflowX: 'clip' }}
    >
      {/* 배경: 전혜림의 실제 백엔드 코드가 한 글자씩 타이핑되어 화면을 채우면 다시 시작 */}
      <CodeBackdrop />

      {/* 캐릭터 움직임에 따라 픽셀 파티클 잔상을 남기는 캔버스 레이어 */}
      <ParticleTrail containerRef={heroRef} targetRef={portraitRef} />

      {/* 상단 중앙: 대형 헤딩 + 태그라인 */}
      <div ref={headerRef} className="relative z-20 pt-20 sm:pt-24 md:pt-28">
        <FadeIn delay={0.15} y={40}>
          <div className="overflow-hidden">
            <h1 className="hero-heading w-full whitespace-nowrap px-4 text-center font-display text-[7.5vw] font-black uppercase leading-none tracking-tight sm:text-[9vw] md:text-[9.5vw]">
              {profile.heroHeading}
            </h1>
          </div>
        </FadeIn>
        <FadeIn delay={0.25} y={20}>
          <p className="mt-3 text-center font-display text-sm font-bold uppercase tracking-[0.22em] text-mist sm:text-lg sm:tracking-[0.32em] md:text-xl md:tracking-[0.4em]">
            {profile.heroTagline}
          </p>
        </FadeIn>
      </div>

      {/* 글자 아래 마그네틱 포트레이트 — 하단 중앙 고정, 반응형 범위로 커서 추종.
          (센터링은 래퍼가, 커서 추종은 Magnet이 담당) */}
      <div
        ref={charRef}
        className="absolute bottom-0 left-1/2 z-10 w-[280px] -translate-x-1/2 sm:w-[380px] md:w-[440px] lg:w-[500px]"
      >
        {/* 접지 그림자: 바닥에 고정(틸트/이동에 안 딸려감). 부유와 동기화해 캐릭터가
            뜨면 작아지고 옅어져 공간감을 준다. 다크 배경이라 순검정 소프트 타원. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[7%] z-0 mx-auto h-[7%] w-[64%] rounded-[50%] bg-black blur-2xl"
          style={{ willChange: 'transform, opacity' }}
          animate={reduce ? undefined : { scaleX: [1, 0.85, 1], opacity: [0.7, 0.45, 0.7] }}
          transition={
            reduce ? undefined : { duration: 4.5, ease: 'easeInOut', repeat: Infinity }
          }
        />
        <Magnet
          boundsRef={heroRef}
          strength={1.15}
          maxOffsetX={range.x}
          maxOffsetUp={range.up}
          maxOffsetDown={range.down}
        >
          <FadeIn delay={0.6} y={30}>
            <div className="relative">
              {/* 뒤 방사형 글로우: 다크 배경에서 캐릭터를 분리해 튀어나와 보이게 */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[72%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl"
                style={{
                  background:
                    'radial-gradient(50% 50% at 50% 50%, rgba(187,204,215,0.22) 0%, rgba(118,33,176,0.15) 45%, transparent 72%)',
                }}
              />
              {/* 부유(bob): 위아래로 천천히 떠다녀 살아있는 입체감 */}
              <motion.div
                animate={reduce ? undefined : { y: [0, -12, 0] }}
                transition={
                  reduce ? undefined : { duration: 4.5, ease: 'easeInOut', repeat: Infinity }
                }
                style={{ willChange: 'transform' }}
              >
                <img
                  ref={portraitRef}
                  src={profile.portrait}
                  alt={`${profile.name} 프로필 사진`}
                  className="h-auto w-full select-none"
                  style={{ filter: 'drop-shadow(0 22px 26px rgba(0,0,0,0.5))' }}
                  draggable={false}
                />
              </motion.div>
            </div>
          </FadeIn>
        </Magnet>
      </div>

      {/* 하단 바 */}
      <div className="relative z-20 mt-auto flex items-end justify-between gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <div className="max-w-[240px] sm:max-w-[280px] md:max-w-[300px]">
            <p
              className="max-w-[24ch] break-keep font-light leading-relaxed tracking-wide text-mist"
              style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1.05rem)' }}
            >
              {profile.slogan}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.keywords.map((k) => (
                <li
                  key={k}
                  className="rounded-full border border-mist/25 px-3 py-1 text-[0.7rem] text-mist/70 sm:text-xs"
                >
                  {k}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* 우측 하단 CTA */}
        <FadeIn delay={0.5} y={20}>
          <span
            ref={contactRef}
            className="inline-block -translate-x-2 -translate-y-3 sm:-translate-x-4 sm:-translate-y-6 md:-translate-x-6 md:-translate-y-9"
          >
            <ContactButton label="Contact me!" href="#contact" />
          </span>
        </FadeIn>
      </div>
    </section>
  )
}
