import { useEffect, useRef } from 'react'
import type { ReactNode, RefObject } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

// 마우스를 부드럽게 따라오는 자석 효과.
// 커서 위치를 motion value로 추적하고 useSpring으로 관성 있게 보간한다
// (React state 리렌더 없이 프레임마다 갱신 → 부드럽고 가벼움).
// 터치/모바일·모션 최소화 환경에서는 비활성화.
interface MagnetProps {
  children: ReactNode
  padding?: number // 활성화 반경: 요소 가장자리에서 이 거리 안이면 반응 (boundsRef 없을 때)
  strength?: number // 클수록 이동량이 작아짐 (1이면 커서 위치까지 그대로 도달)
  maxOffset?: number // 기본 최대 이동 거리(px) — 너무 멀리 날아가지 않도록 clamp
  maxOffsetX?: number // 가로 최대 이동 거리 (미지정 시 maxOffset)
  maxOffsetY?: number // 세로 최대 이동 거리 (미지정 시 maxOffset)
  maxOffsetUp?: number // 위(음의 y)로 최대 이동 거리 (미지정 시 maxOffsetY)
  maxOffsetDown?: number // 아래(양의 y)로 최대 이동 거리 (미지정 시 maxOffsetY)
  boundsRef?: RefObject<HTMLElement | null> // 지정 시 커서가 이 요소 영역 안일 때만 반응
  tilt?: boolean // 켜면 커서 방향으로 3D 틸트(rotateX/rotateY)까지 적용 → 평면 이미지가 입체적으로 보임
  maxTilt?: number // 최대 기울기(도). 기본 12
  tiltRange?: number // 이 픽셀 거리에서 maxTilt에 도달 (작을수록 민감). 기본 220
  perspective?: number // 3D 원근 깊이(px). 작을수록 왜곡이 강함. 기본 900
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
  maxOffsetUp,
  maxOffsetDown,
  boundsRef,
  tilt = false,
  maxTilt = 12,
  tiltRange = 220,
  perspective = 900,
  className,
}: MagnetProps) {
  const mx = maxOffsetX ?? maxOffset
  const my = maxOffsetY ?? maxOffset
  const up = maxOffsetUp ?? my
  const down = maxOffsetDown ?? my
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // 커서 방향 3D 틸트: rotateX(위아래), rotateY(좌우)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  // 부드러운 관성 보간
  const spring = { stiffness: 150, damping: 15, mass: 0.5 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)
  // 틸트는 조금 더 느긋하게(관성 크게) 보간해 무게감을 준다
  const tiltSpring = { stiffness: 110, damping: 18, mass: 0.7 }
  const srx = useSpring(rx, tiltSpring)
  const sry = useSpring(ry, tiltSpring)

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
      // boundsRef가 있으면 커서가 그 요소(예: 히어로 섹션) 안일 때만 반응.
      // 없으면 캐릭터 주변 padding 반경으로 판단.
      let inRange: boolean
      if (boundsRef?.current) {
        const b = boundsRef.current.getBoundingClientRect()
        inRange =
          e.clientX >= b.left &&
          e.clientX <= b.right &&
          e.clientY >= b.top &&
          e.clientY <= b.bottom
      } else {
        inRange =
          Math.abs(dx) < r.width / 2 + padding && Math.abs(dy) < r.height / 2 + padding
      }
      if (inRange) {
        x.set(clamp(dx / strength, -mx, mx))
        y.set(clamp(dy / strength, -up, down))
        if (tilt) {
          // 커서 쪽으로 얼굴이 향하듯 기울인다: 오른쪽이면 rotateY+, 위쪽이면 rotateX+.
          ry.set(clamp((dx / tiltRange) * maxTilt, -maxTilt, maxTilt))
          rx.set(clamp((-dy / tiltRange) * maxTilt, -maxTilt, maxTilt))
        }
      } else {
        x.set(0)
        y.set(0)
        rx.set(0)
        ry.set(0)
      }
    }
    const reset = () => {
      x.set(0)
      y.set(0)
      rx.set(0)
      ry.set(0)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', reset)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', reset)
    }
  }, [padding, strength, mx, up, down, boundsRef, reduce, x, y, tilt, maxTilt, tiltRange, rx, ry])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: reduce ? 0 : sx, y: reduce ? 0 : sy, willChange: 'transform' }}
    >
      {tilt && !reduce ? (
        // 위치 이동(바깥)과 3D 틸트(안쪽)를 분리해, 틸트만 원근을 받도록 한다.
        <motion.div
          style={{
            rotateX: srx,
            rotateY: sry,
            transformPerspective: perspective,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  )
}
