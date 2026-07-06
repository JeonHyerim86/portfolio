import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { useReducedMotion } from 'framer-motion'

// 움직이는 대상(targetRef) 뒤에 별처럼 반짝이는 파티클을 흩뿌리는 캔버스 레이어.
// - 8방향 스파클(별) + 부드러운 글로우, additive 블렌딩, 또렷한 twinkle로 별처럼 반짝
// - 세로 위치를 아래로 편향 샘플링해 "위→아래로 점점 더 많이" 나오는 밀도 그라데이션
// - 은은한 중력으로 아래로 흐름, z는 캐릭터 "뒤"
// - prefers-reduced-motion·비-hover(터치) 환경에서는 비활성화
interface ParticleTrailProps {
  targetRef: RefObject<HTMLElement | null>
  containerRef: RefObject<HTMLElement | null>
}

interface P {
  x: number
  y: number
  vx: number
  vy: number
  life: number // 1 → 0
  ttl: number // 수명(ms)
  size: number
  phase: number
  tw: number
  spark: boolean
  tint: number
}

export default function ParticleTrail({ targetRef, containerRef }: ParticleTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !container || !ctx) return

    const SS = 64
    const mk = () => {
      const c = document.createElement('canvas')
      c.width = c.height = SS
      return { c, x: c.getContext('2d')! }
    }
    // 부드러운 글로우(색 변주): 은백 / 차가운 블루 / 옅은 골드
    const glowRGB = [
      [248, 250, 255],
      [202, 220, 255],
      [255, 241, 214],
    ]
    const glowSprites = glowRGB.map(([r, g, b]) => {
      const { c, x } = mk()
      const grad = x.createRadialGradient(SS / 2, SS / 2, 0, SS / 2, SS / 2, SS / 2)
      grad.addColorStop(0, `rgba(${r},${g},${b},1)`)
      grad.addColorStop(0.22, `rgba(${r},${g},${b},0.5)`)
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
      x.fillStyle = grad
      x.beginPath()
      x.arc(SS / 2, SS / 2, SS / 2, 0, Math.PI * 2)
      x.fill()
      return c
    })
    // 8방향 광선 스파클(별) — 긴 십자 + 짧은 대각선
    const sparkleSprite = (() => {
      const { c, x } = mk()
      const core = x.createRadialGradient(SS / 2, SS / 2, 0, SS / 2, SS / 2, SS * 0.2)
      core.addColorStop(0, 'rgba(255,255,255,1)')
      core.addColorStop(1, 'rgba(255,255,255,0)')
      x.fillStyle = core
      x.beginPath()
      x.arc(SS / 2, SS / 2, SS * 0.2, 0, Math.PI * 2)
      x.fill()
      const ray = (rot: number, len: number, alpha: number, thick: number) => {
        x.save()
        x.translate(SS / 2, SS / 2)
        x.rotate(rot)
        const g = x.createLinearGradient(-len, 0, len, 0)
        g.addColorStop(0, 'rgba(240,246,255,0)')
        g.addColorStop(0.5, `rgba(240,246,255,${alpha})`)
        g.addColorStop(1, 'rgba(240,246,255,0)')
        x.fillStyle = g
        x.fillRect(-len, -thick / 2, len * 2, thick)
        x.restore()
      }
      ray(0, SS / 2, 0.95, 2) // 가로(길게)
      ray(Math.PI / 2, SS / 2, 0.95, 2) // 세로(길게)
      ray(Math.PI / 4, SS * 0.32, 0.5, 1.4) // 대각(짧게)
      ray(-Math.PI / 4, SS * 0.32, 0.5, 1.4)
      return c
    })()

    let raf = 0
    let running = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const r = container.getBoundingClientRect()
      canvas.width = Math.round(r.width * dpr)
      canvas.height = Math.round(r.height * dpr)
      canvas.style.width = `${r.width}px`
      canvas.style.height = `${r.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    let particles: P[] = []
    let last: { x: number; y: number } | null = null
    let lastT = performance.now()

    const loop = (t: number) => {
      if (!running) return
      const dt = Math.min(48, t - lastT)
      lastT = t
      const cRect = container.getBoundingClientRect()
      const tRect = targetRef.current?.getBoundingClientRect()

      if (tRect) {
        const cx = tRect.left - cRect.left + tRect.width / 2
        const cy = tRect.top - cRect.top + tRect.height / 2
        const w = tRect.width
        const h = tRect.height
        const top = cy - h / 2
        if (last) {
          const dx = cx - last.x
          const dy = cy - last.y
          const speed = Math.hypot(dx, dy)
          if (speed > 0.7) {
            const count = Math.min(16, Math.floor(speed / 2.0) + 4)
            for (let i = 0; i < count; i++) {
              // v: 0(위) → 1(아래). pow(<1)로 아래쪽에 더 강하게 몰아준다(하단 밀도↑).
              const v = Math.pow(Math.random(), 0.4)
              const spreadX = w * (0.26 + 0.28 * v) // 아래로 갈수록 가로로 더 퍼짐
              const spark = Math.random() < 0.3 // 소수만 반짝이는 별(은은하게)
              particles.push({
                x: cx - dx * 0.2 + (Math.random() - 0.5) * spreadX,
                y: top + v * h - dy * 0.2,
                vx: -dx * 0.05 + (Math.random() - 0.5) * 0.3,
                vy: -dy * 0.05 + (Math.random() - 0.5) * 0.3 + 0.15, // 살짝 아래로
                life: 1,
                ttl: 950 + Math.random() * 950,
                size: spark ? 8 + Math.random() * 11 : 5 + Math.random() * 9,
                phase: Math.random() * Math.PI * 2,
                tw: 1.6 + Math.random() * 3.4,
                spark,
                tint: Math.random() < 0.62 ? 0 : Math.random() < 0.6 ? 1 : 2,
              })
            }
          }
        }
        last = { x: cx, y: cy }
      }

      ctx.clearRect(0, 0, cRect.width, cRect.height)
      particles = particles.filter((p) => {
        p.life -= dt / p.ttl
        if (p.life <= 0) return false
        p.vy += dt * 0.0011 // 은은한 중력 → 아래로 흐름
        p.x += p.vx * dt * 0.05
        p.y += p.vy * dt * 0.05
        return true
      })
      if (particles.length > 1000) particles.splice(0, particles.length - 1000)

      ctx.globalCompositeOperation = 'lighter'
      for (const p of particles) {
        const s01 = 0.5 + 0.5 * Math.sin(p.phase + t * 0.011 * p.tw)
        // 별은 부드럽게 반짝이되 최저 밝기 바닥을 둬 사라지지 않게, 글로우는 잔잔하게
        const tw = p.spark ? 0.25 + 0.6 * Math.pow(s01, 2) : 0.4 + 0.45 * s01
        ctx.globalAlpha = Math.max(0, p.life) * (p.spark ? 0.7 : 0.48) * tw
        const s = p.size * (0.45 + p.life * 0.6)
        const sprite = p.spark ? sparkleSprite : glowSprites[p.tint]
        ctx.drawImage(sprite, p.x - s / 2, p.y - s / 2, s, s)
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduce, targetRef, containerRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    />
  )
}
