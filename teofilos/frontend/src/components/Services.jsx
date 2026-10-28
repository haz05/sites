import { SERVICES, waLink } from '../data/content'
import { Icon } from './Icons'

export default function Services() {
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
          <li className="svc" data-reveal key={s.label}>
            <span className="svc-icon"><Icon id={s.icon} /></span>
            <div><span className="svc-label">{s.label}</span><h3>{s.title[0]}<br />{s.title[1]}</h3></div>
            <p className="svc-desc">{s.desc}</p>
            <div className="svc-img"><img src={s.img} alt={s.alt} loading="lazy" /></div>
            <a
              className="btn btn-wa magnetic"
              href={waLink(`Olá! Vim pelo site e gostaria de saber mais sobre ${s.wa}.`)}
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
