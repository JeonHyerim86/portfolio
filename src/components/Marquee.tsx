import { useEffect, useRef, useState } from 'react'
import type { MarqueeTile } from '../data/marquee'

// design-ex.md MarqueeSection: 페이지 스크롤 위치에 따라 두 행이 서로
// 반대 방향으로 흐른다. offset = (scrollY - sectionTop + innerHeight) * 0.3.
// 각 행 타일은 seamless 스크롤을 위해 3배 복제. willChange + passive 리스너.
interface MarqueeProps {
  row1: MarqueeTile[]
  row2: MarqueeTile[]
}

const tileBox =
  'shrink-0 w-[280px] h-[180px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] rounded-2xl overflow-hidden'

function Tile({ tile }: { tile: MarqueeTile }) {
  return (
    <img
      src={tile.src}
      alt={tile.alt}
      loading="lazy"
      className={`${tileBox} object-cover`}
    />
  )
}

export default function Marquee({ row1, row2 }: MarqueeProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      setOffset((window.scrollY - top + window.innerHeight) * 0.3)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const tripled1 = [...row1, ...row1, ...row1]
  const tripled2 = [...row2, ...row2, ...row2]

  // 좌우 가장자리로 넘어가는 타일이 어둠(배경색) 속으로 점점 사라지는 페이드.
  // ⚠️ CSS mask-image로 처리하면, will-change:transform으로 합성된 넓은(≈6500px)
  // 자식 행들을 하나의 마스크 텍스처로 래스터화하다 실제 GPU(특히 Retina)에서
  // 간헐적으로 행이 반씩 검게 사라지는 합성 손상이 발생한다. 그래서 마스크 대신
  // 배경색(ink)으로 페이드하는 일반 그라디언트 오버레이(paint)로 동일 비주얼을 구현.
  const edgeFade =
    'linear-gradient(to right, #0C0C0C 0%, transparent 13%, transparent 87%, #0C0C0C 100%)'

  return (
    <div ref={sectionRef} className="relative flex flex-col gap-3 overflow-hidden">
      <div
        className="flex gap-3"
        style={{ transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}
      >
        {tripled1.map((tile, i) => (
          <Tile key={`r1-${i}`} tile={tile} />
        ))}
      </div>
      <div
        className="flex gap-3"
        style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}
      >
        {tripled2.map((tile, i) => (
          <Tile key={`r2-${i}`} tile={tile} />
        ))}
      </div>
      {/* 가장자리 페이드 오버레이 — 클릭 방해 없이 양끝을 배경색으로 덮어 사라지게 함 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: edgeFade }}
      />
    </div>
  )
}
