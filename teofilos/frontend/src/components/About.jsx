import { PILLARS } from '../data/content'
import { Icon, Mark } from './Icons'

// Quebra o texto em palavras (<span class="w">) para o destaque palavra-a-palavra no scroll
function Words({ text }) {
  return text.split(/(\s+)/).filter(Boolean).map((t, i) =>
    /^\s+$/.test(t) ? t : <span key={i} className="w">{t}</span>
  )
}

export default function About() {
  return (
    <section className="section about wrap" id="sobre">
      <Mark className="about-bgmark" id="aboutMark" />
      <div className="kicker" data-reveal>Quem somos</div>
      <div className="about-grid">
        <div className="about-text">
          <p className="about-statement" id="statement">
            <Words text="Somos a Empresa Júnior de consultoria farmacêutica da UEM, " />
            <em><Words text="especializada em cosméticos." /></em>
          </p>
          <p className="about-body" data-reveal>Formada por estudantes de Farmácia da Universidade Estadual de Maringá, a Teófilos une a base científica da universidade à prática do mercado. Atendemos marcas e empreendedores que desenvolvem cosméticos, da primeira ideia de fórmula até o rótulo final, sempre com orientação de professores e atenção às normas da Anvisa.</p>
          <dl className="facts" data-reveal>
            <div><dt>Sede</dt><dd>Maringá, PR</dd></div>
            <div><dt>Vínculo</dt><dd>UEM</dd></div>
            <div><dt>Foco</dt><dd>Cosméticos</dd></div>
          </dl>
        </div>
        <div className="about-visual">
          <figure className="about-media clip" id="aboutMedia" style={{ margin: 0 }}>
            <div className="crop" style={{ '--s': 3.4, '--x': '44%', '--y': '62%' }} />
          </figure>
          <figure className="about-media-sm" id="aboutSm"><div className="crop" style={{ '--s': 4.4, '--x': '79%', '--y': '44%' }} /></figure>
          <div className="about-badge" aria-hidden="true">
            <svg className="ring" viewBox="0 0 120 120">
              <defs><path id="circ" d="M60 60 m-48 0 a48 48 0 1 1 96 0 a48 48 0 1 1 -96 0" /></defs>
              <text><textPath href="#circ" textLength="298" lengthAdjust="spacing">Empresa Júnior ✦ UEM ✦ Farmácia ✦ Cosméticos ✦</textPath></text>
            </svg>
            <svg className="core" viewBox="0 0 100 100"><use href="#mark" /></svg>
          </div>
        </div>
      </div>
      <div className="pillars">
        {PILLARS.map((p, i) => (
          <div className="pillar" key={p.title}>
            <span className="pillar-ico"><Icon id={p.icon} /></span>
            <h3>{p.title}</h3>
            <span className="pillar-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
