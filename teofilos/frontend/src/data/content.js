// Dados do site centralizados:
// As informações de contatos, empresa, serviços, depoimentos, marcas e números
// agora vêm diretamente dos arquivos de texto editáveis na pasta '/conteudo' (Flat-File CMS).

import {
  CONTATO,
  EMPRESA,
  REDES_SOCIAIS,
  INSTAGRAM_INFO,
  SERVICOS_DINAMICOS,
  DEPOIMENTOS_DINAMICOS,
  PARCEIROS_DINAMICOS,
  NUMEROS_DINAMICOS,
  buildWhatsAppUrl,
  isEnabled,
  cleanValue,
} from './txtLoader'

export {
  CONTATO,
  EMPRESA,
  REDES_SOCIAIS,
  DEPOIMENTOS_DINAMICOS,
  PARCEIROS_DINAMICOS,
  NUMEROS_DINAMICOS,
  isEnabled,
  cleanValue,
}

// Contatos principais
export const WHATSAPP = CONTATO.whatsappLimpo || '5544920014599'
export const EMAIL = CONTATO.email || 'negocios.teofilos@gmail.com'
export const PHONE = CONTATO.telefone
  ? { label: CONTATO.telefone, href: `tel:+55${CONTATO.telefone.replace(/\D/g, '')}` }
  : null
export const INSTAGRAM = INSTAGRAM_INFO
export const MAPS_URL = CONTATO.mapsUrl || 'https://www.google.com/maps/search/?api=1&query=Universidade+Estadual+de+Maringa'

export const waLink = (text) => buildWhatsAppUrl(text)

export const NAV = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#conteudos', label: 'Conteúdos' },
  { href: '#contato', label: 'Contato' },
]

export const MARQUEE = [
  'Formulação',
  'Rotulagem',
  'POPs',
  'Tabelas nutricionais',
  'Pesquisa de mercado',
  'Conformidade regulatória',
]

export const PILLARS = [
  { icon: 'i-cap', title: 'Conhecimento', text: 'Base científica da universidade aplicada a cada projeto, com revisão de professores.' },
  { icon: 'i-spark', title: 'Inovação', text: 'Acompanhamos ativos, tendências e novas exigências do mercado cosmético.' },
  { icon: 'i-leaf', title: 'Propósito', text: 'Formar profissionais enquanto ajudamos marcas a crescer com segurança.' },
]

// Lista de serviços carregada dinamicamente dos arquivos da pasta 'conteudo/servicos/'
export const SERVICES = SERVICOS_DINAMICOS

export const DIFFS = [
  { icon: 'i-micro', title: 'Rigor técnico', text: 'Base científica em cada entrega.' },
  { icon: 'i-compass', title: 'Planejamento estratégico', text: 'Produto e negócio pensados juntos.' },
  { icon: 'i-shield', title: 'Conformidade regulatória', text: 'Tudo alinhado às normas da Anvisa.' },
  { icon: 'i-cap', title: 'Universidade', text: 'Orientação de professores da UEM.' },
]

export const STEPS = [
  { title: 'Diagnóstico', text: 'Entendemos sua necessidade.' },
  { title: 'Proposta', text: 'Escopo e prazos claros.' },
  { title: 'Execução', text: 'Trabalho com revisão técnica.' },
  { title: 'Entrega', text: 'Material final e suporte.' },
]

// Opções do formulário geradas dinamicamente com base nos serviços ativos
export const FORM_SERVICES = [
  ...SERVICOS_DINAMICOS.map((s) => s.wa || s.title),
  'Ainda não sei',
]

export const SITE_URL = EMPRESA.siteUrl || 'https://teofilos.pages.dev'

// Dados dinâmicos lidos das pastas correspondentes em 'conteudo/'
export const STATS = NUMEROS_DINAMICOS
export const CLIENTS = PARCEIROS_DINAMICOS
export const TESTIMONIALS = DEPOIMENTOS_DINAMICOS

export const TEAM = [
  { name: 'Ana Beatriz Lima', role: 'Presidente', area: 'Gestão' },
  { name: 'Lucas Oliveira', role: 'Diretor de Projetos', area: 'Projetos' },
  { name: 'Mariana Souza', role: 'Diretora Comercial', area: 'Negócios' },
  { name: 'Pedro Henrique Alves', role: 'Diretor de Qualidade', area: 'Qualidade' },
  { name: 'Larissa Costa', role: 'Diretora de Marketing', area: 'Marketing' },
  { name: 'Gabriel Martins', role: 'Diretor Financeiro', area: 'Finanças' },
]

export const ADVISORS = [
  { name: 'Profa. Dra. Helena Duarte', role: 'Orientadora · Cosmetologia' },
  { name: 'Prof. Dr. Ricardo Tavares', role: 'Orientador · Assuntos Regulatórios' },
]
