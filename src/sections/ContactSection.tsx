import { useState } from 'react'
import { Mail, Copy, Check, Github, ArrowUpRight } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { contact } from '../data/contact'
import { profile } from '../data/profile'

// PRD §6.4 연락처 — design-ex.md에는 전용 섹션이 없어 신규 추가.
// 폼이 아닌 직접 링크 중심(이메일 mailto+복사, GitHub 새 탭). 전화번호 비공개.
export default function ContactSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // 클립보드 접근 불가 시 조용히 무시 (mailto 링크로 대체 가능)
    }
  }

  return (
    <section
      id="contact"
      className="flex flex-col items-center gap-10 bg-ink px-5 py-24 text-center sm:px-8 sm:py-32 md:px-10"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading font-display font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 8.4vw, 7rem)' }}
        >
          Contact
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="mx-auto max-w-[40ch] break-keep leading-relaxed text-mist/80 text-[clamp(1.05rem,1.5vw,1.3rem)]">
          {contact.invitation}
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {/* 이메일: mailto + 복사 */}
          <div className="flex items-center overflow-hidden rounded-full border-2 border-mist">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 px-5 py-3 text-mist transition-colors hover:bg-mist/10 sm:px-6"
            >
              <Mail size={18} aria-hidden="true" />
              <span className="text-sm sm:text-base">{contact.email}</span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="이메일 주소 복사"
              className="flex items-center gap-1 border-l-2 border-mist px-4 py-3 text-mist transition-colors hover:bg-mist/10"
            >
              {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
              <span className="text-sm">{copied ? '복사됨' : '복사'}</span>
            </button>
          </div>

          {/* GitHub */}
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center justify-center gap-2 rounded-full border-2 border-mist px-6 py-3 text-mist transition-colors hover:bg-mist/10"
          >
            <Github size={18} aria-hidden="true" />
            <span className="text-sm sm:text-base">GitHub</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </FadeIn>

      <FadeIn delay={0.3}>
        <p className="mt-8 text-xs text-mist/40">
          © {profile.name} · 백엔드 개발자 포트폴리오
        </p>
      </FadeIn>
    </section>
  )
}
