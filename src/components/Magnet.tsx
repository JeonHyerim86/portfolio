import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

// design-ex.md Magnet: 마우스가 padding 거리 안에 들어오면 요소 중심 기준
// 이동량을 strength로 나눠 translate3d. 진입 0.3s / 이탈 0.6s.
// 터치/모바일·모션 최소화 환경에서는 비활성화.
interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const handleMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const within =
        Math.abs(dx) < rect.width / 2 + padding && Math.abs(dy) < rect.height / 2 + padding

      if (within) {
        setActive(true)
        setPos({ x: dx / strength, y: dy / strength })
      } else if (active) {
        setActive(false)
        setPos({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [padding, strength, reduce, active])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: active ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
