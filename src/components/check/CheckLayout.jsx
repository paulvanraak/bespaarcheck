import { useState } from 'react'

const STEP_COLORS = {
  context:      'text-primary-500 bg-primary-50',
  energie:      'text-red-500 bg-red-50',
  bank:         'text-blue-500 bg-blue-50',
  telecom:      'text-purple-500 bg-purple-50',
  verzekering:  'text-amber-500 bg-amber-50',
  beleggen:     'text-green-600 bg-green-50',
  vpn:          'text-pink-500 bg-pink-50',
}

export default function CheckLayout({ step, currentIndex, total, onNext, onPrev, isLast, saving, children, answers }) {
  const [validationMsg, setValidationMsg] = useState('')
  const isFirst = currentIndex === 0
  const iconColor = STEP_COLORS[step.id] ?? 'text-primary-500 bg-primary-50'

  function handleNext() {
    // Validate required questions for current step
    const stepAnswers = answers?.[step.id] ?? {}
    const missing = step.questions?.filter(q => {
      if (!q.required) return false
      const val = stepAnswers[q.key]
      return val === undefined || val === null || val === ''
    }) ?? []

    // Also check that at least one answer per step is given (for non-required steps)
    const visibleRequired = step.questions?.filter(q => {
      if (q.showIf) return false // conditional, skip validation
      if (q.type === 'slider') return false // sliders always have a default
      return true
    }) ?? []
    const hasAnyAnswer = visibleRequired.length === 0 || visibleRequired.some(q => {
      const val = stepAnswers[q.key]
      return val !== undefined && val !== null && val !== ''
    })

    if (missing.length > 0) {
      setValidationMsg(`Vul ${missing[0].name ?? missing[0].label.toLowerCase()} in om door te gaan.`)
      return
    }
    if (!hasAnyAnswer && step.id !== 'context') {
      setValidationMsg('Beantwoord minstens één vraag om door te gaan.')
      return
    }

    setValidationMsg('')
    onNext?.()
  }

  return (
    <div className="min-h-screen flex flex-col bg-ink-50">
      {/* Progress bar — sticky onder de universele header */}
      <div className="bg-white border-b border-ink-100 sticky top-14 z-40">
        <div className="max-w-2xl mx-auto px-4 pt-2.5 pb-2.5 flex items-center gap-3">
          <span className="text-xs font-semibold text-ink-400 whitespace-nowrap">
            {currentIndex + 1} / {total}
          </span>
          <div className="flex items-center gap-1.5 flex-1">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={[
                  'h-1 rounded-sm flex-1 transition-all duration-300',
                  i < currentIndex ? 'bg-primary-500' : i === currentIndex ? 'bg-primary-500 opacity-50' : 'bg-ink-100',
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
            {step.subtitle && (
              <p className="text-sm text-ink-400">{step.subtitle}</p>
            )}
          </div>
        </div>

        {children}
      </div>

      {/* Bottom nav */}
      <div className="bg-white border-t border-ink-100 sticky bottom-0">
        <div className="max-w-2xl mx-auto px-4 py-3">
          {validationMsg && (
            <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
              <span className="material-symbols-rounded text-base flex-shrink-0">info</span>
              {validationMsg}
            </div>
          )}
          <div className="flex gap-3">
            {!isFirst && (
              <button
                onClick={onPrev}
                className="px-5 py-3 rounded-md border border-ink-100 text-ink-700 text-sm font-medium hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-colors"
              >
                Vorige
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={saving}
              className="flex-1 py-3 rounded-md bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white text-sm font-semibold transition-colors"
            >
              {saving ? 'Berekenen…' : isLast ? 'Bekijk mijn besparing →' : 'Volgende →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
