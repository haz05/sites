import { CLIENTS, TESTIMONIALS } from '../data/content'

export default function Testimonials() {
  const hasTestimonials = Array.isArray(TESTIMONIALS) && TESTIMONIALS.length > 0
  const hasClients = Array.isArray(CLIENTS) && CLIENTS.length > 0

  if (!hasTestimonials && !hasClients) return null

  return (
    <section className="section testimonials wrap" id="depoimentos">
      {hasTestimonials && (
        <>
          <div className="kicker" data-reveal>Depoimentos</div>
          <h2 className="h2" data-reveal>Confiança de quem <em>já acelerou conosco.</em></h2>
          
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, idx) => (
              <div className="testimonial-card" data-reveal key={t.id || idx}>
                <div className="testimonial-quote-icon">“</div>
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  {t.role && <span>{t.role}</span>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {hasClients && (
        <div className="clients-bar" data-reveal>
          <div className="clients-label">Marcas e parceiros que confiam:</div>
          <div className="clients-list">
            {CLIENTS.map((c, idx) => (
              <span className="client-badge" key={idx}>{c}</span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
