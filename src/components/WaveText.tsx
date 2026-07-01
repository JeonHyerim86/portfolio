import { motion, useReducedMotion } from 'framer-motion'

// 글자 하나씩 순차적으로 위로 "톡" 튀어오르는 파도 텍스트.
// 각 글자는 짧고 스냅감 있게(살짝 overshoot) 튀었다가 내려오고,
// 파도가 단어를 한 바퀴 훑는 동안 쉬었다가 다시 튄다 → 한 글자씩 명확하게 이동.
// 튀어오른 글자는 불투명도·크기가 커져 더 진하게 강조된다.
// prefers-reduced-motion 존중: 모션을 끄고 정적으로 렌더한다.
interface WaveTextProps {
  text: string
  className?: string
  /** 튀어오르는 높이(px) */
  amplitude?: number
  /** 한 글자가 튀었다 내려오는 시간(초) */
  popDuration?: number
  /** 인접 글자 간 시작 간격(초) — 클수록 한 글자씩 더 또렷하게 번진다 */
  stagger?: number
  /** 파도가 끝까지 지나간 뒤 다음 파도까지의 쉬는 시간(초) */
  gap?: number
}

export default function WaveText({
  text,
  className = '',
  amplitude = 15,
  popDuration = 0.42,
  stagger = 0.16,
  gap = 0.5,
}: WaveTextProps) {
  const reduce = useReducedMotion()
  const chars = [...text]

  // 모든 글자가 같은 주기로 반복하도록: 한 파도가 도는 시간(period) 계산.
  const period = chars.length * stagger + gap
  const repeatDelay = Math.max(0, period - popDuration)

  return (
    <span className={className} aria-label={text}>
      {chars.map((ch, i) => {
        if (ch === ' ') {
          // 공백은 애니메이션 없이 자리만 유지 (인덱스는 유지해 파도 위치 정렬)
          return (
            <span key={i} aria-hidden="true">
              {' '}
            </span>
          )
        }
        return (
          <motion.span
            key={i}
            aria-hidden="true"
            className="inline-block"
            style={{ willChange: 'transform, opacity' }}
            animate={
              reduce
                ? undefined
                : {
                    y: [0, -amplitude, 0],
                    opacity: [0.5, 1, 0.55],
                    scale: [1, 1.3, 1],
                  }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: popDuration,
                    times: [0, 0.42, 1],
                    // 위로: 살짝 overshoot(easeOutBack)로 톡 튀는 느낌 / 아래로: 부드럽게
                    ease: [[0.34, 1.56, 0.64, 1], [0.4, 0, 0.6, 1]],
                    repeat: Infinity,
                    repeatDelay,
                    delay: i * stagger,
                  }
            }
          >
            {ch}
          </motion.span>
        )
      })}
    </span>
  )
}
