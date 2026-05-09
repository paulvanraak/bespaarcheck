import { CHECK_STEPS } from '../../data/checkQuestions'

const STEP_STYLES = {
  context:     { bg: 'bg-primary-500',  ring: 'ring-primary-200',  label: 'bg-primary-50  text-primary-700',  saving: null },
  energie:     { bg: 'bg-red-500',      ring: 'ring-red-200',      label: 'bg-red-50      text-red-700',      saving: 'Tot €320/jaar' },
  bank:        { bg: 'bg-blue-500',     ring: 'ring-blue-200',     label: 'bg-blue-50     text-blue-700',     saving: 'Tot €180/jaar' },
  telecom:     { bg: 'bg-purple-500',   ring: 'ring-purple-200',   label: 'bg-purple-50   text-purple-700',   saving: 'Tot €240/jaar' },
  verzekering: { bg: 'bg-amber-500',    ring: 'ring-amber-200',    label: 'bg-amber-50    text-amber-700',    saving: 'Tot €150/jaar' },
  beleggen:    { bg: 'bg-green-600',    ring: 'ring-green-200',    label: 'bg-green-50    text-green-700',    saving: 'Lagere kosten' },
  vpn:         { bg: 'bg-pink-500',     ring: 'ring-pink-200',     label: 'bg-pink-50     text-pink-700',     saving: 'Tot €80/jaar' },
}

export default function CheckIntro({ onStart }) {
  return (
    <div className="max-w-lg mx-auto px-4 py-10 sm:py-16">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-500 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
          <span className="material-symbols-rounded text-sm">bolt</span>
          BespaarCheck
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 mb-2 leading-tight">
          Jouw persoonlijke bespaarreis
        </h1>
        <p className="text-ink-400 text-base">
          7 stappen · 3 minuten · direct resultaat
        </p>
      </div>

      {/* Timeline journey */}
      <div className="relative mb-10">
        {/* Vertical connector line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary-300 via-purple-300 to-pink-300 rounded-full" />

        <div className="space-y-1">
          {CHECK_STEPS.map((step, i) => {
            const s = STEP_STYLES[step.id] ?? STEP_STYLES.context
            const isFirst = i === 0
            const isLast = i === CHECK_STEPS.length - 1

            return (
              <div key={step.id} className="relative flex items-center gap-4 group">
                {/* Icon circle */}
                <div className={`
                  relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0
                  ${s.bg} ring-4 ${s.ring} shadow-sm
                  transition-transform duration-200 group-hover:scale-110
                `}>
                  <span className="material-symbols-rounded text-white text-xl">{step.icon}</span>
                  {isFirst && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full flex items-center justify-center">
                      <span className="material-symbols-rounded text-white text-[10px]">play_arrow</span>
                    </span>
                  )}
                  {isLast && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="material-symbols-rounded text-white text-[10px]">flag</span>
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex items-center justify-between py-3">
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-0.5 text-ink-300`}>
                      {isFirst ? 'Start hier' : `Stap ${i}`}
                    </p>
                    <p className="text-sm font-semibold text-ink-800">{step.title}</p>
                  </div>
                  {s.saving && (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.label}`}>
                      {s.saving}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Finish badge */}
        <div className="relative flex items-center gap-4 mt-1">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-accent-500 ring-4 ring-accent-200 shadow-sm">
            <span className="material-symbols-rounded text-white text-xl">savings</span>
          </div>
          <div className="flex-1 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider mb-0.5 text-ink-300">Resultaat</p>
            <p className="text-sm font-semibold text-ink-800">Jouw persoonlijk bespaarsoverzicht</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent-50 text-accent-700">
            Gem. €847/jaar
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button
          onClick={onStart}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold text-base px-10 py-4 rounded-xl transition-colors shadow-lg shadow-accent-600/20"
        >
          Start de check
          <span className="material-symbols-rounded text-lg">arrow_forward</span>
        </button>
        <p className="mt-3 text-sm text-ink-400">
          Geen account nodig · 100% gratis & anoniem
        </p>
      </div>
    </div>
  )
}
