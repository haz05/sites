import { useRef, useState } from 'react'
import { CONTATO, EMAIL, FORM_SERVICES, MAPS_URL, PHONE, REDES_SOCIAIS, isEnabled, waLink } from '../data/content'
import { Icon } from './Icons'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [note, setNote] = useState('')
  const mailRef = useRef(null)

  const copyEmail = async () => {
    if (!EMAIL) return
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      if (mailRef.current) {
        getSelection().selectAllChildren(mailRef.current)
      }
    }
  }

  // Abre o WhatsApp com a mensagem pronta
  const onSubmit = (e) => {
    e.preventDefault()
    const f = e.currentTarget
    const nome = f.nome.value.trim()
    const servico = f.servico ? f.servico.value : ''
    const mensagem = f.mensagem.value.trim()

    if (!nome || !mensagem) {
      setNote('Preencha seu nome e a mensagem para continuar.')
      return
    }

    const texto = `Olá! Vim pelo site da Teófilos.\n\n*Nome:* ${nome}${servico ? `\n*Serviço de interesse:* ${servico}` : ''}\n\n${mensagem}`
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
            {/* E-mail */}
            {isEnabled(EMAIL) && (
              <div className="info-row">
                <Icon id="i-mail" />
                <span className="addr" id="mailAddr" ref={mailRef}>{EMAIL}</span>
                <button className="copy-btn" type="button" onClick={copyEmail}>{copied ? 'Copiado' : 'Copiar'}</button>
              </div>
            )}

            {/* WhatsApp */}
            {isEnabled(CONTATO.whatsappNumero) && (
              <div className="info-row">
                <Icon id="i-wa" />
                <a href={waLink('Olá! Vim pelo site da Teófilos.')} target="_blank" rel="noopener">
                  {CONTATO.whatsappNumero}
                </a>
              </div>
            )}

            {/* Telefone Fixo */}
            {PHONE && isEnabled(PHONE.label) && (
              <div className="info-row">
                <Icon id="i-phone" />
                <a href={PHONE.href}>{PHONE.label}</a>
              </div>
            )}

            {/* Horário de Atendimento (Exibido apenas se habilitado) */}
            {isEnabled(CONTATO.horarioAtendimento) && (
              <div className="info-row">
                <Icon id="i-clock" />
                <span>{CONTATO.horarioAtendimento}</span>
              </div>
            )}

            {/* Redes Sociais Ativas (Instagram, LinkedIn, etc.) */}
            {REDES_SOCIAIS.map((rede) => (
              <div className="info-row" key={rede.id}>
                <Icon id={rede.icon} />
                <a href={rede.url} target="_blank" rel="noopener">
                  {rede.handle || rede.name}
                </a>
              </div>
            ))}

            {/* Endereço */}
            {isEnabled(CONTATO.endereco?.linha1) && (
              <div className="info-row" style={{ alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                <Icon id="i-pin" style={{ marginTop: 3 }} />
                <a href={MAPS_URL} target="_blank" rel="noopener" style={{ lineHeight: 1.5 }}>
                  {CONTATO.endereco.local && <>{CONTATO.endereco.local}<br /></>}
                  {CONTATO.endereco.linha1 && <>{CONTATO.endereco.linha1}<br /></>}
                  {CONTATO.endereco.linha2 && <>{CONTATO.endereco.linha2}<br /></>}
                  {CONTATO.endereco.cep && <>{CONTATO.endereco.cep}</>}
                </a>
              </div>
            )}
          </div>

          {/* Mapa do Google Embed (Exibido apenas se habilitado) */}
          {isEnabled(CONTATO.mapsEmbed) && (
            <div className="contact-map-wrapper" data-reveal style={{ marginTop: '28px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--line)', height: '220px' }}>
              <iframe
                title="Localização Teófilos UEM Maringá"
                src={CONTATO.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>

        <form className="form" id="form" data-reveal noValidate onSubmit={onSubmit}>
          <div>
            <div className="field">
              <label htmlFor="f-nome">Nome</label>
              <input id="f-nome" name="nome" required autoComplete="name" />
            </div>
          </div>
          {FORM_SERVICES.length > 0 && (
            <div className="field">
              <label htmlFor="f-servico">Serviço de interesse</label>
              <select id="f-servico" name="servico">
                {FORM_SERVICES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          )}
          <div className="field">
            <label htmlFor="f-msg">Mensagem</label>
            <textarea id="f-msg" name="mensagem" required placeholder="Sobre o seu produto ou necessidade" />
          </div>
          <button className="btn btn-primary magnetic" type="submit">
            <Icon id="i-wa" className="ico wa" />Enviar pelo WhatsApp <Icon id="i-arrow" />
          </button>
          <p className="form-note" id="formNote" role="status">{note}</p>
        </form>
      </div>
    </section>
  )
}
