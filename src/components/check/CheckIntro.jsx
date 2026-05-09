import { CHECK_STEPS } from '../../data/checkQuestions'

// Per stap: kleur, icon, etc.
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

// ─── Desktop layout ─────────────────────────────────────────────────────────
// SVG viewBox: 0 0 900 210
// Smooth S-curve: row 1 L→R (y ≈ 55–85), row 2 R→L (y ≈ 135–168)
const D_VB = { w: 900, h: 210 }

const D_NODES = [
  { x: 82,  y: 75  },  // 0 context
  { x: 258, y: 50  },  // 1 energie
  { x: 435, y: 82  },  // 2 bank
  { x: 612, y: 52  },  // 3 telecom
  { x: 742, y: 148 },  // 4 verzekering
  { x: 580, y: 170 },  // 5 beleggen
  { x: 402, y: 142 },  // 6 vpn
  { x: 178, y: 164 },  // 7 result
]

const D_PATH = [
  'M 82,75',
  'C 150,75 192,50 258,50',
  'C 324,50 368,82 435,82',
  'C 502,82 546,52 612,52',
  'C 685,52 778,108 748,148',
  'C 718,175 650,170 580,170',
  'C 510,170 468,142 402,142',
  'C 330,142 270,164 178,164',
].join(' ')

// ─── Mobile layout ───────────────────────────────────────────────────────────
// SVG viewBox: 0 0 380 295
// Same snake concept but portrait-ish
const M_VB = { w: 380, h: 295 }

const M_NODES = [
  { x: 42,  y: 78  },  // 0 context
  { x: 155, y: 55  },  // 1 energie
  { x: 268, y: 82  },  // 2 bank
  { x: 352, y: 56  },  // 3 telecom
  { x: 352, y: 195 },  // 4 verzekering
  { x: 248, y: 218 },  // 5 beleggen
  { x: 138, y: 192 },  // 6 vpn
  { x: 42,  y: 218 },  // 7 result
]

const M_PATH = [
  'M 42,78',
  'C 85,78 112,55 155,55',
  'C 198,55 225,82 268,82',
  'C 311,82 332,56 352,56',
  'C 375,56 380,120 378,155',
  'C 376,178 372,195 352,195',
  'C 310,195 285,218 248,218',
  'C 210,218 178,192 138,192',
  'C 98,192 72,218 42,218',
].join(' ')

function NodeCircle({ step, x, y, vbW, vbH, radius = 22 }) {
  const m = META[step.id] ?? META.context
  const pctX = `${(x / vbW) * 100}%`
  const pctY = `${(y / vbH) * 100}%`

  return (
    <div
      className="absolute flex flex-col items-center gap-1"
      style={{ left: pctX, top: pctY, transform: 'translate(-50%, -50%)' }}
    >
      <div
        className="rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-200 hover:scale-110 flex-shrink-0"
        style={{
          width: radius * 2,
          height: radius * 2,
          background: m.bg,
          border: `1.5px solid ${m.border}`,
        }}
      >
        <span
          className="material-symbols-rounded"
          style={{ color: m.color, fontSize: radius * 0.9 }}
        >
          {step.icon}
        </span>
      </div>
      <span
        className="text-center leading-tight font-medium text-ink-400 whitespace-pre-line"
        style={{ fontSize: Math.max(8, radius * 0.46), width: radius * 2.6 }}
      >
        {m.label}
      </span>
    </div>
  )
}

function Timeline({ nodes, path, vb, steps, radius }) {
  return (
    <div
      className="relative w-full"
      style={{ paddingBottom: `${(vb.h / vb.w) * 100}%` }}
    >
      {/* SVG path */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${vb.w} ${vb.h}`}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <defs>
          <linearGradient id={`grad-${vb.w}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#c7d2fe" />
            <stop offset="45%"  stopColor="#e9d5ff" />
            <stop offset="100%" stopColor="#fed7aa" />
          </linearGradient>
        </defs>
        {/* Shadow/glow layer */}
        <path
          d={path}
          stroke="#e2e8f0"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Main line */}
        <path
          d={path}
          stroke={`url(#grad-${vb.w})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Start dot */}
        <circle cx={nodes[0].x} cy={nodes[0].y} r="5" fill="#818cf8" opacity="0.5" />
        {/* End dot */}
        <circle cx={nodes[nodes.length - 1].x} cy={nodes[nodes.length - 1].y} r="5" fill="#fb923c" opacity="0.5" />
      </svg>

      {/* HTML nodes overlaid */}
      {steps.map((step, i) => (
        <NodeCircle
          key={step.id}
          step={step}
          x={nodes[i].x}
          y={nodes[i].y}
          vbW={vb.w}
          vbH={vb.h}
          radius={radius}
        />
      ))}
    </div>
  )
}

export default function CheckIntro({ onStart }) {
  return (
    <div className="w-full py-10 sm:py-16">

      {/* Header */}
      <div className="max-w-lg mx-auto px-4 text-center mb-10 sm:mb-12">
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

      {/* Mobile timeline */}
      <div className="block sm:hidden px-3">
        <Timeline nodes={M_NODES} path={M_PATH} vb={M_VB} steps={STEPS} radius={20} />
      </div>

      {/* Desktop timeline */}
      <div className="hidden sm:block px-6 sm:px-10">
        <Timeline nodes={D_NODES} path={D_PATH} vb={D_VB} steps={STEPS} radius={26} />
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
