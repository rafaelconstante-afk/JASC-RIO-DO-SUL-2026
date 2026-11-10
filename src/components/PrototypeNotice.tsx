import React from 'react';
import { Info, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PrototypeNotice: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="mx-auto my-6 max-w-7xl px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-gold/25 p-4 sm:p-5 ring-1 ring-gold/50 shadow-xs">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="size-9 rounded-full bg-gold/90 text-primary flex items-center justify-center shrink-0 shadow-xs font-bold text-lg">
            <Info className="size-5 text-primary stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-condensed text-base sm:text-lg font-bold uppercase tracking-wider text-gold-foreground">
              Portal em fase de protótipo
            </h3>
            <p className="text-xs sm:text-sm text-foreground/85 leading-snug">
              A programação, os locais e as modalidades exibidos são demonstrativos. As informações oficiais serão publicadas pela organização.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/noticias/portal-dos-jasc-2026-em-fase-de-testes')}
          className="inline-flex items-center gap-1.5 font-condensed text-sm sm:text-base font-bold uppercase tracking-wider text-primary hover:text-flame transition-colors shrink-0 cursor-pointer self-start sm:self-center"
        >
          Saiba mais
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
};
