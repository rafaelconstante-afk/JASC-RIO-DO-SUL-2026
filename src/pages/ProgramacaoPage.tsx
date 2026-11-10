import React, { useMemo, useState } from 'react';
import { Calendar, Search, Filter, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COMPETITION_DAYS, ALL_JASC_MODALITIES } from '../data/initialData';
import { EventCard } from '../components/EventCard';
import { StatusEsportivo } from '../types';

export const ProgramacaoPage: React.FC = () => {
  const { publishedEvents, venues } = useApp();

  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const filteredEvents = useMemo(() => {
    return publishedEvents.filter(e => {
      // Date filter
      if (selectedDate !== 'all' && e.date !== selectedDate) return false;

      // Sport filter
      if (selectedSport && e.sport.toLowerCase() !== selectedSport.toLowerCase()) return false;

      // Venue filter
      if (selectedVenue && e.venue !== selectedVenue) return false;

      // Status filter
      if (selectedStatus && e.statusEsportivo !== selectedStatus) return false;

      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = e.title.toLowerCase().includes(query);
        const matchesSport = e.sport.toLowerCase().includes(query);
        const matchesVenue = e.venue.toLowerCase().includes(query);
        const matchesCategory = (e.category || '').toLowerCase().includes(query);
        const matchesTeams = (e.teamsOrAthletes || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesSport && !matchesVenue && !matchesCategory && !matchesTeams) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  }, [publishedEvents, selectedDate, selectedSport, selectedVenue, selectedStatus, searchTerm]);

  // Group events by day when 'all' is selected
  const eventsByDay = useMemo(() => {
    const map = new Map<string, typeof filteredEvents>();
    filteredEvents.forEach(evt => {
      const list = map.get(evt.date) || [];
      list.push(evt);
      map.set(evt.date, list);
    });
    return map;
  }, [filteredEvents]);

  const handleClearFilters = () => {
    setSelectedDate('all');
    setSearchTerm('');
    setSelectedSport('');
    setSelectedVenue('');
    setSelectedStatus('');
  };

  return (
    <main id="conteudo" className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Page Hero */}
        <div className="mb-8 border-b border-border/80 pb-6">
          <span className="text-eyebrow text-flame block mb-1">
            Horário oficial de Brasília
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-primary uppercase tracking-tight">
            Programação dos Jogos
          </h1>
          <p className="mt-2 text-base text-muted-foreground max-w-2xl">
            Consulte as disputas por data, modalidade e praça esportiva de Rio do Sul. Toque em qualquer atividade para ver detalhes.
          </p>
        </div>

        {/* Date Selector Scroller */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 scrollbar-thin">
            <button
              onClick={() => setSelectedDate('all')}
              className={`flex flex-col items-center justify-center rounded-2xl p-3 min-w-[85px] transition-all cursor-pointer border ${
                selectedDate === 'all'
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-paper text-foreground border-border hover:bg-cream/60'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider">Todos</span>
              <span className="font-display text-2xl font-bold my-0.5">14–28</span>
              <span className="text-[10px] opacity-80">os dias</span>
            </button>

            {COMPETITION_DAYS.map(d => {
              const active = selectedDate === d.date;
              return (
                <button
                  key={`prog-day-${d.date}`}
                  onClick={() => setSelectedDate(d.date)}
                  className={`flex flex-col items-center justify-center rounded-2xl p-3 min-w-[76px] transition-all cursor-pointer border ${
                    active
                      ? 'bg-primary text-white border-primary shadow-md scale-102'
                      : 'bg-paper text-foreground border-border hover:bg-cream/60'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">
                    {d.dayname}
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-bold my-0.5 leading-none">
                    {d.day}
                  </span>
                  <span className="text-[10px] opacity-75">
                    {d.count} ativ.
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Panel */}
        <div className="mb-8 rounded-3xl bg-paper p-5 ring-1 ring-border shadow-card">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <label htmlFor="prog-search" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  id="prog-search"
                  type="text"
                  placeholder="Modalidade, equipe, local..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-border bg-white pl-10 pr-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Sport Filter */}
            <div>
              <label htmlFor="prog-sport" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                Modalidade
              </label>
              <select
                id="prog-sport"
                value={selectedSport}
                onChange={e => setSelectedSport(e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="">Todas as modalidades</option>
                {ALL_JASC_MODALITIES.map(sport => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>

            {/* Venue Filter */}
            <div>
              <label htmlFor="prog-venue" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                Local
              </label>
              <select
                id="prog-venue"
                value={selectedVenue}
                onChange={e => setSelectedVenue(e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="">Todos os locais</option>
                {venues.map(v => (
                  <option key={v.slug} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="prog-status" className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                Status
              </label>
              <select
                id="prog-status"
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="">Todos os status</option>
                <option value="Confirmada">Confirmada / Programada</option>
                <option value="Prevista">Prevista</option>
                <option value="Alterada">Alterada</option>
                <option value="Encerrada">Encerrada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          {/* Active filter counter and Reset button */}
          {(searchTerm || selectedSport || selectedVenue || selectedStatus || selectedDate !== 'all') && (
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">
                Filtros ativos aplicados · {filteredEvents.length} {filteredEvents.length === 1 ? 'resultado' : 'resultados'}
              </span>
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 font-bold text-flame hover:underline cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                Limpar filtros
              </button>
            </div>
          )}
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'atividade encontrada' : 'atividades encontradas'}
            {selectedDate !== 'all' && (
              <span> · {COMPETITION_DAYS.find(d => d.date === selectedDate)?.label}</span>
            )}
          </p>
        </div>

        {/* Event List */}
        {filteredEvents.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-paper p-12 text-center">
            <Calendar className="size-12 text-muted-foreground/60 mx-auto mb-3" />
            <h3 className="font-condensed text-xl font-bold uppercase text-foreground mb-1">
              Nenhuma atividade encontrada
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
              Nenhuma disputa corresponde aos filtros selecionados. Tente limpar os filtros ou selecionar outra data.
            </p>
            <button
              onClick={handleClearFilters}
              className="rounded-xl bg-primary text-white font-condensed font-bold uppercase px-6 py-2.5 text-sm hover:bg-green-deep cursor-pointer"
            >
              Ver todas as atividades
            </button>
          </div>
        ) : selectedDate === 'all' ? (
          /* Grouped by Day */
          <div className="space-y-10">
            {COMPETITION_DAYS.map(day => {
              const dayItems = eventsByDay.get(day.date) || [];
              if (dayItems.length === 0) return null;

              return (
                <section key={`day-group-${day.date}`} className="space-y-3">
                  <div className="sticky top-20 z-10 bg-paper/90 backdrop-blur py-2 border-b border-border flex items-center justify-between">
                    <h2 className="font-condensed text-xl sm:text-2xl font-bold text-primary uppercase tracking-wide flex items-center gap-2">
                      <Calendar className="size-5 text-flame" />
                      {day.label}
                    </h2>
                    <span className="text-xs font-bold uppercase text-muted-foreground">
                      {dayItems.length} {dayItems.length === 1 ? 'atividade' : 'atividades'}
                    </span>
                  </div>

                  <div className="space-y-3 pt-1">
                    {dayItems.map(evt => (
                      <EventCard key={evt.id} event={evt} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          /* Single Day List */
          <div className="space-y-3">
            {filteredEvents.map(evt => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        )}

        <div className="mt-12 rounded-2xl bg-cream/70 p-4 text-xs text-muted-foreground text-center sm:text-left border border-border">
          <p>
            Todos os horários seguem o fuso oficial de Brasília (America/Sao_Paulo). Atividades demonstrativas são identificadas com o selo e serão validadas oficialmente pela Fesporte e pela CCO dos JASC 2026.
          </p>
        </div>
      </div>
    </main>
  );
};
