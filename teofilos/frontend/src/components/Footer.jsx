import { EMAIL, INSTAGRAM, PHONE, WHATSAPP } from '../data/content'
import { Logo } from './Icons'
import PrivacyModal from './PrivacyModal'

export default function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <div>
          <Logo />
          <p style={{ marginTop: 26, maxWidth: '34ch' }}>Empresa Júnior da UEM especializada em cosméticos.</p>
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
            <li><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener">WhatsApp (44) 92001-4599</a></li>
            <li><a href={PHONE.href}>Telefone {PHONE.label}</a></li>
            <li>{EMAIL}</li>
            <li><a href={INSTAGRAM.url} target="_blank" rel="noopener">Instagram</a></li>
            <li>UEM, Av. Colombo, 5790<br />Bloco Q-04, Sala 09<br />Jd. Universitário, Maringá, PR<br />CEP 87020-900</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Teófilos. Todos os direitos reservados. · <PrivacyModal /></span>
        <span>Site por Leonardo Gomes</span>
        <a href="#inicio">Voltar ao topo</a>
      </div>
    </footer>
  )
}
