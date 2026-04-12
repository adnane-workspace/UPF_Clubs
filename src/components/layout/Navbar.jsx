import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import UPFLogo from '../ui/UPFLogo';

const navLinks = ['Accueil', 'Clubs', 'Calendrier', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-100 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">

        {/* Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <UPFLogo className={`h-10 w-auto transition-all ${scrolled ? 'opacity-100' : 'brightness-0 invert opacity-90'}`} />
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`text-sm font-semibold transition-colors hover:text-brand-500 ${
                scrolled ? 'text-navy-700' : 'text-white/80'
              }`}
            >
              {link}
            </motion.a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-brand-500/25 transition-colors"
          >
            Nous rejoindre
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden transition-colors ${scrolled ? 'text-navy-900' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-slate-100 px-6 pb-6 pt-4 shadow-xl"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-navy-700 font-semibold text-sm py-2 rounded-lg hover:text-brand-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <button className="mt-2 bg-brand-500 text-white text-sm font-bold px-6 py-3 rounded-full w-full shadow-md">
              Nous rejoindre
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
