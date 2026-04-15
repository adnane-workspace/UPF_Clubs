import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronLeft, IconChevronRight, IconArrowRight } from '../ui/Icons';
import { upcomingEventsData as eventsData } from '../../data/clubs';
import EventDetailsModal from '../ui/EventDetailsModal';

const AUTOPLAY_DELAY = 5500;

const Slide = memo(({ ev, direction, variants, onShowDetails, onNext }) => (
  <motion.div
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    className="absolute inset-0"
    style={{ willChange: 'transform, opacity' }}
  >
    <img 
      src={ev.image} 
      alt={ev.title} 
      className="absolute inset-0 w-full h-full object-cover" 
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
    
    <div className="relative z-30 h-full flex flex-col justify-end pb-32 sm:pb-28 lg:pb-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
      <div className="max-w-2xl">
        <span className="inline-block bg-violet-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4 sm:mb-6">
          {ev.category}
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-3 sm:mb-4">
          {ev.title}
        </h1>
        <p className="text-slate-300/90 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-xl">
          {ev.description}
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => onShowDetails(ev)}
            className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 sm:px-8 py-3 rounded-xl transition-all flex items-center gap-2"
          >
            Détails <IconArrowRight size={16} />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold px-5 sm:px-6 py-3 rounded-xl transition-all flex items-center gap-2 min-h-[44px]"
          >
            Événement suivant <IconChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
));

export default function EventsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const timerRef = useRef(null);

  const goTo = useCallback((idx, dir = 1) => {
    setDirection(dir);
    setCurrent(idx);
    setProgress(0);
  }, []);

  const next = useCallback(() => goTo((current + 1) % eventsData.length, 1), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + eventsData.length) % eventsData.length, -1), [current, goTo]);

  useEffect(() => {
    setProgress(0);
    timerRef.current = setInterval(next, AUTOPLAY_DELAY);
    const progressTimer = setInterval(() => setProgress(p => Math.min(p + (100 / (AUTOPLAY_DELAY / 16)), 100)), 16);
    return () => { clearInterval(timerRef.current); clearInterval(progressTimer); };
  }, [current, next]);

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <section 
      className="relative w-full min-h-[92svh] sm:min-h-[86vh] lg:h-[80vh] overflow-hidden bg-[#0a0a0f]"
      style={{
        paddingTop: 'clamp(72px, 9vh, 120px)',
        paddingBottom: 'clamp(44px, 8vh, 100px)',
        paddingLeft: 'clamp(12px, 3vw, 80px)',
        paddingRight: 'clamp(12px, 3vw, 80px)'
      }}
    >
      <AnimatePresence custom={direction} mode="wait">
        <Slide
          key={current}
          ev={eventsData[current]}
          direction={direction}
          variants={variants}
          onShowDetails={setSelectedEvent}
          onNext={next}
        />
      </AnimatePresence>

      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-10 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 justify-between pointer-events-none">
        <div className="flex gap-3 pointer-events-auto">
          {eventsData.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="relative h-1 w-7 sm:w-10 bg-white/10 overflow-hidden rounded-full"
            >
              <motion.div 
                className="absolute inset-y-0 left-0 bg-violet-500"
                style={{ width: '100%', scaleX: i === current ? progress / 100 : 0, originX: 0 }}
              />
            </button>
          ))}
        </div>
        
        <div className="flex gap-2 pointer-events-auto">
          <button onClick={prev} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5">
            <IconChevronLeft size={18} />
          </button>
          <button onClick={next} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5">
            <IconChevronRight size={18} />
          </button>
        </div>
      </div>

      <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </section>
  );
}
