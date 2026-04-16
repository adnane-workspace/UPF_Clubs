import { motion, AnimatePresence } from 'framer-motion';

export default function ClubModal({ club, onClose }) {
  if (!club) return null;

  return (
    <AnimatePresence>
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-md flex items-center justify-center p-0 md:p-5"
      >
        {/* MODAL CARD */}
        <motion.div
          drag={window.innerWidth < 768 ? "y" : false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            if (info.offset.y > 100) onClose();
          }}
          initial={{ 
            y: window.innerWidth < 768 ? '100%' : 20,
            opacity: 0,
            scale: window.innerWidth < 768 ? 1 : 0.9
          }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ 
            y: window.innerWidth < 768 ? '100%' : 10,
            opacity: 0 
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={e => e.stopPropagation()}
          className="
            fixed z-[2000]
            bottom-0 left-0 right-0
            md:relative md:bottom-auto md:left-auto md:right-auto
            md:max-w-[500px] md:w-full md:mx-auto
            bg-[#0f0f1a]
            rounded-t-3xl md:rounded-3xl
            p-6 sm:p-8
            max-h-[90vh] overflow-y-auto
            border border-white/10
          "
        >
          {/* Mobile drag handle */}
          <div className="md:hidden w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />
          {/* Close button */}
          <button onClick={onClose} style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(255,255,255,0.05)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', width: '32px', height: '32px',
            color: 'white', cursor: 'pointer', fontSize: '16px'
          }}>×</button>

          {/* Club logo + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '20px',
              background: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', padding: '12px',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <img 
                src={club.image} 
                alt={club.name} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </div>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white', margin: 0, letterSpacing: '-0.02em' }}>{club.name}</h2>
              <span style={{
                fontSize: '12px', padding: '4px 12px', borderRadius: '100px',
                background: 'rgba(124,58,237,0.15)',
                color: '#a78bfa', border: '0.5px solid rgba(124,58,237,0.3)',
                display: 'inline-block', marginTop: '8px', fontWeight: 700, textTransform: 'uppercase'
              }}>{club.category}</span>
            </div>
          </div>

          {/* Description */}
          <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '24px' }}>
            {club.description}
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
            {[
              { label: 'Membres', value: club.members + '+' },
              { label: 'Événements', value: '12/an' },
              { label: 'Fondé en', value: '2019' }
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(255,255,255,0.06)',
                borderRadius: '12px', padding: '12px', textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>{stat.value}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl text-white font-bold bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-xl shadow-violet-500/25"
          >
            Rejoindre ce club →
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
