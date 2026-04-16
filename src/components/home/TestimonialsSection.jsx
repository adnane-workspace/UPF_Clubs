import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Yasmine B.',
    role: 'Club Tech — 2ème année',
    avatar: 'YB',
    color: '#7c3aed',
    text: "Rejoindre le club Tech a changé ma vie universitaire. J'ai appris plus en 3 mois de hackathon qu'en un semestre de cours."
  },
  {
    name: 'Mehdi K.',
    role: 'Club Sport — 3ème année',
    avatar: 'MK',
    color: '#06b6d4',
    text: "Le club m'a appris le leadership et la gestion d'équipe. Des compétences que j'utilise maintenant en stage."
  },
  {
    name: 'Sara M.',
    role: 'Club Culture — 1ère année',
    avatar: 'SM',
    color: '#ec4899',
    text: "En tant que nouvelle étudiante, le club m'a permis de rencontrer des gens incroyables dès la première semaine."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 bg-[var(--bg-primary)] overflow-hidden transition-colors duration-300">
      {/* Aurora Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] bg-violet-600/10 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] bg-cyan-600/10 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight mb-4">
            Ce que disent nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">étudiants</span>
          </h2>
        </div>

        {/* Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((testi, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                borderColor: testi.color,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              style={{
                position: 'relative',
                background: 'var(--bg-secondary)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-color)',
                borderRadius: '24px',
                padding: '32px',
                transition: 'border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease'
              }}
              className="flex flex-col h-full cursor-pointer group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed mb-8 flex-grow relative z-10 text-[15px]">
                {testi.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 relative z-10 mt-auto pt-6 border-t border-[var(--border-color)]">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg"
                  style={{ backgroundColor: testi.color }}
                >
                  {testi.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-primary)] text-[15px]">{testi.name}</h4>
                  <p className="text-[var(--text-tertiary)] text-[13px] font-medium">{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
