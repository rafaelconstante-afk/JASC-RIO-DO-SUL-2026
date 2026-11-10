import React from 'react';
import { useApp } from '../context/AppContext';
import { FooterWave } from './WaveSeparators';

export const Footer: React.FC = () => {
  const { navigate, reducedMotion, setReducedMotion } = useApp();

  return (
    <footer className="relative mt-24 bg-green-deep text-cream pt-12 pb-8">
      <FooterWave />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 pb-14 border-b border-white/10">
          {/* Col 1: Brand & Details */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white p-2 rounded-2xl shadow-sm inline-block">
                <img
                  src="/assets/jasc-2026-logo.svg"
                  alt="JASC 2026"
                  className="h-16 w-auto"
                />
              </div>
            </div>
            <p className="text-sm text-cream/80 leading-relaxed max-w-sm">
              65º Jogos Abertos de Santa Catarina. Rio do Sul — SC, de 14 a 28 de novembro de 2026.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="font-condensed text-xl font-bold uppercase tracking-wider text-gold mb-4">
              Navegação
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 text-sm text-cream/85">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-gold transition-colors cursor-pointer text-left"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/programacao')}
                  className="hover:text-gold transition-colors cursor-pointer text-left"
                >
                  Programação
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/modalidades')}
                  className="hover:text-gold transition-colors cursor-pointer text-left"
                >
                  Modalidades
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/locais')}
                  className="hover:text-gold transition-colors cursor-pointer text-left"
                >
                  Locais
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/noticias')}
                  className="hover:text-gold transition-colors cursor-pointer text-left"
                >
                  Notícias
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/resultados')}
                  className="hover:text-gold transition-colors cursor-pointer text-left"
                >
                  Resultados
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/acessibilidade')}
                  className="hover:text-gold transition-colors cursor-pointer text-left"
                >
                  Acessibilidade
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/privacidade')}
                  className="hover:text-gold transition-colors cursor-pointer text-left"
                >
                  Privacidade
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Organization & Accessibility */}
          <div>
            <h3 className="font-condensed text-xl font-bold uppercase tracking-wider text-gold mb-4">
              Organização
            </h3>
            <p className="text-sm text-cream/80 leading-relaxed mb-3">
              Prefeitura de Rio do Sul — SEMEL, Secretaria Municipal de Esporte e Lazer, em parceria com a Fesporte e o Governo de Santa Catarina.
            </p>
            <p className="text-xs text-cream/65 leading-relaxed mb-4">
              Telefone e e-mail de contato: a serem informados pela organização.
            </p>

            {/* Accessibility toggle */}
            <div className="pt-2">
              <label className="inline-flex items-center gap-2.5 text-xs text-cream/90 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={e => setReducedMotion(e.target.checked)}
                  className="size-4 rounded border-white/30 text-gold focus:ring-gold accent-gold cursor-pointer"
                />
                <span>Reduzir movimentos (acessibilidade)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Realização / Official Sponsors Banner */}
        <div className="py-10 text-center">
          <p className="text-eyebrow text-gold/90 mb-3 tracking-widest text-xs">
            Realização
          </p>
          <div className="inline-block bg-white rounded-2xl p-4 sm:p-5 shadow-lg max-w-xl w-full mx-auto">
            <img
              src="/assets/logos-realizacao.png"
              alt="Realização: Fesporte, Governo de Santa Catarina, SEMEL, Governo de Rio do Sul"
              className="h-auto max-h-16 w-full object-contain mx-auto"
            />
          </div>
        </div>

        {/* Bottom copyright and admin link */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/60 text-center sm:text-left">
          <span>
            jasc2026.riodosul.sc.gov.br · Protótipo de interface com conteúdo demonstrativo.
          </span>
          <button
            onClick={() => navigate('/admin')}
            className="hover:text-gold underline underline-offset-4 cursor-pointer text-cream/80 font-medium"
          >
            Painel administrativo (demonstração) →
          </button>
        </div>
      </div>
    </footer>
  );
};
