import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ClubCard from '../ui/ClubCard';
import { clubsData } from '../../data/clubsData';

const categories = ['Tous', ...new Set(clubsData.map(c => c.category))];

export default function ClubsSection() {
  const [filter, setFilter] = useState('Tous');

  const filtered = filter === 'Tous'
    ? clubsData
    : clubsData.filter(c => c.category === filter);

  return (
    <section id="clubs" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg"
          >
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-brand-600 text-sm font-bold uppercase tracking-widest mb-4">
              <span className="w-6 h-px bg-brand-500" /> Vie étudiante
            </span>
            <h2 className="text-hero text-4xl sm:text-5xl font-black text-navy-900 leading-tight">
              Découvrez nos<br />
              <span className="text-brand-500">Clubs & Associations</span>
            </h2>
          </motion.div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold px-6 py-3 rounded-full transition-colors shadow-lg"
          >
            Créer un club <ArrowRight size={16} />
          </motion.a>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                filter === cat
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                  : 'bg-white text-navy-700 border border-slate-200 hover:border-brand-300 hover:text-brand-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(club => (
              <motion.div
                key={club.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.28 }}
              >
                <ClubCard club={club} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center md:hidden">
          <button className="inline-flex items-center gap-2 bg-navy-900 text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg">
            Créer un club <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
