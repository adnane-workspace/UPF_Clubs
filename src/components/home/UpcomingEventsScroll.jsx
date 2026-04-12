import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconCalendar, IconClock, IconMapPin, IconArrowRight, IconArrowUpRight, IconChevronLeft, IconChevronRight } from '../ui/Icons';
import { upcomingEventsData as upcomingEvents } from '../../data/clubs';

const pad = (n) => String(n).padStart(2, '0');

const EventSlide = memo(({ ev, idx, slideRef }) => (
  <div
    ref={slideRef}
    className="relative flex-shrink-0 bg-[#0a0a0f] flex flex-col lg:flex-row overflow-hidden"
    style={{ width: '100vw', height: '100vh', scrollSnapAlign: 'start' }}
  >
    <div className="relative z-10 flex flex-col justify-between w-full lg:w-[55%] h-full px-6 sm:px-10 lg:px-16 py-14">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        className="flex items-center gap-3"
      >
        <span className={`w-8 h-0.5 rounded-full bg-gradient-to-r ${ev.color}`} />
        <span className="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">Événement à venir</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <span className={`inline-block bg-gradient-to-r ${ev.color} text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full`}>
            {ev.category}
          </span>
          <span className="text-white/45 text-sm">par <span className="text-white/75 font-semibold">{ev.club}</span></span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-6">{ev.title}</h2>
        <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg">{ev.description}</p>
        <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
              <IconCalendar size={14} className="text-violet-500" />
              <span className="text-white text-sm">{ev.date}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
              <IconClock size={14} className="text-violet-500" />
              <span className="text-white text-sm">{ev.time}</span>
            </div>
        </div>
        <button className={`bg-gradient-to-r ${ev.color} text-white font-bold px-8 py-3 rounded-xl transition-all`}>S'inscrire</button>
      </motion.div>

      <div className="text-white/20 text-xl font-black">{pad(idx + 1)} / {pad(upcomingEvents.length)}</div>
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
    <section id="calendrier" className="relative bg-[#0a0a0f] h-screen overflow-hidden">
      <div
        ref={containerRef}
        className="flex h-full overflow-x-scroll snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {upcomingEvents.map((ev, idx) => (
          <EventSlide key={ev.id} ev={ev} idx={idx} slideRef={(el) => (slideRefs.current[idx] = el)} />
        ))}
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-50 px-6 sm:px-16 flex justify-between items-center pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          {upcomingEvents.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="relative h-1 w-8 bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={false}
                animate={{ scaleX: i === activeIdx ? 1 : 0, opacity: i === activeIdx ? 1 : 0 }}
                style={{ originX: 0 }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
