import { useState, useEffect } from 'react';
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

  // Debugging log
  useEffect(() => {
    console.log(`Active Filter: ${activeFilter}`, filteredClubs);
  }, [activeFilter, filteredClubs]);

  return (
    <section 
      className="relative bg-[#08080f]"
      style={{
        paddingTop: 'clamp(60px, 10vh, 120px)',
        paddingBottom: 'clamp(60px, 10vh, 120px)',
        paddingLeft: 'clamp(16px, 4vw, 80px)',
        paddingRight: 'clamp(16px, 4vw, 80px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
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
            <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight">
              Rejoins ton <br />
              <span className="gradient-text">Espace de Passion</span>
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-all"
          >
            Créer un club <IconPlus size={18} />
          </motion.button>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 flex-nowrap sm:flex-wrap mb-12">
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileTap={{ scale: 0.95 }}
              className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-xl whitespace-nowrap font-bold transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-violet-600 text-white shadow-xl shadow-violet-600/20'
                  : 'bg-white/5 text-white/40 border border-white/5 hover:border-white/15 hover:text-white'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Cards grid OR Fallback */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative min-h-[400px]"
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
