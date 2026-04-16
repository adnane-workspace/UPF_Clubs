import { memo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { IconArrowRight, IconCpu, IconTrophy, IconPalmtree, IconPalette, IconBriefcase, IconUsers } from '../ui/Icons';

const categoryConfig = {
  Tech:     { icon: IconCpu,  colors: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  Sport:    { icon: IconTrophy, colors: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  Culture:  { icon: IconPalmtree, colors: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
  Art:      { icon: IconPalette,  colors: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  Business: { icon: IconBriefcase, colors: 'bg-green-500/20 text-green-300 border-green-500/30' },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }
  }
};

const ClubCard = memo(({ club, onClick }) => {
  const config = categoryConfig[club.category] || categoryConfig.Tech;
  const Icon = config.icon;

  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);

  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    setRotateX(-mouseY / (rect.height / 2) * 8);
    setRotateY(mouseX / (rect.width / 2) * 8);
    setGlareX(((e.clientX - rect.left) / rect.width) * 100);
    setGlareY(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      whileTap={{ scale: 0.97 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group flex flex-col h-full p-4 sm:p-5 lg:p-6 rounded-2xl cursor-pointer"
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease',
        willChange: 'transform',
        position: 'relative', overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(10px)',
        border: '0.5px solid rgba(255,255,255,0.08)'
      }}
    >
      {/* Glare effect */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '16px',
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
        pointerEvents: 'none', transition: 'background 0.1s ease'
      }} />
      
      {/* Top gradient accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)'
      }} />
      {/* Top Section: Logo & Badge */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <motion.div 
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border flex items-center justify-center overflow-hidden bg-white/95 shadow-inner ${config.colors}`}
        >
          <img 
            src={club.image} 
            alt={`${club.name} logo`} 
            className="w-full h-full object-contain p-2"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div style={{ display: 'none' }}>
            <Icon size={24} />
          </div>
        </motion.div>
        <div className="flex flex-col items-end gap-1">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${config.colors}`}>
            {club.category}
          </span>
        </div>
      </div>

      {/* Middle: Info */}
      <div className="flex-grow">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2 text-white group-hover:text-violet-300 transition-colors">
          {club.name}
        </h3>
        <p className="text-xs sm:text-sm text-white/50 leading-relaxed line-clamp-3">
          {club.description}
        </p>
      </div>

      {/* Bottom: Avatars & Join */}
      <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="w-8 h-8 rounded-full border-2 border-[#0a0a0f] bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden"
            >
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=club-${i}${club.id}`} 
                alt="avatar" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0f] bg-[#1f1f2e] flex items-center justify-center text-[10px] font-bold text-white/60">
            +12
          </div>
        </div>

        <button className="flex items-center gap-2 text-sm font-bold text-white/50 group-hover:text-white transition-all">
          <span className="hidden sm:inline">Rejoindre</span>
          <IconArrowRight 
            size={18} 
            className="transition-transform duration-300 group-hover:translate-x-1" 
          />
        </button>
      </div>
    </motion.div>
  );
});

export default ClubCard;
