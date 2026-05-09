export default function QuestionSlider({ question, value, onChange, dimmed = false }) {
  const current = value ?? question.default ?? question.min
  const pct = ((current - question.min) / (question.max - question.min)) * 100

  // Format display value
  const isMonetary = question.unit === '€'
  const displayValue = current % 1 === 0 ? current.toLocaleString('nl-NL') : current.toFixed(2)

  return (
    <div className={`mb-10 transition-opacity duration-200 ${dimmed ? 'opacity-40 pointer-events-none select-none' : 'opacity-100'}`}>
      <label className="block text-xl font-semibold text-ink-900 mb-6">
        {question.label}
      </label>
      {question.hint && (
        <p className="text-sm text-ink-400 -mt-4 mb-4">{question.hint}</p>
      )}

      {/* Waarde — consistent text-4xl across all sliders */}
      <div className="flex items-baseline gap-2 mb-6">
        {isMonetary && (
          <span className="text-4xl font-bold text-primary-500 leading-none">€</span>
        )}
        <span className="text-4xl font-bold text-primary-500 leading-none tracking-tight">
          {displayValue}
        </span>
        {!isMonetary && (
          <span className="text-xl font-semibold text-ink-400">{question.unit}</span>
        )}
        {isMonetary && (
          <span className="text-base font-medium text-ink-400">/maand</span>
        )}
      </div>

      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          min={question.min}
          max={question.max}
          step={question.step}
          value={current}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
          style={{
            background: `linear-gradient(to right, #3340DD ${pct}%, #E5E4DF ${pct}%)`,
          }}
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-ink-300 font-medium">
            {isMonetary ? `€${question.min}` : `${question.min} ${question.unit}`}
          </span>
          <span className="text-xs text-ink-300 font-medium">
            {isMonetary ? `€${question.max}` : `${question.max.toLocaleString('nl-NL')} ${question.unit}`}
          </span>
        </div>
      </div>

      {question.skippable && (
        <button
          onClick={() => onChange(0)}
          className="mt-5 text-sm text-ink-400 hover:text-ink-600 underline underline-offset-2 transition-colors"
        >
          {question.skipLabel}
        </button>
      )}
    </div>
  )
}
