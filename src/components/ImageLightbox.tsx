import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// 프로젝트 카드의 사진을 클릭하면 열리는 슬라이드형 이미지 뷰어.
// ProjectModal과 같은 DNA: 포털 + 스크림, Esc 닫기, 스크롤 잠금, 모션 최소화 존중.
// ←/→ 키와 좌우 버튼으로 슬라이드 전환, 하단에 현재 위치(n / total) 표기.

interface ImageLightboxProps {
  images: string[]
  alt: string
  initialIndex: number
  onClose: () => void
}

export default function ImageLightbox({ images, alt, initialIndex, onClose }: ImageLightboxProps) {
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const [[index, direction], setSlide] = useState<[number, number]>([initialIndex, 0])
  const total = images.length

  const go = (dir: number) => setSlide(([i]) => [(i + dir + total) % total, dir])

  // onClose를 ref에 담아 키 핸들러 effect가 매 렌더마다 재등록되지 않게 한다.
  // (재등록되면 스크롤 잠금 복원값이 'hidden'으로 덮여 닫은 뒤에도 스크롤이 막힌다.)
  const closeRefFn = useRef(onClose)
  closeRefFn.current = onClose

  // 마운트 동안 스크롤 잠금 + 키보드(Esc 닫기, ←/→ 슬라이드) + 초기 포커스
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeRefFn.current()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const slideVariants = {
    enter: (dir: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: dir * -60 }),
  }

  // 포털로 body에 렌더 → 섹션 stacking context를 벗어나 최상단에 뜬다.
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} 크게 보기`}
    >
      {/* 스크림 */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" aria-hidden="true" />

      {/* 닫기 */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="이미지 뷰어 닫기"
        className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-mist/20 bg-ink/60 text-mist/70 transition-colors hover:bg-mist/10 hover:text-mist sm:right-6 sm:top-6"
      >
        <X size={18} aria-hidden="true" />
      </button>

      {/* 슬라이드 영역 */}
      <div
        className="relative z-[1] flex w-full max-w-6xl flex-1 items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* mode="wait": 이전 사진이 완전히 빠진 뒤 다음 사진이 들어와 겹침이 없다. */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`${alt} ${index + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_30px_80px_rgba(0,0,0,0.6)] sm:rounded-3xl"
            draggable={false}
          />
        </AnimatePresence>

        {/* 이전/다음 — 사진이 2장 이상일 때만 */}
        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="이전 이미지"
              className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-mist/20 bg-ink/60 text-mist/80 transition-colors hover:bg-mist/10 hover:text-mist sm:left-4"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="다음 이미지"
              className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-mist/20 bg-ink/60 text-mist/80 transition-colors hover:bg-mist/10 hover:text-mist sm:right-4"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      {/* 위치 표기 — 카드 eyebrow와 같은 톤 */}
      {total > 1 ? (
        <p
          className="relative z-[1] mt-4 text-xs uppercase tracking-widest text-mist/60 sm:text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {index + 1} / {total}
        </p>
      ) : null}
    </motion.div>,
    document.body,
  )
}
