export type SportCategory = 'Feminino' | 'Masculino' | 'Misto' | 'Geral' | 'Cerimônia oficial';

export type StatusEsportivo = 'Prevista' | 'Confirmada' | 'Alterada' | 'Cancelada' | 'Encerrada';

export type StatusPublicacao = 'Rascunho' | 'Pendente de validação' | 'Publicado' | 'Despublicado';

export interface Sport {
  slug: string;
  name: string;
  icon: string;
  count: number;
  image: string;
  categories: string[];
  description: string;
  defaultVenue?: string;
  isSpecial?: boolean;
}

export interface Venue {
  slug: string;
  name: string;
  address: string;
  icon: string;
  official: boolean;
  mapUrl?: string;
  description?: string;
  sports?: string[];
}

export interface CompetitionEvent {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  sport: string;
  category: SportCategory | string;
  subcategory?: string;
  title: string;
  venue: string;
  statusEsportivo: StatusEsportivo;
  statusPublicacao: StatusPublicacao;
  demo: boolean;
  observations?: string;
  resultLink?: string;
  pageOrigin?: number;
  importedFrom?: string;
  teamsOrAthletes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsItem {
  slug: string;
  kind: 'Comunicado' | 'Programação' | 'Cerimônia' | 'Oficial';
  date: string;
  title: string;
  desc: string;
  demo: boolean;
  content: string;
  img?: string;
  author?: string;
}

export interface ResultSource {
  id: string;
  title: string;
  modality: string;
  date: string;
  documentUrl: string;
  publishedBy: string;
  type: 'Boletim Oficial' | 'Pontuação Geral' | 'Quadro de Medalhas' | 'Classificação Final';
  isOfficial: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'UNPUBLISH' | 'IMPORT' | 'EXPORT';
  entity: string;
  details: string;
}

export interface DayInfo {
  day: number;
  date: string; // 2026-11-XX
  dayname: string; // DOM, SEG, TER...
  label: string; // sábado, 14 de novembro
  count: number;
}
