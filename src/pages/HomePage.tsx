import React, { useState } from 'react';
import {
  MapPin,
  ArrowRight,
  Flame,
  Calendar,
  Navigation,
  Megaphone,
  Trophy,
  Dumbbell
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COMPETITION_DAYS } from '../data/initialData';
import { PrototypeNotice } from '../components/PrototypeNotice';
import { EventCard } from '../components/EventCard';
import { TopWave } from '../components/WaveSeparators';

export const HomePage: React.FC = () => {
  const { publishedEvents, sports, venues, news, navigate } = useApp();
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-14');

  // Filter events for "O que acontece hoje?"
  const dayEvents = publishedEvents.filter(e => e.date === selectedDate);
  const currentDayInfo = COMPETITION_DAYS.find(d => d.date === selectedDate) || COMPETITION_DAYS[0];

  // 4 upcoming events for "Próximas competições"
  const upcomingEvents = publishedEvents.slice(0, 4);

  return (
    <main id="conteudo">
      {/* SECTION 2: HERO */}
      <section className="flame-bg relative overflow-hidden pt-10 sm:pt-14 pb-12 sm:pb-16" aria-labelledby="titulo-jasc">
        <TopWave />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 z-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-10 lg:gap-14">
            {/* Left copy */}
            <div>
              {/* Location Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4 shadow-2xs">
                <MapPin className="size-3.5 text-primary" />
                <span>Rio do Sul — SC</span>
              </div>

              {/* Main Headline */}
              <h1
                id="titulo-jasc"
                className="font-display text-primary leading-[0.92] text-5xl sm:text-7xl lg:text-[5.5rem] tracking-tight uppercase"
              >
                65º Jogos
                <br />
                Abertos de
                <br />
                Santa Catarina
              </h1>

              {/* Date banner */}
              <div className="mt-5 inline-block -rotate-1 rounded-xl bg-gradient-flame px-4 sm:px-5 py-2 font-display text-2xl sm:text-4xl uppercase text-white shadow-lift">
                14 a 28 de novembro de 2026
              </div>

              {/* Intro copy */}
              <p className="mt-5 max-w-xl text-base sm:text-lg text-foreground/85 leading-relaxed">
                A maior competição esportiva do Sul do Brasil. Abertura oficial e inauguração da nova arena em{' '}
                <strong className="text-primary font-bold">14 de novembro, às 19h</strong>.
              </p>

              {/* Countdown callout */}
              <p className="mt-3 font-condensed text-sm sm:text-base font-bold uppercase tracking-wider text-flame">
                Faltam poucos dias para a grande abertura
              </p>

              {/* Hero CTAs */}
              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => navigate('/programacao')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-flame-dark hover:bg-flame text-white font-condensed font-bold uppercase tracking-wide px-7 py-3.5 text-lg shadow-lift transition-all cursor-pointer"
                >
                  Explorar programação
                  <ArrowRight className="size-5" />
                </button>

                <button
                  onClick={() => navigate('/locais')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary/40 bg-paper/80 hover:bg-primary hover:text-white text-primary font-condensed font-bold uppercase tracking-wide px-7 py-3.5 text-lg transition-colors cursor-pointer"
                >
                  Conheça os locais
                </button>
              </div>
            </div>

            {/* Right: Graphic composition with athletes photo */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative -mx-2 sm:mx-0">
                {/* Decorative background tilted shapes matching original */}
                <div
                  className="absolute -inset-x-4 bottom-4 top-12 -rotate-6 rounded-[3rem] bg-gradient-flame opacity-90 shadow-md"
                  aria-hidden="true"
                />
                <div
                  className="absolute -inset-x-2 bottom-1 top-20 rotate-3 rounded-[3rem] bg-primary shadow-sm"
                  aria-hidden="true"
                />

                <img
                  src="/assets/hero-athletes.jpg"
                  alt="Atletas dos 65º Jogos Abertos de Santa Catarina em pose de competição"
                  className="relative aspect-[4/3] w-full rounded-[2.5rem] object-cover shadow-lift border border-white/20"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: SPONSOR / REALIZAÇÃO CARD UNDER HERO */}
        <div className="relative mx-auto flex max-w-7xl justify-center px-4 pt-10 sm:pt-14 pb-2 z-20">
          <div className="inline-flex items-center justify-center rounded-2xl bg-paper px-6 py-4 shadow-card ring-1 ring-border w-full max-w-[640px]">
            <img
              src="/assets/logos-realizacao.png"
              alt="Realização: Fesporte, Governo de Santa Catarina, SEMEL, Governo de Rio do Sul"
              className="h-auto max-h-14 w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: AVISO DE PROTÓTIPO */}
      <PrototypeNotice />

      {/* SECTION 5: PROGRAMAÇÃO POR DATA ("O QUE ACONTECE HOJE?") */}
      <section className="pt-12 sm:pt-16 pb-8" aria-labelledby="hoje">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-eyebrow text-flame block mb-1">
                Programação por data
              </span>
              <h2 id="hoje" className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary uppercase tracking-tight">
                O que acontece hoje?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Os Jogos começam em 14 de novembro. Veja abaixo o que está previsto para cada dia.
              </p>
            </div>

            <button
              onClick={() => navigate('/programacao')}
              className="inline-flex items-center gap-1.5 font-condensed font-bold uppercase tracking-wider text-primary hover:text-flame transition-colors shrink-0 text-sm sm:text-base cursor-pointer"
            >
              Ver o dia completo
              <ArrowRight className="size-4" />
            </button>
          </div>

          {/* Horizontal Date Selector (Chips) */}
          <div className="flex gap-2 overflow-x-auto pb-4 pt-1 scrollbar-thin" aria-label="Seletor de dias de competição">
            {COMPETITION_DAYS.map(d => {
              const active = selectedDate === d.date;
              return (
                <button
                  key={d.date}
                  onClick={() => setSelectedDate(d.date)}
                  aria-pressed={active}
                  className={`flex flex-col items-center justify-center rounded-2xl p-3 min-w-[76px] transition-all cursor-pointer border ${
                    active
                      ? 'bg-primary text-white border-primary shadow-md scale-102'
                      : 'bg-paper text-foreground border-border hover:border-primary/40 hover:bg-cream/50'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">
                    {d.dayname}
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-bold my-0.5 leading-none">
                    {d.day}
                  </span>
                  <span className="text-[10px] font-medium opacity-75">
                    {d.count} ativ.
                  </span>
                </button>
              );
            })}
          </div>

          {/* Day Label */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground my-4">
            <Calendar className="size-4 text-primary" />
            <span className="capitalize">{currentDayInfo.label}</span>
            <span>·</span>
            <span>{dayEvents.length} {dayEvents.length === 1 ? 'atividade' : 'atividades'}</span>
          </div>

          {/* Event cards for the day */}
          <div className="space-y-3">
            {dayEvents.length > 0 ? (
              dayEvents.map(evt => <EventCard key={evt.id} event={evt} />)
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-paper p-8 text-center text-muted-foreground">
                <p className="text-sm">Nenhuma atividade prevista para esta data.</p>
                <button
                  onClick={() => setSelectedDate('2026-11-14')}
                  className="mt-2 text-xs font-bold uppercase tracking-wider text-primary underline"
                >
                  Ver abertura em 14 de novembro
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 6: AGENDA ("PRÓXIMAS COMPETIÇÕES") */}
      <section className="pt-12 sm:pt-16 pb-8" aria-labelledby="proximas">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-eyebrow text-flame block mb-1">
                Agenda
              </span>
              <h2 id="proximas" className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary uppercase tracking-tight">
                Próximas competições
              </h2>
            </div>

            <button
              onClick={() => navigate('/programacao')}
              className="inline-flex items-center gap-1.5 font-condensed font-bold uppercase tracking-wider text-primary hover:text-flame transition-colors shrink-0 text-sm sm:text-base cursor-pointer"
            >
              Programação
              <ArrowRight className="size-4" />
            </button>
          </div>

          {/* Stacked upcoming competition cards */}
          <div className="space-y-3.5">
            {upcomingEvents.map(evt => (
              <EventCard key={`upcoming-${evt.id}`} event={evt} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: ESPORTES ("EXPLORE AS MODALIDADES") */}
      <section className="mt-16 bg-gradient-green py-16 sm:py-20 text-cream" aria-labelledby="modalidades">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-3 mb-8">
            <div>
              <span className="text-eyebrow text-gold block mb-1 font-bold">
                Esportes
              </span>
              <h2 id="modalidades" className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream uppercase tracking-tight">
                Explore as modalidades
              </h2>
            </div>

            <button
              onClick={() => navigate('/modalidades')}
              className="rounded-lg border border-white/20 bg-white/5 hover:bg-white/15 px-4 py-1.5 font-condensed text-sm font-bold uppercase tracking-wider text-cream transition-colors cursor-pointer"
            >
              Todas
            </button>
          </div>

          {/* 8-Card Grid matching Screenshot 04 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {sports.slice(0, 8).map(sport => {
              const hasCustomImg = Boolean(sport.image);

              return (
                <div
                  key={sport.slug}
                  onClick={() => navigate(`/modalidades/${sport.slug}`)}
                  className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-green-deep ring-1 ring-white/10 shadow-lg cursor-pointer transition-transform hover:-translate-y-1"
                >
                  {/* Background Image or Basketball SVG pattern */}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:from-black/90 transition-colors" />

                  {/* Top ribbon if opening */}
                  {sport.slug === 'cerimonias' && (
                    <div className="absolute top-3 left-3 bg-gradient-flame text-white text-[10px] font-display uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md z-10">
                      14 de Novembro às 19h
                    </div>
                  )}

                  {/* Bottom Content */}
                  <div className="absolute inset-x-0 bottom-0 p-4 z-10">
                    {/* Small round yellow icon badge */}
                    <div className="size-8 rounded-full bg-gold text-green-deep flex items-center justify-center mb-2 shadow-sm font-bold">
                      <Flame className="size-4 fill-green-deep" />
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-white leading-none">
                      {sport.name}
                    </h3>

                    <p className="text-xs text-cream/80 mt-1">
                      {sport.count} {sport.count === 1 ? 'atividade' : 'atividades'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-xs text-cream/70 text-center sm:text-left">
            Lista demonstrativa. As modalidades oficiais serão cadastradas pela organização.
          </p>
        </div>
      </section>

      {/* SECTION 8: ONDE ACONTECE ("LOCAIS DE COMPETIÇÃO") */}
      <section className="pt-16 sm:pt-20 pb-8" aria-labelledby="locais">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-eyebrow text-flame block mb-1">
                Onde acontece
              </span>
              <h2 id="locais" className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary uppercase tracking-tight">
                Locais de competição
              </h2>
            </div>

            <button
              onClick={() => navigate('/locais')}
              className="inline-flex items-center gap-1.5 font-condensed font-bold uppercase tracking-wider text-primary hover:text-flame transition-colors shrink-0 text-sm sm:text-base cursor-pointer"
            >
              Ver todos
              <ArrowRight className="size-4" />
            </button>
          </div>

          {/* 2-Column Grid matching Screenshot 05 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venues.map(venue => (
              <div
                key={venue.slug}
                onClick={() => navigate(`/locais/${venue.slug}`)}
                className="group flex items-center justify-between rounded-2xl bg-paper p-4 sm:p-5 ring-1 ring-border shadow-card transition-all hover:ring-primary/40 hover:shadow-md cursor-pointer"
              >
                <div className="min-w-0 pr-3">
                  <h3 className="font-condensed text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {venue.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate mt-0.5">
                    {venue.address}
                  </p>
                  {!venue.official && (
                    <span className="inline-block mt-1 rounded border border-dashed border-[#F5B02E] bg-[#FFF9EC] px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider text-[#A86E00]">
                      Demonstrativo
                    </span>
                  )}
                </div>

                {/* Circular yellow arrow icon badge */}
                <div className="size-9 rounded-full bg-gold/30 group-hover:bg-gold text-primary group-hover:text-green-deep flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                  <Navigation className="size-4.5 rotate-45" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: COMUNICADOS ("ÚLTIMAS NOTÍCIAS") */}
      <section className="pt-16 sm:pt-20 pb-8" aria-labelledby="noticias">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-eyebrow text-flame block mb-1">
                Comunicados
              </span>
              <h2 id="noticias" className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary uppercase tracking-tight">
                Últimas notícias
              </h2>
            </div>

            <button
              onClick={() => navigate('/noticias')}
              className="inline-flex items-center gap-1.5 font-condensed font-bold uppercase tracking-wider text-primary hover:text-flame transition-colors shrink-0 text-sm sm:text-base cursor-pointer"
            >
              Todas
              <ArrowRight className="size-4" />
            </button>
          </div>

          {/* 3-Column News Cards matching Screenshot 06 */}
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
                <div className="flex flex-col flex-1 p-5 sm:p-6">
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

                  <h3 className="font-condensed text-xl sm:text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors mb-2">
                    {item.title}
                  </h3>

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
      </section>

      {/* SECTION 10: RESULTADOS OFICIAIS ("ACOMPANHE OS RESULTADOS") */}
      <section className="pt-16 sm:pt-20 pb-4" aria-labelledby="resultados">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-flame p-8 text-white sm:p-12 shadow-lift">
            {/* Watermarked Lucide Trophy in top-right */}
            <Trophy
              className="absolute -right-6 -top-6 size-48 text-white/15 pointer-events-none select-none stroke-[1.2]"
              aria-hidden="true"
            />

            <div className="relative max-w-2xl z-10">
              <span className="text-eyebrow mb-2 text-gold-foreground block font-bold">
                Resultados oficiais
              </span>

              <h2 id="resultados" className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
                Acompanhe os resultados
              </h2>

              <p className="mt-3 text-base sm:text-lg text-white/90 leading-relaxed">
                Consulte as fontes oficiais de resultados publicadas pela organização dos Jogos.
              </p>

              <button
                onClick={() => navigate('/resultados')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-condensed font-bold uppercase tracking-wide cursor-pointer transition-all bg-primary text-white shadow-md hover:bg-green-deep h-13 px-8 text-lg mt-6"
              >
                Acessar resultados
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
