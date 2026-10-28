// Gera os assets otimizados em public/: imagens WebP, favicons e imagem de compartilhamento (Open Graph).
// As imagens originais (JPG/PNG) ficam em assets-src/images (não vão para o site publicado).
// Uso (só quando trocar/adicionar imagens): npm run images
import sharp from 'sharp'
import { readdir, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const pub = path.resolve('public')
const src = path.resolve('assets-src/images')
const img = path.join(pub, 'images')
await mkdir(img, { recursive: true })

// 1) JPG/PNG -> WebP (mantém o tamanho original, qualidade 78)
for (const f of await readdir(src)) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue
  const out = path.join(img, f.replace(/\.(jpe?g|png)$/i, '.webp'))
  const info = await sharp(path.join(src, f)).webp({ quality: 78, effort: 6 }).toFile(out)
  console.log(`webp  ${f} -> ${path.basename(out)} (${Math.round(info.size / 1024)} KB)`)
}

// 2) Ícones a partir do símbolo da marca
const MARK = `<g fill="none" stroke="#9cc3ab" stroke-width="5.5" stroke-linejoin="round"><path d="M6 45 L45 6 L45 45 Z"/><path d="M55 6 L94 45 L55 45 Z"/><path d="M6 55 L45 55 L45 94 Z"/><path d="M55 55 L94 55 L55 94 Z"/></g>`
const iconSvg = (pad = 18) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="#06281c"/><g transform="translate(${pad} ${pad}) scale(${(100 - pad * 2) / 100})">${MARK}</g></svg>`

await writeFile(path.join(pub, 'favicon.svg'), iconSvg())
for (const [name, size] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(Buffer.from(iconSvg(20))).resize(size, size).png().toFile(path.join(pub, name))
  console.log('icon ', name)
}

// 3) Imagem de compartilhamento 1200x630 (WhatsApp, Instagram, LinkedIn…)
const W = 1200, H = 630
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#f4f1ea" stop-opacity=".97"/><stop offset=".55" stop-color="#f4f1ea" stop-opacity=".85"/><stop offset=".8" stop-color="#f4f1ea" stop-opacity="0"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <g transform="translate(70 70) scale(.62)" fill="none" stroke="#0b4631" stroke-width="5.5" stroke-linejoin="round"><path d="M6 45 L45 6 L45 45 Z"/><path d="M55 6 L94 45 L55 45 Z"/><path d="M6 55 L45 55 L45 94 Z"/><path d="M55 55 L94 55 L55 94 Z"/></g>
  <text x="148" y="118" font-family="Segoe UI, Arial, sans-serif" font-weight="600" font-size="46" fill="#0b4631">teófilos</text>
  <text x="70" y="300" font-family="Georgia, serif" font-size="66" fill="#0e1a16">Da formulação</text>
  <text x="70" y="378" font-family="Georgia, serif" font-size="66" fill="#0e1a16">ao mercado,</text>
  <text x="70" y="456" font-family="Georgia, serif" font-style="italic" font-size="66" fill="#0b4631">com segurança.</text>
  <text x="70" y="540" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#46504b">Consultoria farmacêutica em cosméticos · Empresa Júnior da UEM</text>
</svg>`
await sharp(path.join(src, 'hero.jpg'))
  .resize(W, H, { fit: 'cover', position: 'right' })
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(pub, 'og-image.jpg'))
console.log('og    og-image.jpg')
