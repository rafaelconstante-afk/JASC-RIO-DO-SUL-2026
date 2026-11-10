import React from 'react';
import { ArrowLeft, MapPin, ExternalLink, Calendar, Navigation } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/EventCard';

interface LocalDetailPageProps {
  slug: string;
}

export const LocalDetailPage: React.FC<LocalDetailPageProps> = ({ slug }) => {
  const { venues, publishedEvents, navigate } = useApp();

  const venue = venues.find(v => v.slug === slug);

  if (!venue) {
    return (
      <main id="conteudo" className="py-16 text-center">
        <div className="mx-auto max-w-lg px-4">
          <h1 className="font-display text-4xl font-bold text-primary mb-3">
            Local não encontrado
          </h1>
          <p className="text-muted-foreground mb-6">
            A praça esportiva solicitada não foi localizada.
          </p>
          <button
            onClick={() => navigate('/locais')}
            className="rounded-xl bg-primary text-white font-condensed font-bold uppercase px-6 py-3 cursor-pointer"
          >
            Voltar para locais
          </button>
        </div>
      </main>
    );
  }

  const venueEvents = publishedEvents.filter(e => e.venue === venue.name);

  return (
    <main id="conteudo" className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Back Link */}
        <button
          onClick={() => navigate('/locais')}
          className="inline-flex items-center gap-1.5 font-condensed font-bold uppercase tracking-wider text-primary hover:text-flame transition-colors text-sm mb-6 cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          Todos os locais de competição
        </button>

        {/* Venue Header Card */}
        <div className="rounded-3xl bg-paper p-6 sm:p-10 border border-border shadow-card mb-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {venue.official ? (
                  <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Arena Oficial
                  </span>
                ) : (
                  <span className="rounded-full border border-dashed border-gold bg-gold/15 text-gold-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Local Demonstrativo
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl sm:text-5xl text-foreground uppercase tracking-tight mb-3">
                {venue.name}
              </h1>

              <p className="text-base text-muted-foreground flex items-center gap-2 mb-4">
                <MapPin className="size-4 text-primary shrink-0" />
                <span>{venue.address}</span>
              </p>

              {venue.description && (
                <p className="text-sm text-foreground/85 leading-relaxed max-w-2xl mb-4">
                  {venue.description}
                </p>
              )}

              {venue.sports && (
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1 self-center">
                    Modalidades previstas:
                  </span>
                  {venue.sports.map(s => (
                    <span
                      key={s}
                      className="rounded-lg bg-cream px-3 py-1 text-xs font-bold uppercase text-primary border border-border"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {venue.mapUrl && (
              <a
                href={venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-flame-dark hover:bg-flame text-white font-condensed font-bold uppercase px-6 py-3.5 text-base shadow-sm shrink-0 self-start"
              >
                <Navigation className="size-4" />
                Como chegar (Google Maps)
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        </div>

        {/* Scheduled Activities */}
        <div>
          <h2 className="font-display text-3xl sm:text-4xl text-primary uppercase tracking-tight mb-6">
            Atividades Previstas neste Local
          </h2>

          {venueEvents.length > 0 ? (
            <div className="space-y-3.5">
              {venueEvents.map(evt => (
                <EventCard key={evt.id} event={evt} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-paper p-10 text-center text-muted-foreground">
              <p className="text-base font-semibold text-foreground mb-1">
                Nenhuma atividade programada para este local no momento.
              </p>
              <p className="text-xs text-muted-foreground">
                As disputas oficiais serão alocadas conforme homologação do comitê organizador.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
