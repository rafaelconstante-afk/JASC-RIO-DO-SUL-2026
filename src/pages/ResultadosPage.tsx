import React from 'react';
import { Trophy, FileText, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ResultadosPage: React.FC = () => {
  const { results, navigate } = useApp();

  return (
    <main id="conteudo" className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Page Hero */}
        <div className="mb-8 border-b border-border/80 pb-6">
          <span className="text-eyebrow text-flame block mb-1">
            Boletins e Pontuação
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-primary uppercase tracking-tight">
            Resultados Oficiais
          </h1>
          <p className="mt-2 text-base text-muted-foreground max-w-2xl">
            Acompanhe a pontuação dos municípios, quadro de medalhas e os boletins técnicos emitidos pela Fesporte.
          </p>
        </div>

        {/* Institutional Integrity Banner */}
        <div className="mb-8 rounded-3xl bg-cream/90 border border-gold/40 p-6 flex items-start gap-4 shadow-xs">
          <ShieldCheck className="size-6 text-primary shrink-0 mt-1" />
          <div className="text-sm text-foreground/85 leading-relaxed">
            <h3 className="font-condensed text-lg font-bold uppercase tracking-wider text-primary mb-1">
              Transparência e Veracidade Esportiva
            </h3>
            <p>
              Os resultados dos 65º Jogos Abertos de Santa Catarina são homologados e publicados exclusivamente pela Diretoria de Esporte da Fesporte e pela Comissão Técnica dos Jogos. O portal institucional disponibiliza acesso direto aos documentos oficiais assim que validados, garantindo a integridade dos dados e evitando informações não confirmadas.
            </p>
          </div>
        </div>

        {/* Official Sources Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {results.map(res => (
            <div
              key={res.id}
              className="rounded-3xl bg-paper p-6 border border-border shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="size-11 rounded-2xl bg-gold/25 text-primary flex items-center justify-center mb-4">
                  <FileText className="size-5" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-flame block mb-1">
                  {res.type}
                </span>

                <h3 className="font-condensed text-2xl font-bold text-foreground leading-tight mb-2">
                  {res.title}
                </h3>

                <p className="text-xs text-muted-foreground mb-4">
                  {res.publishedBy} · {res.date}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-primary font-semibold">
                  Fonte Oficial
                </span>
                <a
                  href={res.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-condensed text-sm font-bold uppercase tracking-wider text-flame hover:underline"
                >
                  Consultar Fesporte
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Notice of live competition */}
        <div className="rounded-3xl bg-primary text-cream p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <Trophy className="absolute right-4 bottom-4 size-44 text-white/10 pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-white mb-2">
              Durante os Jogos Abertos
            </h2>
            <p className="text-sm sm:text-base text-cream/85 leading-relaxed mb-6">
              Os boletins diários serão atualizados ao final de cada jornada de competições, contendo súmulas, quadro de pontos acumulados por município e o ranking oficial do Troféu Transitório dos JASC.
            </p>
            <button
              onClick={() => navigate('/programacao')}
              className="rounded-xl bg-gold text-green-deep font-condensed font-bold uppercase px-6 py-3 text-sm hover:bg-gold/90 transition-colors cursor-pointer shadow-sm"
            >
              Consultar programação de disputas
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
