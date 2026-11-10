import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { currentRoute, navigate } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Início', path: '/' },
    { label: 'Programação', path: '/programacao' },
    { label: 'Modalidades', path: '/modalidades' },
    { label: 'Locais', path: '/locais' },
    { label: 'Notícias', path: '/noticias' },
    { label: 'Resultados', path: '/resultados' }
  ];

  const handleNav = (p: string) => {
    navigate(p);
    setMobileOpen(false);
  };

  const isActive = (p: string) => {
    if (p === '/') return currentRoute === '/' || currentRoute === '';
    return currentRoute.startsWith(p);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85 shadow-xs">
      <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand logo */}
        <button
          onClick={() => handleNav('/')}
          className="flex shrink-0 items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1"
          aria-label="JASC 2026 — Início"
        >
          <img
            src="/assets/jasc-2026-logo.svg"
            alt="65º JASC — Jogos Abertos de Santa Catarina, Rio do Sul 2026"
            className="h-14 sm:h-16 w-auto select-none"
            loading="eager"
          />
        </button>

        {/* Desktop Navigation */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {navItems.map(item => {
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNav(item.path)}
                    className={`relative inline-flex min-h-11 items-center rounded-md px-3 font-condensed text-[1.1rem] font-bold uppercase tracking-wide cursor-pointer transition-colors ${
                      active
                        ? 'text-primary after:absolute after:inset-x-3 after:bottom-1 after:h-[3px] after:rounded-full after:bg-flame'
                        : 'text-foreground/80 hover:text-flame'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('/programacao')}
            className="hidden sm:inline-flex items-center justify-center gap-2 rounded-lg bg-flame-dark text-white px-5 py-2.5 font-condensed text-[1rem] font-bold uppercase tracking-wide shadow-sm hover:bg-flame transition-all active:translate-y-px cursor-pointer"
          >
            Ver programação
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground/80 hover:text-primary rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-paper px-4 py-4 shadow-lg animate-in fade-in slide-in-from-top-2">
          <nav aria-label="Navegação mobile">
            <ul className="flex flex-col gap-1">
              {navItems.map(item => {
                const active = isActive(item.path);
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => handleNav(item.path)}
                      className={`w-full text-left rounded-lg px-4 py-3 font-condensed text-lg font-bold uppercase tracking-wide transition-colors ${
                        active
                          ? 'bg-cream text-primary border-l-4 border-flame pl-3 font-extrabold'
                          : 'text-foreground hover:bg-cream/60'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
              <li className="pt-2">
                <button
                  onClick={() => handleNav('/programacao')}
                  className="w-full rounded-lg bg-flame-dark text-white py-3 text-center font-condensed font-bold uppercase tracking-wide shadow-sm"
                >
                  Ver programação completa
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => handleNav('/admin')}
                  className="w-full rounded-lg bg-cream/80 text-primary py-2.5 text-center font-condensed font-bold uppercase tracking-wide text-sm border border-border"
                >
                  Painel Administrativo
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};
