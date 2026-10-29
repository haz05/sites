import { STATS } from '../data/content'

export default function Stats() {
  if (!STATS || STATS.length === 0) return null

  return (
    <section className="section stats wrap" id="numeros">
      <div className="kicker" data-reveal>Nossos Números</div>
      <div className="stats-grid">
        {STATS.map((s, idx) => (
          <div className="stat-card" data-reveal key={s.id || idx}>
            <div className="stat-value">
              <span>{s.value}</span>
              {s.suffix && <span className="stat-suffix">{s.suffix}</span>}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
