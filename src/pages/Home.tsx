import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { ChapterCard } from '../components/ui/ChapterCard'
import { chapters } from '../data/chapters'

export function Home() {
  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.06),transparent_60%)]" />
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
              style={{
                left: `${(i / 30) * 100}%`,
                height: '100%',
              }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{
                duration: 4 + Math.random() * 4,
                delay: Math.random() * 3,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-mono text-zinc-500 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              A visual guide to DoubleZero
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              DZ
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
              Under
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
              The Hood
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            How DoubleZero optimizes validator-to-validator communication
            <br className="hidden md:block" />
            — from fiber optics to onchain state. A deep-dive for developers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center"
          >
            <a
              href="#chapters"
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Start exploring
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="chapters" className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">
            Chapters
          </p>
          <h2 className="text-3xl font-bold">What you'll learn</h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter, i) => (
            <ChapterCard key={chapter.id} chapter={chapter} index={i} />
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-zinc-500 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            This site is an educational resource to help developers understand the
            DoubleZero decentralized network infrastructure. It's based on the{' '}
            <a
              href="https://docs.malbeclabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              official documentation
            </a>{' '}
            from Malbec Labs.
          </p>
        </motion.div>
      </section>
    </div>
  )
}
