// Dados do site centralizados: edite aqui textos, contatos e serviços.

export const WHATSAPP = '5544920014599'
export const EMAIL = 'negocios.teofilos@gmail.com'
export const PHONE = { label: '(44) 3011-5323', href: 'tel:+554430115323' }
export const INSTAGRAM = { handle: '@ejrteofilos', url: 'https://www.instagram.com/ejrteofilos/' }
export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Av.+Colombo,+5790,+Bloco+Q-04,+Universidade+Estadual+de+Maring%C3%A1'

export const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`

export const NAV = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#conteudos', label: 'Conteúdos' },
  { href: '#contato', label: 'Contato' },
]

export const MARQUEE = ['Formulação', 'Rotulagem', 'POPs', 'Tabelas nutricionais', 'Pesquisa de mercado', 'Conformidade regulatória']

export const PILLARS = [
  { icon: 'i-cap', title: 'Conhecimento', text: 'Base científica da universidade aplicada a cada projeto, com revisão de professores.' },
  { icon: 'i-spark', title: 'Inovação', text: 'Acompanhamos ativos, tendências e novas exigências do mercado cosmético.' },
  { icon: 'i-leaf', title: 'Propósito', text: 'Formar profissionais enquanto ajudamos marcas a crescer com segurança.' },
]

export const SERVICES = [
  { icon: 'i-file', label: 'POPs', title: ['Procedimentos', 'Operacionais Padrão'], desc: 'Rotinas documentadas e padronizadas para garantir qualidade e conformidade na sua operação.', img: '/images/svc-1.webp', alt: 'Documentos de POP sobre a bancada', wa: 'POPs (Procedimentos Operacionais Padrão)' },
  { icon: 'i-tag', label: 'ROTULAGEM', title: ['Rotulagem', 'de cosméticos'], desc: 'Rótulos em conformidade com as normas da Anvisa, com orientação técnica especializada.', img: '/images/svc-2.webp', alt: 'Frasco de cosmético com rótulo', wa: 'Rotulagem de cosméticos' },
  { icon: 'i-table', label: 'TABELAS NUTRICIONAIS', title: ['Tabelas', 'nutricionais'], desc: 'Elaboração de informações nutricionais no padrão Anvisa, com precisão e clareza.', img: '/images/svc-3.webp', alt: 'Tabela de informação nutricional impressa', wa: 'Tabelas nutricionais' },
  { icon: 'i-flask', label: 'FORMULAÇÃO TEÓRICA', title: ['Formulação', 'teórica'], desc: 'Desenvolvimento de fórmulas com base técnica e científica para produtos seguros e eficazes.', img: '/images/svc-4.webp', alt: 'Conta-gotas sobre placa com gel', wa: 'Formulação teórica de cosméticos' },
  { icon: 'i-users', label: 'CONSULTORIA DE MERCADO', title: ['Consultoria', 'de mercado'], desc: 'Análise de mercado, público e concorrência para decisões mais estratégicas.', img: '/images/svc-5.webp', alt: 'Notebook com gráficos de mercado', wa: 'Consultoria de mercado' },
]

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

export const FORM_SERVICES = ['POPs', 'Rotulagem de cosméticos', 'Tabelas nutricionais', 'Formulação teórica de cosméticos', 'Consultoria e pesquisa de mercado', 'Ainda não sei']

/* ==========================================================================
   ⚠️ DADOS FICTÍCIOS — substituir pelos dados reais da Teófilos antes de publicar
   ========================================================================== */

// Endereço público do site (usado em SEO, sitemap e compartilhamento). Troque quando tiver o domínio final.
export const SITE_URL = 'https://teofilos.pages.dev'

export const STATS = [
  { value: 120, suffix: '+', label: 'Projetos entregues' },
  { value: 45, suffix: '+', label: 'Marcas atendidas' },
  { value: 9, suffix: '', label: 'Anos de atuação' },
  { value: 100, suffix: '%', label: 'Revisado por professores' },
]

// Marcas clientes (nomes inventados, exibidos como "logotipos" de texto)
export const CLIENTS = ['Flora Viva', 'Aurora Skin', 'Botânica Pura', 'Lumi Cosméticos', 'Verdê', 'Essenza', 'Maré Natural', 'Alba Derma']

export const TESTIMONIALS = [
  { quote: 'A equipe revisou toda a rotulagem da nossa linha capilar e encontrou pontos que nem imaginávamos. Lançamos com tranquilidade e dentro das normas.', name: 'Camila Rocha', role: 'Fundadora, Flora Viva' },
  { quote: 'Os POPs ficaram claros e fáceis de aplicar. Nossa produção ficou mais organizada e passamos na vistoria sem nenhuma pendência.', name: 'Rafael Mendes', role: 'Sócio, Botânica Pura' },
  { quote: 'Da ideia da fórmula até a pesquisa de mercado, tivemos um acompanhamento técnico de verdade, com um custo que cabia no orçamento de uma marca nova.', name: 'Juliana Faria', role: 'CEO, Aurora Skin' },
]

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

export const JOIN = {
  status: 'Inscrições abertas',
  period: '03 a 21 de março de 2027',
  // Link do formulário de inscrição (ex.: Google Forms). Vazio = botão leva ao WhatsApp.
  formUrl: '',
  perks: [
    { icon: 'i-flask', title: 'Prática real', text: 'Projetos com marcas de verdade desde o primeiro semestre.' },
    { icon: 'i-cap', title: 'Orientação docente', text: 'Acompanhamento de professores da UEM em cada entrega.' },
    { icon: 'i-users', title: 'Rede de contatos', text: 'Contato direto com empresas e com o Movimento Empresa Júnior.' },
  ],
}
