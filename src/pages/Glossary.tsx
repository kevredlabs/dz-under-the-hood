import { useState, useMemo } from 'react'
import { BookOpen, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHero } from '../components/ui/SectionHero'
import {
  glossaryTerms,
  categoryLabels,
  categoryColors,
  type GlossaryTerm,
} from '../data/glossary'

export function Glossary() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<
    GlossaryTerm['category'] | 'all'
  >('all')

  const categories = Object.keys(categoryLabels) as GlossaryTerm['category'][]

  const filtered = useMemo(() => {
    return glossaryTerms.filter((term) => {
      const matchesSearch =
        search === '' ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        term.definition.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        activeCategory === 'all' || term.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  return (
    <div>
      <SectionHero
        number={7}
        title="Glossary"
        subtitle="Every term defined, searchable, cross-referenced"
        color="text-zinc-400"
        icon={BookOpen}
      />

      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="sticky top-14 z-10 bg-zinc-950/95 backdrop-blur-md py-4 -mx-6 px-6 border-b border-zinc-800/50 mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search terms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                activeCategory === 'all'
                  ? 'border-zinc-600 bg-zinc-800 text-zinc-200'
                  : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              All ({glossaryTerms.length})
            </button>
            {categories.map((cat) => {
              const count = glossaryTerms.filter((t) => t.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                    activeCategory === cat
                      ? `${categoryColors[cat]} border`
                      : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {categoryLabels[cat]} ({count})
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((term, i) => (
            <motion.div
              key={term.term}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-5 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{term.term}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {term.definition}
                  </p>
                </div>
                <span
                  className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-mono border ${categoryColors[term.category]}`}
                >
                  {categoryLabels[term.category]}
                </span>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-zinc-600">
              <p className="text-lg mb-1">No terms found</p>
              <p className="text-sm">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
