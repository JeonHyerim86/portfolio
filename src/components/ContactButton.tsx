// 히어로 CTA — 현재 톤앤매너(mist 라이트 필 + ink 텍스트)는 유지하되,
// 픽셀 아트 커서(마우스 포인터) 모양을 크게 넣고 블록형 픽셀 그림자를 준다.
interface ContactButtonProps {
  label?: string
  href?: string
  className?: string
}

// 픽셀 커서 비트맵 — '#'는 채워진 픽셀(12×16). crispEdges로 계단형 실루엣.
const CURSOR_BITMAP = [
  '#...........',
  '##..........',
  '###.........',
  '####........',
  '#####.......',
  '######......',
  '#######.....',
  '########....',
  '#########...',
  '##########..',
  '#######.....',
  '###.###.....',
  '##...###....',
  '#....###....',
  '......###...',
  '.......##...',
]

const CURSOR_PIXELS: { x: number; y: number }[] = []
CURSOR_BITMAP.forEach((row, y) => {
  ;[...row].forEach((ch, x) => {
    if (ch === '#') CURSOR_PIXELS.push({ x, y })
  })
})

export default function ContactButton({
  label = '연락하기',
  href = '#contact',
  className = '',
}: ContactButtonProps) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-[3px] bg-mist font-semibold uppercase tracking-widest text-ink shadow-[5px_5px_0_0_rgba(215,226,234,0.28)] transition-all duration-150 hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-white hover:shadow-[2px_2px_0_0_rgba(215,226,234,0.28)] px-8 py-4 text-sm sm:gap-4 sm:px-11 sm:py-5 sm:text-base md:px-14 md:text-lg ${className}`}
    >
      {label}
      <svg
        viewBox="0 0 12 16"
        shapeRendering="crispEdges"
        fill="currentColor"
        aria-hidden="true"
        className="h-8 w-6 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-9 sm:w-7 md:h-11 md:w-8"
      >
        {CURSOR_PIXELS.map(({ x, y }) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
        ))}
      </svg>
    </a>
  )
}
