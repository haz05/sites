import { useRef, useState } from 'react'
import { EMAIL, FORM_SERVICES, INSTAGRAM, MAPS_URL, PHONE, waLink } from '../data/content'
import { Icon } from './Icons'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [note, setNote] = useState('')
  const mailRef = useRef(null)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      getSelection().selectAllChildren(mailRef.current)
    }
  }

  // Abre o WhatsApp (app no celular / WhatsApp Web no computador) com a mensagem pronta
  const onSubmit = (e) => {
    e.preventDefault()
    const f = e.currentTarget
    const nome = f.nome.value.trim(), servico = f.servico.value, mensagem = f.mensagem.value.trim()
    if (!nome || !mensagem) { setNote('Preencha seu nome e a mensagem para continuar.'); return }

    const texto = `Olá! Vim pelo site da Teófilos.\n\n*Nome:* ${nome}\n*Serviço de interesse:* ${servico}\n\n${mensagem}`
    window.open(waLink(texto), '_blank', 'noopener')
    setNote('Abrindo o WhatsApp com a sua mensagem pronta…')
  }

  return (
    <section className="section contact wrap" id="contato">
      <div className="contact-grid">
        <div>
          <div className="kicker" data-reveal>Contato</div>
          <h2 className="h2" data-reveal>Vamos <em>conversar?</em></h2>
          <p className="lead" data-reveal style={{ marginTop: 28 }}>Conte sua ideia e retornamos com uma proposta.</p>
          <div className="contact-info" data-reveal>
            <div className="info-row"><Icon id="i-mail" /><span className="addr" id="mailAddr" ref={mailRef}>{EMAIL}</span><button className="copy-btn" type="button" onClick={copyEmail}>{copied ? 'Copiado' : 'Copiar'}</button></div>
            <div className="info-row"><Icon id="i-wa" /><a href={waLink('Olá! Vim pelo site da Teófilos.')} target="_blank" rel="noopener">(44) 92001-4599</a></div>
            <div className="info-row"><Icon id="i-phone" /><a href={PHONE.href}>{PHONE.label}</a></div>
            <div className="info-row"><Icon id="i-ig" /><a href={INSTAGRAM.url} target="_blank" rel="noopener">{INSTAGRAM.handle}</a></div>
            <div className="info-row" style={{ alignItems: 'flex-start', flexWrap: 'nowrap' }}>
              <Icon id="i-pin" style={{ marginTop: 3 }} />
              <a href={MAPS_URL} target="_blank" rel="noopener" style={{ lineHeight: 1.5 }}>Universidade Estadual de Maringá (UEM)<br />Av. Colombo, 5790, Bloco Q-04, Sala 09<br />Jd. Universitário, Maringá, PR<br />CEP 87020-900</a>
            </div>
          </div>

          <div className="contact-map-wrapper" data-reveal style={{ marginTop: '28px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--line)', height: '220px' }}>
            <iframe
              title="Localização Teófilos UEM Maringá"
              src="https://maps.google.com/maps?q=Universidade+Estadual+de+Maringa+Bloco+Q-04&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <form className="form" id="form" data-reveal noValidate onSubmit={onSubmit}>
          <div>
            <div className="field"><label htmlFor="f-nome">Nome</label><input id="f-nome" name="nome" required autoComplete="name" /></div>
          </div>
          <div className="field"><label htmlFor="f-servico">Serviço de interesse</label>
            <select id="f-servico" name="servico">{FORM_SERVICES.map((s) => <option key={s}>{s}</option>)}</select>
          </div>
          <div className="field"><label htmlFor="f-msg">Mensagem</label><textarea id="f-msg" name="mensagem" required placeholder="Sobre o seu produto" /></div>
          <button className="btn btn-primary magnetic" type="submit"><Icon id="i-wa" className="ico wa" />Enviar pelo WhatsApp <Icon id="i-arrow" /></button>
          <p className="form-note" id="formNote" role="status">{note}</p>
        </form>
      </div>
    </section>
  )
}
