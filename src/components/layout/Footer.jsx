import { motion } from 'framer-motion';
import { IconYoutube, IconLinkedin, IconTwitter, IconGithub, IconGlobe, IconMail } from '../ui/Icons';

const navLinks = [
  { name: 'Accueil', href: '#' },
  { name: 'Clubs', href: '#clubs' },
  { name: 'Évènements', href: '#events' },
  { name: 'Contact', href: '#contact' }
];

const socialLinks = [
  { icon: IconYoutube, href: '#' },
  { icon: IconLinkedin, href: '#' },
  { icon: IconTwitter, href: '#' },
  { icon: IconGithub, href: '#' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export default function Footer() {
  return (
    <footer className="relative bg-[var(--bg-primary)] overflow-hidden transition-colors duration-300">
      {/* Top Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Column 1: Logo & Social */}
          <motion.div variants={columnVariants}>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
              <span className="gradient-text">UPF Clubs</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8 max-w-xs">
              L'écosystème numérique dédié à la vie étudiante de l'Université Privée de Fès. 
              Propulsez vos projets et connectez-vous.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a 
                    key={i}
                    href={social.href}
                    whileHover={{ scale: 1.1, backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--accent-primary)' }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center transition-all duration-300"
                  >
                    <Icon size={16} className="text-[var(--text-secondary)]" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={columnVariants}>
            <h3 className="text-[var(--text-primary)] font-bold text-sm uppercase tracking-widest mb-8">
              Liens Rapides
            </h3>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[var(--text-tertiary)] text-sm hover:text-violet-500 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Popular Clubs */}
          <motion.div variants={columnVariants}>
            <h3 className="text-[var(--text-primary)] font-bold text-sm uppercase tracking-widest mb-8">
              Clubs Populaires
            </h3>
            <ul className="flex flex-col gap-4 text-[var(--text-tertiary)] text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">UPF Tech Solutions</li>
              <li className="hover:text-white transition-colors cursor-pointer">Art & Design Studio</li>
              <li className="hover:text-white transition-colors cursor-pointer">Sports Association</li>
              <li className="hover:text-white transition-colors cursor-pointer">Business & Strategy</li>
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={columnVariants}>
            <h3 className="text-[var(--text-primary)] font-bold text-sm uppercase tracking-widest mb-8">
              Contact & Accès
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <IconMail size={16} className="text-violet-500 shrink-0 mt-0.5" />
                <span className="text-[var(--text-tertiary)] text-sm">contact@upf-clubs.ma</span>
              </div>
              <div className="flex items-start gap-3">
                <IconGlobe size={16} className="text-violet-500 shrink-0 mt-0.5" />
                <span className="text-[var(--text-tertiary)] text-sm">
                  Route d'Imouzzer, Fès <br />
                  Morocco
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-color)] pt-8 mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-[var(--text-tertiary)] text-[10px] uppercase font-bold tracking-widest">
            © 2024 UPF Clubs. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2 text-[var(--text-tertiary)] text-[10px] uppercase font-bold tracking-widest">
            Fait avec <span className="text-violet-500 text-base">♥</span> pour les étudiants de l'UPF
          </div>
        </div>
      </div>
    </footer>
  );
}
