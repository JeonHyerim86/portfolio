import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import MarqueeSection from './sections/MarqueeSection'
import AboutSection from './sections/AboutSection'
import ExpertiseSection from './sections/ExpertiseSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'

// 섹션 순서는 design-ex.md를 따르고, 콘텐츠는 prd.md 기준.
export default function App() {
  return (
    <div className="min-h-screen bg-ink" style={{ overflowX: 'clip' }}>
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ExpertiseSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  )
}
