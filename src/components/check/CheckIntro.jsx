import { CHECK_STEPS } from '../../data/checkQuestions'

const STEP_STYLES = {
  context:     { bg: 'bg-primary-50',  icon: 'text-primary-400', border: 'border-primary-100' },
  energie:     { bg: 'bg-red-50',      icon: 'text-red-400',     border: 'border-red-100'     },
  bank:        { bg: 'bg-blue-50',     icon: 'text-blue-400',    border: 'border-blue-100'    },
  telecom:     { bg: 'bg-purple-50',   icon: 'text-purple-400',  border: 'border-purple-100'  },
  verzekering: { bg: 'bg-amber-50',    icon: 'text-amber-400',   border: 'border-amber-100'   },
  beleggen:    { bg: 'bg-green-50',    icon: 'text-green-500',   border: 'border-green-100'   },
  vpn:         { bg: 'bg-pink-50',     icon: 'text-pink-400',    border: 'border-pink-100'    },
  result:      { bg: 'bg-accent-50',   icon: 'text-accent-500',  border: 'border-accent-200'  },
}

// Subtle vertical wave offsets per stap
const WAVE = [6, -10, 2, 12, 8, -8, 4, -12]

const ALL_STEPS = [
  ...CHECK_STEPS.map((s, i) => ({ ...s, wave: WAVE[i] ?? 0 })),
  { id: 'result', icon: 'savings', title: 'Bespaar­overzicht', wave: WAVE[CHECK_STEPS.length] ?? 0 },
]

const ROW1 = ALL_STEPS.slice(0, 4)
const ROW2 = ALL_STEPS.slice(4)              // journey continues R→L, display order reversed

function StepNode({ step, isFirst, isResult }) {
  const s = STEP_STYLES[step.id] ?? STEP_STYLES.context
  return (
    <div
      className="flex flex-col items-center gap-1.5 flex-1 min-w-0"
      style={{ transform: `translateY(${step.wave}px)` }}
    >
      <div className={`
        w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0
        ${s.bg} border ${s.border}
        transition-transform duration-200 hover:scale-110
        ${isFirst ? 'ring-2 ring-offset-1 ring-primary-200' : ''}
        ${isResult ? 'ring-2 ring-offset-1 ring-accent-200' : ''}
      `}>
        <span className={`material-symbols-rounded text-base sm:text-[19px] ${s.icon}`}>
          {step.icon}
        </span>
      </div>
      <span className={`
        text-[9px] sm:text-[11px] text-center leading-tight
        ${isResult ? 'font-semibold text-accent-600' : 'font-medium text-ink-400'}
      `} style={{ width: 52 }}>
        {step.title}
      </span>
    </div>
  )
}

function Arrow({ dir }) {
  return (
    <span className="material-symbols-rounded text-ink-200 text-[13px] sm:text-[15px] flex-shrink-0 mb-5">
      {dir === 'right' ? 'arrow_forward' : 'arrow_back'}
    </span>
  )
}

export default function CheckIntro({ onStart }) {
  return (
    <div className="w-full py-10 sm:py-16">

      {/* Header */}
      <div className="max-w-lg mx-auto px-4 text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-400 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
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

      {/* Timeline — schermbreed */}
      <div className="w-full px-3 sm:px-10">

        {/* Row 1: L → R */}
        <div className="flex items-end pb-1">
          {ROW1.map((step, i) => (
            <div key={step.id} className="contents">
              <StepNode step={step} isFirst={i === 0} />
              {i < ROW1.length - 1 && <Arrow dir="right" />}
            </div>
          ))}
          {/* Corner turn: right side curve down */}
          <div className="flex-shrink-0 self-end mb-4 ml-1">
            <div className="w-3 h-3 border-r-2 border-b-2 border-ink-200 rounded-br-md" />
          </div>
        </div>

        {/* Right-side vertical connector */}
        <div className="flex justify-end pr-1">
          <div className="w-px h-3 bg-ink-200" />
        </div>

        {/* Row 2: displayed as result←vpn←beleggen←verzekering (reversed) */}
        <div className="flex items-start pt-1">
          {/* Left corner: curve from journey's end */}
          <div className="flex-shrink-0 self-start mt-4 mr-1">
            <div className="w-3 h-3 border-l-2 border-t-2 border-accent-200 rounded-tl-md" />
          </div>
          {[...ROW2].reverse().map((step, i) => (
            <div key={step.id} className="contents">
              {i > 0 && <Arrow dir="left" />}
              <StepNode step={step} isResult={step.id === 'result'} />
            </div>
          ))}
        </div>

      </div>

      {/* CTA */}
      <div className="max-w-lg mx-auto px-4 text-center mt-10">
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
