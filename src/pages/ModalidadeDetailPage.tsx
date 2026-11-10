import React from 'react';
import { ArrowLeft, Flame, MapPin, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/EventCard';

interface ModalidadeDetailPageProps {
  slug: string;
}

export const ModalidadeDetailPage: React.FC<ModalidadeDetailPageProps> = ({ slug }) => {
  const { sports, publishedEvents, navigate } = useApp();

  const sport = sports.find(s => s.slug === slug);

  if (!sport) {
    return (
      <main id="conteudo" className="py-16 text-center">
        <div className="mx-auto max-w-lg px-4">
          <h1 className="font-display text-4xl font-bold text-primary mb-3">
            Modalidade não encontrada
          </h1>
          <p className="text-muted-foreground mb-6">
            A modalidade solicitada não foi localizada na base de dados.
          </p>
          <button
            onClick={() => navigate('/modalidades')}
            className="rounded-xl bg-primary text-white font-condensed font-bold uppercase px-6 py-3 cursor-pointer"
          >
            Voltar para modalidades
          </button>
        </div>
      </main>
    );
  }

  // Find all events for this sport
  const sportEvents = publishedEvents.filter(
    e => e.sport.toLowerCase() === sport.name.toLowerCase()
  );

  return (
    <main id="conteudo" className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Back Link */}
        <button
          onClick={() => navigate('/modalidades')}
          className="inline-flex items-center gap-1.5 font-condensed font-bold uppercase tracking-wider text-primary hover:text-flame transition-colors text-sm mb-6 cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          Todas as modalidades
        </button>

        {/* Header Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-green-deep text-cream p-6 sm:p-10 mb-10 shadow-lg">
          {sport.image && (
            <img
              src={sport.image}
              alt={sport.name}
              className="absolute inset-0 h-full w-full object-cover opacity-20 pointer-events-none"
            />
          )}
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 text-gold px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3">
              <Flame className="size-3.5 fill-gold" />
              <span>Modalidade JASC 2026</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none mb-3">
              {sport.name}
            </h1>

            <p className="text-base sm:text-lg text-cream/90 leading-relaxed mb-6">
              {sport.description}
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider text-cream/80">
              {sport.categories.map(cat => (
                <span key={cat} className="rounded-lg bg-white/10 px-3 py-1.5 border border-white/10">
                  Categoria: {cat}
                </span>
              ))}

              {sport.defaultVenue && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 border border-white/10">
                  <MapPin className="size-3.5 text-gold" />
                  {sport.defaultVenue}
                </span>
              )}

              <span className="inline-flex items-center gap-1.5 rounded-lg bg-gold/20 text-gold px-3 py-1.5 border border-gold/30">
                <Calendar className="size-3.5" />
                {sportEvents.length} {sportEvents.length === 1 ? 'atividade' : 'atividades'}
              </span>
            </div>
          </div>
        </div>

        {/* Scheduled Activities for this sport */}
        <div>
          <h2 className="font-display text-3xl sm:text-4xl text-primary uppercase tracking-tight mb-6">
            Programação da Modalidade
          </h2>

          {sportEvents.length > 0 ? (
            <div className="space-y-3.5">
              {sportEvents.map(evt => (
                <EventCard key={evt.id} event={evt} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-paper p-10 text-center text-muted-foreground">
              <p className="text-base font-semibold text-foreground mb-1">
                Ainda não há atividades programadas para {sport.name}
              </p>
              <p className="text-xs text-muted-foreground">
                As disputas e horários oficiais serão cadastrados conforme a publicação dos boletins da Fesporte.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
