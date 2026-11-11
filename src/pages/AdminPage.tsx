import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Copy,
  Trash2,
  Edit3,
  Upload,
  Download,
  Database,
  FileSpreadsheet,
  AlertTriangle,
  Eye,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Flame,
  Clock,
  MapPin,
  FileText,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COMPETITION_DAYS, ALL_JASC_MODALITIES } from '../data/initialData';
import { CompetitionEvent, StatusEsportivo, StatusPublicacao } from '../types';

type AdminTab = 'overview' | 'events' | 'import' | 'form' | 'export' | 'supabase' | 'audit';

export const AdminPage: React.FC = () => {
  const {
    events,
    publishedEvents,
    pendingEvents,
    venues,
    sports,
    auditLogs,
    addEvent,
    updateEvent,
    deleteEvent,
    publishEvent,
    unpublishEvent,
    duplicateEvent,
    batchApprovePending,
    importEventsFromJSON,
    exportEventsJSON,
    exportEventsCSV,
    resetToDefaults,
    navigate,
    setSelectedEventDetail
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSport, setFilterSport] = useState('');
  const [filterPubStatus, setFilterPubStatus] = useState<string>('');
  const [filterSportStatus, setFilterSportStatus] = useState<string>('');

  // Selected for batch approval
  const [selectedPendingIds, setSelectedPendingIds] = useState<string[]>([]);

  // Editing state
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Form State
  const [formSport, setFormSport] = useState('Atletismo');
  const [formCategory, setFormCategory] = useState('Feminino');
  const [formDate, setFormDate] = useState('2026-11-15');
  const [formTime, setFormTime] = useState('09:00');
  const [formTitle, setFormTitle] = useState('');
  const [formVenue, setFormVenue] = useState(venues[0]?.name || 'Nova Arena de Rio do Sul');
  const [formStatusEsportivo, setFormStatusEsportivo] = useState<StatusEsportivo>('Prevista');
  const [formStatusPublicacao, setFormStatusPublicacao] = useState<StatusPublicacao>('Publicado');
  const [formTeams, setFormTeams] = useState('');
  const [formObs, setFormObs] = useState('');
  const [formPageOrigin, setFormPageOrigin] = useState('');
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  // JSON Import State
  const [importText, setImportText] = useState('');
  const [importResult, setImportResult] = useState<{
    imported: number;
    pending: number;
    errors: string[];
    summary: string;
  } | null>(null);

  // Filtered Events for table
  const filteredEvents = events.filter(e => {
    if (filterSport && e.sport.toLowerCase() !== filterSport.toLowerCase()) return false;
    if (filterPubStatus && e.statusPublicacao !== filterPubStatus) return false;
    if (filterSportStatus && e.statusEsportivo !== filterSportStatus) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        e.sport.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        (e.category && e.category.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleStartEdit = (evt: CompetitionEvent) => {
    setEditingEventId(evt.id);
    setFormSport(evt.sport);
    setFormCategory(evt.category);
    setFormDate(evt.date);
    setFormTime(evt.time);
    setFormTitle(evt.title);
    setFormVenue(evt.venue);
    setFormStatusEsportivo(evt.statusEsportivo);
    setFormStatusPublicacao(evt.statusPublicacao);
    setFormTeams(evt.teamsOrAthletes || '');
    setFormObs(evt.observations || '');
    setFormPageOrigin(evt.pageOrigin ? String(evt.pageOrigin) : '');
    setFormFeedback(null);
    setActiveTab('form');
  };

  const handleStartNew = () => {
    setEditingEventId(null);
    setFormSport('Atletismo');
    setFormCategory('Feminino');
    setFormDate('2026-11-15');
    setFormTime('09:00');
    setFormTitle('');
    setFormVenue(venues[0]?.name || 'Nova Arena de Rio do Sul');
    setFormStatusEsportivo('Prevista');
    setFormStatusPublicacao('Publicado');
    setFormTeams('');
    setFormObs('');
    setFormPageOrigin('');
    setFormFeedback(null);
    setActiveTab('form');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormFeedback('Por favor, informe o título da atividade.');
      return;
    }

    if (editingEventId) {
      updateEvent(editingEventId, {
        sport: formSport,
        category: formCategory,
        date: formDate,
        time: formTime,
        title: formTitle.trim(),
        venue: formVenue,
        statusEsportivo: formStatusEsportivo,
        statusPublicacao: formStatusPublicacao,
        teamsOrAthletes: formTeams.trim() || undefined,
        observations: formObs.trim() || undefined,
        pageOrigin: formPageOrigin ? Number(formPageOrigin) : undefined
      });
      setFormFeedback('Atividade atualizada com sucesso!');
    } else {
      addEvent({
        sport: formSport,
        category: formCategory,
        date: formDate,
        time: formTime,
        title: formTitle.trim(),
        venue: formVenue,
        statusEsportivo: formStatusEsportivo,
        statusPublicacao: formStatusPublicacao,
        demo: true,
        teamsOrAthletes: formTeams.trim() || undefined,
        observations: formObs.trim() || undefined,
        pageOrigin: formPageOrigin ? Number(formPageOrigin) : undefined
      });
      setFormFeedback('Nova atividade criada e adicionada com sucesso!');
      setFormTitle('');
      setFormTeams('');
      setFormObs('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      setImportText(content);
      const res = importEventsFromJSON(content, file.name);
      setImportResult(res);
    };
    reader.readAsText(file);
  };

  const handleImportTextSubmit = () => {
    if (!importText.trim()) return;
    const res = importEventsFromJSON(importText, 'colado-manualmente.json');
    setImportResult(res);
  };

  const toggleSelectPending = (id: string) => {
    setSelectedPendingIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleApproveSelected = () => {
    if (!selectedPendingIds.length) return;
    if (confirm(`Aprovar e publicar ${selectedPendingIds.length} confrontos selecionados no portal público?`)) {
      batchApprovePending(selectedPendingIds);
      setSelectedPendingIds([]);
    }
  };

  // SQL Migration text for Supabase tab
  const supabaseSQL = `-- =====================================================================
-- SCHEMA OFICIAL JASC 2026 — RIO DO SUL (SC)
-- PostgreSQL + Supabase com RLS (Row Level Security) e Trilha de Auditoria
-- =====================================================================

-- 1. Tabela de Modalidades
CREATE TABLE IF NOT EXISTS modalidades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    descricao TEXT,
    icone TEXT,
    imagem_url TEXT,
    categorias TEXT[] DEFAULT ARRAY['Feminino', 'Masculino'],
    local_padrao TEXT,
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Locais de Competição (Praças Esportivas)
CREATE TABLE IF NOT EXISTS locais (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    endereco TEXT NOT NULL,
    oficial BOOLEAN DEFAULT FALSE,
    mapa_url TEXT,
    descricao TEXT,
    modalidades_suportadas TEXT[],
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela Central de Programação / Atividades
CREATE TABLE IF NOT EXISTS atividades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data DATE NOT NULL,
    horario TIME NOT NULL,
    modalidade TEXT NOT NULL,
    categoria TEXT NOT NULL,
    submodalidade TEXT,
    titulo TEXT NOT NULL,
    local_nome TEXT NOT NULL,
    status_esportivo TEXT NOT NULL CHECK (status_esportivo IN ('Prevista', 'Confirmada', 'Alterada', 'Cancelada', 'Encerrada')),
    status_publicacao TEXT NOT NULL DEFAULT 'Pendente de validação' CHECK (status_publicacao IN ('Rascunho', 'Pendente de validação', 'Publicado', 'Despublicado')),
    e_demonstrativo BOOLEAN DEFAULT FALSE,
    participantes TEXT,
    observacoes TEXT,
    link_resultado TEXT,
    pagina_origem INTEGER,
    criado_em TIMESTAMPTZ DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ DEFAULT NOW(),
    criado_por UUID REFERENCES auth.users(id),
    atualizado_por UUID REFERENCES auth.users(id)
);

-- 4. Tabela de Comunicados e Notícias
CREATE TABLE IF NOT EXISTS noticias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('Comunicado', 'Programação', 'Cerimônia', 'Oficial')),
    data_formatada TEXT NOT NULL,
    titulo TEXT NOT NULL,
    resumo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    imagem_url TEXT,
    e_demonstrativo BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabela de Trilha de Auditoria Administrativa
CREATE TABLE IF NOT EXISTS auditoria_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    usuario TEXT NOT NULL,
    acao TEXT NOT NULL,
    entidade TEXT NOT NULL,
    detalhes TEXT NOT NULL
);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) — SEGURANÇA E POLÍTICAS DE ACESSO
-- =====================================================================

ALTER TABLE modalidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE locais ENABLE ROW LEVEL SECURITY;
ALTER TABLE atividades ENABLE ROW LEVEL SECURITY;
ALTER TABLE noticias ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria_logs ENABLE ROW LEVEL SECURITY;

-- Regra de ouro: O público lê apenas dados publicados!
CREATE POLICY "Publico pode ler modalidades"
ON modalidades FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Publico pode ler locais"
ON locais FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Publico pode ler apenas atividades publicadas"
ON atividades FOR SELECT TO anon, authenticated
USING (status_publicacao = 'Publicado');

CREATE POLICY "Publico pode ler noticias"
ON noticias FOR SELECT TO anon, authenticated USING (true);

-- Operações administrativas restritas a usuários autenticados da organização
CREATE POLICY "Admins podem gerenciar atividades"
ON atividades FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Admins podem inserir logs de auditoria"
ON auditoria_logs FOR INSERT TO authenticated
WITH CHECK (true);
`;

  return (
    <main id="conteudo" className="py-8 bg-paper min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Admin Header with Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-gold/30 border border-gold text-gold-foreground px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
                Modo Demonstração Local
              </span>
              <span className="text-xs text-muted-foreground">
                (Armazenado no navegador)
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-primary uppercase tracking-tight">
              Painel de Gestão dos JASC 2026
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Ambiente administrativo para homologação de programação, modalidades, locais e importações da Fesporte.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartNew}
              className="inline-flex items-center gap-2 rounded-xl bg-primary text-white font-condensed font-bold uppercase px-4 py-2.5 text-sm hover:bg-green-deep shadow-sm cursor-pointer"
            >
              <Plus className="size-4" />
              Nova Atividade
            </button>
            <button
              onClick={() => navigate('/')}
              className="rounded-xl border border-border bg-white text-foreground hover:bg-cream px-4 py-2.5 font-condensed font-bold uppercase text-sm cursor-pointer"
            >
              Ver Portal Público →
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto border-b border-border pt-4 pb-1 scrollbar-thin">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl font-condensed text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
              activeTab === 'overview'
                ? 'bg-primary text-white shadow-xs'
                : 'text-foreground hover:bg-cream'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2.5 rounded-xl font-condensed text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
              activeTab === 'events'
                ? 'bg-primary text-white shadow-xs'
                : 'text-foreground hover:bg-cream'
            }`}
          >
            Programação ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`px-4 py-2.5 rounded-xl font-condensed text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === 'import'
                ? 'bg-primary text-white shadow-xs'
                : 'text-foreground hover:bg-cream'
            }`}
          >
            <Upload className="size-3.5" />
            Importar JSON Fesporte {pendingEvents.length > 0 && `(${pendingEvents.length})`}
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2.5 rounded-xl font-condensed text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
              activeTab === 'form'
                ? 'bg-primary text-white shadow-xs'
                : 'text-foreground hover:bg-cream'
            }`}
          >
            {editingEventId ? 'Editar Atividade' : 'Cadastrar Atividade'}
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2.5 rounded-xl font-condensed text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === 'export'
                ? 'bg-primary text-white shadow-xs'
                : 'text-foreground hover:bg-cream'
            }`}
          >
            <Download className="size-3.5" />
            Exportação
          </button>
          <button
            onClick={() => setActiveTab('supabase')}
            className={`px-4 py-2.5 rounded-xl font-condensed text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === 'supabase'
                ? 'bg-primary text-white shadow-xs'
                : 'text-foreground hover:bg-cream'
            }`}
          >
            <Database className="size-3.5" />
            Arquitetura Supabase
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2.5 rounded-xl font-condensed text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
              activeTab === 'audit'
                ? 'bg-primary text-white shadow-xs'
                : 'text-foreground hover:bg-cream'
            }`}
          >
            Auditoria ({auditLogs.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="py-8 space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-white p-5 border border-border shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Total de Atividades
                </span>
                <span className="font-display text-4xl text-foreground font-bold leading-none">
                  {events.length}
                </span>
                <span className="text-xs text-muted-foreground block mt-2">
                  No banco local do navegador
                </span>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-border shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#25663E] block mb-1">
                  Publicadas no Portal
                </span>
                <span className="font-display text-4xl text-primary font-bold leading-none">
                  {publishedEvents.length}
                </span>
                <span className="text-xs text-muted-foreground block mt-2">
                  Visíveis aos visitantes
                </span>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-border shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B76E00] block mb-1">
                  Pendentes de Validação
                </span>
                <span className="font-display text-4xl text-gold font-bold leading-none">
                  {pendingEvents.length}
                </span>
                <span className="text-xs text-muted-foreground block mt-2">
                  Extrações / rascunhos em fila
                </span>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-border shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-flame block mb-1">
                  Praças Esportivas
                </span>
                <span className="font-display text-4xl text-flame font-bold leading-none">
                  {venues.length}
                </span>
                <span className="text-xs text-muted-foreground block mt-2">
                  Arenas e ginásios previstos
                </span>
              </div>
            </div>

            {/* Quick Actions & Pending Alert */}
            {pendingEvents.length > 0 && (
              <div className="rounded-2xl bg-gold/20 border border-gold/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="size-6 text-gold shrink-0" />
                  <div>
                    <h3 className="font-condensed text-lg font-bold uppercase tracking-wider text-gold-foreground">
                      {pendingEvents.length} confrontos aguardando homologação
                    </h3>
                    <p className="text-xs text-foreground/80">
                      Confrontos extraídos automaticamente não aparecem no portal público até serem aprovados.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('import')}
                  className="rounded-xl bg-gold text-green-deep font-condensed font-bold uppercase px-4 py-2 text-sm shrink-0 cursor-pointer shadow-xs hover:bg-gold/90"
                >
                  Revisar Fila de Validação →
                </button>
              </div>
            )}

            {/* Recent Audit entries */}
            <div className="rounded-3xl bg-white p-6 border border-border shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-condensed text-xl font-bold uppercase tracking-wider text-primary">
                  Últimas Atividades Administrativas
                </h3>
                <button
                  onClick={() => setActiveTab('audit')}
                  className="text-xs font-bold uppercase text-flame hover:underline"
                >
                  Ver histórico completo
                </button>
              </div>

              <div className="divide-y divide-border text-xs">
                {auditLogs.slice(0, 5).map(log => (
                  <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-foreground mr-2">[{log.action}]</span>
                      <span className="text-muted-foreground">{log.details}</span>
                    </div>
                    <span className="text-muted-foreground shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EVENTS LIST */}
        {activeTab === 'events' && (
          <div className="py-6 space-y-6">
            {/* Filter Bar */}
            <div className="rounded-2xl bg-white p-4 border border-border shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filtrar por nome, modalidade..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-border pl-9 pr-3 py-2 text-xs"
                />
              </div>

              <select
                value={filterSport}
                onChange={e => setFilterSport(e.target.value)}
                className="w-full rounded-xl border border-border px-3 py-2 text-xs"
              >
                <option value="">Todas as modalidades</option>
                {ALL_JASC_MODALITIES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <select
                value={filterPubStatus}
                onChange={e => setFilterPubStatus(e.target.value)}
                className="w-full rounded-xl border border-border px-3 py-2 text-xs"
              >
                <option value="">Status de Publicação (Todos)</option>
                <option value="Publicado">Publicado</option>
                <option value="Pendente de validação">Pendente de validação</option>
                <option value="Rascunho">Rascunho</option>
                <option value="Despublicado">Despublicado</option>
              </select>

              <select
                value={filterSportStatus}
                onChange={e => setFilterSportStatus(e.target.value)}
                className="w-full rounded-xl border border-border px-3 py-2 text-xs"
              >
                <option value="">Status Esportivo (Todos)</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Prevista">Prevista</option>
                <option value="Alterada">Alterada</option>
                <option value="Encerrada">Encerrada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>

            {/* Table */}
            <div className="rounded-3xl bg-white border border-border shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-cream border-b border-border text-primary font-bold font-condensed uppercase tracking-wider">
                      <th className="p-3.5">Data / Hora</th>
                      <th className="p-3.5">Modalidade</th>
                      <th className="p-3.5">Categoria</th>
                      <th className="p-3.5">Título / Confronto</th>
                      <th className="p-3.5">Local</th>
                      <th className="p-3.5">Status Esportivo</th>
                      <th className="p-3.5">Publicação</th>
                      <th className="p-3.5 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredEvents.map(evt => {
                      const isPublished = evt.statusPublicacao === 'Publicado';
                      return (
                        <tr key={evt.id} className="hover:bg-cream/40 transition-colors">
                          <td className="p-3.5 whitespace-nowrap font-medium">
                            <div>{evt.date}</div>
                            <div className="text-muted-foreground tracking-[0.08em] competition-time">{evt.time}</div>
                          </td>
                          <td className="p-3.5 font-bold text-primary whitespace-nowrap">
                            {evt.sport}
                          </td>
                          <td className="p-3.5 whitespace-nowrap text-muted-foreground">
                            {evt.category}
                          </td>
                          <td className="p-3.5 max-w-xs font-semibold text-foreground">
                            <div className="truncate">{evt.title}</div>
                            {evt.demo && (
                              <span className="text-[10px] text-gold font-normal block">
                                (Demonstrativo)
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 whitespace-nowrap text-muted-foreground">
                            {evt.venue}
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <span className="rounded-full bg-cream border border-border px-2 py-0.5 text-[10px] font-bold">
                              {evt.statusEsportivo}
                            </span>
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            {isPublished ? (
                              <span className="inline-flex items-center gap-1 text-[#25663E] font-bold text-[11px]">
                                <CheckCircle className="size-3" />
                                Publicado
                              </span>
                            ) : evt.statusPublicacao === 'Pendente de validação' ? (
                              <span className="inline-flex items-center gap-1 text-[#B76E00] font-bold text-[11px]">
                                <Clock className="size-3" />
                                Pendente
                              </span>
                            ) : (
                              <span className="text-muted-foreground text-[11px]">
                                {evt.statusPublicacao}
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1">
                              {/* Quick Publish / Unpublish */}
                              {isPublished ? (
                                <button
                                  onClick={() => unpublishEvent(evt.id)}
                                  title="Despublicar do portal público"
                                  className="p-1.5 text-muted-foreground hover:text-flame rounded-lg hover:bg-cream cursor-pointer"
                                >
                                  <XCircle className="size-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => publishEvent(evt.id)}
                                  title="Aprovar e publicar no portal público"
                                  className="p-1.5 text-primary hover:text-green-deep rounded-lg hover:bg-cream cursor-pointer"
                                >
                                  <CheckCircle className="size-4" />
                                </button>
                              )}

                              <button
                                onClick={() => setSelectedEventDetail(evt)}
                                title="Pré-visualizar modal"
                                className="p-1.5 text-muted-foreground hover:text-primary rounded-lg hover:bg-cream cursor-pointer"
                              >
                                <Eye className="size-4" />
                              </button>

                              <button
                                onClick={() => duplicateEvent(evt.id)}
                                title="Duplicar atividade"
                                className="p-1.5 text-muted-foreground hover:text-primary rounded-lg hover:bg-cream cursor-pointer"
                              >
                                <Copy className="size-4" />
                              </button>

                              <button
                                onClick={() => handleStartEdit(evt)}
                                title="Editar atividade"
                                className="p-1.5 text-muted-foreground hover:text-primary rounded-lg hover:bg-cream cursor-pointer"
                              >
                                <Edit3 className="size-4" />
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm(`Excluir a atividade "${evt.title}"?`)) {
                                    deleteEvent(evt.id);
                                  }
                                }}
                                title="Excluir atividade"
                                className="p-1.5 text-muted-foreground hover:text-destructive rounded-lg hover:bg-destructive/10 cursor-pointer"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: IMPORT JSON FESPORTE */}
        {activeTab === 'import' && (
          <div className="py-6 space-y-6">
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-border shadow-xs">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Upload className="size-6" />
                </div>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl text-primary uppercase tracking-tight">
                    Importação de Dados Oficiais da Fesporte
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                    Carregue o arquivo <code className="bg-cream px-1.5 py-0.5 rounded font-mono text-primary font-bold">JASC_2026_Dados_Programacao_Site.json</code> com os registros de modalidades, categorias, períodos e confrontos extraídos. Conforme a regra de conformidade, todos os confrontos entram inicialmente na fila de validação como <strong>Pendente de validação</strong>.
                  </p>
                </div>
              </div>

              {/* Upload Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-border">
                <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
                  <Upload className="size-8 text-primary mx-auto mb-2" />
                  <p className="text-xs font-bold uppercase text-foreground mb-1">
                    Selecionar arquivo JSON local
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Arraste ou clique para enviar o arquivo oficial .json
                  </p>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="block w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-green-deep cursor-pointer"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="import-textarea" className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                    Ou cole o conteúdo JSON diretamente:
                  </label>
                  <textarea
                    id="import-textarea"
                    rows={4}
                    value={importText}
                    onChange={e => setImportText(e.target.value)}
                    placeholder='[{"modalidade": "Atletismo", "categoria": "Feminino", "data": "2026-11-15", "horario": "09:00", "titulo": "100m rasos", "local": "Pista Municipal"}]'
                    className="w-full flex-1 rounded-xl border border-border p-3 text-xs font-mono focus:border-primary focus:outline-none"
                  />
                  <button
                    onClick={handleImportTextSubmit}
                    disabled={!importText.trim()}
                    className="mt-3 rounded-xl bg-primary text-white font-condensed font-bold uppercase py-2 px-4 text-xs hover:bg-green-deep disabled:opacity-50 cursor-pointer"
                  >
                    Processar JSON colado
                  </button>
                </div>
              </div>

              {/* Import Results Banner */}
              {importResult && (
                <div className="mt-6 rounded-2xl bg-cream p-4 border border-border">
                  <h4 className="font-bold text-sm text-primary mb-1">Resultado da Importação:</h4>
                  <p className="text-xs text-foreground mb-2">{importResult.summary}</p>
                  {importResult.errors.length > 0 && (
                    <ul className="text-xs text-destructive list-disc list-inside">
                      {importResult.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Pending Validation Queue */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-border shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-display text-2xl text-primary uppercase tracking-tight">
                    Fila de Homologação ({pendingEvents.length} pendentes)
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Valide confrontos antes de liberá-los no portal público.
                  </p>
                </div>

                {pendingEvents.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (selectedPendingIds.length === pendingEvents.length) {
                          setSelectedPendingIds([]);
                        } else {
                          setSelectedPendingIds(pendingEvents.map(e => e.id));
                        }
                      }}
                      className="rounded-xl border border-border bg-paper px-3 py-2 text-xs font-bold uppercase text-foreground hover:bg-cream cursor-pointer"
                    >
                      {selectedPendingIds.length === pendingEvents.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
                    </button>
                    <button
                      onClick={handleApproveSelected}
                      disabled={!selectedPendingIds.length}
                      className="rounded-xl bg-gold text-green-deep font-condensed font-bold uppercase px-4 py-2 text-xs disabled:opacity-50 cursor-pointer shadow-xs hover:bg-gold/90"
                    >
                      Aprovar Selecionados ({selectedPendingIds.length})
                    </button>
                  </div>
                )}
              </div>

              {pendingEvents.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground text-xs">
                  Não há confrontos pendentes na fila de validação. Todos os registros estão homologados ou o JSON ainda não foi importado.
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingEvents.map(evt => {
                    const isSelected = selectedPendingIds.includes(evt.id);
                    return (
                      <div
                        key={evt.id}
                        className={`rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                          isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-paper'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectPending(evt.id)}
                            className="size-4 mt-1 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
                          />
                          <div>
                            <div className="flex flex-wrap items-center gap-2 text-xs mb-1">
                              <span className="font-bold text-flame uppercase">{evt.sport}</span>
                              <span>·</span>
                              <span className="text-muted-foreground">{evt.category}</span>
                              <span>·</span>
                              <span className="font-semibold text-primary">{evt.date} às <span className="tracking-[0.08em] competition-time">{evt.time}</span></span>
                            </div>
                            <h4 className="font-condensed text-lg font-bold text-foreground">
                              {evt.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Local: {evt.venue} {evt.pageOrigin ? `(Pág. ${evt.pageOrigin} PDF)` : ''}
                            </p>
                            {evt.observations && (
                              <p className="text-[11px] text-gold font-medium mt-1">
                                ⚠ {evt.observations}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => publishEvent(evt.id)}
                            className="rounded-lg bg-primary text-white font-condensed font-bold uppercase px-3 py-1.5 text-xs hover:bg-green-deep cursor-pointer"
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() => deleteEvent(evt.id)}
                            className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                            title="Rejeitar / Excluir"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: FORM EDIT / CREATE */}
        {activeTab === 'form' && (
          <div className="py-6 max-w-3xl mx-auto">
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-border shadow-xs">
              <h2 className="font-display text-2xl sm:text-3xl text-primary uppercase tracking-tight mb-2">
                {editingEventId ? 'Editar Atividade' : 'Cadastrar Nova Atividade'}
              </h2>
              <p className="text-xs text-muted-foreground mb-6">
                Preencha os dados oficiais da disputa conforme comunicado da Fesporte ou SEMEL.
              </p>

              {formFeedback && (
                <div className="mb-6 rounded-2xl bg-cream border border-gold p-4 text-xs font-bold text-primary flex items-center justify-between">
                  <span>{formFeedback}</span>
                  <button onClick={() => setFormFeedback(null)} className="underline">Fechar</button>
                </div>
              )}

              <form onSubmit={handleSaveForm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-sport" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Modalidade *
                    </label>
                    <select
                      id="form-sport"
                      value={formSport}
                      onChange={e => setFormSport(e.target.value)}
                      className="w-full rounded-xl border border-border p-2.5 text-xs"
                      required
                    >
                      {ALL_JASC_MODALITIES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="form-category" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Categoria / Naipe *
                    </label>
                    <select
                      id="form-category"
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value)}
                      className="w-full rounded-xl border border-border p-2.5 text-xs"
                    >
                      <option value="Feminino">Feminino</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Misto">Misto</option>
                      <option value="Geral">Geral</option>
                      <option value="Cerimônia oficial">Cerimônia oficial</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-date" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Data da Disputa *
                    </label>
                    <select
                      id="form-date"
                      value={formDate}
                      onChange={e => setFormDate(e.target.value)}
                      className="w-full rounded-xl border border-border p-2.5 text-xs"
                      required
                    >
                      {COMPETITION_DAYS.map(d => (
                        <option key={d.date} value={d.date}>
                          {d.label} ({d.date})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="form-time" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Horário (Brasília) *
                    </label>
                    <input
                      id="form-time"
                      type="time"
                      value={formTime}
                      onChange={e => setFormTime(e.target.value)}
                      className="w-full rounded-xl border border-border p-2.5 text-xs"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="form-title" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                    Título / Confronto / Prova *
                  </label>
                  <input
                    id="form-title"
                    type="text"
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    placeholder="Ex: Eliminatórias 100 m rasos ou Rio do Sul x Blumenau"
                    className="w-full rounded-xl border border-border p-2.5 text-xs font-semibold"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="form-venue" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                    Local de Competição *
                  </label>
                  <select
                    id="form-venue"
                    value={formVenue}
                    onChange={e => setFormVenue(e.target.value)}
                    className="w-full rounded-xl border border-border p-2.5 text-xs"
                    required
                  >
                    {venues.map(v => (
                      <option key={v.slug} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-status-esportivo" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Status Esportivo *
                    </label>
                    <select
                      id="form-status-esportivo"
                      value={formStatusEsportivo}
                      onChange={e => setFormStatusEsportivo(e.target.value as StatusEsportivo)}
                      className="w-full rounded-xl border border-border p-2.5 text-xs"
                    >
                      <option value="Confirmada">Confirmada</option>
                      <option value="Prevista">Prevista</option>
                      <option value="Alterada">Alterada</option>
                      <option value="Encerrada">Encerrada</option>
                      <option value="Cancelada">Cancelada</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="form-status-publicacao" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Status de Publicação *
                    </label>
                    <select
                      id="form-status-publicacao"
                      value={formStatusPublicacao}
                      onChange={e => setFormStatusPublicacao(e.target.value as StatusPublicacao)}
                      className="w-full rounded-xl border border-border p-2.5 text-xs"
                    >
                      <option value="Publicado">Publicado (visível no portal)</option>
                      <option value="Pendente de validação">Pendente de validação (fila interna)</option>
                      <option value="Rascunho">Rascunho</option>
                      <option value="Despublicado">Despublicado</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-teams" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Equipes / Municípios (Opcional)
                    </label>
                    <input
                      id="form-teams"
                      type="text"
                      value={formTeams}
                      onChange={e => setFormTeams(e.target.value)}
                      placeholder="Ex: Rio do Sul, Joinville..."
                      className="w-full rounded-xl border border-border p-2.5 text-xs"
                    />
                  </div>

                  <div>
                    <label htmlFor="form-page-origin" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      Página no Boletim / PDF Fesporte
                    </label>
                    <input
                      id="form-page-origin"
                      type="number"
                      value={formPageOrigin}
                      onChange={e => setFormPageOrigin(e.target.value)}
                      placeholder="Ex: 14"
                      className="w-full rounded-xl border border-border p-2.5 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="form-obs" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                    Observações Administrativas
                  </label>
                  <textarea
                    id="form-obs"
                    rows={2}
                    value={formObs}
                    onChange={e => setFormObs(e.target.value)}
                    placeholder="Instruções de acesso, chaveamento pendente, transmissão..."
                    className="w-full rounded-xl border border-border p-2.5 text-xs"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab('events')}
                    className="rounded-xl border border-border px-4 py-2.5 font-condensed font-bold uppercase text-xs hover:bg-cream cursor-pointer"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-primary text-white font-condensed font-bold uppercase px-6 py-2.5 text-sm hover:bg-green-deep cursor-pointer shadow-sm"
                  >
                    {editingEventId ? 'Salvar Alterações' : 'Salvar Atividade'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5: EXPORT */}
        {activeTab === 'export' && (
          <div className="py-6 max-w-3xl mx-auto space-y-6">
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-border shadow-xs">
              <h2 className="font-display text-2xl sm:text-3xl text-primary uppercase tracking-tight mb-2">
                Exportação de Dados
              </h2>
              <p className="text-xs text-muted-foreground mb-6">
                Baixe cópias dos dados estruturados da programação para arquivamento ou integração com outros sistemas municipais.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border p-5 flex flex-col justify-between">
                  <div>
                    <FileSpreadsheet className="size-8 text-primary mb-2" />
                    <h3 className="font-condensed text-lg font-bold uppercase text-foreground mb-1">
                      Planilha CSV (Excel)
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      Exporta todas as atividades com delimitador de ponto e vírgula e cabeçalhos em português (compatível com Excel brasileiro).
                    </p>
                  </div>
                  <button
                    onClick={exportEventsCSV}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-condensed font-bold uppercase py-2.5 px-4 text-xs hover:bg-green-deep cursor-pointer"
                  >
                    <Download className="size-4" />
                    Baixar Programação (.CSV)
                  </button>
                </div>

                <div className="rounded-2xl border border-border p-5 flex flex-col justify-between">
                  <div>
                    <FileText className="size-8 text-flame mb-2" />
                    <h3 className="font-condensed text-lg font-bold uppercase text-foreground mb-1">
                      Arquivo JSON Completo
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      Exporta o conjunto completo de dados com metadados tipados e estrutura pronta para importação no Supabase.
                    </p>
                  </div>
                  <button
                    onClick={exportEventsJSON}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-flame-dark text-white font-condensed font-bold uppercase py-2.5 px-4 text-xs hover:bg-flame cursor-pointer"
                  >
                    <Download className="size-4" />
                    Baixar Dados (.JSON)
                  </button>
                </div>
              </div>

              {/* Reset Database Button */}
              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span>Deseja restaurar as atividades para a demonstração original?</span>
                <button
                  onClick={() => {
                    if (confirm('Restaurar dados para a carga inicial de demonstração?')) {
                      resetToDefaults();
                    }
                  }}
                  className="text-destructive font-bold hover:underline cursor-pointer"
                >
                  Restaurar Carga Inicial
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SUPABASE ARCHITECTURE */}
        {activeTab === 'supabase' && (
          <div className="py-6 space-y-6">
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-border shadow-xs">
              <div className="flex items-start gap-4 mb-6">
                <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Database className="size-6" />
                </div>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl text-primary uppercase tracking-tight">
                    Arquitetura Supabase (PostgreSQL + RLS)
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                    Preparação do banco de dados institucional para conexão definitiva com o Supabase da Prefeitura de Rio do Sul e Fesporte. Abaixo está o script DDL com todas as tabelas, tipos de dados, chaves estrangeiras e políticas de segurança RLS.
                  </p>
                </div>
              </div>

              {/* Status Warning */}
              <div className="mb-6 rounded-2xl bg-cream border border-gold p-4 text-xs text-foreground/85">
                <strong className="block font-bold text-primary mb-1">
                  Status da Conexão em Produção:
                </strong>
                Conforme as regras do projeto, o portal opera em modo de desenvolvimento local seguro até que as credenciais do Supabase (URL e Chave Anônima) sejam aprovadas e injetadas pela equipe de TI. Nenhuma senha ou chave sensível é exposta.
              </div>

              {/* Code Box */}
              <div className="relative rounded-2xl bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-x-auto max-h-[400px]">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(supabaseSQL);
                    alert('Script SQL copiado para a área de transferência!');
                  }}
                  className="absolute top-4 right-4 rounded-lg bg-white/20 hover:bg-white/30 text-white px-3 py-1 font-sans text-xs font-bold cursor-pointer"
                >
                  Copiar Script SQL
                </button>
                <pre>{supabaseSQL}</pre>
              </div>

              {/* Deployment Checklist */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-condensed text-xl font-bold uppercase text-primary mb-3">
                  Checklist de Publicação em Cloudflare Pages
                </h3>
                <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside leading-relaxed">
                  <li>Executar o script SQL acima no <strong>SQL Editor</strong> do painel Supabase.</li>
                  <li>Configurar as variáveis de ambiente <code className="bg-cream px-1 rounded font-mono">VITE_SUPABASE_URL</code> e <code className="bg-cream px-1 rounded font-mono">VITE_SUPABASE_ANON_KEY</code> nas configurações da Cloudflare Pages.</li>
                  <li>Apontar o domínio institucional <code className="bg-cream px-1 rounded font-mono font-bold">jasc2026.riodosul.sc.gov.br</code> para o projeto Cloudflare Pages.</li>
                  <li>Os dados publicados pelos servidores refletirão no portal público sem necessidade de recompilar a aplicação.</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: AUDIT LOG */}
        {activeTab === 'audit' && (
          <div className="py-6 space-y-6">
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-border shadow-xs">
              <h2 className="font-display text-2xl sm:text-3xl text-primary uppercase tracking-tight mb-2">
                Trilha de Auditoria e Registro de Ações
              </h2>
              <p className="text-xs text-muted-foreground mb-6">
                Registro imutável de todas as ações de criação, edição, publicação e exclusão realizadas nesta sessão administrativa.
              </p>

              <div className="rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-cream border-b border-border text-primary font-bold font-condensed uppercase tracking-wider">
                      <th className="p-3">Data / Hora</th>
                      <th className="p-3">Usuário</th>
                      <th className="p-3">Ação</th>
                      <th className="p-3">Entidade</th>
                      <th className="p-3">Detalhes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-cream/30">
                        <td className="p-3 whitespace-nowrap text-muted-foreground">{log.timestamp}</td>
                        <td className="p-3 whitespace-nowrap font-medium text-foreground">{log.user}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="rounded bg-cream px-1.5 py-0.5 text-[10px] font-bold text-primary border border-border">
                            {log.action}
                          </span>
                        </td>
                        <td className="p-3 whitespace-nowrap font-medium text-foreground">{log.entity}</td>
                        <td className="p-3 text-muted-foreground">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
