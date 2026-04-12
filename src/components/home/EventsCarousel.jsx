import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { upcomingEventsData as eventsData } from '../../data/clubsData';

const AUTOPLAY_DELAY = 5500;

export default function EventsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const goTo = useCallback((idx, dir = 1) => {
    setDirection(dir);
    setCurrent(idx);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % eventsData.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + eventsData.length) % eventsData.length, -1);
  }, [current, goTo]);

  useEffect(() => {
    setProgress(0);
    clearTimeout(timerRef.current);
    clearInterval(progressRef.current);

    const step = 100 / (AUTOPLAY_DELAY / 40);
    progressRef.current = setInterval(() => setProgress(p => Math.min(p + step, 100)), 40);
    timerRef.current = setTimeout(next, AUTOPLAY_DELAY);

    return () => { clearTimeout(timerRef.current); clearInterval(progressRef.current); };
  }, [current, next]);

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  const ev = eventsData[current];
  const padded = (n) => String(n).padStart(2, '0');

  return (
    <section id="accueil" className="relative w-full overflow-hidden bg-navy-950" style={{ height: '100vh' }}>

      {/* ── SLIDES ── */}
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.75, ease: [0.77, 0, 0.175, 1] }}
          className="absolute inset-0"
        >
          {/* Background */}
          <img src={ev.image} alt={ev.title} className="absolute inset-0 w-full h-full object-cover" />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/30 to-transparent" />

          {/* ── CONTENT ── */}
          <div className="relative z-10 h-full flex flex-col justify-end pb-20 sm:pb-24">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
              <div className="max-w-2xl">

                {/* Category badge */}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="inline-block bg-brand-500 text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
                >
                  {ev.category}
                </motion.span>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                  className="text-hero text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4"
                >
                  {ev.title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.30 }}
                  className="text-slate-300 text-base sm:text-lg leading-relaxed mb-7 max-w-xl"
                >
                  {ev.description}
                </motion.p>

                {/* Info badges + CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  {/* CTA */}
                  <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg shadow-brand-500/30 transition-colors">
                    S'inscrire <ArrowRight size={16} />
                  </button>

                  {/* Meta chips */}
                  {[
                    { icon: <Calendar size={14} />, label: ev.date },
                    { icon: <Clock size={14} />,    label: ev.time },
                    { icon: <MapPin size={14} />,   label: ev.location },
                  ].map((item, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 text-sm text-white/80 font-medium bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2.5 rounded-full"
                    >
                      <span className="text-brand-400">{item.icon}</span>
                      {item.label}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── BOTTOM BAR : indicators + arrows ── */}
      <div className="absolute bottom-6 left-0 right-0 z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">

        {/* Progress dots / bars */}
        <div className="flex items-center gap-2">
          {eventsData.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="group relative h-1 rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
              style={{ width: i === current ? 40 : 20 }}
            >
              <div className="absolute inset-0 bg-white/30" />
              {i === current && (
                <div
                  className="absolute inset-y-0 left-0 bg-brand-400 rounded-full"
                  style={{ width: `${progress}%`, transition: 'width 40ms linear' }}
                />
              )}
              {i !== current && (
                <div className="absolute inset-0 bg-white/50 group-hover:bg-white/80 transition-colors rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Counter + Arrows */}
        <div className="flex items-center gap-4">
          <span className="text-white/50 text-sm font-semibold tabular-nums select-none">
            <span className="text-white text-base font-black">{padded(current + 1)}</span>
            {' / '}{padded(eventsData.length)}
          </span>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
              onClick={next}
              className="w-10 h-10 rounded-full bg-brand-500 border border-brand-400 text-white hover:bg-brand-400 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
