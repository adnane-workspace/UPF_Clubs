import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { IconCalendar, IconMapPin, IconArrowRight, IconClock } from '../ui/Icons';
import { upcomingEventsData as events } from '../../data/clubs';

const categories = ['Tous', 'Sport', 'Culture', 'Tech', 'Gaming', 'Environnement'];

const EventCard = ({ event }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for 3D tilt
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="break-inside-avoid mb-8 relative group perspective-1000 will-change-transform"
    >
      <div className="relative z-10 glass-premium rounded-[32px] overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        
        {/* Top Image Section */}
        <div className="relative h-56 overflow-hidden preserve-3d">
          <motion.img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            style={{ transform: "translateZ(20px)" }}
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-5 left-5" style={{ transform: "translateZ(40px)" }}>
            <span className={`px-4 py-1.5 rounded-xl bg-gradient-to-r ${event.color} text-white text-[10px] font-black uppercase tracking-widest shadow-2xl`}>
              {event.category}
            </span>
          </div>

          {/* Date Indicator with Backdrop Blur */}
          <div className="absolute bottom-5 left-5" style={{ transform: "translateZ(50px)" }}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0a0a0f] border border-white/10 text-white shadow-lg">
              <IconCalendar size={14} className="text-violet-400" />
              <span className="text-xs font-black tracking-tight">{event.date}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 preserve-3d">
          <div className="flex items-center gap-3 mb-4" style={{ transform: "translateZ(30px)" }}>
             <div className="flex items-center gap-1.5 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                <IconClock size={12} />
                <span>{event.time}</span>
             </div>
          </div>

          <h3 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-violet-400 transition-colors" style={{ transform: "translateZ(60px)" }}>
            {event.title}
          </h3>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 font-medium" style={{ transform: "translateZ(40px)" }}>
            {event.description}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-white/5" style={{ transform: "translateZ(30px)" }}>
            <div className="flex items-center gap-2.5 text-slate-500 group-hover:text-slate-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <IconMapPin size={14} className="text-violet-500" />
              </div>
              <span className="text-[11px] font-bold tracking-tight">{event.location}</span>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.1, rotate: -45 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all duration-300 shadow-xl"
            >
              <IconArrowRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* Inner Glare Effect (optional subtle glow) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
};

const EventsFilter = () => {
  const [activeTab, setActiveTab] = useState('Tous');

  const filtered = activeTab === 'Tous' 
    ? events 
    : events.filter(e => e.category === activeTab);

  return (
    <section className="py-32 bg-dark-950 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-black tracking-widest uppercase text-[10px] mb-6"
          >
            Agenda Universitaire
          </motion.span>
          <motion.h2 
            data-gsap-title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-black text-white leading-tight"
          >
            Préparez-vous pour le <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Prochain Chapitre</span>
          </motion.h2>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3.5 rounded-2xl text-[13px] font-black transition-all duration-300 border ${
                activeTab === cat
                  ? 'bg-violet-600 border-violet-500 text-white shadow-[0_10px_25px_rgba(124,58,237,0.4)]'
                  : 'bg-white/5 border-white/5 text-slate-500 hover:text-white hover:bg-white/10 hover:border-white/10'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Masonry Masonry-style Grid with Framer Motion AnimatePresence */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsFilter;
