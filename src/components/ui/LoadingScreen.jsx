import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => setDone(true), 300)
          return 100
        }
        return p + 2
      })
    }, 35)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (done) {
      const timer = setTimeout(onComplete, 600)
      return () => clearTimeout(timer)
    }
  }, [done, onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#08080f',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '32px'
          }}
        >
          {/* Logo animé */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{
              width: '72px', height: '72px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '32px', fontWeight: 900, color: 'white',
              boxShadow: '0 0 40px rgba(124,58,237,0.5)'
            }}
          >
            U
          </motion.div>

          {/* Titre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              fontSize: '28px', fontWeight: 800,
              background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', letterSpacing: '-0.5px'
            }}>
              UPF Clubs
            </div>
            <div style={{
              fontSize: '13px', color: 'rgba(255,255,255,0.3)',
              marginTop: '6px', letterSpacing: '0.1em'
            }}>
              UNIVERSITÉ PRIVÉE DE FÈS
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ width: '200px' }}
          >
            <div style={{
              height: '2px', background: 'rgba(255,255,255,0.08)',
              borderRadius: '2px', overflow: 'hidden'
            }}>
              <motion.div
                style={{
                  height: '100%', borderRadius: '2px',
                  background: 'linear-gradient(90deg, #7c3aed, #38bdf8)',
                  width: `${progress}%`,
                  transition: 'width 0.05s linear'
                }}
              />
            </div>
            <div style={{
              textAlign: 'center', marginTop: '10px',
              fontSize: '11px', color: 'rgba(255,255,255,0.2)',
              fontVariantNumeric: 'tabular-nums'
            }}>
              {progress}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
