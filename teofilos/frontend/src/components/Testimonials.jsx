import { CLIENTS, TESTIMONIALS } from '../data/content'
import { Icon } from './Icons'

export default function Testimonials() {
  return (
    <section className="section testimonials wrap" id="depoimentos">
      <div className="kicker" data-reveal>Depoimentos</div>
      <h2 className="h2" data-reveal>Confiança de quem <em>já acelerou conosco.</em></h2>
      
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, idx) => (
          <div className="testimonial-card" data-reveal key={idx}>
            <div className="testimonial-quote-icon">“</div>
            <p className="testimonial-text">{t.quote}</p>
            <div className="testimonial-author">
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="clients-bar" data-reveal>
        <div className="clients-label">Marcas e parceiros que confiam:</div>
        <div className="clients-list">
          {CLIENTS.map((c, idx) => (
            <span className="client-badge" key={idx}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

