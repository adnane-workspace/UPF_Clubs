import { useState, useRef, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { IconCalendar, IconClock } from '../ui/Icons';
import { upcomingEventsData as upcomingEvents } from '../../data/clubs';
import EventDetailsModal from '../ui/EventDetailsModal';

const pad = (n) => String(n).padStart(2, '0');

const EventSlide = memo(({ ev, idx, slideRef, onShowDetails }) => (
  <div
    ref={slideRef}
    className="relative flex-shrink-0 bg-[var(--bg-primary)] flex flex-col lg:flex-row overflow-hidden transition-colors duration-300"
    style={{ minWidth: '100%', height: '100%', scrollSnapAlign: 'start' }}
  >
    <div className="relative z-20 flex flex-col justify-between w-full lg:w-[55%] h-full px-4 sm:px-8 lg:px-16 pt-10 sm:pt-14 pb-24 sm:pb-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        className="flex items-center gap-3"
      >
        <span className={`w-8 h-0.5 rounded-full bg-gradient-to-r ${ev.color}`} />
        <span className="text-[var(--text-tertiary)] text-xs font-bold uppercase tracking-[0.2em]">Événement à venir</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4 sm:mb-5 flex-wrap">
          <span className={`inline-block bg-gradient-to-r ${ev.color} text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg`}>
            {ev.category}
          </span>
          <span className="text-[var(--text-tertiary)] text-sm">par <span className="text-[var(--text-primary)] font-semibold">{ev.club}</span></span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] leading-tight mb-5 sm:mb-6">{ev.title}</h2>
        <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-lg">{ev.description}</p>
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-2">
              <IconCalendar size={14} className="text-violet-500" />
              <span className="text-[var(--text-primary)] text-sm font-semibold">{ev.date}</span>
            </div>
            <div className="flex items-center gap-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-2">
              <IconClock size={14} className="text-violet-500" />
              <span className="text-[var(--text-primary)] text-sm font-semibold">{ev.time}</span>
            </div>
        </div>
        <button
          type="button"
          onClick={() => onShowDetails(ev)}
          className={`bg-gradient-to-r ${ev.color} text-white font-bold px-6 sm:px-8 py-3 rounded-xl transition-all`}
        >
          Détails
        </button>
      </motion.div>

      <div className="text-[var(--text-tertiary)] text-base sm:text-xl font-black">{pad(idx + 1)} / {pad(upcomingEvents.length)}</div>
    </div>

    <div className="hidden lg:block w-[45%] h-full p-6">
      <div className="relative w-full h-full rounded-3xl overflow-hidden">
        <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" loading="lazy" />
        <div className={`absolute inset-0 bg-gradient-to-br ${ev.color} opacity-20`} />
      </div>
    </div>
  </div>
));

export default function UpcomingEventsScroll() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const containerRef = useRef(null);
  const slideRefs = useRef([]);

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
      { root: containerRef.current, threshold: 0.6 }
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (idx) => slideRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', inline: 'start' });

  return (
    <section className="relative bg-[var(--bg-primary)] h-[100svh] overflow-hidden transition-colors duration-300">
      <div
        ref={containerRef}
        className="flex h-full overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {upcomingEvents.map((ev, idx) => (
          <EventSlide
            key={ev.id}
            ev={ev}
            idx={idx}
            slideRef={(el) => (slideRefs.current[idx] = el)}
            onShowDetails={setSelectedEvent}
          />
        ))}
      </div>

      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-10 px-4 sm:px-12 lg:px-16 flex justify-between items-center pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          {upcomingEvents.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="relative h-1 w-6 sm:w-8 bg-[var(--border-color)] rounded-full overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-violet-600"
                initial={false}
                animate={{ scaleX: i === activeIdx ? 1 : 0, opacity: i === activeIdx ? 1 : 0 }}
                style={{ originX: 0 }}
              />
            </button>
          ))}
        </div>
      </div>

      <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </section>
  );
}
