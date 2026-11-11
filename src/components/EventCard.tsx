import React from 'react';
import { Clock, MapPin, ChevronRight, Flame } from 'lucide-react';
import { CompetitionEvent } from '../types';
import { useApp } from '../context/AppContext';

interface EventCardProps {
  event: CompetitionEvent;
  compact?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, compact = false }) => {
  const { setSelectedEventDetail } = useApp();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmada':
      case 'Programado':
        return {
          bg: 'bg-[#E8F5E9] text-[#25663E] border-[#C8E6C9]',
          label: 'PROGRAMADO'
        };
      case 'Alterada':
        return {
          bg: 'bg-[#FFF3E0] text-[#B76E00] border-[#FFE0B2]',
          label: 'ALTERADO'
        };
      case 'Cancelada':
        return {
          bg: 'bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]',
          label: 'CANCELADO'
        };
      case 'Encerrada':
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          label: 'ENCERRADO'
        };
      default:
        return {
          bg: 'bg-[#E8F5E9] text-[#25663E] border-[#C8E6C9]',
          label: 'PROGRAMADO'
        };
    }
  };

  const statusStyle = getStatusBadge(event.statusEsportivo);

  return (
    <article className="group relative rounded-2xl bg-paper p-4 sm:p-5 ring-1 ring-border shadow-card transition-all hover:ring-primary/40 hover:shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Time and timezone */}
        <div className="flex items-center gap-4 md:border-r md:border-border/80 md:pr-6 shrink-0">
          <div className="text-left md:text-center min-w-[70px]">
            <span className="block font-display text-3xl sm:text-4xl text-primary font-bold tracking-[0.08em] competition-time leading-none">
              {event.time}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mt-0.5">
              Brasília
            </span>
          </div>
        </div>

        {/* Center: Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 font-condensed text-xs sm:text-sm font-bold uppercase tracking-wider text-flame">
              <Flame className="size-3.5 fill-flame" />
              {event.sport}
            </span>

            <span className="text-xs text-muted-foreground font-medium">
              {event.category}
            </span>

            {event.demo && (
              <span className="inline-block rounded border border-dashed border-[#F5B02E] bg-[#FFF9EC] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#A86E00]">
                Demonstrativo
              </span>
            )}
          </div>

          <h3 className="font-condensed text-lg sm:text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <p className="mt-1 flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
            <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">{event.venue}</span>
          </p>
        </div>

        {/* Right: Status pill and details button */}
        <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-border/60 shrink-0">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider border ${statusStyle.bg}`}
          >
            <Clock className="size-3" />
            {statusStyle.label}
          </span>

          <button
            onClick={() => setSelectedEventDetail(event)}
            className="inline-flex items-center gap-0.5 font-condensed text-sm font-bold uppercase tracking-wider text-primary hover:text-flame transition-colors cursor-pointer py-1.5 px-2 rounded-md hover:bg-cream/60"
          >
            Detalhes
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
