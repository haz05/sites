import { useEffect, useState } from 'react'
import { NAV } from '../data/content'
import { Icon, Logo } from './Icons'

export default function Header() {
  const [open, setOpen] = useState(false)

  // A classe "menu-open" fica no <body>, como no CSS original
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
  }, [open])

  return (
    <header className="header" id="header">
      <div className="header-row wrap">
        <Logo ariaLabel="Teófilos, início" />
        <nav className="nav" id="nav" aria-label="Principal">
          {NAV.map((l, i) => (
            <a key={l.href} href={l.href} className={i === 0 ? 'active' : undefined} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </nav>
        <a href="#contato" className="cta-pill magnetic">Fale com um especialista <Icon id="i-arrow" /></a>
        <button
          className="menu-btn"
          id="menuBtn"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        ><span /></button>
      </div>
    </header>
  )
}
