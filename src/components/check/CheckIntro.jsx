import { CHECK_STEPS } from '../../data/checkQuestions'

const META = {
  context:     { color: '#818cf8', bg: '#eef2ff', border: '#c7d2fe', label: 'Even iets\nover jou' },
  energie:     { color: '#f87171', bg: '#fef2f2', border: '#fecaca', label: 'Energie'              },
  bank:        { color: '#60a5fa', bg: '#eff6ff', border: '#bfdbfe', label: 'Bankrekening'         },
  telecom:     { color: '#c084fc', bg: '#faf5ff', border: '#e9d5ff', label: 'Internet\n& mobiel'   },
  verzekering: { color: '#fbbf24', bg: '#fffbeb', border: '#fde68a', label: 'Verzeke-\nringen'     },
  vpn:         { color: '#f472b6', bg: '#fdf2f8', border: '#fbcfe8', label: 'VPN'                  },
  result:      { color: '#fb923c', bg: '#fff7ed', border: '#fed7aa', label: 'Bespaar-\noverzicht'  },
}

const ALL_STEPS = [
  ...CHECK_STEPS,
  { id: 'result', icon: 'savings' },
]

// Sizes for desktop and mobile
const CFG = {
  lg: { circle: 68, iconSz: 26, fontSize: 11, labelGap: 14, lineH: 15, px: 24 },
  sm: { circle: 40, iconSz: 15, fontSize:  8, labelGap:  8, lineH: 12, px: 16 },
}

function Node({ step, cfg, isResult }) {
  const m = META[step.id] ?? META.context
  return (
    <div className="flex flex-col items-center relative z-10 flex-shrink-0" style={{ gap: cfg.labelGap }}>
      {/* Circle */}
      <div
        className="rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110"
        style={{
          width:  cfg.circle,
          height: cfg.circle,
          background: m.bg,
          border: `2px solid ${m.border}`,
          boxShadow: isResult ? `0 0 0 3px ${m.border}55` : undefined,
        }}
      >
        <span
          className="material-symbols-rounded select-none"
          style={{ color: m.color, fontSize: cfg.iconSz }}
        >
          {step.icon}
        </span>
      </div>

      {/* Label */}
      <div style={{ width: cfg.circle + 8, textAlign: 'center' }}>
        {m.label.split('\n').map((line, i) => (
          <div
            key={i}
            style={{
              fontSize: cfg.fontSize,
              lineHeight: `${cfg.lineH}px`,
              color: isResult ? m.color : '#9ca3af',
              fontWeight: isResult ? 600 : 500,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}

function Timeline({ cfg }) {
  const half = cfg.circle / 2

  return (
    <div className="relative w-full" style={{ padding: `0 ${cfg.px}px` }}>
      {/* Single horizontal dashed line through circle centers */}
      <div
        className="absolute pointer-events-none"
        style={{
          left:  cfg.px,
          right: cfg.px,
          top:   half,
          borderTop: '2px dashed #ddd6fe',
        }}
      />

      {/* All 7 nodes in one row */}
      <div className="relative flex justify-between items-start">
        {ALL_STEPS.map(step => (
          <Node key={step.id} step={step} cfg={cfg} isResult={step.id === 'result'} />
        ))}
      </div>
    </div>
  )
}

export default function CheckIntro({ onStart }) {
  return (
    <div className="w-full py-10 sm:py-16">

      {/* Header */}
      <div className="max-w-lg mx-auto px-4 text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-400 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
          <span className="material-symbols-rounded text-sm">bolt</span>
          BespaarCheck
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 mb-2 leading-tight">
          Jouw persoonlijke bespaarreis
        </h1>
        <p className="text-ink-400 text-base">
          6 stappen · 3 minuten · direct resultaat
        </p>
      </div>

      {/* Mobile — horizontaal scrollbaar zodat alle nodes zichtbaar blijven */}
      <div className="block sm:hidden overflow-x-auto pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div style={{ minWidth: 480 }}>
          <Timeline cfg={CFG.sm} />
        </div>
      </div>

      {/* Desktop — max-w-5xl centered */}
      <div className="hidden sm:block max-w-5xl mx-auto">
        <Timeline cfg={CFG.lg} />
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
