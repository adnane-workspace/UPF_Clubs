import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconTrophy, IconSparkles } from '../ui/Icons';

/**
 * Secret Easter Egg Modal
 * Displayed when the Konami Code is correctly entered
 */
export default function SecretModal({ isOpen, onClose }) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[20000] flex items-center justify-center p-6 sm:p-10">
          
          {/* 1. Dark Backdrop with cinematic blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-950/80 backdrop-blur-2xl"
          />

          {/* 2. The Modal Card */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 100, rotateZ: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateZ: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50, rotateZ: 5 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              mass: 1 
            }}
            data-lenis-prevent
            className="relative w-full max-w-lg glass-premium bg-dark-900 border border-white/5 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Animated Glow Border */}
            <div className="absolute -inset-[2px] rounded-[42px] z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,#7c3aed_120deg,#06b6d4_240deg,transparent_360deg)] animate-rotate" />
            </div>

            {/* Inner Content */}
            <div className="relative z-10 bg-dark-950/90 rounded-[38px] p-10 sm:p-16 text-center">
               
               <div className="w-24 h-24 rounded-3xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-10 shadow-2xl relative">
                  <IconTrophy size={48} className="text-violet-500" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 text-fuchsia-500 opacity-30"
                  >
                    <IconSparkles size={16} className="absolute top-0 left-1/2 -translate-x-1/2" />
                    <IconSparkles size={16} className="absolute bottom-0 left-1/2 -translate-x-1/2" />
                  </motion.div>
               </div>

               <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
                  Secret <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Trouvé !</span>
               </h2>

               <p className="text-slate-400 text-base sm:text-lg mb-12 leading-relaxed">
                  Félicitations ! Tu as trouvé l'easter egg caché de l'UPF. 
                  Tu es officiellement un membre d'élite de la communauté. 🎉
               </p>

               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={onClose}
                 className="w-full py-5 rounded-2xl bg-white text-dark-950 font-black text-lg shadow-xl hover:bg-slate-100 transition-colors"
               >
                 Continuer l'aventure
               </motion.button>
            </div>

            {/* Close Button Top-Right */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all z-20"
            >
              <IconX size={24} />
            </button>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
