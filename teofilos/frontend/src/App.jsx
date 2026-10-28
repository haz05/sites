import { IconSprite } from './components/Icons'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Stats from './components/Stats'
import Services from './components/Services'
import Differentials from './components/Differentials'
import Testimonials from './components/Testimonials'
import Instagram from './components/Instagram'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloating from './components/WhatsAppFloating'
import { useSiteEffects } from './hooks/useSiteEffects'

function Loader() {
  return (
    <div className="loader" id="loader" aria-hidden="true">
      <div className="loader-inner">
        <svg viewBox="0 0 100 100">
          <path pathLength="1" d="M6 45 L45 6 L45 45 Z" /><path pathLength="1" d="M55 6 L94 45 L55 45 Z" /><path pathLength="1" d="M6 55 L45 55 L45 94 Z" /><path pathLength="1" d="M55 55 L94 55 L55 94 Z" />
        </svg>
        <div className="loader-word"><span>teófilos</span></div>
      </div>
      <div className="loader-bar"><i /></div>
    </div>
  )
}

export default function App() {
  useSiteEffects()

  return (
    <>
      <IconSprite />
      <Loader />
      <div className="cursor" id="cursor" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Stats />
        <Services />
        <Differentials />
        <Testimonials />
        <Instagram />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  )
}
