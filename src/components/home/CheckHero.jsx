import { Link } from 'react-router-dom'

const STATS = [
  { value: '€847', label: 'gemiddelde\nbesparing/jaar' },
  { value: '6', label: 'vragen,\n3 minuten' },
  { value: '100%', label: 'gratis\n& anoniem' },
]

export default function CheckHero() {
  return (
    <div className="bg-primary-500 text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Left — copy */}
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-4">
              Ontdek wat jij jaarlijks kunt besparen
            </h1>
            <p className="text-primary-200 text-base sm:text-lg mb-8 leading-relaxed">
              6 vragen, 3 minuten, 1 persoonlijk overzicht.
            </p>
            <Link
              to="/check"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold text-base px-7 py-4 rounded-md transition-colors shadow-lg shadow-accent-600/30"
            >
              Start de BespaarCheck
              <span className="material-symbols-rounded text-lg">arrow_forward</span>
            </Link>
            <p className="text-primary-300 text-base mt-4">
              Of{' '}
              <a href="#vergelijkers" className="underline underline-offset-2 hover:text-white transition-colors">
                vergelijk direct per categorie
              </a>
            </p>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 sm:gap-3">
            {STATS.map((s) => (
              <div
                key={s.value}
                className="bg-white/10 rounded-md px-3 sm:px-6 py-3 sm:py-5 backdrop-blur-sm border border-white/10 text-center sm:text-left"
              >
                <div className="text-2xl sm:text-5xl font-bold text-white leading-none tracking-tight">{s.value}</div>
                <div className="text-primary-200 text-[11px] sm:text-sm mt-1 sm:mt-2 leading-snug whitespace-pre-line">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
