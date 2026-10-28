import { waLink } from '../data/content'
import { Icon } from './Icons'

export default function WhatsAppFloating() {
  return (
    <a
      href={waLink('Olá! Vim pelo site da Teófilos e gostaria de tirar uma dúvida.')}
      className="wa-float"
      target="_blank"
      rel="noopener"
      aria-label="Fale conosco no WhatsApp"
    >
      <Icon id="i-wa" className="ico wa-float-icon" />
      <span className="wa-float-text">Fale Conosco</span>
    </a>
  )
}

