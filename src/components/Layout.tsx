import { Link, Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { chapters } from '../data/chapters'
import { motion, AnimatePresence } from 'framer-motion'

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-sm tracking-tight hover:text-white transition-colors"
          >
            <span className="text-cyan-400 font-mono text-xs">DZ</span>
            <span className="hidden sm:inline">Under The Hood</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {chapters.map((ch) => (
              <Link
                key={ch.id}
                to={ch.path}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  location.pathname === ch.path
                    ? 'text-white bg-zinc-800'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                }`}
              >
                {ch.title}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-zinc-950/98 pt-16 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-2 pt-4">
              {chapters.map((ch) => {
                const Icon = ch.icon
                return (
                  <Link
                    key={ch.id}
                    to={ch.path}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-900 transition-colors"
                  >
                    <Icon className={`w-4 h-4 ${ch.color}`} />
                    <div>
                      <p className="text-sm font-medium">{ch.title}</p>
                      <p className="text-xs text-zinc-500">{ch.subtitle}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-zinc-800/50 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>
            DZ Under The Hood — A pedagogical resource for understanding{' '}
            <a
              href="https://docs.malbeclabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-cyan-400 transition-colors"
            >
              DoubleZero
            </a>
          </p>
          <p className="font-mono">Built for developers, by developers</p>
        </div>
      </footer>
    </div>
  )
}
