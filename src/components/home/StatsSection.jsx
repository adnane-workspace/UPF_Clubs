import { useState, useEffect, useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';

function useCountUp(end, duration = 1800, shouldStart) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!shouldStart) return
    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOut * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [shouldStart, end, duration])
  return count
}

const statsData = [
  { number: 12, suffix: '', label: 'Clubs actifs' },
  { number: 800, suffix: '+', label: 'Étudiants membres' },
  { number: 50, suffix: '+', label: 'Événements par an' },
  { number: 6, suffix: ' ans', label: "D'existence" },
];

const StatCard = memo(({ stat, index, shouldStart }) => {
  const count = useCountUp(stat.number, 2000, shouldStart);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: index * 0.1
      }}
      className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl text-center p-5 sm:p-6 lg:p-8 flex flex-col items-center justify-center group hover:bg-[var(--bg-tertiary)] transition-all duration-500 shadow-sm"
    >
      <div className="font-black leading-none text-4xl sm:text-5xl lg:text-6xl mb-1 sm:mb-2 gradient-text py-2">
        {count}{stat.suffix}
      </div>
      <div className="text-xs sm:text-sm text-[var(--text-tertiary)] mt-1 sm:mt-2 font-medium tracking-wide">
        {stat.label}
      </div>
    </motion.div>
  );
});

export default function StatsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section 
      ref={containerRef}
      className="relative bg-[var(--bg-primary)] overflow-hidden transition-colors duration-300"
      style={{
        paddingTop: 'clamp(60px, 10vh, 120px)',
        paddingBottom: 'clamp(60px, 10vh, 120px)',
        paddingLeft: 'clamp(16px, 4vw, 80px)',
        paddingRight: 'clamp(16px, 4vw, 80px)'
      }}
    >
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center w-full">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--text-tertiary)] text-xs uppercase font-bold tracking-[0.4em] block mb-4"
          >
            En chiffres
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-black text-center mb-10 sm:mb-16 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-[var(--text-primary)]"
          >
            L'excellence d'une <span className="gradient-text">Communauté</span>
          </motion.h2>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {statsData.map((stat, i) => (
            <StatCard 
              key={i} 
              stat={stat} 
              index={i} 
              shouldStart={isInView} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
