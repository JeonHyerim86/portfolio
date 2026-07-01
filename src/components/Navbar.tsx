import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

// design-ex.md 상단 nav 스타일 + PRD 요구(sticky GNB · scroll-spy · smooth scroll).
const links = [
  { id: 'about', label: '자기소개' },
  { id: 'expertise', label: '역량' },
  { id: 'portfolio', label: '포트폴리오' },
  { id: 'contact', label: '연락처' },
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const ids = ['home', ...links.map((l) => l.id)]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/70 backdrop-blur-md' : ''
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 py-4 md:py-5">
        <a
          href="#home"
          className="hidden sm:block font-display font-semibold tracking-wider text-mist text-lg lg:text-xl"
        >
          {profile.name}
        </a>
        <ul className="flex items-center gap-5 sm:gap-8 md:gap-10">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={`font-medium tracking-wide text-mist text-sm md:text-base lg:text-lg transition-opacity duration-200 hover:opacity-100 ${
                  active === l.id ? 'opacity-100' : 'opacity-60'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
