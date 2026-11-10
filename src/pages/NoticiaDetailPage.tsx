import React from 'react';
import { ArrowLeft, Calendar, Flame, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NoticiaDetailPageProps {
  slug: string;
}

export const NoticiaDetailPage: React.FC<NoticiaDetailPageProps> = ({ slug }) => {
  const { news, navigate } = useApp();

  const item = news.find(n => n.slug === slug);

  if (!item) {
    return (
      <main id="conteudo" className="py-16 text-center">
        <div className="mx-auto max-w-lg px-4">
          <h1 className="font-display text-4xl font-bold text-primary mb-3">
            Comunicado não encontrado
          </h1>
          <p className="text-muted-foreground mb-6">
            O comunicado solicitado não foi localizado.
          </p>
          <button
            onClick={() => navigate('/noticias')}
            className="rounded-xl bg-primary text-white font-condensed font-bold uppercase px-6 py-3 cursor-pointer"
          >
            Voltar para notícias
          </button>
        </div>
      </main>
    );
  }

  return (
    <main id="conteudo" className="py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Back Link */}
        <button
          onClick={() => navigate('/noticias')}
          className="inline-flex items-center gap-1.5 font-condensed font-bold uppercase tracking-wider text-primary hover:text-flame transition-colors text-sm mb-6 cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          Todos os comunicados
        </button>

        {/* Article Container */}
        <article className="rounded-3xl bg-paper p-6 sm:p-10 border border-border shadow-card">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-flame mb-3">
            <span className="inline-flex items-center gap-1">
              <Flame className="size-3.5 fill-flame" />
              {item.kind}
            </span>
            <span>·</span>
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="size-3" />
              {item.date}
            </span>
            {item.demo && (
              <span className="rounded border border-dashed border-gold bg-gold/15 px-2 py-0.5 text-[10px] text-gold-foreground">
                Demonstrativo
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-5xl text-foreground uppercase tracking-tight leading-tight mb-6">
            {item.title}
          </h1>

          {/* Featured Image if available */}
          {item.img && (
            <div className="mb-8 overflow-hidden rounded-2xl bg-cream shadow-md">
              <img
                src={item.img}
                alt={item.title}
                className="w-full max-h-[460px] object-cover object-top"
              />
            </div>
          )}

          {/* Demonstrative notice */}
          {item.demo && (
            <div className="mb-6 rounded-2xl bg-gold/20 border border-gold/40 p-4 flex items-start gap-3 text-xs sm:text-sm text-foreground/85">
              <ShieldAlert className="size-5 text-gold shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-gold-foreground mb-0.5">Nota de homologação:</strong>
                Este comunicado faz parte da demonstração do portal e tem como objetivo ilustrar a diagramação de informativos antes da publicação dos boletins oficiais.
              </div>
            </div>
          )}

          {/* Article Text Content */}
          <div className="prose prose-slate max-w-none text-base sm:text-lg text-foreground/85 leading-relaxed space-y-4 pt-2">
            <p>{item.desc}</p>
            <p>{item.content}</p>
          </div>

          {/* Footer of article */}
          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>Comissão Central Organizadora — CCO JASC 2026</span>
            <button
              onClick={() => navigate('/programacao')}
              className="text-primary hover:text-flame font-bold font-condensed uppercase tracking-wider text-sm cursor-pointer"
            >
              Consultar programação dos Jogos →
            </button>
          </div>
        </article>
      </div>
    </main>
  );
};
