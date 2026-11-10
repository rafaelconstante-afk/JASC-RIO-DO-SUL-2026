import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EventDetailModal } from './components/EventDetailModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProgramacaoPage } from './pages/ProgramacaoPage';
import { ModalidadesPage } from './pages/ModalidadesPage';
import { ModalidadeDetailPage } from './pages/ModalidadeDetailPage';
import { LocaisPage } from './pages/LocaisPage';
import { LocalDetailPage } from './pages/LocalDetailPage';
import { NoticiasPage } from './pages/NoticiasPage';
import { NoticiaDetailPage } from './pages/NoticiaDetailPage';
import { ResultadosPage } from './pages/ResultadosPage';
import { AdminPage } from './pages/AdminPage';
import { AcessibilidadePage, PrivacidadePage } from './pages/InstitucionalPages';

const RouterContent: React.FC = () => {
  const { currentRoute, navigate } = useApp();

  // Route parser
  const renderCurrentRoute = () => {
    // 1. Home
    if (currentRoute === '/' || currentRoute === '') {
      return <HomePage />;
    }

    // 2. Programação
    if (currentRoute === '/programacao') {
      return <ProgramacaoPage />;
    }

    // 3. Modalidades
    if (currentRoute === '/modalidades') {
      return <ModalidadesPage />;
    }
    if (currentRoute.startsWith('/modalidades/')) {
      const slug = currentRoute.replace('/modalidades/', '').split('?')[0];
      return <ModalidadeDetailPage slug={slug} />;
    }

    // 4. Locais
    if (currentRoute === '/locais') {
      return <LocaisPage />;
    }
    if (currentRoute.startsWith('/locais/')) {
      const slug = currentRoute.replace('/locais/', '').split('?')[0];
      return <LocalDetailPage slug={slug} />;
    }

    // 5. Notícias
    if (currentRoute === '/noticias') {
      return <NoticiasPage />;
    }
    if (currentRoute.startsWith('/noticias/')) {
      const slug = currentRoute.replace('/noticias/', '').split('?')[0];
      return <NoticiaDetailPage slug={slug} />;
    }

    // 6. Resultados
    if (currentRoute === '/resultados') {
      return <ResultadosPage />;
    }

    // 7. Admin
    if (currentRoute === '/admin') {
      return <AdminPage />;
    }

    // 8. Institucionais
    if (currentRoute === '/acessibilidade') {
      return <AcessibilidadePage />;
    }
    if (currentRoute === '/privacidade') {
      return <PrivacidadePage />;
    }

    // 404 Fallback
    return (
      <main id="conteudo" className="py-20 text-center">
        <div className="mx-auto max-w-lg px-4">
          <h1 className="font-display text-5xl font-bold text-primary mb-3">
            Página não encontrada
          </h1>
          <p className="text-muted-foreground mb-6">
            O endereço acessado não existe nesta versão do portal dos JASC 2026.
          </p>
          <button
            onClick={() => navigate('/')}
            className="rounded-xl bg-primary text-white font-condensed font-bold uppercase px-6 py-3 cursor-pointer shadow-sm hover:bg-green-deep"
          >
            Voltar para o início
          </button>
        </div>
      </main>
    );
  };

  const isAdmin = currentRoute === '/admin';

  return (
    <div className="min-h-screen flex flex-col bg-paper text-foreground font-sans">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-primary focus:p-3 focus:rounded-md focus:shadow-md font-bold text-xs uppercase"
      >
        Pular para o conteúdo principal
      </a>

      <Header />

      <div className="flex-1">
        {renderCurrentRoute()}
      </div>

      {!isAdmin && <Footer />}

      {/* Global detail modal when an event is clicked */}
      <EventDetailModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <RouterContent />
    </AppProvider>
  );
}
