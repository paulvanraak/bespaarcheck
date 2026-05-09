import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from '../shared/Logo'
import { CATEGORIES } from '../../data/categories'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [compareOpen, setCompareOpen] = useState(false)
  const location = useLocation()

  const isCheckFlow = location.pathname.startsWith('/check')

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-ink-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        {/* Logo — altijd links, altijd klikbaar naar home */}
        <Link to="/" className="flex-shrink-0">
          <Logo className="text-lg" />
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Rechts: knoppen (buiten check) of home-link (in check) */}
        {isCheckFlow ? (
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-700 transition-colors"
          >
            <span className="material-symbols-rounded text-base">home</span>
            <span className="hidden sm:inline">Home</span>
          </Link>
        ) : (
          <>
            {/* Desktop: Vergelijken + Start check naast elkaar rechts */}
            <div className="hidden md:flex items-center gap-2">
              {/* Vergelijken dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCompareOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-md border border-ink-200 bg-white text-sm font-semibold text-ink-700 hover:border-ink-300 hover:bg-ink-50 transition-colors"
                >
                  Vergelijken
                  <span className="material-symbols-rounded text-base leading-none">expand_more</span>
                </button>
                {compareOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setCompareOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 bg-white border border-ink-100 rounded-lg shadow-lg py-1 min-w-44 z-50">
                      {CATEGORIES.map(cat => (
                        <NavLink
                          key={cat.slug}
                          to={`/vergelijk/${cat.slug}`}
                          onClick={() => setCompareOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                              isActive ? 'text-primary-500 bg-primary-50' : 'text-ink-700 hover:bg-ink-50'
                            } ${!cat.available ? 'opacity-40 pointer-events-none' : ''}`
                          }
                        >
                          {cat.name}
                          {!cat.available && (
                            <span className="text-xs text-ink-300 ml-auto">Binnenkort</span>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <Link
                to="/check"
                className="inline-flex items-center gap-1.5 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
              >
                Start check
                <span className="material-symbols-rounded text-base">arrow_forward</span>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-md text-ink-500 hover:bg-ink-100 transition-colors"
            >
              <span className="material-symbols-rounded">{menuOpen ? 'close' : 'menu'}</span>
            </button>
          </>
        )}
      </div>

      {/* Mobile menu — fullscreen overlay */}
      {menuOpen && !isCheckFlow && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 top-14 bg-black/20 z-40"
            onClick={() => setMenuOpen(false)}
          />
          {/* Panel */}
          <div className="md:hidden fixed inset-x-0 top-14 z-50 bg-white shadow-xl border-t border-ink-100">
            <div className="px-4 py-5">

              {/* CTA */}
              <Link
                to="/check"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-bold text-base transition-colors mb-6"
              >
                <span className="material-symbols-rounded text-lg">bolt</span>
                Start de BespaarCheck
              </Link>

              {/* Vergelijken */}
              <p className="text-[11px] font-bold uppercase tracking-widest text-ink-300 mb-3 px-1">
                Vergelijken
              </p>

              <div className="space-y-1">
                {CATEGORIES.map(cat => {
                  const iconColors = {
                    blue: 'text-blue-600 bg-blue-50',
                    pink: 'text-pink-500 bg-pink-50',
                    red: 'text-red-500 bg-red-50',
                    purple: 'text-purple-500 bg-purple-50',
                    amber: 'text-amber-500 bg-amber-50',
                    green: 'text-green-600 bg-green-50',
                  }
                  const iconCls = iconColors[cat.color] ?? 'text-primary-500 bg-primary-50'

                  if (!cat.available) {
                    return (
                      <div key={cat.slug} className="flex items-center gap-3 px-3 py-3 rounded-xl opacity-40">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-ink-100`}>
                          <span className="material-symbols-rounded text-ink-400 text-[18px]">{cat.icon}</span>
                        </div>
                        <span className="text-sm font-medium text-ink-500 flex-1">{cat.name}</span>
                        <span className="text-xs text-ink-300 bg-ink-100 px-2 py-0.5 rounded-full">Binnenkort</span>
                      </div>
                    )
                  }

                  return (
                    <NavLink
                      key={cat.slug}
                      to={`/vergelijk/${cat.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                          isActive ? 'bg-primary-50' : 'hover:bg-ink-50'
                        }`
                      }
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${iconCls}`}>
                        <span className="material-symbols-rounded text-[18px]">{cat.icon}</span>
                      </div>
                      <span className="text-sm font-semibold text-ink-900 flex-1">{cat.name}</span>
                      <span className="material-symbols-rounded text-ink-300 text-[18px]">chevron_right</span>
                    </NavLink>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
