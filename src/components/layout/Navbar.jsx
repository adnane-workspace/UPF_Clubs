import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Stats', href: '#stats' },
  { label: 'Clubs', href: '#clubs' },
  { label: 'Événements', href: '#evenements' },
  { label: 'À propos', href: '#apropos' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#accueil');
  
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) setIsScrolled(true);
    if (latest <= 50 && isScrolled) setIsScrolled(false);
  });

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -75% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Target sections
    ['accueil', 'stats', 'clubs', 'evenements', 'apropos'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 25 
      }
    }
  };

  const menuVariants = {
    closed: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.3, 
        ease: 'easeInOut',
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  const lineVariants = {
    top: { 
      closed: { rotate: 0, y: 0 },
      open: { rotate: 45, y: 8 }
    },
    middle: {
      closed: { opacity: 1, scale: 1 },
      open: { opacity: 0, scale: 0 }
    },
    bottom: {
      closed: { rotate: 0, y: 0 },
      open: { rotate: -45, y: -8 }
    }
  };

  return (
    <motion.nav
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="font-sans"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, margin: '0 auto',
        zIndex: 1000, height: '64px', maxWidth: '1400px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: window.innerWidth < 768 ? '0 16px' : '0 40px',
        overflow: menuOpen ? 'visible' : 'hidden',
        background: isScrolled ? 'rgba(8, 8, 15, 0.7)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
        transition: 'background 0.3s, backdrop-filter 0.3s',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
        {/* LOGO */}
        <motion.a 
          href="#accueil"
          whileHover={{ scale: 1.05 }}
          style={{ textDecoration: 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
            <span style={{
              fontSize: '18px', fontWeight: 800,
              background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>UPF</span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>
              {' '}Clubs
            </span>
          </div>
        </motion.a>

        {/* DESKTOP NAV */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)'
        }} className="hidden lg:flex">
          {navLinks.map((link) => {
            const active = activeSection === link.href;
            return (
              <button 
                key={link.label}
                onClick={() => document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: 'none', border: 'none',
                  padding: '6px 14px', borderRadius: '8px',
                  fontSize: '14px', fontWeight: 400,
                  color: active ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', position: 'relative',
                  transition: 'color 0.2s'
                }}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute', bottom: '-2px',
                      left: '14px', right: '14px', height: '2px',
                      background: 'linear-gradient(90deg, #7c3aed, #38bdf8)',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-5">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(124,58,237,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:flex items-center gap-2 relative"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              color: 'white', border: 'none',
              borderRadius: '100px',
              padding: '9px 22px',
              fontSize: '14px', fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Rejoindre
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#08080f] animate-pulse" />
          </motion.button>

          {/* MOBILE TOGGLE */}
          <button 
            className="md:hidden flex flex-col gap-1.5 p-2 pr-0"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.span 
              variants={lineVariants.top} animate={menuOpen ? "open" : "closed"}
              className="w-6 h-0.5 bg-white rounded-full origin-center"
            />
            <motion.span 
              variants={lineVariants.middle} animate={menuOpen ? "open" : "closed"}
              className="w-6 h-0.5 bg-white rounded-full origin-center"
            />
            <motion.span 
              variants={lineVariants.bottom} animate={menuOpen ? "open" : "closed"}
              className="w-6 h-0.5 bg-white rounded-full origin-center"
            />
          </button>
        </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/8 overflow-hidden"
          >
            <nav className="flex flex-col gap-5 px-6 py-10">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  variants={itemVariants}
                  onClick={() => setMenuOpen(false)}
                  className={`text-xl font-bold ${
                    activeSection === link.href ? 'text-white' : 'text-white/50'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                variants={itemVariants}
                className="w-full mt-4 py-4 bg-gradient-to-br from-[#7c3aed] to-[#2563eb] text-white font-bold rounded-2xl flex items-center justify-center gap-2"
              >
                Rejoindre la communauté
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Gradient Border */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: isScrolled ? 1 : 0, 
          opacity: isScrolled ? 1 : 0 
        }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.6), rgba(56,189,248,0.6), transparent)',
          transformOrigin: 'left'
        }}
      />

      {/* Scroll Progress Bar */}
      <motion.div style={{
        position: 'absolute', bottom: '-2px', left: 0,
        height: '2px', right: 0,
        background: 'linear-gradient(90deg, #7c3aed, #38bdf8)',
        scaleX: scrollYProgress,
        transformOrigin: 'left',
        zIndex: 1001
      }} />
    </motion.nav>
  );
}
