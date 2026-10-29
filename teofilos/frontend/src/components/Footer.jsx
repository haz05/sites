import { CONTATO, EMAIL, EMPRESA, PHONE, REDES_SOCIAIS, WHATSAPP, isEnabled } from '../data/content'
import { Logo } from './Icons'
import PrivacyModal from './PrivacyModal'

export default function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <div>
          <Logo />
          {isEnabled(EMPRESA.subtitulo) && (
            <p style={{ marginTop: 26, maxWidth: '34ch' }}>{EMPRESA.subtitulo}</p>
          )}
          {isEnabled(EMPRESA.cnpj) && (
            <p style={{ marginTop: 12, fontSize: '0.85rem', opacity: 0.8 }}>
              CNPJ: {EMPRESA.cnpj}
            </p>
          )}
        </div>
        <div>
          <h4>Navegue</h4>
          <ul>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#numeros">Números</a></li>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#diferenciais">Diferenciais</a></li>
            <li><a href="#depoimentos">Depoimentos</a></li>
            <li><a href="#conteudos">Conteúdos</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </div>
        <div>
          <h4>Contato</h4>
          <ul>
            {isEnabled(CONTATO.whatsappNumero) && (
              <li>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener">
                  WhatsApp {CONTATO.whatsappNumero}
                </a>
              </li>
            )}
            {PHONE && isEnabled(PHONE.label) && (
              <li>
                <a href={PHONE.href}>Telefone {PHONE.label}</a>
              </li>
            )}
            {isEnabled(EMAIL) && <li>{EMAIL}</li>}
            {isEnabled(CONTATO.horarioAtendimento) && (
              <li>Atendimento: {CONTATO.horarioAtendimento}</li>
            )}
            {REDES_SOCIAIS.map((rede) => (
              <li key={rede.id}>
                <a href={rede.url} target="_blank" rel="noopener">
                  {rede.name} {rede.handle ? `(${rede.handle})` : ''}
                </a>
              </li>
            ))}
            {isEnabled(CONTATO.endereco?.linha1) && (
              <li>
                {CONTATO.endereco.local && <>{CONTATO.endereco.local}<br /></>}
                {CONTATO.endereco.linha1 && <>{CONTATO.endereco.linha1}<br /></>}
                {CONTATO.endereco.linha2 && <>{CONTATO.endereco.linha2}<br /></>}
                {CONTATO.endereco.cep && <>{CONTATO.endereco.cep}</>}
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {EMPRESA.nome || 'Teófilos'}. Todos os direitos reservados. · <PrivacyModal />
        </span>
        <a href="#inicio">Voltar ao topo</a>
      </div>
    </footer>
  )
}
