import { useState } from 'react'

export default function PrivacyModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="privacy-link"
        style={{ color: 'inherit', textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none', padding: 0, font: 'inherit' }}
      >
        Política de Privacidade
      </button>

      {open && (
        <div className="privacy-modal-overlay" onClick={() => setOpen(false)}>
          <div className="privacy-modal-box" onClick={e => e.stopPropagation()}>
            <div className="privacy-modal-header">
              <h3>Política de Privacidade e LGPD</h3>
              <button className="privacy-close-btn" onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="privacy-modal-body">
              <p>A <strong>Teófilos Consultoria Farmacêutica</strong> (Empresa Júnior da UEM) preza pela transparência, privacidade e proteção dos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).</p>

              <h4>1. Coleta de Informações</h4>
              <p>Ao interagir com nosso site, podemos receber as informações fornecidas voluntariamente ao iniciar um contato via WhatsApp ou e-mail (como nome e serviço de interesse).</p>

              <h4>2. Finalidade do Tratamento</h4>
              <p>Os dados coletados são utilizados exclusivamente para retorno de propostas comerciais, esclarecimento de dúvidas e atendimento direto aos serviços solicitados.</p>

              <h4>3. Compartilhamento</h4>
              <p>A Teófilos não vende, compartilha ou repassa dados com terceiros para fins promocionais sem seu consentimento expresso.</p>

              <h4>4. Seus Direitos</h4>
              <p>Você pode a qualquer momento solicitar a confirmação, correção ou exclusão dos seus dados cadastrais enviando um e-mail para <em>negocios.teofilos@gmail.com</em>.</p>
            </div>
            <div className="privacy-modal-footer">
              <button className="btn btn-primary" onClick={() => setOpen(false)}>Entendido</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

