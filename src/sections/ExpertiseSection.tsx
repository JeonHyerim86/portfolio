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
        className="mb-16 text-center font-display font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Expertise
      </h2>

      <div className="mx-auto max-w-5xl">
        {expertise.map((item, i) => (
          <FadeIn key={item.number} delay={i * 0.1}>
            <div className="flex flex-col gap-4 border-t border-[rgba(12,12,12,0.15)] py-8 sm:flex-row sm:items-start sm:gap-8 sm:py-10 md:py-12">
              <span
                className="font-display font-black leading-none text-ink"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {item.number}
              </span>
              <div className="sm:pt-2">
                <h3
                  className="font-medium uppercase"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {item.name}
                </h3>
                <p
                  className="mt-2 max-w-2xl font-light leading-relaxed opacity-60"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
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
