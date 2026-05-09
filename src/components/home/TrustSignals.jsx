const SIGNALS = [
  { icon: 'lock', text: '100% gratis & anoniem' },
  { icon: 'verified', text: 'Geen account nodig' },
  { icon: 'star', text: 'Onafhankelijk advies' },
]

export default function TrustSignals() {
  return (
    <div className="bg-white border-t border-ink-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
          {SIGNALS.map((s) => (
            <div key={s.icon} className="flex items-center gap-2 text-sm text-ink-500">
              <span className="material-symbols-rounded text-primary-500 text-[18px]">{s.icon}</span>
              {s.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
