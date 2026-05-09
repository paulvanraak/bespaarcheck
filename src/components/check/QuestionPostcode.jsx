import { useState } from 'react'

export default function QuestionPostcode({ question, value, onChange, hint }) {
  const label = question?.label || 'Postcode cijfers'
  const [error, setError] = useState('')

  function handleChange(e) {
    const v = e.target.value.replace(/[^0-9]/g, '').substring(0, 4)
    onChange(v)
    if (v.length === 4) setError('')
  }

  function handleBlur() {
    if (value && value.length < 4) setError('Vul 4 cijfers in')
  }

  return (
    <div className="mb-10">
      <label className="block text-xl font-semibold text-ink-900 mb-4">
        {label}
      </label>
      <div className="flex items-center gap-4 flex-wrap">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          value={value || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="1234"
          className="w-32 text-3xl font-semibold text-center py-4 px-4 rounded-lg border-2 border-ink-100 focus:border-primary-500 focus:outline-none transition-colors"
        />
        {hint && (
          <p className="text-xs text-ink-400 leading-snug max-w-[160px]">{hint}</p>
        )}
      </div>
      {error && <p className="text-sm text-danger mt-2">{error}</p>}
    </div>
  )
}
