import { INSTAGRAM } from '../data/content'
import { Icon } from './Icons'

export default function Instagram() {
  return (
    <section className="section posts wrap" id="conteudos">
      <div className="ig-bgtext" aria-hidden="true">
        <div className="ig-bgtrack" id="igTrack">
          {[0, 1, 2, 3].map((i) => <span key={i}>{INSTAGRAM.handle}</span>)}
        </div>
      </div>
      <div className="ig-wrap">
        <div className="kicker" data-reveal>Conteúdos</div>
        <a className="ig-logo" id="igLogo" href={INSTAGRAM.url} target="_blank" rel="noopener" aria-label="Abrir o Instagram da Teófilos">
          <span className="ig-pulse" /><span className="ig-pulse" style={{ animationDelay: '1.2s' }} />
          <span className="ig-tile">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect className="ig-d" pathLength="1" width="16" height="16" x="4" y="4" rx="4.6" />
              <circle className="ig-d" pathLength="1" cx="12" cy="12" r="3.7" />
              <circle cx="16.4" cy="7.6" r="1" fill="#fff" />
            </svg>
          </span>
        </a>
        <h2 className="h2" data-reveal>Acompanhe no <em>Instagram.</em></h2>
        <p className="lead" data-reveal>Dicas de cosmetologia, rotulagem e regulação no nosso perfil.</p>
        <a className="btn btn-primary btn-ig magnetic" data-reveal href={INSTAGRAM.url} target="_blank" rel="noopener">
          <Icon id="i-ig" />Seguir {INSTAGRAM.handle}<Icon id="i-arrow-ur" />
        </a>
      </div>
    </section>
  )
}
