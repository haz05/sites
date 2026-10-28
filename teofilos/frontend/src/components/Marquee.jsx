import { Fragment } from 'react'
import { MARQUEE } from '../data/content'

function Row({ hidden }) {
  return (
    <span aria-hidden={hidden || undefined}>
      {MARQUEE.map((t) => (
        <Fragment key={t}>{t} <svg viewBox="0 0 100 100"><use href="#mark" /></svg> </Fragment>
      ))}
    </span>
  )
}

export default function Marquee() {
  return (
    <div className="marquee" aria-label="Frentes de atuação">
      <div className="marquee-track" id="marquee">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
