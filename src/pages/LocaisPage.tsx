import React from 'react';
import { MapPin, Navigation, ExternalLink, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LocaisPage: React.FC = () => {
  const { venues, publishedEvents, navigate } = useApp();

  return (
    <main id="conteudo" className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Page Hero */}
        <div className="mb-8 border-b border-border/80 pb-6">
          <span className="text-eyebrow text-flame block mb-1">
            Onde acontece
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-primary uppercase tracking-tight">
            Locais de Competição
          </h1>
          <p className="mt-2 text-base text-muted-foreground max-w-2xl">
            Conheça as praças esportivas, ginásios e arenas que receberão as disputas dos 65º Jogos Abertos em Rio do Sul.
          </p>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {venues.map(venue => {
            const venueEvents = publishedEvents.filter(e => e.venue === venue.name);

            return (
              <div
                key={venue.slug}
                className="group flex flex-col justify-between rounded-3xl bg-paper p-6 ring-1 ring-border shadow-card hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {venue.official ? (
                          <span className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                            Arena Oficial
                          </span>
                        ) : (
                          <span className="rounded-full border border-dashed border-gold bg-gold/15 text-gold-foreground px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                            Local Demonstrativo
                          </span>
                        )}
                      </div>
                      <h2
                        onClick={() => navigate(`/locais/${venue.slug}`)}
                        className="font-condensed text-2xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        {venue.name}
                      </h2>
                    </div>

                    <div className="size-11 rounded-full bg-gold/30 text-primary flex items-center justify-center shrink-0 shadow-2xs">
                      <Navigation className="size-5 rotate-45" />
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground flex items-start gap-1.5 mb-4">
                    <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>{venue.address}</span>
                  </p>

                  {venue.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {venue.description}
                    </p>
                  )}

                  {venue.sports && venue.sports.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {venue.sports.map(s => (
                        <span
                          key={s}
                          className="rounded-lg bg-cream px-2 py-0.5 text-[11px] font-bold uppercase text-primary border border-border/80"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="size-3.5" />
                    {venueEvents.length} {venueEvents.length === 1 ? 'atividade prevista' : 'atividades previstas'}
                  </span>

                  <div className="flex items-center gap-3">
                    {venue.mapUrl && (
                      <a
                        href={venue.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-flame hover:underline"
                      >
                        Como chegar
                        <ExternalLink className="size-3" />
                      </a>
                    )}
                    <button
                      onClick={() => navigate(`/locais/${venue.slug}`)}
                      className="text-primary hover:text-flame transition-colors cursor-pointer"
                    >
                      Ver detalhes →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
