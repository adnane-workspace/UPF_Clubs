import { AnimatePresence, motion } from 'framer-motion';

export default function EventDetailsModal({ event, onClose }) {
  return (
    <AnimatePresence>
      {event && (
        <motion.div
          className="fixed inset-0 z-[1200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Fermer les détails"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 sm:p-7 text-left shadow-2xl"
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-violet-600/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                {event.category}
              </span>
              <span className="text-sm text-[var(--text-tertiary)]">par {event.club}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] leading-tight mb-4">
              {event.title}
            </h3>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
              {event.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] mb-1">Date</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{event.date}</p>
              </div>
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] mb-1">Heure</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{event.time}</p>
              </div>
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-tertiary)] px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] mb-1">Lieu</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{event.location}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#2563eb] px-5 py-2.5 text-sm font-bold text-white"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
