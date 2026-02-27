import { useState, type ReactNode } from 'react'
import { ChevronDown, Terminal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface DeepDiveProps {
  title: string
  children: ReactNode
}

export function DeepDive({ title, children }: DeepDiveProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-orange-500/20 bg-orange-500/[0.03] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-orange-500/[0.04] transition-colors"
      >
        <Terminal className="w-4 h-4 text-orange-400 shrink-0" />
        <span className="text-sm font-semibold text-orange-300 flex-1">
          Under the hood: {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-orange-400/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-orange-500/10 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
