import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'
import { profile } from '../data/profile'

// design-ex.md HeroSection 구조: 풀뷰포트, 대형 그라디언트 헤딩,
// 중앙 마그네틱 포트레이트, 하단 좌(문구) 바.
export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex h-screen flex-col"
      style={{ overflowX: 'clip' }}
    >
      {/* 대형 이름 헤딩 */}
      <div className="flex flex-1 flex-col justify-center">
        <FadeIn delay={0.15} y={40}>
          <div className="overflow-hidden">
            <h1 className="hero-heading w-full whitespace-nowrap px-4 text-center font-display text-[28vw] font-black uppercase leading-none tracking-tight sm:text-[24vw] md:text-[20vw]">
              {profile.name}
            </h1>
          </div>
        </FadeIn>
        <FadeIn delay={0.25} y={20}>
          <p className="text-center font-display text-sm uppercase tracking-[0.4em] text-mist/70 sm:text-base md:text-lg">
            {profile.role}
          </p>
        </FadeIn>
      </div>

      {/* 중앙 마그네틱 포트레이트 */}
      <Magnet
        padding={150}
        strength={3}
        className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:w-[380px] md:w-[460px] lg:w-[540px]"
      >
        <FadeIn delay={0.6} y={30}>
          <img
            src={profile.portrait}
            alt={`${profile.name} 프로필 사진`}
            className="h-auto w-full select-none"
            draggable={false}
          />
        </FadeIn>
      </Magnet>

      {/* 하단 바 */}
      <div className="relative z-20 flex items-end justify-between gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
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
      </div>
    </section>
  )
}
