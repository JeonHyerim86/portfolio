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

  // 좌우 가장자리로 넘어가는 타일이 어둠(그림자) 속으로 점점 사라지도록 마스크 페이드.
  const edgeFade =
    'linear-gradient(to right, transparent 0%, #000 13%, #000 87%, transparent 100%)'

  return (
    <div
      ref={sectionRef}
      className="flex flex-col gap-3 overflow-hidden"
      style={{ maskImage: edgeFade, WebkitMaskImage: edgeFade }}
    >
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
    </div>
  )
}
