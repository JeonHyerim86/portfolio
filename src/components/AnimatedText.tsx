import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

// design-ex.md AnimatedText: 스크롤 진행도에 따라 글자별 opacity 0.2 → 1.
// useScroll offset ['start 0.8', 'end 0.2'].
interface AnimatedTextProps {
  text: string
  className?: string
}

function Char({
  char,
  progress,
  range,
}: {
  char: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return <motion.span style={{ opacity }}>{char}</motion.span>
}

export default function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    )
  }

  const words = text.split(' ')
  const total = text.length
  let cursor = 0

  return (
    <p ref={ref} className={className}>
      {words.map((word, wi) => {
        // 영문 토큰(예: Spring Boot)이 줄바꿈으로 쪼개지지 않도록 어절 단위로 묶는다.
        const wordSpan = (
          <span key={`w${wi}`} className="inline-block">
            {word.split('').map((c, ci) => {
              const start = cursor / total
              const end = (cursor + 1) / total
              cursor += 1
              return <Char key={ci} char={c} range={[start, end]} progress={scrollYProgress} />
            })}
          </span>
        )
        cursor += 1 // 어절 사이 공백 몫
        return (
          <span key={`seg${wi}`}>
            {wordSpan}
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </p>
  )
}
