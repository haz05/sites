import { SERVICES, waLink } from '../data/content'
import { Icon } from './Icons'

export default function Services() {
  if (!SERVICES || SERVICES.length === 0) return null

  return (
    <section className="section services wrap" id="servicos">
      <div className="services-head">
        <div>
          <div className="kicker" data-reveal>Serviços</div>
          <h2 className="h2" data-reveal>Do papel <em>à prateleira.</em></h2>
        </div>
      </div>
      <ul className="svc-list" id="svcList">
        {SERVICES.map((s) => (
          <li className="svc" data-reveal key={s.id || s.label}>
            <span className="svc-icon"><Icon id={s.icon || 'i-flask'} /></span>
            <div>
              <span className="svc-label">{s.label}</span>
              <h3>
                {Array.isArray(s.title) ? (
                  s.title.map((part, i) => (
                    <span key={i}>
                      {part}
                      {i < s.title.length - 1 && <br />}
                    </span>
                  ))
                ) : (
                  s.title
                )}
              </h3>
            </div>
            <p className="svc-desc">{s.desc}</p>
            <div className="svc-img"><img src={s.img} alt={s.alt} loading="lazy" /></div>
            <a
              className="btn btn-wa magnetic"
              href={waLink(`Olá! Vim pelo site e gostaria de saber mais sobre ${s.wa || s.title}.`)}
              target="_blank"
              rel="noopener"
            >
              <Icon id="i-wa" className="ico wa" />Falar no WhatsApp<Icon id="i-arrow" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
