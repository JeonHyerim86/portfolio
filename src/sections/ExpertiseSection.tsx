import FadeIn from '../components/FadeIn'
import { expertise } from '../data/expertise'

// design-ex.md ServicesSection: 화이트 배경 + 상단 라운드, 5개 번호 리스트.
// 내용은 PRD §6.3 핵심 역량으로 대체.
export default function ExpertiseSection() {
  return (
    <section
      id="expertise"
      className="rounded-t-[40px] bg-white px-5 py-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2
        className="mb-12 text-center font-display font-black uppercase leading-none tracking-tight sm:mb-16 md:mb-20"
        style={{ fontSize: 'clamp(2.5rem, 8.4vw, 7rem)' }}
      >
        Expertise
      </h2>

      <div className="mx-auto max-w-5xl">
        {expertise.map((item, i) => (
          <FadeIn key={item.number} delay={i * 0.1}>
            <div className="flex flex-col gap-3 border-t border-[rgba(12,12,12,0.15)] py-8 sm:flex-row sm:items-baseline sm:gap-6 sm:py-10">
              <span
                className="min-w-[2ch] font-display font-black leading-none text-ink/90"
                style={{ fontSize: 'clamp(1.6rem, 4.6vw, 3.75rem)' }}
              >
                {item.number}
              </span>
              <div>
                <h3
                  className="font-medium uppercase"
                  style={{ fontSize: 'clamp(1.15rem, 1.9vw, 1.6rem)' }}
                >
                  {item.name}
                </h3>
                <p
                  className="mt-2 max-w-[52ch] font-light leading-relaxed opacity-60"
                  style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
