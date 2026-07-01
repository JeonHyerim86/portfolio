import FadeIn from '../components/FadeIn'
import AnimatedText from '../components/AnimatedText'
import { profile } from '../data/profile'

// design-ex.md AboutSection: 대형 그라디언트 헤딩 + 스크롤 캐릭터 리빌 텍스트.
// PRD §6.3의 학력·수상·자격증을 하단 info 블록으로 보강.
export default function AboutSection() {
  return (
    <section
      id="about"
      className="flex min-h-screen flex-col items-center justify-center gap-10 px-5 py-24 sm:gap-14 sm:px-8 md:gap-16 md:px-10"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-display font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 8.4vw, 7rem)' }}
        >
          About
        </h2>
      </FadeIn>

      <AnimatedText
        text={profile.intro}
        className="mx-auto max-w-[42ch] text-center font-medium leading-relaxed text-mist text-[clamp(1.05rem,1.5vw,1.3rem)]"
      />

      {/* 학력 · 수상 · 자격증 */}
      <FadeIn delay={0.1} className="w-full max-w-4xl">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {profile.highlights.map((group) => (
            <div
              key={group.label}
              className="rounded-2xl border border-mist/15 bg-white/[0.02] p-5 sm:p-6"
            >
              <dt className="mb-2 font-display text-sm uppercase tracking-widest text-mist/50 sm:text-base">
                {group.label}
              </dt>
              <dd className="space-y-1">
                {group.items.map((item) => (
                  <p key={item} className="text-base leading-relaxed text-mist sm:text-lg">
                    {item}
                  </p>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </FadeIn>

      {/* 스킬 배지 */}
      <FadeIn delay={0.15} className="w-full max-w-4xl">
        <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {profile.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-mist/25 px-4 py-1.5 text-sm text-mist/80 sm:text-base"
            >
              {skill}
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  )
}
