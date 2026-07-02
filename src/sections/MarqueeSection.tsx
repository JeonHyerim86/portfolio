import Marquee from '../components/Marquee'
import { marqueeImages, marqueeImages2 } from '../data/marquee'

// design-ex.md MarqueeSection — 배경 #0C0C0C, 상단 여백 넉넉히.
export default function MarqueeSection() {
  return (
    <section
      aria-label="프로젝트 미리보기 및 기술 스택"
      className="bg-ink pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <Marquee row1={marqueeImages} row2={marqueeImages2} />
    </section>
  )
}
