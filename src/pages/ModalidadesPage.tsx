import React, { useState } from 'react';
import { Search, Flame, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ModalidadesPage: React.FC = () => {
  const { sports, navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSports = sports.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main id="conteudo" className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Page Hero */}
        <div className="mb-8 border-b border-border/80 pb-6">
          <span className="text-eyebrow text-flame block mb-1">
            Esportes
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-primary uppercase tracking-tight">
            Modalidades
          </h1>
          <p className="mt-2 text-base text-muted-foreground max-w-2xl">
            Conheça as modalidades esportivas disputadas nos 65º Jogos Abertos de Santa Catarina em Rio do Sul.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar modalidade..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-border bg-white pl-10 pr-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Modalities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSports.map(sport => {
            const hasCustomImg = Boolean(sport.image);

            return (
              <div
                key={sport.slug}
                onClick={() => navigate(`/modalidades/${sport.slug}`)}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-green-deep ring-1 ring-border shadow-card cursor-pointer transition-transform hover:-translate-y-1"
              >
                {/* Background Image or stylized pattern */}
                {hasCustomImg ? (
                  <img
                    src={sport.image}
                    alt={sport.name}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#08452A] flex items-center justify-center opacity-85">
                    <div className="size-32 rounded-full border-4 border-white/15 flex items-center justify-center">
                      <div className="h-full w-0.5 bg-white/15" />
                    </div>
                  </div>
                )}

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-colors" />

                {/* Bottom Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                  <div className="size-8 rounded-full bg-gold text-green-deep flex items-center justify-center mb-2 shadow-sm font-bold">
                    <Flame className="size-4 fill-green-deep" />
                  </div>

                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white leading-none">
                    {sport.name}
                  </h3>

                  <p className="text-xs text-cream/80 mt-1 line-clamp-2">
                    {sport.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gold">
                    <span>{sport.count} {sport.count === 1 ? 'atividade' : 'atividades'}</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-12 rounded-2xl bg-cream/70 p-5 text-xs text-muted-foreground border border-border">
          <p className="font-bold text-foreground mb-1">Informações sobre modalidades e regulamentos:</p>
          <p>
            Lista demonstrativa do protótipo. As modalidades oficiais, regulamentos específicos, tabelas de jogos e participantes homologados serão publicados pela Fesporte e pela Secretaria Municipal de Esporte e Lazer (SEMEL) de Rio do Sul.
          </p>
        </div>
      </div>
    </main>
  );
};
