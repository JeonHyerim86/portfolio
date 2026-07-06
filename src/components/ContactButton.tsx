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

// 실루엣 경계(빈 칸과 맞닿은 셀 모서리)만 모아 얇은 선 테두리로 그린다.
const filledKey = new Set(CURSOR_PIXELS.map(({ x, y }) => `${x},${y}`))
const has = (x: number, y: number) => filledKey.has(`${x},${y}`)
const BORDER_PATH = CURSOR_PIXELS.map(({ x, y }) => {
  let d = ''
  if (!has(x, y - 1)) d += `M${x} ${y}h1` // 위
  if (!has(x, y + 1)) d += `M${x} ${y + 1}h1` // 아래
  if (!has(x - 1, y)) d += `M${x} ${y}v1` // 왼쪽
  if (!has(x + 1, y)) d += `M${x + 1} ${y}v1` // 오른쪽
  return d
}).join('')

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
      {/* 버튼 본체 = 큰 픽셀 커서. 무지개빛(hue 순환) + 확실한 픽셀 테두리, 그림자 없음.
          호버 중엔 계속 눌렀다 떼는 press(래퍼가 담당 — 애니메이션 충돌 방지) */}
      <span className="inline-block group-hover:animate-[cursor-click_0.5s_ease-in-out_infinite] motion-reduce:group-hover:animate-none">
        <svg
          viewBox="-0.5 -0.5 11.5 17.5"
          shapeRendering="crispEdges"
          fill="url(#ctaRainbow)"
          aria-hidden="true"
          className="h-20 w-[52px] animate-[cursor-rainbow_3.5s_linear_infinite] motion-reduce:animate-none sm:h-24 sm:w-[62px] md:h-28 md:w-[74px]"
        >
          <defs>
            <linearGradient
              id="ctaRainbow"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="12"
              y2="16"
            >
              <stop offset="0" stopColor="#ff4d6d" />
              <stop offset="0.2" stopColor="#ff9f1c" />
              <stop offset="0.4" stopColor="#ffe74c" />
              <stop offset="0.58" stopColor="#38e07b" />
              <stop offset="0.76" stopColor="#2ad4ff" />
              <stop offset="1" stopColor="#9b5cff" />
            </linearGradient>
          </defs>
          {/* 무지개 채움 */}
          {CURSOR_PIXELS.map(({ x, y }) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
          ))}
          {/* 얇은 흰색 테두리 — 다크 배경에서 실루엣 구분 */}
          <path
            d={BORDER_PATH}
            fill="none"
            stroke="#ffffff"
            strokeWidth={0.35}
            strokeLinecap="square"
          />
        </svg>
      </span>
      {/* 라벨 캡션 — "Backend Developer" 태그라인과 같은 글씨체(font-display=Kanit, bold, 넓은 자간). 크기는 유지 */}
      <span className="font-display font-bold uppercase tracking-[0.22em] text-sm transition-opacity duration-150 group-hover:opacity-70 sm:text-base sm:tracking-[0.32em] md:text-lg md:tracking-[0.4em]">
        {label}
      </span>
    </a>
  )
}
