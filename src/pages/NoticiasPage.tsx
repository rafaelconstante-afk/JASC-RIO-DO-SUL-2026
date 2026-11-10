import React from 'react';
import { ArrowRight, Flame, Megaphone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NoticiasPage: React.FC = () => {
  const { news, navigate } = useApp();

  return (
    <main id="conteudo" className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Page Hero */}
        <div className="mb-8 border-b border-border/80 pb-6">
          <span className="text-eyebrow text-flame block mb-1">
            Comunicados e Avisos
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-primary uppercase tracking-tight">
            Notícias
          </h1>
          <p className="mt-2 text-base text-muted-foreground max-w-2xl">
            Acompanhe comunicados oficiais, alterações de programação e novidades dos 65º Jogos Abertos de Santa Catarina.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map(item => (
            <article
              key={item.slug}
              onClick={() => navigate(`/noticias/${item.slug}`)}
              className="group flex flex-col rounded-3xl bg-paper ring-1 ring-border shadow-card overflow-hidden hover:shadow-lg transition-all cursor-pointer"
            >
              {/* Header Banner */}
              {item.img ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ) : item.kind === 'Cerimônia' ? (
                <div className="aspect-[16/10] bg-gradient-flame flex items-center justify-center p-6 text-white text-center">
                  <Flame className="size-14 text-white/90" />
                </div>
              ) : (
                <div className="aspect-[16/10] bg-[#FFF2CE] flame-bg flex items-center justify-center p-6 border-b border-border/60">
                  <Megaphone className="size-16 text-flame/70 stroke-[1.5]" />
                </div>
              )}

              {/* Body */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-flame mb-2">
                  <span>{item.kind}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{item.date}</span>
                  {item.demo && (
                    <span className="rounded border border-dashed border-gold px-1.5 py-0.5 text-[9px] text-gold-foreground">
                      Demonstrativo
                    </span>
                  )}
                </div>

                <h2 className="font-condensed text-xl sm:text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors mb-2">
                  {item.title}
                </h2>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                  {item.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-1 font-condensed text-sm font-bold uppercase tracking-wider text-primary group-hover:text-flame transition-colors">
                  Ler comunicado
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};
