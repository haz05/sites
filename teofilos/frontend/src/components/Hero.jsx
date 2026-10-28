import { Icon } from './Icons'

// Quebra o texto em palavras > letras (<span class="ch">) para a animação de entrada
function Letters({ text }) {
  const parts = text.split(/(\s+)/).filter(Boolean)
  return parts.map((word, i) =>
    /^\s+$/.test(word) ? ' ' : (
      <span key={i} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {[...word].map((c, j) => <span key={j} className="ch">{c}</span>)}
      </span>
    )
  )
}

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-media" id="heroMedia">
        <div className="hero-photo" role="img" aria-label="Farmacêutica manipulando creme cosmético em bancada de mármore com vidrarias e folhas" />
      </div>

      <div className="hero-content">
        <h1>
          <span className="ln"><span><Letters text="Da formulação" /></span></span>
          <span className="ln"><span><Letters text="ao mercado," /></span></span>
          <span className="ln ln-em"><span>
            <em><Letters text="com segurança." /></em>
            <svg className="swoosh" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M4 17 C 90 6, 240 3, 396 12" /></svg>
          </span></span>
        </h1>
        <p className="hero-copy">Assessoria e consultoria farmacêutica especializada em cosméticos.</p>
        <div className="hero-actions">
          <a href="#servicos" className="btn btn-primary magnetic">Conheça nossos serviços <Icon id="i-arrow" /></a>
          <a href="#contato" className="link-line">Falar com um especialista <Icon id="i-arrow" /></a>
        </div>
      </div>
      <div className="hero-spacer" aria-hidden="true" />
    </section>
  )
}
