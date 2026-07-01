import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

// 마우스를 부드럽게 따라오는 자석 효과.
// 커서 위치를 motion value로 추적하고 useSpring으로 관성 있게 보간한다
// (React state 리렌더 없이 프레임마다 갱신 → 부드럽고 가벼움).
// 터치/모바일·모션 최소화 환경에서는 비활성화.
interface MagnetProps {
  children: ReactNode
  padding?: number // 활성화 반경: 요소 가장자리에서 이 거리 안이면 반응
  strength?: number // 클수록 이동량이 작아짐
  maxOffset?: number // 기본 최대 이동 거리(px) — 너무 멀리 날아가지 않도록 clamp
  maxOffsetX?: number // 가로 최대 이동 거리 (미지정 시 maxOffset)
  maxOffsetY?: number // 세로 최대 이동 거리 (미지정 시 maxOffset)
  className?: string
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

export default function Magnet({
  children,
  padding = 260,
  strength = 3,
  maxOffset = 60,
  maxOffsetX,
  maxOffsetY,
  className,
}: MagnetProps) {
  const mx = maxOffsetX ?? maxOffset
  const my = maxOffsetY ?? maxOffset
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // 부드러운 관성 보간
  const spring = { stiffness: 150, damping: 15, mass: 0.5 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const inRange =
        Math.abs(dx) < r.width / 2 + padding && Math.abs(dy) < r.height / 2 + padding
      if (inRange) {
        x.set(clamp(dx / strength, -mx, mx))
        y.set(clamp(dy / strength, -my, my))
      } else {
        x.set(0)
        y.set(0)
      }
    }
    const reset = () => {
      x.set(0)
      y.set(0)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', reset)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', reset)
    }
  }, [padding, strength, mx, my, reduce, x, y])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: reduce ? 0 : sx, y: reduce ? 0 : sy, willChange: 'transform' }}
    >
      {children}
    </motion.div>
  )
}
