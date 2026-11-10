import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  COMPETITION_DAYS,
  INITIAL_EVENTS,
  INITIAL_NEWS,
  INITIAL_RESULTS,
  INITIAL_SPORTS,
  INITIAL_VENUES
} from '../data/initialData';
import {
  AuditLog,
  CompetitionEvent,
  NewsItem,
  ResultSource,
  Sport,
  Venue
} from '../types';

interface AppContextType {
  events: CompetitionEvent[];
  publishedEvents: CompetitionEvent[];
  pendingEvents: CompetitionEvent[];
  sports: Sport[];
  venues: Venue[];
  news: NewsItem[];
  results: ResultSource[];
  auditLogs: AuditLog[];
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  currentRoute: string;
  navigate: (route: string) => void;
  selectedEventDetail: CompetitionEvent | null;
  setSelectedEventDetail: (evt: CompetitionEvent | null) => void;
  // Admin Operations
  addEvent: (evt: Omit<CompetitionEvent, 'id' | 'createdAt'>) => CompetitionEvent;
  updateEvent: (id: string, updates: Partial<CompetitionEvent>) => void;
  deleteEvent: (id: string) => void;
  publishEvent: (id: string) => void;
  unpublishEvent: (id: string) => void;
  duplicateEvent: (id: string) => void;
  batchApprovePending: (ids: string[]) => void;
  importEventsFromJSON: (jsonContent: string, fileName?: string) => {
    imported: number;
    pending: number;
    errors: string[];
    summary: string;
  };
  exportEventsJSON: () => void;
  exportEventsCSV: () => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  EVENTS: 'jasc_events_v2',
  VENUES: 'jasc_venues_v2',
  NEWS: 'jasc_news_v2',
  RESULTS: 'jasc_results_v2',
  AUDIT: 'jasc_audit_v2',
  REDUCED_MOTION: 'jasc_reduce_motion'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Routing helper (supports both pathname and hash)
  const getInitialRoute = () => {
    if (typeof window === 'undefined') return '/';
    if (window.location.hash) {
      const h = window.location.hash.replace(/^#/, '');
      return h.startsWith('/') ? h : `/${h}`;
    }
    return window.location.pathname || '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [selectedEventDetail, setSelectedEventDetail] = useState<CompetitionEvent | null>(null);

  // Motion preference
  const [reducedMotion, setReducedMotionState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.REDUCED_MOTION) === 'true';
  });

  const setReducedMotion = (val: boolean) => {
    setReducedMotionState(val);
    localStorage.setItem(STORAGE_KEYS.REDUCED_MOTION, String(val));
    if (val) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  };

  useEffect(() => {
    if (reducedMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }, [reducedMotion]);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const h = window.location.hash.replace(/^#/, '');
      const clean = h.startsWith('/') ? h : `/${h}`;
      setCurrentRoute(clean || '/');
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [reducedMotion]);

  const navigate = (path: string) => {
    const clean = path.startsWith('/') ? path : `/${path}`;
    window.location.hash = `#${clean}`;
    setCurrentRoute(clean);
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  // State initialization with localStorage fallback
  const [events, setEvents] = useState<CompetitionEvent[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EVENTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to load events from storage', e);
    }
    return INITIAL_EVENTS;
  });

  const [venues] = useState<Venue[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VENUES);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_VENUES;
  });

  const [news] = useState<NewsItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NEWS);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_NEWS;
  });

  const [results] = useState<ResultSource[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESULTS);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_RESULTS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUDIT);
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      {
        id: 'log-1',
        timestamp: new Date().toLocaleString('pt-BR'),
        user: 'Sistema JASC (Demonstração)',
        action: 'IMPORT',
        entity: 'Carga Inicial',
        details: 'Carga padrão de demonstração e abertura oficial carregada com sucesso.'
      }
    ];
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(auditLogs));
    } catch (e) {
      console.error(e);
    }
  }, [auditLogs]);

  const addAudit = (action: AuditLog['action'], entity: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toLocaleString('pt-BR'),
      user: 'Servidor Municipal (Sessão Local)',
      action,
      entity,
      details
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 99)]);
  };

  // Filtered views
  const publishedEvents = useMemo(() => {
    return events.filter(e => e.statusPublicacao === 'Publicado');
  }, [events]);

  const pendingEvents = useMemo(() => {
    return events.filter(e => e.statusPublicacao === 'Pendente de validação');
  }, [events]);

  // Recalculate sport counts dynamically based on published events
  const sports = useMemo(() => {
    return INITIAL_SPORTS.map(sport => {
      const count = publishedEvents.filter(
        e => e.sport.toLowerCase() === sport.name.toLowerCase()
      ).length;
      return {
        ...sport,
        count: count > 0 ? count : sport.count
      };
    });
  }, [publishedEvents]);

  // CRUD Actions
  const addEvent = (evtData: Omit<CompetitionEvent, 'id' | 'createdAt'>): CompetitionEvent => {
    const newEvent: CompetitionEvent = {
      ...evtData,
      id: `evt-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setEvents(prev => [newEvent, ...prev]);
    addAudit('CREATE', 'Programação', `Adicionada atividade: ${newEvent.title} (${newEvent.sport})`);
    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<CompetitionEvent>) => {
    setEvents(prev =>
      prev.map(e => (e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e))
    );
    addAudit('UPDATE', 'Programação', `Atividade ${id} atualizada.`);
  };

  const deleteEvent = (id: string) => {
    const target = events.find(e => e.id === id);
    setEvents(prev => prev.filter(e => e.id !== id));
    addAudit('DELETE', 'Programação', `Atividade excluída: ${target?.title || id}`);
  };

  const publishEvent = (id: string) => {
    updateEvent(id, { statusPublicacao: 'Publicado' });
    addAudit('PUBLISH', 'Programação', `Atividade ${id} aprovada e publicada no portal.`);
  };

  const unpublishEvent = (id: string) => {
    updateEvent(id, { statusPublicacao: 'Despublicado' });
    addAudit('UNPUBLISH', 'Programação', `Atividade ${id} despublicada.`);
  };

  const duplicateEvent = (id: string) => {
    const original = events.find(e => e.id === id);
    if (!original) return;
    const duplicated: CompetitionEvent = {
      ...original,
      id: `evt-${Date.now()}`,
      title: `${original.title} (Cópia)`,
      statusPublicacao: 'Rascunho',
      createdAt: new Date().toISOString()
    };
    setEvents(prev => [duplicated, ...prev]);
    addAudit('CREATE', 'Programação', `Duplicada atividade a partir de ${id}: ${duplicated.title}`);
  };

  const batchApprovePending = (ids: string[]) => {
    setEvents(prev =>
      prev.map(e =>
        ids.includes(e.id) ? { ...e, statusPublicacao: 'Publicado' as const, demo: false } : e
      )
    );
    addAudit('PUBLISH', 'Programação em Lote', `${ids.length} confrontos validados e publicados.`);
  };

  // Robust JSON import compliant with rule 4 of prompt
  const importEventsFromJSON = (jsonContent: string, fileName = 'arquivo.json') => {
    const errors: string[] = [];
    let imported = 0;
    let pending = 0;

    try {
      const parsed = JSON.parse(jsonContent);
      const items: any[] = Array.isArray(parsed)
        ? parsed
        : parsed.confrontos || parsed.programacao || parsed.eventos || parsed.atividades || [];

      if (!items || !items.length) {
        errors.push('O arquivo não contém uma lista reconhecível de eventos/confrontos.');
        return { imported: 0, pending: 0, errors, summary: 'Nenhum registro encontrado.' };
      }

      const newEvents: CompetitionEvent[] = [];

      items.forEach((item, index) => {
        // Enforce rule: Tournament bracket placeholders cannot be published as real athletes
        const isBracketPlaceholder =
          /venc(\.|edor)?|perd(\.|edor)?|jg\s*\d+|chave/i.test(item.titulo || item.equipes || item.participantes || '');

        // Dates must be in November 2026 or fallback cleanly
        let eventDate = item.data || item.date || '2026-11-15';
        if (!eventDate.startsWith('2026-11-')) {
          // Normalize if format is DD/MM/YYYY
          const match = eventDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
          if (match && match[2] === '11' && match[3] === '2026') {
            eventDate = `2026-11-${match[1].padStart(2, '0')}`;
          }
        }

        const validDay = COMPETITION_DAYS.some(d => d.date === eventDate);
        if (!validDay) {
          eventDate = '2026-11-15';
        }

        const eventItem: CompetitionEvent = {
          id: `imp-${Date.now()}-${index}`,
          date: eventDate,
          time: item.horario || item.hora || item.time || '09:00',
          sport: item.modalidade || item.sport || 'Outras modalidades',
          category: item.categoria || item.category || 'Geral',
          subcategory: item.submodalidade || item.naipe || undefined,
          title: item.titulo || item.title || item.confronto || `Disputa - ${item.modalidade || 'JASC'}`,
          venue: item.local || item.venue || 'Nova Arena de Rio do Sul',
          statusEsportivo: item.statusEsportivo || 'Prevista',
          // CRITICAL REQUIREMENT: Automatic extractions MUST enter as Rascunho / Pendente de validação
          statusPublicacao: 'Pendente de validação',
          demo: false,
          observations: isBracketPlaceholder
            ? 'Atenção: Contém chaveamento ou confronto a confirmar.'
            : item.observacoes,
          pageOrigin: item.pagina || item.paginaOrigem || undefined,
          importedFrom: fileName,
          createdAt: new Date().toISOString()
        };

        newEvents.push(eventItem);
        pending++;
        imported++;
      });

      setEvents(prev => [...newEvents, ...prev]);
      addAudit(
        'IMPORT',
        'Arquivo JSON',
        `Importados ${imported} registros do arquivo ${fileName} como 'Pendente de validação'.`
      );

      return {
        imported,
        pending,
        errors,
        summary: `Importação concluída: ${imported} registros adicionados à fila de revisão.`
      };
    } catch (e: any) {
      errors.push(`Erro ao interpretar o arquivo JSON: ${e.message}`);
      return { imported: 0, pending: 0, errors, summary: 'Falha na importação.' };
    }
  };

  const exportEventsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(events, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `jasc_2026_programacao_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchorElem.click();
    addAudit('EXPORT', 'Dados', 'Exportado arquivo JSON completo da programação.');
  };

  const exportEventsCSV = () => {
    const headers = [
      'ID',
      'Data',
      'Horário',
      'Modalidade',
      'Categoria',
      'Título / Confronto',
      'Local',
      'Status Esportivo',
      'Status Publicação',
      'Demonstrativo',
      'Observações'
    ];

    const rows = events.map(e => [
      e.id,
      e.date,
      e.time,
      `"${(e.sport || '').replace(/"/g, '""')}"`,
      `"${(e.category || '').replace(/"/g, '""')}"`,
      `"${(e.title || '').replace(/"/g, '""')}"`,
      `"${(e.venue || '').replace(/"/g, '""')}"`,
      e.statusEsportivo,
      e.statusPublicacao,
      e.demo ? 'Sim' : 'Não',
      `"${(e.observations || '').replace(/"/g, '""')}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jasc_2026_programacao_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addAudit('EXPORT', 'Dados', 'Exportado arquivo CSV com cabeçalhos em português.');
  };

  const resetToDefaults = () => {
    setEvents(INITIAL_EVENTS);
    addAudit('UPDATE', 'Sistema', 'Dados resetados para a carga inicial de demonstração.');
  };

  return (
    <AppContext.Provider
      value={{
        events,
        publishedEvents,
        pendingEvents,
        sports,
        venues,
        news,
        results,
        auditLogs,
        reducedMotion,
        setReducedMotion,
        currentRoute,
        navigate,
        selectedEventDetail,
        setSelectedEventDetail,
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
        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
