import { DIFFS, STEPS } from '../data/content'
import { Icon, Mark } from './Icons'

export default function Differentials() {
  return (
    <section className="section diff wrap" id="diferenciais">
      <div className="diff-grid">
        <div className="diff-sticky">
          <div className="kicker" data-reveal>Diferenciais</div>
          <h2 className="h2" data-reveal>Por que a <em>Teófilos.</em></h2>
          <Mark className="diff-mark" id="diffMark" pathLength="1" />
        </div>
        <ul className="diff-list">
          {DIFFS.map((d) => (
            <li className="diff-item" key={d.title}>
              <Icon id={d.icon} />
              <div><h3>{d.title}</h3><p>{d.text}</p></div>
            </li>
          ))}
        </ul>
      </div>
      <div className="process">
        <div className="process-head">
          <h3 data-reveal>Como <em>trabalhamos</em></h3>
        </div>
        <div className="process-track" id="process">
          <div className="process-line"><i /></div>
          {STEPS.map((s, i) => (
            <div className="step" key={s.title}>
              <div className="step-dot">{i + 1}</div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
