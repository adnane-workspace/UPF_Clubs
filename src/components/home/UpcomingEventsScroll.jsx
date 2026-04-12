import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { upcomingEventsData as upcomingEvents } from '../../data/clubsData';

const pad = (n) => String(n).padStart(2, '0');

export default function UpcomingEventsScroll() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);
  const slideRefs = useRef([]);

  /* ── Track active slide via IntersectionObserver ── */
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = slideRefs.current.indexOf(entry.target);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { root: containerRef.current, threshold: 0.55 }
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (idx) => {
    slideRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };
  const goNext = () => scrollTo(Math.min(activeIdx + 1, upcomingEvents.length - 1));
  const goPrev = () => scrollTo(Math.max(activeIdx - 1, 0));

  return (
    <section id="calendrier" className="relative bg-navy-950" style={{ height: '100vh' }}>

      {/* ══════════════════════════════════════════
          HORIZONTAL SCROLL CONTAINER
      ══════════════════════════════════════════ */}
      <div
        ref={containerRef}
        className="flex h-full overflow-x-scroll overflow-y-hidden"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {upcomingEvents.map((ev, idx) => (
          <div
            key={ev.id}
            ref={(el) => (slideRefs.current[idx] = el)}
            className="relative flex-shrink-0 bg-navy-950 flex flex-col lg:flex-row overflow-hidden"
            style={{ width: '100vw', height: '100vh', scrollSnapAlign: 'start' }}
          >
            {/* ── LEFT: dark content panel ── */}
            <div className="relative z-10 flex flex-col justify-between w-full lg:w-[55%] h-full px-6 sm:px-10 lg:px-16 py-10 lg:py-14">

              {/* Top eyebrow */}
              <motion.div
                key={`tag-${idx}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <span className={`w-8 h-0.5 rounded-full bg-gradient-to-r ${ev.color}`} />
                <span className="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">
                  Événement à venir
                </span>
              </motion.div>

              {/* Main content */}
              <motion.div
                key={`content-${idx}`}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Badge + club */}
                <div className="flex items-center gap-3 mb-5">
                  <span className={`inline-block bg-gradient-to-r ${ev.color} text-white text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg`}>
                    {ev.category}
                  </span>
                  <span className="text-white/45 text-sm">
                    par <span className="text-white/75 font-semibold">{ev.club}</span>
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="text-hero font-black text-white leading-[1.05] mb-5"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
                >
                  {ev.title}
                </h2>

                {/* Gradient divider */}
                <div className={`w-14 h-0.5 rounded-full bg-gradient-to-r ${ev.color} mb-5`} />

                {/* Description */}
                <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg">
                  {ev.description}
                </p>

                {/* Info cards */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    { icon: <Calendar size={14} />, label: 'Date',  value: ev.date },
                    { icon: <Clock size={14} />,    label: 'Heure', value: ev.time },
                    { icon: <MapPin size={14} />,   label: 'Lieu',  value: ev.location },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3"
                    >
                      <span className="text-brand-400 shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-white/35 text-[9px] font-bold uppercase tracking-wider">{item.label}</p>
                        <p className="text-white text-sm font-semibold">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-5">
                  <motion.button
                    whileHover={{ scale: 1.04, x: 4 }}
                    whileTap={{ scale: 0.96 }}
                    className={`flex items-center gap-2.5 bg-gradient-to-r ${ev.color} text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-xl group transition-all`}
                  >
                    S'inscrire
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <button className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm font-semibold transition-colors group">
                    En savoir plus
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>

              {/* Counter bottom */}
              <div className="tabular-nums select-none">
                <span className="text-white text-2xl font-black">{pad(idx + 1)}</span>
                <span className="text-white/25 text-base font-semibold"> / {pad(upcomingEvents.length)}</span>
              </div>
            </div>

            {/* ── RIGHT: image panel ── */}
            <div className="hidden lg:block w-[45%] h-full p-6 flex-shrink-0">
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Subtle gradient overlay on image */}
                <div className={`absolute inset-0 bg-gradient-to-br ${ev.color} opacity-20`} />
              </div>
            </div>

            {/* Large decorative number */}
            <div
              className="absolute select-none pointer-events-none font-black text-white/[0.03] leading-none bottom-[-6%] left-[2%]"
              style={{ fontSize: 'clamp(160px, 25vw, 380px)', fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.05em' }}
            >
              {pad(idx + 1)}
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM BAR: dots + arrows
      ══════════════════════════════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-7 flex items-end justify-between">

          {/* Left: dot indicators */}
          <div className="pointer-events-auto flex items-center gap-2.5">
            {upcomingEvents.map((ev, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="group flex flex-col items-center gap-1.5"
              >
                <AnimatePresence>
                  {i === activeIdx && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="text-[9px] font-bold text-white/60 uppercase tracking-wider whitespace-nowrap hidden sm:block"
                    >
                      {ev.category}
                    </motion.span>
                  )}
                </AnimatePresence>
                <motion.span
                  animate={{
                    width: i === activeIdx ? 28 : 6,
                    opacity: i === activeIdx ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`block h-1.5 rounded-full ${i === activeIdx ? ev.dot : 'bg-white group-hover:opacity-70'}`}
                />
              </button>
            ))}
          </div>

          {/* Right: prev / next arrows */}
          <div className="pointer-events-auto flex items-center gap-2">
            {/* Progress fraction */}
            <span className="text-white/30 text-xs font-semibold tabular-nums mr-2 hidden sm:block">
              <span className="text-white font-black">{pad(activeIdx + 1)}</span> / {pad(upcomingEvents.length)}
            </span>

            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={goPrev}
              disabled={activeIdx === 0}
              className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-25"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={goNext}
              disabled={activeIdx === upcomingEvents.length - 1}
              className={`w-11 h-11 rounded-full bg-gradient-to-br ${upcomingEvents[activeIdx].color} text-white flex items-center justify-center shadow-lg hover:opacity-90 transition-all disabled:opacity-25`}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
