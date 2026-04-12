import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronLeft, IconChevronRight, IconArrowRight } from '../ui/Icons';
import { upcomingEventsData as eventsData } from '../../data/clubs';

const AUTOPLAY_DELAY = 5500;

const Slide = memo(({ ev, direction, variants }) => (
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
    
    <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
      <div className="max-w-2xl">
        <span className="inline-block bg-violet-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6">
          {ev.category}
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight mb-4">
          {ev.title}
        </h1>
        <p className="text-slate-400 text-lg mb-8 max-w-xl">
          {ev.description}
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2">
            S'inscrire <IconArrowRight size={16} />
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
      className="relative w-full h-[80vh] overflow-hidden bg-[#0a0a0f]"
      style={{
        paddingTop: 'clamp(60px, 10vh, 120px)',
        paddingBottom: 'clamp(60px, 10vh, 120px)',
        paddingLeft: 'clamp(16px, 4vw, 80px)',
        paddingRight: 'clamp(16px, 4vw, 80px)'
      }}
    >
      <AnimatePresence custom={direction} mode="wait">
        <Slide key={current} ev={eventsData[current]} direction={direction} variants={variants} />
      </AnimatePresence>

      <div className="absolute bottom-10 left-0 right-0 z-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
        <div className="flex gap-3 pointer-events-auto">
          {eventsData.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="relative h-1 w-10 bg-white/10 overflow-hidden rounded-full"
            >
              <motion.div 
                className="absolute inset-y-0 left-0 bg-violet-500"
                style={{ width: '100%', scaleX: i === current ? progress / 100 : 0, originX: 0 }}
              />
            </button>
          ))}
        </div>
        
        <div className="flex gap-2 pointer-events-auto">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5">
            <IconChevronLeft size={20} />
          </button>
          <button onClick={next} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5">
            <IconChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
