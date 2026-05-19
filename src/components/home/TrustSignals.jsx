const SIGNALS = [
  { icon: 'lock', text: '100% gratis & anoniem' },
  { icon: 'verified', text: 'Geen account nodig' },
  { icon: 'star', text: 'Onafhankelijk advies' },
]

export default function TrustSignals() {
  return (
    <div className="bg-white py-5 border-b border-ink-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
          {SIGNALS.map((s) => (
            <div key={s.icon} className="flex items-center gap-2.5 text-base font-medium text-ink-600">
              <span className="material-symbols-rounded text-primary-500 text-2xl">{s.icon}</span>
              {s.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
