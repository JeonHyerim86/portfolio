import { useLayoutEffect, useRef, useState } from 'react'
import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'
import ContactButton from '../components/ContactButton'
import WaveText from '../components/WaveText'
import ParticleTrail from '../components/ParticleTrail'
import { profile } from '../data/profile'

// design-ex.md HeroSection 구조: 풀뷰포트, 대형 그라디언트 헤딩(상단 중앙),
// 글자 아래 마그네틱 포트레이트, 하단 좌(문구) 바.
export default function HeroSection() {
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
      {/* 캐릭터 움직임에 따라 픽셀 파티클 잔상을 남기는 캔버스 레이어 */}
      <ParticleTrail containerRef={heroRef} targetRef={portraitRef} />

      {/* 상단 중앙: 대형 헤딩 + 태그라인 */}
      <div ref={headerRef} className="relative z-20 pt-20 sm:pt-24 md:pt-28">
        <FadeIn delay={0.15} y={40}>
          <div className="overflow-hidden">
            <h1 className="hero-heading w-full whitespace-nowrap px-4 text-center font-display text-[7.5vw] font-black uppercase leading-none tracking-tight sm:text-[10vw] md:text-[12vw] lg:text-[13vw]">
              {profile.heroHeading}
            </h1>
          </div>
        </FadeIn>
        <FadeIn delay={0.25} y={20}>
          <p className="mt-3 text-center font-display text-base uppercase tracking-[0.4em] text-mist sm:text-lg md:text-xl">
            <WaveText text={profile.heroTagline} />
          </p>
        </FadeIn>
      </div>

      {/* 글자 아래 마그네틱 포트레이트 — 하단 중앙 고정, 반응형 범위로 커서 추종.
          (센터링은 래퍼가, 커서 추종은 Magnet이 담당) */}
      <div
        ref={charRef}
        className="absolute bottom-0 left-1/2 z-10 w-[280px] -translate-x-1/2 sm:w-[380px] md:w-[440px] lg:w-[500px]"
      >
        <Magnet
          boundsRef={heroRef}
          strength={1.15}
          maxOffsetX={range.x}
          maxOffsetUp={range.up}
          maxOffsetDown={range.down}
        >
          <FadeIn delay={0.6} y={30}>
            <img
              ref={portraitRef}
              src={profile.portrait}
              alt={`${profile.name} 프로필 사진`}
              className="h-auto w-full select-none"
              draggable={false}
            />
          </FadeIn>
        </Magnet>
      </div>

      {/* 하단 바 */}
      <div className="relative z-20 mt-auto flex items-end justify-between gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <div className="max-w-[190px] sm:max-w-[240px] md:max-w-[300px]">
            <p
              className="font-light leading-snug tracking-wide text-mist"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.4rem)' }}
            >
              {profile.slogan}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.keywords.map((k) => (
                <li
                  key={k}
                  className="rounded-full border border-mist/25 px-3 py-1 text-[0.65rem] text-mist/70 sm:text-xs"
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
