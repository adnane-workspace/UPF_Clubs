import { motion } from 'framer-motion';

const benefits = [
  {
    icon: '🚀',
    title: 'Booste ton CV',
    description: 'Les recruteurs valorisent l\'engagement associatif. Un club UPF = une ligne qui fait la différence.',
    color: 'rgba(124, 58, 237, 0.15)'
  },
  {
    icon: '🤝', 
    title: 'Crée ton réseau',
    description: 'Rencontre des étudiants de toutes filières. Les connexions que tu fais aujourd\'hui durent toute ta carrière.',
    color: 'rgba(37, 99, 235, 0.15)'
  },
  {
    icon: '🏆',
    title: 'Développe tes talents',
    description: 'Leadership, créativité, technique — développe des compétences que les cours ne t\'enseignent pas.',
    color: 'rgba(6, 182, 212, 0.15)'
  },
  {
    icon: '🎉',
    title: 'Vis des expériences uniques',
    description: 'Hackathons, compétitions, sorties, événements culturels — la vie étudiante à son meilleur.',
    color: 'rgba(236, 72, 153, 0.15)'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  }
};

export default function WhyJoinSection() {
  return (
    <section className="relative py-24 bg-[#08080f] overflow-hidden">
      {/* Separator Line Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black text-white"
          >
            Pourquoi <span className="gradient-text">rejoindre</span> un club ?
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ scale: 1.02, borderColor: 'rgba(124, 58, 237, 0.4)' }}
              className="glass p-8 rounded-[32px] border border-white/5 bg-white/[0.02] flex items-start gap-6 transition-colors group"
            >
              <div 
                className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: benefit.color }}
              >
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Separator Line Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
