import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const navLinks = [
  { label: 'Événements', href: '#evenements' },
  { label: 'Calendrier', href: '#calendrier' },
  { label: 'Accueil', href: '#accueil' },
  { label: 'Clubs', href: '#clubs' },
  { label: 'Stats', href: '#stats' },
  { label: 'Pourquoi', href: '#pourquoi' },
  { label: 'Témoignages', href: '#temoignages' },
  { label: 'Contact', href: '#apropos' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#evenements');
  
  const { scrollY, scrollYProgress } = useScroll();

  const handleNavClick = (href) => {
    const sectionId = href.replace('#', '');
    const target = document.getElementById(sectionId);
    if (!target) return;

    const scrollToTarget = () => {
      const navOffset = 72;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });
    };

    if (menuOpen) {
      setMenuOpen(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToTarget);
      });
      return;
    }

    scrollToTarget();
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) setIsScrolled(true);
    if (latest <= 50 && isScrolled) setIsScrolled(false);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -65% 0px',
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

    // Target sections in page order
    ['evenements', 'calendrier', 'accueil', 'clubs', 'stats', 'pourquoi', 'temoignages', 'apropos'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      className="font-sans fixed top-0 left-0 right-0 mx-auto z-[1100] h-16 w-full max-w-[1400px] flex items-center justify-between px-3 sm:px-5 lg:px-8"
      style={{
        overflow: menuOpen ? 'visible' : 'hidden',
        background: isScrolled ? 'rgba(8, 8, 15, 0.82)' : 'rgba(8, 8, 15, 0.5)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        transition: 'background 0.25s ease, border-color 0.25s ease',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.04)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.24)'
      }}
    >
        {/* LOGO */}
        <motion.a
          href="#evenements"
          whileHover={{ scale: 1.05 }}
          style={{ textDecoration: 'none' }}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#evenements');
          }}
          className="shrink-0"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer' }}>
            <span style={{
              fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 800,
              background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>UPF</span>
            <span style={{ fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 800, color: 'white' }}>
              {' '}Clubs
            </span>
          </div>
        </motion.a>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex flex-1 min-w-0 px-2 sm:px-3 lg:px-5">
          <div className="flex items-center gap-1 lg:gap-2 overflow-x-auto scrollbar-none whitespace-nowrap w-full justify-start xl:justify-center">
            {navLinks.map((link) => {
              const active = activeSection === link.href;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="relative rounded-lg px-3 lg:px-3.5 py-2.5 text-xs lg:text-sm font-medium min-h-[44px] transition-colors"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: active ? 'white' : 'rgba(255,255,255,0.58)',
                    cursor: 'pointer'
                  }}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute', bottom: '2px',
                        left: '12px', right: '12px', height: '2px',
                        background: 'linear-gradient(90deg, #7c3aed, #38bdf8)',
                        borderRadius: '2px'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-5">
          <motion.button
            type="button"
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(124,58,237,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="hidden lg:flex items-center gap-2 relative shrink-0"
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
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="md:hidden flex flex-col items-center justify-center gap-1.5 p-2 min-h-[44px] min-w-[44px]"
            onClick={() => setMenuOpen((prev) => !prev)}
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
            id="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden max-h-[calc(100svh-64px)] overflow-y-auto"
          >
            <nav className="flex flex-col gap-1 px-4 py-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
              {navLinks.map((link) => (
                <motion.button
                  key={link.label}
                  type="button"
                  variants={itemVariants}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-base font-semibold min-h-[48px] px-3 rounded-xl ${
                    activeSection === link.href ? 'text-white bg-white/10' : 'text-white/70'
                  }`}
                  style={{
                    backgroundColor: activeSection === link.href ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                type="button"
                variants={itemVariants}
                className="w-full mt-3 py-3.5 min-h-[48px] bg-gradient-to-br from-[#7c3aed] to-[#2563eb] text-white font-bold rounded-2xl flex items-center justify-center gap-2"
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
