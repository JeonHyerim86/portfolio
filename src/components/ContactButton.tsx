// 히어로 CTA — 사각형 버튼이 아니라 "큰 픽셀 커서 모양" 자체가 버튼.
// 톤앤매너(mist/ink 무채색)는 유지하고, 커서 아래 작은 캡션으로 라벨을 둔다.
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
      className={`group inline-flex flex-col items-center gap-3 text-mist ${className}`}
    >
      {/* 버튼 본체 = 큰 픽셀 커서. 호버 중 계속 눌렀다 떼는 press 애니메이션 */}
      <svg
        viewBox="0 0 12 16"
        shapeRendering="crispEdges"
        fill="currentColor"
        aria-hidden="true"
        className="h-20 w-[60px] drop-shadow-[3px_3px_0_rgba(215,226,234,0.22)] group-hover:animate-[cursor-click_0.5s_ease-in-out_infinite] motion-reduce:group-hover:animate-none sm:h-24 sm:w-[72px] md:h-28 md:w-[84px]"
      >
        {CURSOR_PIXELS.map(({ x, y }) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
        ))}
      </svg>
      {/* 라벨 캡션 */}
      <span className="font-semibold uppercase tracking-[0.2em] text-sm transition-opacity duration-150 group-hover:opacity-70 sm:text-base md:text-lg">
        {label}
      </span>
    </a>
  )
}
