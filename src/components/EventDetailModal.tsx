import React, { useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Flame, ExternalLink, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COMPETITION_DAYS } from '../data/initialData';

export const EventDetailModal: React.FC = () => {
  const { selectedEventDetail, setSelectedEventDetail, navigate } = useApp();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedEventDetail(null);
      }
    };
    if (selectedEventDetail) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKey);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKey);
    };
  }, [selectedEventDetail, setSelectedEventDetail]);

  if (!selectedEventDetail) return null;

  const dayInfo = COMPETITION_DAYS.find(d => d.date === selectedEventDetail.date);
  const formattedDate = dayInfo ? dayInfo.label : selectedEventDetail.date;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-paper p-6 sm:p-8 shadow-2xl border border-border animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setSelectedEventDetail(null)}
          className="absolute top-5 right-5 size-9 rounded-full bg-cream hover:bg-gold/30 text-foreground flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fechar janela de detalhes"
        >
          <X className="size-5" />
        </button>

        {/* Eyebrow info */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-flame mb-2">
          <Flame className="size-4 fill-flame" />
          <span>{selectedEventDetail.sport}</span>
          <span>·</span>
          <span className="text-muted-foreground">{selectedEventDetail.category}</span>
        </div>

        {/* Title */}
        <h2 id="modal-title" className="font-condensed text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-4">
          {selectedEventDetail.title}
        </h2>

        {/* Demo Warning if applicable */}
        {selectedEventDetail.demo && (
          <div className="mb-4 rounded-xl bg-gold/20 border border-gold/40 p-3 flex items-start gap-2.5 text-xs text-foreground/85">
            <ShieldAlert className="size-4 text-gold shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-gold-foreground">Atividade Demonstrativa</strong>
              Horários, equipes e locais foram gerados para demonstração da interface e serão substituídos pelos boletins oficiais da Fesporte.
            </div>
          </div>
        )}

        {/* Schedule grid */}
        <div className="space-y-3.5 my-5 border-y border-border/80 py-4 text-sm text-foreground">
          <div className="flex items-center gap-3">
            <Calendar className="size-4 text-primary shrink-0" />
            <div>
              <span className="text-xs text-muted-foreground block">Data</span>
              <span className="font-semibold capitalize">{formattedDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="size-4 text-primary shrink-0" />
            <div>
              <span className="text-xs text-muted-foreground block">Horário</span>
              <span className="font-semibold">
                <span className="tracking-[0.08em] competition-time">{selectedEventDetail.time}</span> (Horário oficial de Brasília)
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-xs text-muted-foreground block">Local da Competição</span>
              <span className="font-semibold block">{selectedEventDetail.venue}</span>
              <span className="text-xs text-muted-foreground">Rio do Sul — Santa Catarina</span>
            </div>
          </div>
        </div>

        {/* Observations / Details */}
        {selectedEventDetail.observations && (
          <div className="mb-5 text-xs text-muted-foreground bg-cream/70 rounded-xl p-3">
            <span className="font-bold text-foreground block mb-0.5">Observações:</span>
            {selectedEventDetail.observations}
          </div>
        )}

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={() => {
              setSelectedEventDetail(null);
              navigate('/locais');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-paper hover:bg-cream text-foreground font-condensed font-bold uppercase text-sm py-2.5 px-4 cursor-pointer"
          >
            Ver informações do local
            <ExternalLink className="size-3.5" />
          </button>

          <button
            onClick={() => setSelectedEventDetail(null)}
            className="w-full sm:w-auto rounded-lg bg-primary hover:bg-green-deep text-white font-condensed font-bold uppercase text-sm py-2.5 px-6 shadow-sm cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
