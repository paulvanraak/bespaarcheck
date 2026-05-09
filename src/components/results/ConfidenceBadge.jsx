export default function ConfidenceBadge({ value }) {
  if (!value) return null
  const pct = Math.round(value * 100)
  const label = value >= 0.85 ? 'Hoge zekerheid' : value >= 0.65 ? 'Indicatief' : 'Globale schatting'
  const color = value >= 0.85 ? 'text-success bg-success/10' : value >= 0.65 ? 'text-amber-600 bg-amber-50' : 'text-ink-400 bg-ink-100'

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>
      {label} · {pct}%
    </span>
  )
}
