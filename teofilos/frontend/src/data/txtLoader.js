// Carregador e analisador dos arquivos de conteúdo em texto (.txt)
// Converte os arquivos da pasta 'conteudo/' em dados estruturados para o React.

export function isEnabled(value) {
  if (value === null || value === undefined) return false
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return true
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return false
    const lower = trimmed.toLowerCase()
    return lower !== 'desabilitado' && lower !== 'disabled' && lower !== 'false'
  }
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') return Object.values(value).some(isEnabled)
  return false
}

export function cleanValue(value, defaultValue = null) {
  return isEnabled(value) ? String(value).trim() : defaultValue
}

// Faz o parse de um texto simples no formato chave: valor
export function parseTxt(rawText) {
  const result = {}
  if (!rawText || typeof rawText !== 'string') return result

  const lines = rawText.split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const colonIdx = trimmed.indexOf(':')
    if (colonIdx === -1) continue

    const key = trimmed.slice(0, colonIdx).trim().toLowerCase()
    const val = trimmed.slice(colonIdx + 1).trim()
    result[key] = val
  }
  return result
}

const getText = (mod) => (typeof mod === 'string' ? mod : mod?.default || '')

// Carrega os arquivos .txt suportando caminhos relativos
const rawFiles = {
  ...import.meta.glob('../../../conteudo/**/*.txt', { query: '?raw', eager: true }),
  ...import.meta.glob('../../conteudo/**/*.txt', { query: '?raw', eager: true }),
}

// 1. Processar dados de Contato
const rawContatoEntry = Object.entries(rawFiles).find(([path]) => path.endsWith('contato.txt'))
const rawContato = getText(rawContatoEntry?.[1])
const parsedContato = parseTxt(rawContato)

export const CONTATO = {
  whatsappNumero: cleanValue(parsedContato.whatsapp_numero, '(44) 92001-4599'),
  whatsappLimpo: cleanValue(parsedContato.whatsapp_numero_limpo, '5544920014599'),
  whatsappMensagem: cleanValue(parsedContato.whatsapp_mensagem_padrao, 'Olá! Vim pelo site da Teófilos e gostaria de mais informações.'),
  telefone: cleanValue(parsedContato.telefone),
  email: cleanValue(parsedContato.email, 'negocios.teofilos@gmail.com'),
  horarioAtendimento: cleanValue(parsedContato.horario_atendimento),
  endereco: {
    local: cleanValue(parsedContato.endereco_nome_local, 'Universidade Estadual de Maringá (UEM)'),
    linha1: cleanValue(parsedContato.endereco_linha_1, 'Av. Colombo, 5790, Bloco Q-04, Sala 09'),
    linha2: cleanValue(parsedContato.endereco_linha_2, 'Jd. Universitário, Maringá, PR'),
    cep: cleanValue(parsedContato.endereco_cep, 'CEP 87020-900'),
  },
  mapsUrl: cleanValue(parsedContato.google_maps_link, 'https://www.google.com/maps/search/?api=1&query=Av.+Colombo,+5790,+Bloco+Q-04,+Universidade+Estadual+de+Maring%C3%A1'),
  mapsEmbed: cleanValue(parsedContato.google_maps_embed, 'https://maps.google.com/maps?q=Universidade+Estadual+de+Maringa+Bloco+Q-04&t=&z=15&ie=UTF8&iwloc=&output=embed'),
}

// 2. Processar Redes Sociais com fallback
const socialDefinitions = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'i-ig',
    handle: cleanValue(parsedContato.instagram_usuario, '@ejrteofilos'),
    url: cleanValue(parsedContato.instagram_link, 'https://www.instagram.com/ejrteofilos/'),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'i-linkedin',
    handle: cleanValue(parsedContato.linkedin_usuario),
    url: cleanValue(parsedContato.linkedin_link),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'i-facebook',
    handle: cleanValue(parsedContato.facebook_usuario),
    url: cleanValue(parsedContato.facebook_link),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'i-tiktok',
    handle: cleanValue(parsedContato.tiktok_usuario),
    url: cleanValue(parsedContato.tiktok_link),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'i-youtube',
    handle: cleanValue(parsedContato.youtube_usuario),
    url: cleanValue(parsedContato.youtube_link),
  },
]

export const REDES_SOCIAIS = socialDefinitions.filter((item) => isEnabled(item.url))
export const INSTAGRAM_INFO = socialDefinitions.find((item) => item.id === 'instagram') || {
  handle: '@ejrteofilos',
  url: 'https://www.instagram.com/ejrteofilos/',
}

// 3. Processar dados da Empresa
const rawEmpresaEntry = Object.entries(rawFiles).find(([path]) => path.endsWith('empresa.txt'))
const rawEmpresa = getText(rawEmpresaEntry?.[1])
const parsedEmpresa = parseTxt(rawEmpresa)

export const EMPRESA = {
  nome: cleanValue(parsedEmpresa.nome_empresa, 'Teófilos'),
  razaoSocial: cleanValue(parsedEmpresa.razao_social, 'Teófilos Assessoria e Consultoria Farmacêutica'),
  subtitulo: cleanValue(parsedEmpresa.subtitulo_rodape, 'Empresa Júnior da UEM especializada em cosméticos.'),
  cnpj: cleanValue(parsedEmpresa.cnpj),
  siteUrl: cleanValue(parsedEmpresa.site_url, 'https://teofilos.pages.dev'),
}

// 4. Processar Serviços Dinâmicos
const serviceEntries = Object.entries(rawFiles)
  .filter(([path]) => path.includes('/servicos/') && path.endsWith('.txt'))
  .sort(([a], [b]) => a.localeCompare(b))

export const SERVICOS_DINAMICOS = serviceEntries
  .map(([filePath, mod]) => {
    const parsed = parseTxt(getText(mod))
    const status = cleanValue(parsed.status, 'Ativo')
    if (!isEnabled(status)) return null

    const titulo = cleanValue(parsed.titulo, 'Serviço')
    const imagem = cleanValue(parsed.imagem, 'svc-1.webp')
    const imgPath = imagem.startsWith('/') || imagem.startsWith('http') ? imagem : `/images/${imagem}`

    return {
      id: filePath.split('/').pop().replace('.txt', ''),
      status,
      icon: cleanValue(parsed.icone, 'i-flask'),
      label: cleanValue(parsed.categoria, 'SERVIÇO'),
      title: titulo,
      desc: cleanValue(parsed.descricao, ''),
      img: imgPath,
      alt: cleanValue(parsed.imagem_alt, titulo),
      wa: cleanValue(parsed.whatsapp_assunto, titulo),
    }
  })
  .filter(Boolean)

// 5. Processar Depoimentos Dinâmicos
const testimonialEntries = Object.entries(rawFiles)
  .filter(([path]) => path.includes('/depoimentos/') && path.endsWith('.txt'))
  .sort(([a], [b]) => a.localeCompare(b))

export const DEPOIMENTOS_DINAMICOS = testimonialEntries
  .map(([filePath, mod]) => {
    const parsed = parseTxt(getText(mod))
    const status = cleanValue(parsed.status, 'Ativo')
    if (!isEnabled(status)) return null

    const quote = cleanValue(parsed.depoimento || parsed.texto || parsed.quote)
    const name = cleanValue(parsed.nome || parsed.name)
    const role = cleanValue(parsed.cargo || parsed.role)
    if (!quote || !name) return null

    return {
      id: filePath.split('/').pop().replace('.txt', ''),
      quote,
      name,
      role: role || '',
    }
  })
  .filter(Boolean)

// 6. Processar Marcas Parceiras Dinâmicas
const partnerEntries = Object.entries(rawFiles)
  .filter(([path]) => path.includes('/parceiros/') && path.endsWith('.txt'))
  .sort(([a], [b]) => a.localeCompare(b))

export const PARCEIROS_DINAMICOS = partnerEntries
  .map(([, mod]) => {
    const parsed = parseTxt(getText(mod))
    const status = cleanValue(parsed.status, 'Ativo')
    if (!isEnabled(status)) return null
    return cleanValue(parsed.nome || parsed.name || parsed.marca)
  })
  .filter(Boolean)

// 7. Processar Nossos Números (Métricas) Dinâmicos
const statsEntries = Object.entries(rawFiles)
  .filter(([path]) => path.includes('/numeros/') && path.endsWith('.txt'))
  .sort(([a], [b]) => a.localeCompare(b))

export const NUMEROS_DINAMICOS = statsEntries
  .map(([filePath, mod]) => {
    const parsed = parseTxt(getText(mod))
    const status = cleanValue(parsed.status, 'Ativo')
    if (!isEnabled(status)) return null

    const rawValue = cleanValue(parsed.valor || parsed.numero || parsed.value)
    const label = cleanValue(parsed.legenda || parsed.rotulo || parsed.label)
    if (!rawValue || !label) return null

    const numValue = Number(rawValue)
    const value = !isNaN(numValue) ? numValue : rawValue
    const suffix = cleanValue(parsed.sufixo || parsed.suffix, '')

    return {
      id: filePath.split('/').pop().replace('.txt', ''),
      value,
      suffix,
      label,
    }
  })
  .filter(Boolean)

export const buildWhatsAppUrl = (text = '') => {
  const num = CONTATO.whatsappLimpo || '5544920014599'
  const msg = text || CONTATO.whatsappMensagem || 'Olá! Vim pelo site da Teófilos.'
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`
}
