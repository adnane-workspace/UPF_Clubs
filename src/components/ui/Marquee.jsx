import { motion } from 'framer-motion'

const items = [
  '🏆 Champion régional de robotique 2023',
  '🎭 Festival culturel inter-universitaire',
  '💻 Hackathon 48h — 1er prix',
  '⚽ Tournoi sportif UPF — 200 participants',
  '🎨 Exposition artistique annuelle',
  '🌱 Projet environnemental primé',
  '🎵 Concert de fin d\'année sold-out',
  '🤝 Forum des clubs — 500 visiteurs',
]

const doubled = [...items, ...items]

export default function Marquee() {
  const isMobile = window.innerWidth < 768;
  const displayItems = isMobile ? items : doubled;
  const duration = isMobile ? 20 : 30;

  return (
    <div style={{
      overflow: 'hidden', padding: '20px 0',
      borderTop: '0.5px solid rgba(255,255,255,0.05)',
      borderBottom: '0.5px solid rgba(255,255,255,0.05)',
      background: 'rgba(255,255,255,0.01)',
      position: 'relative'
    }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px',
        background: 'linear-gradient(90deg, #08080f, transparent)',
        zIndex: 2, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px',
        background: 'linear-gradient(-90deg, #08080f, transparent)',
        zIndex: 2, pointerEvents: 'none'
      }} />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ 
          duration: duration,
          repeat: Infinity, 
          ease: 'linear',
          repeatType: 'loop'
        }}
        style={{ display: 'flex', gap: isMobile ? '32px' : '48px', whiteSpace: 'nowrap' }}
      >
        {displayItems.map((item, i) => (
          <span key={i} className="text-xs sm:text-sm text-white/35 flex items-center gap-2 shrink-0">
            {item}
            <span style={{
              width: '4px', height: '4px', borderRadius: '50%',
              background: 'rgba(124,58,237,0.6)', flexShrink: 0
            }} />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
