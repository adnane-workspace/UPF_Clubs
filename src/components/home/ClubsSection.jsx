import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconPlus } from '../ui/Icons';
import ClubCard from '../ui/ClubCard';
import ClubModal from '../ui/ClubModal';
import { clubs } from '../../data/clubs';

const categories = ['Tous', 'Tech', 'Sport', 'Culture', 'Environnement', 'Gaming'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function ClubsSection() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedClub, setSelectedClub] = useState(null);

  // Filter logic as requested
  const filteredClubs = activeFilter === 'Tous' 
    ? clubs 
    : clubs.filter(club => club.category === activeFilter);

  return (
    <section 
      className="relative bg-[var(--bg-primary)] transition-colors duration-300"
      style={{
        paddingTop: 'clamp(60px, 10vh, 120px)',
        paddingBottom: 'clamp(60px, 10vh, 120px)',
        paddingLeft: 'clamp(16px, 4vw, 80px)',
        paddingRight: 'clamp(16px, 4vw, 80px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col gap-6 sm:gap-8 mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-2 text-violet-400 text-sm font-bold uppercase tracking-widest mb-4">
              <span className="w-10 h-[1.5px] bg-violet-500 rounded-full" /> 
              Communauté
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] leading-tight">
              Rejoins ton <br />
              <span className="gradient-text">Espace de Passion</span>
            </h2>
          </motion.div>
        </div>

        {/* Filter pills */}
        <div className="w-full mb-10 sm:mb-12">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-none whitespace-nowrap snap-x snap-mandatory pr-4 sm:pr-0 pb-3">
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileTap={{ scale: 0.95 }}
              className={`flex-shrink-0 snap-start px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-xl whitespace-nowrap font-bold transition-all duration-300 min-h-[44px] ${
                activeFilter === cat
                  ? 'bg-violet-600 text-white shadow-xl shadow-violet-600/20'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] border border-[var(--border-color)] hover:border-violet-500/50 hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </motion.button>
          ))}
          </div>
        </div>

        {/* Cards grid OR Fallback */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative min-h-[340px] sm:min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredClubs.length > 0 ? (
              <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 w-full">
                {filteredClubs.map(club => (
                  <ClubCard key={club.id} club={club} onClick={() => setSelectedClub(club)} />
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center w-full"
              >
                <div className="text-white/20 mb-4">
                  <IconPlus size={48} className="rotate-45" />
                </div>
                <p className="text-white/40 font-bold text-lg">Aucun club trouvé dans cette catégorie</p>
                <button 
                  onClick={() => setActiveFilter('Tous')}
                  className="mt-6 text-violet-400 hover:text-violet-300 text-sm font-bold underline"
                >
                  Afficher tous les clubs
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <ClubModal club={selectedClub} onClose={() => setSelectedClub(null)} />
    </section>
  );
}
