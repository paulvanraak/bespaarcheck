const STEP_COLORS = {
  energie:     'text-red-500 bg-red-50',
  bank:        'text-blue-500 bg-blue-50',
  telecom:     'text-purple-500 bg-purple-50',
  verzekering: 'text-amber-500 bg-amber-50',
  beleggen:    'text-green-600 bg-green-50',
  vpn:         'text-pink-500 bg-pink-50',
}

export default function CheckLayout({ step, currentIndex, total, onNext, onPrev, isLast, saving, children }) {
  const isFirst = currentIndex === 0
  const iconColor = STEP_COLORS[step.id] ?? 'text-primary-500 bg-primary-50'

  return (
    <div className="min-h-screen flex flex-col bg-ink-50">
      {/* Progress bar — sticky onder de universele header (top-14 = 56px) */}
      <div className="bg-white border-b border-ink-100 sticky top-14 z-40">
        <div className="max-w-2xl mx-auto px-4 pt-2.5 pb-2.5 flex items-center gap-3">
          {/* Stap-teller */}
          <span className="text-xs font-semibold text-ink-400 whitespace-nowrap">
            {currentIndex + 1} / {total}
          </span>
          {/* Progress segments */}
          <div className="flex items-center gap-1.5 flex-1">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={[
                  'h-1 rounded-sm flex-1 transition-all duration-300',
                  i < currentIndex
                    ? 'bg-primary-500'
                    : i === currentIndex
                    ? 'bg-primary-500 opacity-50'
                    : 'bg-ink-100',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        {/* Stap-header */}
        <div className="flex items-center gap-3 mb-8">
          <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColor}`}>
            <span className="material-symbols-rounded text-xl">{step.icon}</span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
              Stap {currentIndex + 1} van {total}
            </p>
            <p className="text-lg font-semibold text-ink-900">{step.title}</p>
          </div>
        </div>

        {children}
      </div>

      {/* Bottom nav */}
      <div className="bg-white border-t border-ink-100 sticky bottom-0">
        <div className="max-w-2xl mx-auto px-4 py-3 flex gap-3">
          {!isFirst && (
            <button
              onClick={onPrev}
              className="px-5 py-3 rounded-md border border-ink-100 text-ink-700 text-sm font-medium hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-colors"
            >
              Vorige
            </button>
          )}
          <button
            onClick={onNext}
            disabled={saving}
            className="flex-1 py-3 rounded-md bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white text-sm font-semibold transition-colors"
          >
            {saving ? 'Berekenen…' : isLast ? 'Bekijk mijn besparing →' : 'Volgende →'}
          </button>
        </div>
      </div>
    </div>
  )
}
