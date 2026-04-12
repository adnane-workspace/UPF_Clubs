import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categoryConfig = {
  Tech:          { bg: 'bg-blue-50  text-blue-700  border-blue-200',   dot: 'bg-blue-500'    },
  Sport:         { bg: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500'  },
  Culture:       { bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500'  },
  Environnement: { bg: 'bg-brand-50 text-brand-700 border-brand-200', dot: 'bg-brand-500' },
  Gaming:        { bg: 'bg-red-50   text-red-700   border-red-200',    dot: 'bg-red-500'     },
  Communication: { bg: 'bg-amber-50  text-amber-700  border-amber-200', dot: 'bg-amber-500'   },
};

export default function ClubCard({ club }) {
  const cfg = categoryConfig[club.category] || { bg: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-400' };

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 24px 48px -12px rgba(15,23,42,0.15)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={club.image}
          alt={club.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          style={{ transform: 'scale(1)' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${cfg.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {club.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-brand-600 transition-colors leading-snug">
          {club.name}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
          {club.description}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            {club.events.length} événement{club.events.length > 1 ? 's' : ''}
          </span>
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            className="w-9 h-9 bg-navy-900 group-hover:bg-brand-500 text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
          >
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
