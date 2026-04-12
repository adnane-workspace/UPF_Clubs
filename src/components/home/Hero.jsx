import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

const rotatingWords = ['passion', 'ambition', 'créativité', 'leadership', 'avenir'];

export default function Hero() {
  console.log('Hero rendering');
  const shouldReduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.8, delay: 0.5 } 
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '64px',
      paddingBottom: '40px',
      paddingLeft: '16px',
      paddingRight: '16px',
      backgroundColor: '#08080f',
      width: '100%'
    }}>
      {/* ── BACKGROUND ELEMENTS (Pure CSS) ── */}
      {/* Aurora layer 1 - purple */}
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%',
        width: '60%', height: '70%',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'aurora1 12s ease-in-out infinite',
        willChange: 'transform', pointerEvents: 'none', zIndex: 0
      }} />

      {/* Aurora layer 2 - cyan */}
      <div style={{
        position: 'absolute', top: '10%', right: '-10%',
        width: '50%', height: '60%',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.2) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'aurora2 15s ease-in-out infinite',
        willChange: 'transform', pointerEvents: 'none', zIndex: 0
      }} />

      {/* Aurora layer 3 - pink */}
      <div style={{
        position: 'absolute', bottom: '-10%', left: '30%',
        width: '40%', height: '50%',
        background: 'radial-gradient(ellipse, rgba(236,72,153,0.15) 0%, transparent 70%)',
        filter: 'blur(70px)',
        animation: 'aurora3 10s ease-in-out infinite',
        willChange: 'transform', pointerEvents: 'none', zIndex: 0
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '50px 50px', zIndex: 0
      }} />

      {/* ── CONTENT ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto'
      }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, fallback: true }}
          className="flex flex-col items-center"
        >
          {/* Badge chip */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full border border-white/10 bg-[#13151f]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-white/50 text-[10px] uppercase font-bold tracking-[0.2em]">
              🎓 Bienvenue à l'UPF • Rentrée 2024-2025
            </span>
          </motion.div>

          {/* Cinematic Title */}
          <motion.div variants={itemVariants}>
            <h1 className="
              font-black tracking-tight leading-[1.1]
              text-[clamp(36px,8vw,88px)] xl:text-[clamp(64px,6vw,100px)]
              mb-4 sm:mb-6
            ">
              <span style={{ color: 'white' }}>Rejoins</span>
              <br />
              <span style={{ color: 'white' }}>l'espace de </span>
              <span style={{ display: 'inline-block', position: 'relative', minWidth: '280px' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 60, opacity: 0, filter: 'blur(8px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -60, opacity: 0, filter: 'blur(8px)' }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeVariants}
            className="
              text-white/40 leading-relaxed mx-auto font-medium
              text-sm sm:text-base md:text-lg
              max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl
              mb-6 sm:mb-8
            "
          >
            Plus qu'une université — une communauté. Rejoins des centaines d'étudiants passionnés dans des clubs qui transforment ton parcours.
          </motion.p>

          {/* CTA Row */}
          <motion.div 
            variants={itemVariants}
            className="
              flex flex-col xs:flex-row
              gap-3 sm:gap-4
              items-center justify-center
              w-full xs:w-auto mx-auto
            "
          >
            <motion.button
              onClick={() => scrollToSection('clubs')}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="
                w-full xs:w-auto
                px-6 sm:px-8 py-3 sm:py-4
                text-sm sm:text-base font-bold text-white
                bg-gradient-to-r from-[#7c3aed] to-[#2563eb] 
                rounded-xl sm:rounded-2xl shadow-xl shadow-violet-500/25 shimmer-btn
              "
            >
              Découvrir les clubs →
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('evenements')}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="
                w-full xs:w-auto
                px-6 sm:px-8 py-3 sm:py-4
                text-sm sm:text-base font-bold text-white
                border border-white/10 bg-[#13151f]
                rounded-xl sm:rounded-2xl transition-colors
              "
            >
              Voir les événements
            </motion.button>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            variants={fadeVariants}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px' }}
          >
            <div style={{ display: 'flex' }}>
              {['#7c3aed', '#2563eb', '#06b6d4', '#ec4899'].map((color, i) => (
                <div key={i} style={{
                  background: color, border: '2px solid #08080f',
                  marginLeft: i > 0 ? '-8px' : 0
                }} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full" />
              ))}
            </div>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
              <span style={{ color: 'white', fontWeight: 600 }}>800+ étudiants</span>
              {' '}ont déjà rejoint un club
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        zIndex: 50
      }} onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
        
        <motion.span
          style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.25)',
            fontWeight: 500
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          DÉCOUVRIR
        </motion.span>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
