import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { IconCalendar, IconMapPin, IconClock, IconStar } from '../ui/Icons';
import { upcomingEventsData as events } from '../../data/clubs';

/**
 * Visual Timeline Point (Pulsing Dot)
 */
const TimelineDot = () => (
  <div className="relative flex items-center justify-center w-12 h-12 z-20">
    <div className="absolute w-4 h-4 rounded-full bg-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.8)] z-10" />
    <motion.div
      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-12 h-12 rounded-full bg-violet-600/30 blur-md"
    />
  </div>
);

/**
 * Timeline Card with 3D Tilt & Spotlight
 */
const TimelineCard = ({ event, index }) => {
  const isLeft = index % 2 === 0;
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1
    });
  };

  return (
    <div className={`relative flex items-center justify-center mb-24 w-full ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      
      {/* 1. The Content Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.1 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setSpotlight(prev => ({ ...prev, opacity: 0 }))}
        className="relative w-full md:w-[42%] perspective-1000 group"
      >
        <div 
          style={{ transformStyle: 'preserve-3d' }}
          className="relative glass-premium p-8 rounded-[32px] border border-white/5 hover:border-violet-500/30 transition-all duration-500 group-hover:bg-white/[0.04] group-hover:translate-z-10"
        >
          {/* Spotlight Effect */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-[32px] overflow-hidden"
            style={{ 
              background: `radial-gradient(circle at ${spotlight.x}px ${spotlight.y}px, rgba(124, 58, 237, 0.15) 0%, transparent 80%)`,
              opacity: spotlight.opacity 
            }}
          />

          <div style={{ transform: 'translateZ(20px)' }}>
            <div className="flex items-center justify-between mb-6">
              <span className={`px-4 py-1.5 rounded-xl bg-gradient-to-r ${event.color} text-white text-[10px] font-black uppercase tracking-widest shadow-lg`}>
                {event.category}
              </span>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 text-slate-400">
                <IconClock size={14} className="text-violet-500" />
                <span className="text-[10px] font-black">{event.time}</span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-violet-400 transition-colors">
              {event.title}
            </h3>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium italic">
              "{event.description}"
            </p>

            <div className="flex items-center gap-6 text-slate-400 border-t border-white/5 pt-6">
              <div className="flex items-center gap-2">
                <IconCalendar size={14} className="text-violet-500" />
                <span className="text-[11px] font-bold">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <IconMapPin size={14} className="text-violet-500" />
                <span className="text-[11px] font-bold truncate max-w-[120px]">{event.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Accent Icon */}
        <div 
          className={`absolute -top-4 ${isLeft ? '-right-4' : '-left-4'} w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-12`}
          style={{ transform: 'translateZ(40px)' }}
        >
          <IconStar size={20} />
        </div>
      </motion.div>

      {/* 2. Central Timeline Marker */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
        <TimelineDot />
      </div>

    </div>
  );
};

const EventsTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth drawing animation for the timeline path
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="py-32 bg-dark-950 relative overflow-hidden">
      {/* Background Section Title */}
      <div className="container mx-auto px-6 mb-24">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-violet-400 font-black tracking-[0.3em] uppercase text-xs mb-6 inline-block">Flash Historique</span>
          <h2 data-gsap-title className="text-5xl lg:text-8xl font-black text-white leading-none">
            La Ligne du <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">Temps</span>
          </h2>
        </div>
      </div>

      <div className="relative container mx-auto px-6">
        
        {/* The SVG Timeline Path */}
        <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 ">
          {/* Static Track Line */}
          <div className="absolute inset-0 bg-white/5 rounded-full" />
          
          {/* Animated SVG Path */}
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            <motion.line
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              stroke="url(#timeline-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                pathLength: pathLength
              }}
              className="drop-shadow-[0_0_10px_rgba(124,58,237,0.8)]"
            />
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Timeline Events List */}
        <div className="relative pt-12">
          {events.map((event, i) => (
            <TimelineCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-fuchsia-600/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default EventsTimeline;
