import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/**
 * Todas as interações/animações do site original (GSAP + ScrollTrigger + Lenis),
 * portadas para React. Tudo é desfeito no cleanup (necessário no StrictMode/HMR).
 */
export function useSiteEffects() {
  useLayoutEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const $ = (s) => document.querySelector(s)
    const $$ = (s) => [...document.querySelectorAll(s)]

    // Registro de listeners para remover no cleanup
    const offs = []
    const on = (el, ev, fn, opts) => { el.addEventListener(ev, fn, opts); offs.push(() => el.removeEventListener(ev, fn, opts)) }
    const rafs = []

    /* header state */
    const header = $('#header'); let lastY = 0
    const onScroll = (y) => {
      header.classList.toggle('scrolled', y > 40)
      header.classList.toggle('hide', y > lastY && y > 500 && !document.body.classList.contains('menu-open'))
      lastY = y
    }
    on(window, 'scroll', () => onScroll(scrollY), { passive: true })

    /* active nav link */
    const links = $$('#nav a')
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting) links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id))
    }), { rootMargin: '-45% 0px -50% 0px' })
    $$('main section[id]').forEach((s) => io.observe(s))

    /* custom cursor */
    const cur = $('#cursor')
    if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
      let cx = 0, cy = 0, tx = 0, ty = 0
      on(window, 'mousemove', (e) => { tx = e.clientX; ty = e.clientY; cur.style.opacity = 1 })
      const loop = () => { cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18; cur.style.transform = `translate(${cx}px,${cy}px)`; rafs[0] = requestAnimationFrame(loop) }
      loop()
      $$('a,button,.svc').forEach((el) => { on(el, 'mouseenter', () => cur.classList.add('big')); on(el, 'mouseleave', () => cur.classList.remove('big')) })
      $$('.diff,.footer,.marquee').forEach((el) => { on(el, 'mouseenter', () => cur.classList.add('light')); on(el, 'mouseleave', () => cur.classList.remove('light')) })
    }

    /* magnetic buttons + glow */
    $$('.magnetic').forEach((b) => {
      on(b, 'mousemove', (e) => {
        const r = b.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top
        b.style.setProperty('--mx', x + 'px'); b.style.setProperty('--my', y + 'px')
        b.style.transform = `translate(${(x - r.width / 2) * 0.18}px, ${(y - r.height / 2) * 0.3}px)`
      })
      on(b, 'mouseleave', () => { b.style.transform = '' })
      b.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1), box-shadow .4s'
    })

    const words = $$('#statement .w')

    if (reduce) {
      words.forEach((w) => w.classList.add('on'))
      $$('.diff-item,.step').forEach((x) => x.classList.add('on'))
      $('#loader').style.display = 'none'
      return () => { offs.forEach((f) => f()); io.disconnect(); rafs.forEach(cancelAnimationFrame) }
    }

    /* Lenis smooth scroll */
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenis.on('scroll', (e) => { ScrollTrigger.update(); onScroll(e.scroll) })
    const lenisTick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(lenisTick); gsap.ticker.lagSmoothing(0)
    $$('a[href^="#"]').forEach((a) => on(a, 'click', (e) => {
      const id = a.getAttribute('href'); const t = id === '#inicio' ? 0 : document.querySelector(id)
      if (t !== null) { e.preventDefault(); lenis.scrollTo(t, { offset: -70, duration: 1.4 }) }
    }))

    let marqueeTick = null
    let emLoop = null

    const ctx = gsap.context(() => {
      /* ---------- Intro: preloader → hero ---------- */
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      gsap.set('.hero h1 .ch', { yPercent: 120, rotateX: -85, opacity: 0, filter: 'blur(6px)' })
      gsap.set('.hero-copy, .hero-actions', { opacity: 0, y: 24 })
      gsap.set('.header-row > *', { opacity: 0, y: -20 })
      gsap.set('.hero-photo', { scale: 1.18 })
      const emWave = (delay) => gsap.to('.hero h1 em .ch', { color: '#3a9a6c', y: -4, duration: 0.35, stagger: 0.05, yoyo: true, repeat: 1, ease: 'sine.inOut', delay })
      const seen = sessionStorage.getItem('teofilos_intro_seen')
      const introDurationMult = seen ? 0.35 : 1

      tl.to('#loader svg path', { strokeDashoffset: 0, duration: 0.6 * introDurationMult, stagger: 0.08, ease: 'power2.inOut' })
        .fromTo('.loader-word span', { y: '110%' }, { y: '0%', duration: 0.5 * introDurationMult }, 0.2 * introDurationMult)
        .to('.loader-bar i', { scaleX: 1, duration: 0.7 * introDurationMult, ease: 'power2.inOut' }, 0)
        .to('#loader', { clipPath: 'inset(0 0 100% 0)', duration: 0.6 * introDurationMult, ease: 'expo.inOut', onComplete: () => sessionStorage.setItem('teofilos_intro_seen', '1') }, 0.8 * introDurationMult)
        .set('#loader', { display: 'none' })
        .to('.hero-photo', { scale: 1, duration: 1.8 * introDurationMult, ease: 'power3.out' }, 0.8 * introDurationMult)
        .to('.header-row > *', { opacity: 1, y: 0, duration: 0.7 * introDurationMult, stagger: 0.06 }, 1.0 * introDurationMult)
        .to('.hero h1 .ch', { yPercent: 0, rotateX: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 * introDurationMult, stagger: 0.02 }, 1.1 * introDurationMult)
        .to('.swoosh path', { strokeDashoffset: 0, duration: 0.8 * introDurationMult, ease: 'power2.inOut' }, 1.6 * introDurationMult)
        .to('.hero-copy', { opacity: 1, y: 0, duration: 0.7 * introDurationMult }, 1.5 * introDurationMult)
        .to('.hero-actions', { opacity: 1, y: 0, duration: 0.7 * introDurationMult }, 1.6 * introDurationMult)
        .add(() => {
          // "onda" de cor no "com segurança." repetindo a cada ~4s
          const wave = (d) => { emLoop = emWave(d).eventCallback('onComplete', () => wave(4)) }
          wave(0.2)
        })
        .add(() => gsap.to('.hero-photo', { scale: 1.07, duration: 16, ease: 'sine.inOut', yoyo: true, repeat: -1 }))

      /* hero mouse parallax + scroll parallax */
      const media = $('#heroMedia')
      const qx = gsap.quickTo(media, 'x', { duration: 1.2, ease: 'power3' }), qy = gsap.quickTo(media, 'y', { duration: 1.2, ease: 'power3' })
      const hx = gsap.quickTo('.hero h1', 'rotateY', { duration: 1, ease: 'power3' }), hy = gsap.quickTo('.hero h1', 'rotateX', { duration: 1, ease: 'power3' })
      gsap.set('.hero h1', { transformPerspective: 1000 })
      on($('.hero'), 'mousemove', (e) => {
        hx((e.clientX / innerWidth - 0.5) * 6); hy((e.clientY / innerHeight - 0.5) * -4)
        qx((e.clientX / innerWidth - 0.5) * -8); qy((e.clientY / innerHeight - 0.5) * -5)
      })
      gsap.to('.hero-photo', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-content', { y: -60, opacity: 0.4, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })

      /* marquee: velocidade reage ao scroll */
      const mq = $('#marquee'); let mx = 0, dir = 1, boost = 0
      marqueeTick = () => { const half = mq.scrollWidth / 2; mx -= (0.6 + boost) * dir; boost *= 0.92; if (mx <= -half) mx += half; if (mx > 0) mx -= half; mq.style.transform = `translateX(${mx}px)` }
      gsap.ticker.add(marqueeTick)
      ScrollTrigger.create({ onUpdate: (s) => { dir = s.direction; boost = Math.min(Math.abs(s.getVelocity()) / 300, 12) } })

      /* revelações genéricas */
      ScrollTrigger.batch('[data-reveal]', { start: 'top 88%', once: true, onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, stagger: 0.1, ease: 'expo.out' }) })

      /* about: destaque palavra-a-palavra + clip da imagem */
      ScrollTrigger.create({ trigger: '#statement', start: 'top 80%', end: 'bottom 45%', scrub: true, onUpdate: (s) => { const n = Math.round(s.progress * words.length); words.forEach((w, i) => { if (i < n) w.classList.add('on') }) } })
      gsap.to('#aboutMedia', { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: '#aboutMedia', start: 'top 85%' } })
      $$('.about-media .crop').forEach((c) => gsap.fromTo(c, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: c.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }))

      /* quem somos */
      gsap.to('#aboutMark', { rotate: 120, ease: 'none', scrollTrigger: { trigger: '#sobre', start: 'top bottom', end: 'bottom top', scrub: 1 } })
      gsap.from('#aboutSm', { y: 120, rotate: -6, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.about-visual', start: 'top 75%' } })
      gsap.to('#aboutSm', { y: -50, ease: 'none', scrollTrigger: { trigger: '.about-visual', start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.from('.about-badge', { scale: 0, rotate: -180, duration: 1.4, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.about-visual', start: 'top 70%' } })
      gsap.to('.about-badge', { y: 60, ease: 'none', scrollTrigger: { trigger: '.about-visual', start: 'top bottom', end: 'bottom top', scrub: true } })
      ScrollTrigger.create({ trigger: '.facts', start: 'top 85%', once: true, onEnter: () => $('.facts').classList.add('in') })
      gsap.from('.pillar', { y: 80, opacity: 0, rotateX: -18, transformPerspective: 900, duration: 1.3, stagger: 0.14, ease: 'expo.out', scrollTrigger: { trigger: '.pillars', start: 'top 85%' } })
      $$('.pillar').forEach((c) => on(c, 'mousemove', (e) => { const r = c.getBoundingClientRect(); c.style.setProperty('--px', (e.clientX - r.left) + 'px'); c.style.setProperty('--py', (e.clientY - r.top) + 'px') }))

      /* instagram */
      gsap.from('.ig-logo', { scale: 0.3, rotate: -25, opacity: 0, duration: 1.4, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.ig-logo', start: 'top 85%' } })
      gsap.to('.ig-tile .ig-d', { strokeDashoffset: 0, duration: 1.4, stagger: 0.25, ease: 'power2.inOut', delay: 0.4, scrollTrigger: { trigger: '.ig-logo', start: 'top 85%' } })
      const lg = $('#igLogo')
      on(lg, 'mousemove', (e) => { const r = lg.getBoundingClientRect(); gsap.to(lg, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.6, ease: 'power3' }) })
      on(lg, 'mouseleave', () => gsap.to(lg, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,.4)' }))

      /* serviços: imagens entram com clip */
      $$('.svc-img').forEach((el) => gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 88%' } }))

      /* diferenciais */
      gsap.set('#diffMark path', { strokeDasharray: 1, strokeDashoffset: 1 })
      gsap.to('#diffMark path', { strokeDashoffset: 0, stagger: 0.15, ease: 'none', scrollTrigger: { trigger: '.diff-grid', start: 'top 70%', end: 'bottom 60%', scrub: 1 } })
      gsap.to('#diffMark', { rotate: 90, ease: 'none', scrollTrigger: { trigger: '.diff-grid', start: 'top bottom', end: 'bottom top', scrub: 1 } })
      $$('.diff-item').forEach((it) => ScrollTrigger.create({ trigger: it, start: 'top 70%', end: 'bottom 30%', onEnter: () => it.classList.add('on') }))
      ScrollTrigger.create({
        trigger: '#process', start: 'top 75%', end: 'bottom 55%', scrub: true,
        onUpdate: (s) => { gsap.set('.process-line i', { scaleX: s.progress }); $$('.step').forEach((st, i) => st.classList.toggle('on', s.progress >= i / 3 - 0.02)) },
      })
      gsap.from('.step', { opacity: 0, y: 40, stagger: 0.12, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '#process', start: 'top 85%' } })
    })

    const refresh = () => ScrollTrigger.refresh()
    on(window, 'load', refresh)

    return () => {
      ctx.revert()
      emLoop?.kill()
      gsap.killTweensOf('.hero h1 em .ch, .hero-photo')
      if (marqueeTick) gsap.ticker.remove(marqueeTick)
      gsap.ticker.remove(lenisTick)
      lenis.destroy()
      offs.forEach((f) => f())
      io.disconnect()
      rafs.forEach(cancelAnimationFrame)
    }
  }, [])
}
