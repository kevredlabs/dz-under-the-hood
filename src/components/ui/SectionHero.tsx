import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface SectionHeroProps {
  number: number
  title: string
  subtitle: string
  color: string
  icon: LucideIcon
}

export function SectionHero({ number, title, subtitle, color, icon: Icon }: SectionHeroProps) {
  return (
    <div className="relative pt-32 pb-16 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/95 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.05),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-sm text-zinc-600">
            {String(number).padStart(2, '0')}
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
          <Icon className={`w-5 h-5 ${color}`} />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">{title}</h1>
        <p className="text-xl text-zinc-400 max-w-2xl">{subtitle}</p>
      </motion.div>
    </div>
  )
}
