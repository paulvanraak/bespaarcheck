import { CHECK_STEPS } from '../../data/checkQuestions'

const META = {
  context:     { color: '#818cf8', bg: '#eef2ff', border: '#c7d2fe', label: 'Even iets\nover jou' },
  energie:     { color: '#f87171', bg: '#fef2f2', border: '#fecaca', label: 'Energie'              },
  bank:        { color: '#60a5fa', bg: '#eff6ff', border: '#bfdbfe', label: 'Bankrekening'         },
  telecom:     { color: '#c084fc', bg: '#faf5ff', border: '#e9d5ff', label: 'Internet\n& mobiel'   },
  verzekering: { color: '#fbbf24', bg: '#fffbeb', border: '#fde68a', label: 'Verzeke-\nringen'     },
  beleggen:    { color: '#4ade80', bg: '#f0fdf4', border: '#bbf7d0', label: 'Beleggen'             },
  vpn:         { color: '#f472b6', bg: '#fdf2f8', border: '#fbcfe8', label: 'VPN'                  },
  result:      { color: '#fb923c', bg: '#fff7ed', border: '#fed7aa', label: 'Bespaar-\noverzicht'  },
}

const ALL_STEPS = [
  ...CHECK_STEPS,
  { id: 'result', icon: 'savings' },
]
const ROW1 = ALL_STEPS.slice(0, 4)   // context → telecom (L → R)
const ROW2 = ALL_STEPS.slice(4)       // verzekering → result (R → L, flex-row-reverse)

// Sizes for desktop and mobile
const CFG = {
  lg: { circle: 52, iconSz: 22, fontSize: 11, labelGap: 14, lineH: 15, rowGap: 40, px: 48, cornerR: 14 },
  sm: { circle: 44, iconSz: 18, fontSize:  9, labelGap: 12, lineH: 13, rowGap: 32, px: 12, cornerR:  8 },
}

function Node({ step, cfg, isResult }) {
  const m = META[step.id] ?? META.context
  return (
    <div className="flex flex-col items-center relative z-10" style={{ gap: cfg.labelGap }}>
      {/* Circle — centered on the row line */}
      <div
        className="rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110"
        style={{
          width:  cfg.circle,
          height: cfg.circle,
          background: m.bg,
          border: `1.5px solid ${m.border}`,
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

      {/* Label below */}
      <div style={{ width: cfg.circle + 12, textAlign: 'center' }}>
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
  const half      = cfg.circle / 2                          // circle midpoint = line height
  const labelH    = cfg.labelGap + cfg.lineH * 2            // approx label block height
  const rowH      = cfg.circle + labelH                     // total height of one row
  const connectorH = rowH + cfg.rowGap                      // arc height (row-center to row-center)
  const R         = cfg.cornerR                             // corner radius

  // The SVG arc replaces the sharp right-angle corner.
  // It's positioned so its left edge aligns with where the horizontal lines end.
  // Width = 2R (extends R into the right padding), height = connectorH.
  // Path: start top-left → quarter-circle top-right → straight down → quarter-circle bottom-left
  const arcPath = `M 0,0 Q ${R * 2},0 ${R * 2},${R} L ${R * 2},${connectorH - R} Q ${R * 2},${connectorH} 0,${connectorH}`

  return (
    <div className="relative w-full" style={{ padding: `0 ${cfg.px}px` }}>

      {/* ── Row 1 horizontal line — stops before the arc ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          left:  cfg.px,
          right: cfg.px + R,
          top:   half,
          borderTop: '2px dashed #ddd6fe',
        }}
      />

      {/* ── Row 1 nodes: L → R ── */}
      <div className="relative flex justify-between items-start">
        {ROW1.map(step => (
          <Node key={step.id} step={step} cfg={cfg} />
        ))}
      </div>

      {/* ── Rounded right-side connector (SVG arc) ── */}
      <svg
        className="absolute pointer-events-none overflow-visible"
        style={{
          right:  cfg.px - R,
          top:    half,
          width:  R * 2,
          height: connectorH,
        }}
      >
        <path
          d={arcPath}
          stroke="#ddd6fe"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* ── Gap between rows ── */}
      <div style={{ height: cfg.rowGap }} />

      {/* ── Row 2 horizontal line — stops before the arc on the right ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          left:  cfg.px,
          right: cfg.px + R,
          top:   rowH + cfg.rowGap + half,
          borderTop: '2px dashed #ddd6fe',
        }}
      />

      {/* ── Row 2 nodes: R → L (flex-row-reverse so visual is result←vpn←beleggen←verzekering) ── */}
      <div className="relative flex flex-row-reverse justify-between items-start">
        {ROW2.map(step => (
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
          7 stappen · 3 minuten · direct resultaat
        </p>
      </div>

      {/* Mobile */}
      <div className="block sm:hidden">
        <Timeline cfg={CFG.sm} isMobile />
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
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
