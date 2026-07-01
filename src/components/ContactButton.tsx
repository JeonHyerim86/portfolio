import { ArrowUpRight } from 'lucide-react'

// 히어로 CTA — 보라색 그라디언트를 버리고 사이트 팔레트(mist/ink)에 맞춘
// 크고 깔끔한 라이트 필 버튼. 호버 시 살짝 떠오르며 화살표가 이동한다.
interface ContactButtonProps {
  label?: string
  href?: string
  className?: string
}

export default function ContactButton({
  label = '연락하기',
  href = '#contact',
  className = '',
}: ContactButtonProps) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full bg-mist font-semibold uppercase tracking-widest text-ink shadow-lg shadow-black/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl sm:gap-3 px-8 py-4 text-sm sm:px-11 sm:py-5 sm:text-base md:px-14 md:text-lg ${className}`}
    >
      {label}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-5 sm:w-5"
        aria-hidden="true"
      />
    </a>
  )
}
