import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import logo from '../../assets/logo.svg'

export default function LoadingScreen({ onComplete }) {
  const { theme } = useTheme()
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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-12 bg-[var(--bg-primary)] transition-colors duration-500"
        >
          {/* Logo animé */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
            <div className="absolute inset-0 bg-violet-500/20 blur-3xl rounded-full" />
            <img src={logo} alt="UPF Logo" className="relative z-10 w-48 h-auto drop-shadow-[0_0_15px_rgba(22,69,149,0.3)]" />
          </motion.div>

          {/* Titre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-500 dark:from-violet-400 dark:to-blue-400 tracking-tight">
              UPF Clubs
            </div>
            <div className="text-[13px] text-gray-500 dark:text-white/30 mt-2 tracking-[0.2em] font-bold uppercase">
              Université Privée de Fès
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-[200px]"
          >
            <div className="h-0.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-400"
                style={{
                  width: `${progress}%`,
                  transition: 'width 0.05s linear'
                }}
              />
            </div>
            <div className="text-center mt-4 text-[11px] text-gray-400 dark:text-white/20 font-bold tracking-widest tabular-nums">
              {progress}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
