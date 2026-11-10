import { CompetitionEvent, DayInfo, NewsItem, ResultSource, Sport, Venue } from '../types';

export const COMPETITION_DAYS: DayInfo[] = [
  { day: 14, date: '2026-11-14', dayname: 'SÁB', label: 'sábado, 14 de novembro', count: 1 },
  { day: 15, date: '2026-11-15', dayname: 'DOM', label: 'domingo, 15 de novembro', count: 4 },
  { day: 16, date: '2026-11-16', dayname: 'SEG', label: 'segunda-feira, 16 de novembro', count: 4 },
  { day: 17, date: '2026-11-17', dayname: 'TER', label: 'terça-feira, 17 de novembro', count: 6 },
  { day: 18, date: '2026-11-18', dayname: 'QUA', label: 'quarta-feira, 18 de novembro', count: 4 },
  { day: 19, date: '2026-11-19', dayname: 'QUI', label: 'quinta-feira, 19 de novembro', count: 5 },
  { day: 20, date: '2026-11-20', dayname: 'SEX', label: 'sexta-feira, 20 de novembro', count: 6 },
  { day: 21, date: '2026-11-21', dayname: 'SÁB', label: 'sábado, 21 de novembro', count: 4 },
  { day: 22, date: '2026-11-22', dayname: 'DOM', label: 'domingo, 22 de novembro', count: 5 },
  { day: 23, date: '2026-11-23', dayname: 'SEG', label: 'segunda-feira, 23 de novembro', count: 6 },
  { day: 24, date: '2026-11-24', dayname: 'TER', label: 'terça-feira, 24 de novembro', count: 4 },
  { day: 25, date: '2026-11-25', dayname: 'QUA', label: 'quarta-feira, 25 de novembro', count: 5 },
  { day: 26, date: '2026-11-26', dayname: 'QUI', label: 'quinta-feira, 26 de novembro', count: 6 },
  { day: 27, date: '2026-11-27', dayname: 'SEX', label: 'sexta-feira, 27 de novembro', count: 5 },
  { day: 28, date: '2026-11-28', dayname: 'SÁB', label: 'sábado, 28 de novembro', count: 3 }
];

export const INITIAL_SPORTS: Sport[] = [
  {
    slug: 'cerimonias',
    name: 'Cerimônias',
    icon: 'flame',
    count: 1,
    image: '/assets/card-abertura-nova-arena.jpg',
    categories: ['Cerimônia oficial'],
    description: 'Abertura e encerramento oficial dos 65º Jogos Abertos de Santa Catarina, marcando a história esportiva de Rio do Sul e a inauguração da Nova Arena.',
    defaultVenue: 'Nova Arena de Rio do Sul'
  },
  {
    slug: 'atletismo',
    name: 'Atletismo',
    icon: 'running',
    count: 6,
    image: '/assets/mod-atletismo.jpg',
    categories: ['Feminino', 'Masculino'],
    description: 'Provas de velocidade, meio-fundo, saltos e arremessos reunindo as principais delegações municipais de Santa Catarina.',
    defaultVenue: 'Pista de atletismo — exemplo'
  },
  {
    slug: 'natacao',
    name: 'Natação',
    icon: 'swimming',
    count: 7,
    image: '/assets/mod-natacao.jpg',
    categories: ['Feminino', 'Masculino'],
    description: 'Provas eliminatórias e finais nos nados livre, costas, peito, borboleta e revezamentos.',
    defaultVenue: 'Complexo aquático — exemplo'
  },
  {
    slug: 'voleibol',
    name: 'Voleibol',
    icon: 'volleyball',
    count: 7,
    image: '/assets/mod-voleibol.jpg',
    categories: ['Feminino', 'Masculino'],
    description: 'Disputas eletrizantes entre as equipes classificadas das etapas regionais da Fesporte.',
    defaultVenue: 'Ginásio de esportes — exemplo A'
  },
  {
    slug: 'futsal',
    name: 'Futsal',
    icon: 'football',
    count: 8,
    image: '/assets/mod-futsal.jpg',
    categories: ['Feminino', 'Masculino'],
    description: 'Uma das modalidades mais tradicionais e concorridas de Santa Catarina, com grandes clássicos municipais.',
    defaultVenue: 'Ginásio de esportes — exemplo B'
  },
  {
    slug: 'judo',
    name: 'Judô',
    icon: 'medal',
    count: 6,
    image: '/assets/mod-judo.jpg',
    categories: ['Feminino', 'Masculino'],
    description: 'Combates divididos por faixas de peso e disputas por equipes, com atletas de nível nacional.',
    defaultVenue: 'Nova Arena de Rio do Sul'
  },
  {
    slug: 'ciclismo',
    name: 'Ciclismo',
    icon: 'bicycle',
    count: 7,
    image: '/assets/mod-ciclismo.jpg',
    categories: ['Feminino', 'Masculino'],
    description: 'Etapas de Contrarrelógio Individual, Estrada, Cross Country Olímpico (MTB) e BMX pelas paisagens de Rio do Sul.',
    defaultVenue: 'Circuito de ciclismo — exemplo'
  },
  {
    slug: 'basquete',
    name: 'Basquete',
    icon: 'basketball',
    count: 5,
    image: '',
    categories: ['Feminino', 'Masculino'],
    description: 'Torneio de basquetebol masculino e feminino, com fase de grupos, semifinais e grande final.',
    defaultVenue: 'Ginásio de esportes — exemplo A'
  }
];

export const ALL_JASC_MODALITIES = [
  'Cerimônias',
  'Atletismo',
  'Basquete',
  'Bocha',
  'Bolão 16',
  'Bolão 23',
  'Ciclismo',
  'Futebol',
  'Futsal',
  'Ginástica Artística',
  'Ginástica Rítmica',
  'Handebol',
  'Jiu-Jitsu',
  'Judô',
  'Karatê',
  'Natação',
  'Remo',
  'Taekwondo',
  'Tênis',
  'Tênis de Mesa',
  'Tiro de Armas Curtas',
  'Tiro de Armas Longas',
  'Tiro ao Prato',
  'Triathlon',
  'Voleibol',
  'Vôlei de Praia',
  'Xadrez'
];

export const INITIAL_VENUES: Venue[] = [
  {
    slug: 'nova-arena-de-rio-do-sul',
    name: 'Nova Arena de Rio do Sul',
    address: 'Endereço a ser informado pela organização',
    icon: 'arena',
    official: true,
    mapUrl: 'https://maps.google.com/?q=Rio+do+Sul+SC',
    description: 'Principal praça esportiva construída para os 65º JASC, palco da cerimônia de abertura e das grandes decisões.',
    sports: ['Cerimônias', 'Futsal', 'Judô', 'Voleibol']
  },
  {
    slug: 'ginasio-de-esportes-exemplo-a',
    name: 'Ginásio de esportes — exemplo A',
    address: 'Endereço a ser informado pela organização',
    icon: 'gym',
    official: false,
    mapUrl: 'https://maps.google.com/?q=Rio+do+Sul+SC',
    description: 'Espaço com quadra poliesportiva para modalidades coletivas demonstrativas.',
    sports: ['Voleibol', 'Basquete']
  },
  {
    slug: 'ginasio-de-esportes-exemplo-b',
    name: 'Ginásio de esportes — exemplo B',
    address: 'Endereço a ser informado pela organização',
    icon: 'gym',
    official: false,
    mapUrl: 'https://maps.google.com/?q=Rio+do+Sul+SC',
    description: 'Ginásio auxiliar reservado para partidas da fase de grupos.',
    sports: ['Futsal', 'Handebol']
  },
  {
    slug: 'complexo-aquatico-exemplo',
    name: 'Complexo aquático — exemplo',
    address: 'Endereço a ser informado pela organização',
    icon: 'pool',
    official: false,
    mapUrl: 'https://maps.google.com/?q=Rio+do+Sul+SC',
    description: 'Parque aquático com piscina semiolímpica e arquibancada para provas de natação.',
    sports: ['Natação']
  },
  {
    slug: 'pista-de-atletismo-exemplo',
    name: 'Pista de atletismo — exemplo',
    address: 'Endereço a ser informado pela organização',
    icon: 'track',
    official: false,
    mapUrl: 'https://maps.google.com/?q=Rio+do+Sul+SC',
    description: 'Instalação com pista sintética para corridas rasas, com obstáculos e áreas de campo.',
    sports: ['Atletismo']
  },
  {
    slug: 'circuito-de-ciclismo-exemplo',
    name: 'Circuito de ciclismo — exemplo',
    address: 'Endereço a ser informado pela organização',
    icon: 'road',
    official: false,
    mapUrl: 'https://maps.google.com/?q=Rio+do+Sul+SC',
    description: 'Trajeto delineado nas vias municipais de Rio do Sul para provas de estrada e contrarrelógio.',
    sports: ['Ciclismo']
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    slug: 'portal-dos-jasc-2026-em-fase-de-testes',
    kind: 'Comunicado',
    date: '9 de novembro de 2026',
    title: 'Portal dos JASC 2026 em fase de testes',
    desc: 'Programação, locais e resultados exibidos neste momento são demonstrativos e serão substituídos pelas informações oficiais.',
    demo: true,
    content: 'O Comitê Organizador dos 65º Jogos Abertos de Santa Catarina (JASC 2026) informa que o portal institucional encontra-se em fase de homologação técnica e testes de usabilidade. Todas as datas, modalidades e locais apresentados com o selo demonstrativo servem para validação da interface e serão atualizados conforme a publicação dos boletins técnicos oficiais da Fesporte e da SEMEL de Rio do Sul.'
  },
  {
    slug: 'exemplo-de-comunicado-alteracao-de-horario',
    kind: 'Programação',
    date: '8 de novembro de 2026',
    title: 'Exemplo de comunicado: alteração de horário',
    desc: 'Modelo de como os comunicados de alteração de horário ou local serão apresentados aos visitantes.',
    demo: true,
    content: 'Este é um modelo visual e funcional demonstrando como a Comissão Central Organizadora comunicará eventuais mudanças de horário, realocações de praças esportivas ou condições climáticas aos atletas, dirigentes e ao público durante o período dos Jogos (14 a 28 de novembro de 2026).'
  },
  {
    slug: 'abertura-oficial-dos-jasc-2026-sera-em-14-de-novembro-as-19h',
    kind: 'Cerimônia',
    date: '5 de novembro de 2026',
    title: 'Abertura oficial dos JASC 2026 será em 14 de novembro, às 19h',
    desc: 'A cerimônia marca o início dos 65º Jogos Abertos de Santa Catarina e a inauguração da nova arena de Rio do Sul.',
    demo: false,
    img: '/assets/card-abertura-nova-arena.jpg',
    content: 'A cidade de Rio do Sul se prepara para receber a maior celebração do esporte catarinense. Em 14 de novembro de 2026, às 19 horas, acontecerá a solenidade oficial de abertura dos 65º Jogos Abertos de Santa Catarina, acompanhada da inauguração da Nova Arena de Rio do Sul. O evento reunirá delegações de todas as regiões do Estado, autoridades municipais e estaduais, além da comunidade esportiva, dando início a duas semanas de intensa competição.'
  }
];

export const INITIAL_EVENTS: CompetitionEvent[] = [
  // Day 1: 14 de Novembro (Abertura Oficial)
  {
    id: 'evt-abertura',
    date: '2026-11-14',
    time: '19:00',
    sport: 'Cerimônias',
    category: 'Cerimônia oficial',
    title: 'Abertura oficial dos JASC 2026 e inauguração da nova arena',
    venue: 'Nova Arena de Rio do Sul',
    statusEsportivo: 'Confirmada',
    statusPublicacao: 'Publicado',
    demo: false,
    observations: 'Início oficial dos 65º Jogos Abertos de Santa Catarina em Rio do Sul.',
    createdAt: '2026-11-05T10:00:00Z'
  },
  // Upcoming events featured on the homepage (matching screenshot 03_proximas_competicoes):
  {
    id: 'evt-atletismo-100m',
    date: '2026-11-15',
    time: '08:30',
    sport: 'Atletismo',
    category: 'Feminino',
    title: 'Eliminatórias 100 m rasos',
    venue: 'Pista de atletismo — exemplo',
    statusEsportivo: 'Prevista',
    statusPublicacao: 'Publicado',
    demo: true,
    observations: 'Atividade demonstrativa de calendário.'
  },
  {
    id: 'evt-natacao-50m',
    date: '2026-11-15',
    time: '17:00',
    sport: 'Natação',
    category: 'Feminino',
    title: 'Eliminatórias 50 m livre',
    venue: 'Complexo aquático — exemplo',
    statusEsportivo: 'Prevista',
    statusPublicacao: 'Publicado',
    demo: true,
    observations: 'Atividade demonstrativa de calendário.'
  },
  {
    id: 'evt-ciclismo-contra',
    date: '2026-11-16',
    time: '08:00',
    sport: 'Ciclismo',
    category: 'Feminino',
    title: 'Contrarrelógio individual',
    venue: 'Circuito de ciclismo — exemplo',
    statusEsportivo: 'Prevista',
    statusPublicacao: 'Publicado',
    demo: true,
    observations: 'Atividade demonstrativa de calendário.'
  },
  // Additional demo events across the days for full coverage
  {
    id: 'evt-volei-fase1',
    date: '2026-11-15',
    time: '14:00',
    sport: 'Voleibol',
    category: 'Masculino',
    title: 'Partida da fase classificatória',
    venue: 'Ginásio de esportes — exemplo A',
    statusEsportivo: 'Prevista',
    statusPublicacao: 'Publicado',
    demo: true
  },
  {
    id: 'evt-futsal-grupos',
    date: '2026-11-15',
    time: '19:30',
    sport: 'Futsal',
    category: 'Masculino',
    title: 'Jogo da fase de grupos',
    venue: 'Ginásio de esportes — exemplo B',
    statusEsportivo: 'Prevista',
    statusPublicacao: 'Publicado',
    demo: true
  },
  {
    id: 'evt-judo-cat',
    date: '2026-11-16',
    time: '09:00',
    sport: 'Judô',
    category: 'Masculino',
    title: 'Disputas por categoria',
    venue: 'Nova Arena de Rio do Sul',
    statusEsportivo: 'Prevista',
    statusPublicacao: 'Publicado',
    demo: true
  },
  {
    id: 'evt-basquete-classif',
    date: '2026-11-16',
    time: '15:30',
    sport: 'Basquete',
    category: 'Masculino',
    title: 'Partida classificatória',
    venue: 'Ginásio de esportes — exemplo A',
    statusEsportivo: 'Prevista',
    statusPublicacao: 'Publicado',
    demo: true
  },
  {
    id: 'evt-atletismo-salto',
    date: '2026-11-17',
    time: '10:00',
    sport: 'Atletismo',
    category: 'Masculino',
    title: 'Final do salto em distância',
    venue: 'Pista de atletismo — exemplo',
    statusEsportivo: 'Prevista',
    statusPublicacao: 'Publicado',
    demo: true
  },
  {
    id: 'evt-natacao-provas',
    date: '2026-11-17',
    time: '16:00',
    sport: 'Natação',
    category: 'Masculino',
    title: 'Provas classificatórias',
    venue: 'Complexo aquático — exemplo',
    statusEsportivo: 'Prevista',
    statusPublicacao: 'Publicado',
    demo: true
  },
  {
    id: 'evt-futsal-dia17',
    date: '2026-11-17',
    time: '20:00',
    sport: 'Futsal',
    category: 'Feminino',
    title: 'Fase classificatória - Grupo B',
    venue: 'Ginásio de esportes — exemplo B',
    statusEsportivo: 'Prevista',
    statusPublicacao: 'Publicado',
    demo: true
  },
  {
    id: 'evt-ciclismo-estrada',
    date: '2026-11-18',
    time: '08:00',
    sport: 'Ciclismo',
    category: 'Masculino',
    title: 'Prova de ciclismo de estrada',
    venue: 'Circuito de ciclismo — exemplo',
    statusEsportivo: 'Prevista',
    statusPublicacao: 'Publicado',
    demo: true
  },
  {
    id: 'evt-judo-equipes',
    date: '2026-11-19',
    time: '14:00',
    sport: 'Judô',
    category: 'Feminino',
    title: 'Disputas por equipes',
    venue: 'Nova Arena de Rio do Sul',
    statusEsportivo: 'Prevista',
    statusPublicacao: 'Publicado',
    demo: true
  },
  {
    id: 'evt-futsal-semi',
    date: '2026-11-20',
    time: '19:00',
    sport: 'Futsal',
    category: 'Masculino',
    title: 'Semifinais do torneio',
    venue: 'Nova Arena de Rio do Sul',
    statusEsportivo: 'Prevista',
    statusPublicacao: 'Publicado',
    demo: true
  },
  {
    id: 'evt-futsal-final',
    date: '2026-11-21',
    time: '18:00',
    sport: 'Futsal',
    category: 'Masculino',
    title: 'Grande Final e Cerimônia de Premiação',
    venue: 'Nova Arena de Rio do Sul',
    statusEsportivo: 'Prevista',
    statusPublicacao: 'Publicado',
    demo: true
  }
];

export const INITIAL_RESULTS: ResultSource[] = [
  {
    id: 'res-1',
    title: 'Boletim Oficial Geral nº 01',
    modality: 'Geral',
    date: 'Previsto para 14/11/2026',
    documentUrl: 'https://fesporte.sc.gov.br',
    publishedBy: 'Fesporte / CCO JASC 2026',
    type: 'Boletim Oficial',
    isOfficial: true
  },
  {
    id: 'res-2',
    title: 'Quadro Geral de Medalhas e Troféus',
    modality: 'Geral',
    date: 'Atualização diária durante os jogos',
    documentUrl: 'https://fesporte.sc.gov.br',
    publishedBy: 'Comitê Técnico Fesporte',
    type: 'Quadro de Medalhas',
    isOfficial: true
  },
  {
    id: 'res-3',
    title: 'Pontuação Geral por Município (Troféu JASC)',
    modality: 'Geral',
    date: 'Atualização periódica',
    documentUrl: 'https://fesporte.sc.gov.br',
    publishedBy: 'Fesporte',
    type: 'Pontuação Geral',
    isOfficial: true
  }
];
