import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="relative w-full py-20 px-6 overflow-hidden flex justify-center items-center bg-[var(--bg-primary)] transition-colors duration-300">
      {/* Background Rotating Orb */}
      <div 
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          animation: 'spinOrb 20s linear infinite',
          transform: 'translate(-50%, -50%)'
        }}
      />
      <style>
        {`
          @keyframes spinOrb { 
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); } 
          }
        `}
      </style>

      {/* Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 w-full max-w-5xl bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-10 md:p-16 text-center backdrop-blur-xl shadow-xl"
      >
        {/* Title & Subtitle */}
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400 mb-6 tracking-tight pb-2">
          Prêt à vivre l'expérience UPF ?
        </h2>
        <p className="text-[var(--text-secondary)] text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
          Rejoins une communauté de 800+ étudiants passionnés. Les inscriptions pour la rentrée 2024-2025 sont ouvertes.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#7c3aed] to-[#2563eb] text-white font-bold rounded-xl shadow-lg shadow-violet-500/25"
          >
            Rejoindre un club
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "var(--bg-tertiary)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto px-8 py-4 border border-[var(--border-color)] bg-transparent text-[var(--text-primary)] font-bold rounded-xl transition-colors"
          >
            Nous contacter
          </motion.button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 border-t border-[var(--border-color)] pt-8">
          <div className="flex items-center gap-2">
            <span className="text-green-500 font-bold">✓</span>
            <span className="text-[var(--text-tertiary)] text-sm font-medium">Gratuit pour tous les étudiants UPF</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500 font-bold">✓</span>
            <span className="text-[var(--text-tertiary)] text-sm font-medium">Pas d'engagement — quitte quand tu veux</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500 font-bold">✓</span>
            <span className="text-[var(--text-tertiary)] text-sm font-medium">Certificat de participation délivré</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
