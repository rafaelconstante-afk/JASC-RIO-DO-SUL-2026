import React from 'react';
import { Eye, Shield, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AcessibilidadePage: React.FC = () => {
  const { reducedMotion, setReducedMotion, navigate } = useApp();

  return (
    <main id="conteudo" className="py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8 border-b border-border/80 pb-6">
          <span className="text-eyebrow text-flame block mb-1">
            Inclusão e Usabilidade
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-primary uppercase tracking-tight">
            Acessibilidade Digital
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Diretrizes e recursos implementados no portal institucional dos JASC 2026.
          </p>
        </div>

        <div className="space-y-6 text-sm text-foreground/85 leading-relaxed">
          <div className="rounded-3xl bg-paper p-6 sm:p-8 border border-border shadow-card">
            <h2 className="font-condensed text-2xl font-bold text-primary mb-3">
              Recursos Disponíveis
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Navegação por Teclado:</strong> Todos os elementos interativos (links, botões, filtros, modais) possuem foco visível e operam com Tab, Shift+Tab, Enter e Escape.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Atalho para o Conteúdo:</strong> Link &quot;Pular para o conteúdo&quot; no topo da página permite acesso rápido com leitores de tela.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Contraste WCAG 2.2 AA:</strong> Cores calibradas para legibilidade de texto em conformidade com as diretrizes internacionais.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Estrutura Semântica:</strong> Marcação HTML5 (header, main, section, nav, footer) compatível com tecnologias assistivas.
                </span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-condensed text-lg font-bold text-foreground mb-3">
                Controle de Animações
              </h3>
              <label className="inline-flex items-center gap-3 p-3 rounded-2xl bg-cream border border-border cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={e => setReducedMotion(e.target.checked)}
                  className="size-5 rounded border-primary text-primary focus:ring-primary accent-primary"
                />
                <div>
                  <span className="font-bold text-foreground block text-sm">Reduzir movimentos e transições</span>
                  <span className="text-xs text-muted-foreground">Desativa animações e rolagem suave para conforto visual.</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export const PrivacidadePage: React.FC = () => {
  return (
    <main id="conteudo" className="py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8 border-b border-border/80 pb-6">
          <span className="text-eyebrow text-flame block mb-1">
            Transparência
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-primary uppercase tracking-tight">
            Privacidade e Dados
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Informações sobre o tratamento de dados no portal dos 65º JASC 2026.
          </p>
        </div>

        <div className="rounded-3xl bg-paper p-6 sm:p-8 border border-border shadow-card space-y-4 text-sm text-foreground/85 leading-relaxed">
          <h2 className="font-condensed text-2xl font-bold text-primary mb-2">
            Armazenamento Local
          </h2>
          <p>
            Este protótipo de desenvolvimento armazena preferências de acessibilidade e atividades cadastradas no painel demonstrativo diretamente no navegador do usuário (via <code>localStorage</code>), sem transmissão de dados pessoais ou cookies de rastreamento.
          </p>

          <h2 className="font-condensed text-2xl font-bold text-primary pt-4 mb-2">
            Conexão com Banco de Dados Institucional
          </h2>
          <p>
            Na versão definitiva conectada ao Supabase/PostgreSQL sob a infraestrutura da Prefeitura de Rio do Sul e Fesporte, o portal operará com autenticação restrita aos servidores autorizados e leitura pública segura por meio de Row Level Security (RLS).
          </p>
        </div>
      </div>
    </main>
  );
};
