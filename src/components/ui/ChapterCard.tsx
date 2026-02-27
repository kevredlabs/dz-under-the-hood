import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Chapter } from '../../data/chapters'

interface ChapterCardProps {
  chapter: Chapter
  index: number
}

export function ChapterCard({ chapter, index }: ChapterCardProps) {
  const Icon = chapter.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={chapter.path}
        className="group block h-full rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-black/20"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-zinc-600">
              {String(chapter.number).padStart(2, '0')}
            </span>
            <Icon className={`w-5 h-5 ${chapter.color}`} />
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-zinc-400" />
        </div>

        <h3 className="text-lg font-semibold mb-1 group-hover:text-white transition-colors">
          {chapter.title}
        </h3>
        <p className="text-sm text-zinc-500 mb-3">{chapter.subtitle}</p>
        <p className="text-sm text-zinc-600 leading-relaxed">{chapter.description}</p>
      </Link>
    </motion.div>
  )
}
