// design-ex.md LiveProjectButton 계열: 고스트/아웃라인 필 버튼.
interface GhostButtonProps {
  label: string
  href: string
  external?: boolean
  className?: string
}

export default function GhostButton({
  label,
  href,
  external = false,
  className = '',
}: GhostButtonProps) {
  const externalProps = external
    ? { target: '_blank', rel: 'noreferrer noopener' }
    : {}

  return (
    <a
      href={href}
      {...externalProps}
      className={`inline-block rounded-full border-2 border-mist text-mist font-medium tracking-wide px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-200 hover:bg-mist/10 ${className}`}
    >
      {label}
    </a>
  )
}
