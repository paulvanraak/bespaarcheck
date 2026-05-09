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

const STEPS = [
  ...CHECK_STEPS,
  { id: 'result', icon: 'savings' },
]

// ── Desktop ─────────────────────────────────────────────────────────────────
// viewBox 0 0 900 248 | row1 y=65, row2 y=185 (generous spacing for labels)
const D = {
  vb: { w: 900, h: 248 },
  nodes: [
    { x: 80,  y: 65  }, // 0 context
    { x: 267, y: 65  }, // 1 energie
    { x: 453, y: 65  }, // 2 bank
    { x: 640, y: 65  }, // 3 telecom
    { x: 640, y: 185 }, // 4 verzekering
    { x: 453, y: 185 }, // 5 beleggen
    { x: 267, y: 185 }, // 6 vpn
    { x: 80,  y: 185 }, // 7 result
  ],
  path: 'M 80,65 L 267,65 L 453,65 L 640,65 L 775,65 L 775,185 L 640,185 L 453,185 L 267,185 L 80,185',
}

// ── Mobile ───────────────────────────────────────────────────────────────────
// viewBox 0 0 380 248 | row1 y=65, row2 y=185
const M = {
  vb: { w: 380, h: 248 },
  nodes: [
    { x: 42,  y: 65  }, // 0 context
    { x: 155, y: 65  }, // 1 energie
    { x: 268, y: 65  }, // 2 bank
    { x: 340, y: 65  }, // 3 telecom
    { x: 340, y: 185 }, // 4 verzekering
    { x: 228, y: 185 }, // 5 beleggen
    { x: 115, y: 185 }, // 6 vpn
    { x: 42,  y: 185 }, // 7 result
  ],
  path: 'M 42,65 L 155,65 L 268,65 L 340,65 L 362,65 L 362,185 L 340,185 L 228,185 L 115,185 L 42,185',
}

function Timeline({ cfg, steps, radius }) {
  const { vb, nodes, path } = cfg

  return (
    <div
      className="relative w-full"
      style={{ paddingBottom: `${(vb.h / vb.w) * 100}%` }}
    >
      {/* SVG — only the dotted line */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${vb.w} ${vb.h}`}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <path
          d={path}
          stroke="#ddd6fe"
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Nodes — HTML overlaid on SVG */}
      {steps.map((step, i) => {
        const m = META[step.id] ?? META.context
        const node = nodes[i]
        const pctX = `${(node.x / vb.w) * 100}%`
        const pctY = `${(node.y / vb.h) * 100}%`
        const isResult = step.id === 'result'

        return (
          <div
            key={step.id}
            className="absolute flex flex-col items-center"
            style={{
              left: pctX,
              top: pctY,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Circle */}
            <div
              className="rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110"
              style={{
                width: radius * 2,
                height: radius * 2,
                background: m.bg,
                border: `1.5px solid ${m.border}`,
                boxShadow: isResult ? `0 0 0 3px ${m.border}` : undefined,
              }}
            >
              <span
                className="material-symbols-rounded"
                style={{ color: m.color, fontSize: radius * 0.9 }}
              >
                {step.icon}
              </span>
            </div>
            {/* Label */}
            <span
              className="text-center leading-tight font-medium text-ink-400 whitespace-pre-line mt-1.5"
              style={{
                fontSize: Math.max(9, radius * 0.46),
                width: radius * 2.8,
                color: isResult ? m.color : undefined,
                fontWeight: isResult ? 600 : undefined,
              }}
            >
              {m.label}
            </span>
          </div>
        )
      })}
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
      <div className="block sm:hidden px-4">
        <Timeline cfg={M} steps={STEPS} radius={20} />
      </div>

      {/* Desktop */}
      <div className="hidden sm:block px-8 sm:px-14">
        <Timeline cfg={D} steps={STEPS} radius={26} />
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
