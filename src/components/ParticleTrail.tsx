import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { useReducedMotion } from 'framer-motion'

// 움직이는 대상(targetRef)이 이동할 때 뒤에 은하수처럼 반짝이는 별빛을 흩뿌리는 캔버스 레이어.
// - 부드러운 글로우 + 4방향 스파클(별) 스프라이트, additive 블렌딩, 강한 twinkle로 반짝반짝
// - 은백/차가운 블루/옅은 골드 색 변주로 은하수 느낌, z는 캐릭터 "뒤"
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
  size: number // 그리기 크기(px)
  phase: number // 반짝임 위상
  tw: number // 반짝임 속도
  spark: boolean // 스파클(별) 여부
  tint: number // 글로우 색 인덱스
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
    // 4방향 광선 스파클(별)
    const sparkleSprite = (() => {
      const { c, x } = mk()
      const core = x.createRadialGradient(SS / 2, SS / 2, 0, SS / 2, SS / 2, SS * 0.18)
      core.addColorStop(0, 'rgba(255,255,255,1)')
      core.addColorStop(1, 'rgba(255,255,255,0)')
      x.fillStyle = core
      x.beginPath()
      x.arc(SS / 2, SS / 2, SS * 0.18, 0, Math.PI * 2)
      x.fill()
      const ray = (horizontal: boolean) => {
        const g = horizontal
          ? x.createLinearGradient(0, 0, SS, 0)
          : x.createLinearGradient(0, 0, 0, SS)
        g.addColorStop(0, 'rgba(232,240,255,0)')
        g.addColorStop(0.5, 'rgba(232,240,255,0.95)')
        g.addColorStop(1, 'rgba(232,240,255,0)')
        x.fillStyle = g
        if (horizontal) x.fillRect(0, SS / 2 - 1, SS, 2)
        else x.fillRect(SS / 2 - 1, 0, 2, SS)
      }
      ray(true)
      ray(false)
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
        if (last) {
          const dx = cx - last.x
          const dy = cy - last.y
          const speed = Math.hypot(dx, dy)
          if (speed > 1.1) {
            const count = Math.min(7, Math.floor(speed / 3) + 2)
            const spread = tRect.width * 0.44
            for (let i = 0; i < count; i++) {
              const ang = Math.random() * Math.PI * 2
              const rad = spread * (0.45 + Math.random() * 0.6)
              const rt = Math.random()
              const spark = Math.random() < 0.32 // 일부는 반짝 스파클
              particles.push({
                x: cx - dx * 0.22 + Math.cos(ang) * rad * 0.72,
                y: cy - dy * 0.22 + Math.sin(ang) * rad,
                vx: -dx * 0.06 + (Math.random() - 0.5) * 0.35,
                vy: -dy * 0.06 + (Math.random() - 0.5) * 0.35 - 0.1,
                life: 1,
                ttl: 900 + Math.random() * 950,
                size: spark ? 9 + Math.random() * 14 : 5 + Math.random() * 12,
                phase: Math.random() * Math.PI * 2,
                tw: 1.4 + Math.random() * 3.2, // 더 빠르고 다양한 반짝임
                spark,
                tint: rt < 0.62 ? 0 : rt < 0.85 ? 1 : 2, // 은백 위주 + 블루/골드
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
        p.x += p.vx * dt * 0.05
        p.y += p.vy * dt * 0.05
        return true
      })
      if (particles.length > 460) particles.splice(0, particles.length - 460)

      ctx.globalCompositeOperation = 'lighter'
      for (const p of particles) {
        const s01 = 0.5 + 0.5 * Math.sin(p.phase + t * 0.01 * p.tw)
        // 스파클은 날카롭게 번쩍(twinkle), 글로우는 은은하게
        const tw = p.spark ? Math.pow(s01, 3) : 0.35 + 0.65 * s01
        ctx.globalAlpha = Math.max(0, p.life) * (p.spark ? 0.95 : 0.5) * tw
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
